from flask import Blueprint, request, jsonify
from config.db import users, transactions
from middleware.auth import token_required
from bson import ObjectId
from datetime import datetime
from abc import ABC, abstractmethod
import hashlib
import requests
import os
import base64

payment_bp = Blueprint("payment", __name__)

PAKET = {
    "akses_dc": { "name": "Akses Premium Discord", "amount": 150000 },
}


class PaymentGateway(ABC):

    @abstractmethod
    def charge(self, order_id, paket_id, paket):
        pass


class MidtransQrisGateway(PaymentGateway):

    def __init__(self):
        self.server_key = os.getenv("MIDTRANS_SERVER_KEY")

    def charge(self, order_id, paket_id, paket):
        encoded_key = base64.b64encode(f"{self.server_key}:".encode()).decode()

        payload = {
            "transaction_details": {
                "order_id":     order_id,
                "gross_amount": paket["amount"]
            },
            "item_details": [{
                "id":       paket_id,
                "price":    paket["amount"],
                "quantity": 1,
                "name":     paket["name"]
            }],
            "payment_type": "qris"
        }

        response = requests.post(
            "https://api.sandbox.midtrans.com/v2/charge",
            json=payload,
            headers={
                "Authorization": f"Basic {encoded_key}",
                "Content-Type":  "application/json"
            }
        )
        return response.json()

    def verify_signature(self, transaction_id, status, gross_amount, signature_key):
        raw_string = f"{transaction_id}{status}{gross_amount}{self.server_key}"
        expected   = hashlib.sha512(raw_string.encode()).hexdigest()
        return signature_key == expected


gateway = MidtransQrisGateway()


@payment_bp.route("/order", methods=["POST"])
@token_required
def create_order():
    paket_id = request.json.get("paket_id")

    if paket_id not in PAKET:
        return jsonify({ "error": "Paket tidak valid" }), 400

    paket    = PAKET[paket_id]
    order_id = f"FCG-{request.user_id[-6:]}-{int(datetime.utcnow().timestamp())}"

    transactions.insert_one({
        "userId":      ObjectId(request.user_id),
        "orderId":     order_id,
        "packageName": paket["name"],
        "amount":      paket["amount"],
        "paymentMethod": "qris",
        "status":      "pending",
        "midtransResponse": {},
        "paidAt":      None,
        "createdAt":   datetime.utcnow()
    })

    
    result = gateway.charge(order_id, paket_id, paket)

    transactions.update_one(
        { "orderId": order_id },
        { "$set": { "midtransResponse": result } }
    )

    return jsonify({
        "message":  "Order berhasil dibuat",
        "order_id": order_id,
        "qr_url":   result.get("actions", [{}])[0].get("url", ""),
        "amount":   paket["amount"]
    }), 200


@payment_bp.route("/status/<order_id>", methods=["GET"])
@token_required
def check_status(order_id):
    trx = transactions.find_one({ "orderId": order_id, "userId": ObjectId(request.user_id) })
    if not trx:
        return jsonify({ "error": "Transaksi tidak ditemukan" }), 404

    return jsonify({ "status": trx["status"] }), 200


@payment_bp.route("/webhook", methods=["POST"])
def webhook():
    data     = request.json
    order_id = data.get("order_id")
    status   = data.get("transaction_status")

    signature_key   = data.get("signature_key")
    gross_amount    = data.get("gross_amount")
    transaction_id  = data.get("transaction_id")

    if not gateway.verify_signature(transaction_id, status, gross_amount, signature_key):
        return jsonify({ "error": "Signature tidak valid" }), 403

    trx = transactions.find_one({ "orderId": order_id })
    if not trx:
        return jsonify({ "error": "Transaksi tidak ditemukan" }), 404

    if status in ["capture", "settlement"]:
        transactions.update_one(
            { "orderId": order_id },
            { "$set": { "status": "success", "paidAt": datetime.utcnow() } }
        )
        users.update_one(
            { "_id": trx["userId"] },
            { "$set": { "discordAccess": True } }
        )

    elif status in ["cancel", "deny", "expire"]:
        transactions.update_one(
            { "orderId": order_id },
            { "$set": { "status": "failed" } }
        )

    return jsonify({ "message": "Webhook diterima" }), 200


@payment_bp.route("/history", methods=["GET"])
@token_required
def history():
    result = list(transactions.find(
        { "userId": ObjectId(request.user_id) }
    ).sort("createdAt", -1))

    for t in result:
        t["_id"]    = str(t["_id"])
        t["userId"] = str(t["userId"])

    return jsonify({ "transactions": result }), 200