from flask import Blueprint, request, jsonify
from config.db import users, cards, db
from middleware.auth import token_required
from bson import ObjectId
from datetime import datetime, timezone

redeem_bp      = Blueprint("redeem", __name__)
premium_tokens = db["premium_tokens"]

REDEEM_CODES = {
    "WELCOME2025": { "type": "pulls",  "amount": 10 },
    "FOOTCARD":    { "type": "pulls",  "amount": 5  },
    "LEGENDARY":   { "type": "pulls",  "amount": 20 },
    "GETMESSI":    { "type": "player", "playerId": 2,  "playerName": "Lionel Messi",
                     "rarity": "Heritage", "image": "assets/images/heritage/messi.jpg" },
    "GETRONALDO":  { "type": "player", "playerId": 4,  "playerName": "Cristiano Ronaldo",
                     "rarity": "Heritage", "image": "assets/images/heritage/ronaldo.jpg" },
    "GETPELE":     { "type": "player", "playerId": 5,  "playerName": "Pele",
                     "rarity": "Heritage", "image": "assets/images/heritage/pele.jpg" },
    "HOKI5X":      { "type": "luck",   "pulls": 5,  "multiplier": 3 },
    "HOKI10X":     { "type": "luck",   "pulls": 10, "multiplier": 2 },
}

@redeem_bp.route("/", methods=["POST"])
@token_required
def redeem():
    kode = request.json.get("code", "").strip().upper()
    user = users.find_one({ "_id": ObjectId(request.user_id) })

    if not kode:
        return jsonify({ "error": "Kode tidak boleh kosong" }), 400

    if kode.startswith("FCG-"):
        token_doc = premium_tokens.find_one({ "token": kode })

        if not token_doc:
            return jsonify({ "error": "Token tidak valid" }), 400

        if token_doc["status"] != "active":
            return jsonify({ "error": "Token sudah digunakan atau expired" }), 400

        expired_at = token_doc["expiredAt"]
        now        = datetime.now(timezone.utc)
        if expired_at.tzinfo is None:
            expired_at = expired_at.replace(tzinfo=timezone.utc)

        if expired_at < now:
            premium_tokens.update_one(
                { "token": kode },
                { "$set": { "status": "expired" } }
            )
            return jsonify({ "error": "Token sudah expired" }), 400

        premium_tokens.update_one(
            { "token": kode },
            { "$set": {
                "status": "used",
                "usedAt": datetime.now(timezone.utc),
                "usedBy": str(user["_id"])
            }}
        )

        reward      = token_doc["reward"]
        reward_type = reward.get("type", "pulls") 

        if reward_type == "luck":
            users.update_one(
                { "_id": user["_id"] },
                { "$set": {
                    "luckBoostPullsLeft": reward["pulls"],
                    "luckBoostMultiplier": reward["multiplier"]
                }}
            )
            return jsonify({
                "message": f"🍀 Berhasil! Peluang kartu bagus naik {reward['multiplier']}x selama {reward['pulls']} pull ke depan!"
            }), 200

        users.update_one(
            { "_id": user["_id"] },
            { "$inc": { "bonusPulls": reward["amount"] } }
        )
        return jsonify({
            "message": f"🎉 Berhasil! Dapat {reward['amount']} Pull Premium!"
        }), 200

    if kode not in REDEEM_CODES:
        return jsonify({ "error": "Kode tidak valid" }), 400

    if kode in user.get("redeemUsed", []):
        return jsonify({ "error": "Kode sudah pernah dipakai" }), 400

    reward = REDEEM_CODES[kode]

    if reward["type"] == "pulls":
        users.update_one(
            { "_id": user["_id"] },
            {
                "$inc":  { "bonusPulls": reward["amount"] },
                "$push": { "redeemUsed": kode }
            }
        )
        return jsonify({ "message": f"Berhasil! Dapat {reward['amount']} pull bonus" }), 200

    elif reward["type"] == "player":
        users.update_one(
            { "_id": user["_id"] },
            {
                "$inc":  { "serialCounter": 1 },
                "$push": { "redeemUsed": kode }
            }
        )
        updated = users.find_one({ "_id": user["_id"] })
        serial  = "SR-" + str(updated["serialCounter"]).zfill(8)

        cards.insert_one({
            "userId":     user["_id"],
            "playerId":   reward["playerId"],
            "playerName": reward["playerName"],
            "rarity":     reward["rarity"],
            "image":      reward["image"],
            "serial":     serial,
            "obtainedAt": datetime.now(timezone.utc)
        })
        return jsonify({ "message": f"Berhasil! Dapat kartu {reward['playerName']}" }), 200

    elif reward["type"] == "luck":
        users.update_one(
            { "_id": user["_id"] },
            {
                "$set":  {
                    "luckBoostPullsLeft": reward["pulls"],
                    "luckBoostMultiplier": reward["multiplier"]
                },
                "$push": { "redeemUsed": kode }
            }
        )
        return jsonify({
            "message": f"🍀 Berhasil! Peluang kartu bagus naik {reward['multiplier']}x selama {reward['pulls']} pull ke depan!"
        }), 200

    return jsonify({ "error": "Tipe reward tidak dikenali" }), 400