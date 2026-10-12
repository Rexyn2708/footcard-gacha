from flask import Blueprint, request, jsonify
from config.db import users, cards
from middleware.auth import token_required
from bson import ObjectId
from datetime import datetime
from functools import wraps
import os, base64, json

admin_bp = Blueprint("admin", __name__)


def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user = users.find_one({ "_id": ObjectId(request.user_id) })
        if not user or user.get("role") not in ["admin", "developer"]:
            return jsonify({ "error": "Akses ditolak" }), 403
        return f(*args, **kwargs)
    return decorated



class JsonRepository:
    def __init__(self, file_path):
        self.__file_path = file_path   
    def load(self):
        os.makedirs(os.path.dirname(self.__file_path), exist_ok=True)
        if os.path.exists(self.__file_path):
            with open(self.__file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        return []

    def save(self, data):
        os.makedirs(os.path.dirname(self.__file_path), exist_ok=True)
        with open(self.__file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

class PlayerRepository(JsonRepository):
    def __init__(self):
        super().__init__("data/players.json")  

    def add(self, name, rarity, image):
        players = self.load()
        new_id = max([p["id"] for p in players], default=0) + 1
        image_path = self._save_image(image, name, rarity) if image else ""

        player = { "id": new_id, "name": name, "rarity": rarity, "image": image_path }
        players.append(player)
        self.save(players)
        return player

    def update(self, player_id, name=None, rarity=None, image=None):
        players = self.load()
        player = next((p for p in players if p["id"] == player_id), None)
        if not player:
            return None

        if name:
            player["name"] = name
        old_rarity = player["rarity"]
        if rarity:
            player["rarity"] = rarity

        if image and image.startswith("data:image"):
            player["image"] = self._save_image(image, player["name"], player["rarity"])
        elif rarity and rarity != old_rarity:
            old_filename = os.path.basename(player["image"])
            player["image"] = f"assets/images/{rarity.lower()}/{old_filename}"

        self.save(players)
        return player

    def delete(self, player_id):
        players = self.load()
        players = [p for p in players if p["id"] != player_id]
        self.save(players)

    def _save_image(self, image, name, rarity):
        if not image.startswith("data:image"):
            return image
        ext = image.split(";")[0].split("/")[1]
        img_data = base64.b64decode(image.split(",")[1])
        rarity_dir = f"static/assets/images/{rarity.lower()}"
        os.makedirs(rarity_dir, exist_ok=True)
        filename = f"{name.lower().replace(' ', '-')}.{ext}"
        image_path = f"assets/images/{rarity.lower()}/{filename}"
        with open(f"static/{image_path}", "wb") as f:
            f.write(img_data)
        return image_path


class RedeemCodeRepository(JsonRepository):
    def __init__(self):
        super().__init__("data/redeem_codes.json")   

    def add(self, code, type_, amount, player_id, description):
        codes = self.load()
        if any(c["code"] == code for c in codes):
            return None, "Kode sudah ada"

        new_code = {
            "code":        code,
            "type":        type_,
            "amount":      amount,
            "playerId":    player_id,
            "description": description,
            "createdAt":   datetime.utcnow().isoformat()
        }
        codes.append(new_code)
        self.save(codes)
        return new_code, None

    def delete(self, code):
        codes = self.load()
        codes = [c for c in codes if c["code"] != code.upper()]
        self.save(codes)


player_repo = PlayerRepository()
redeem_repo = RedeemCodeRepository()


@admin_bp.route("/players", methods=["POST"])
@token_required
@admin_required
def add_player():
    data   = request.json
    name   = data.get("name")
    rarity = data.get("rarity")
    image  = data.get("image")

    if not name or not rarity:
        return jsonify({ "error": "Nama dan rarity wajib diisi" }), 400

    player = player_repo.add(name, rarity, image)
    return jsonify({ "message": "Pemain berhasil ditambahkan", "player": player }), 201


@admin_bp.route("/players", methods=["GET"])
@token_required
@admin_required
def get_players():
    return jsonify({ "players": player_repo.load() }), 200


@admin_bp.route("/players/<int:player_id>", methods=["DELETE"])
@token_required
@admin_required
def delete_player(player_id):
    player_repo.delete(player_id)
    return jsonify({ "message": "Pemain berhasil dihapus" }), 200


@admin_bp.route("/players/<int:player_id>", methods=["PUT"])
@token_required
@admin_required
def update_player(player_id):
    data   = request.json
    name   = data.get("name")
    rarity = data.get("rarity")
    image  = data.get("image")

    player = player_repo.update(player_id, name, rarity, image)
    if not player:
        return jsonify({ "error": "Pemain tidak ditemukan" }), 404

    return jsonify({ "message": "Pemain berhasil diperbarui", "player": player }), 200


@admin_bp.route("/redeem-codes", methods=["POST"])
@token_required
@admin_required
def add_redeem_code():
    data        = request.json
    code        = data.get("code", "").upper()
    type_       = data.get("type", "pulls")
    amount      = data.get("amount", 0)
    player_id   = data.get("playerId", None)
    description = data.get("description", "")

    if not code:
        return jsonify({ "error": "Kode wajib diisi" }), 400

    new_code, error = redeem_repo.add(code, type_, amount, player_id, description)
    if error:
        return jsonify({ "error": error }), 400

    return jsonify({ "message": "Kode berhasil ditambahkan", "code": new_code }), 201


@admin_bp.route("/redeem-codes", methods=["GET"])
@token_required
@admin_required
def get_redeem_codes():
    return jsonify({ "codes": redeem_repo.load() }), 200


@admin_bp.route("/redeem-codes/<code>", methods=["DELETE"])
@token_required
@admin_required
def delete_redeem_code(code):
    redeem_repo.delete(code)
    return jsonify({ "message": "Kode berhasil dihapus" }), 200


@admin_bp.route("/users", methods=["GET"])
@token_required
@admin_required
def get_users():
    all_users = list(users.find({}, { "password": 0 }))
    for u in all_users:
        u["_id"] = str(u["_id"])
    return jsonify({ "users": all_users }), 200


@admin_bp.route("/users/<user_id>", methods=["PUT"])
@token_required
@admin_required
def edit_user(user_id):
    current = users.find_one({ "_id": ObjectId(request.user_id) })
    if not current or current.get("role") not in ["admin", "developer"]:
        return jsonify({ "error": "Akses ditolak" }), 403

    data       = request.json
    role       = data.get("role")
    pulls_left = data.get("pullsLeft")
    bonus      = data.get("bonusPulls")

    update = {}
    if role is not None:
        if current.get("role") == "developer" and role == "admin":
            return jsonify({ "error": "Developer tidak bisa set role admin" }), 403
        update["role"] = role
    if pulls_left is not None:
        update["pullsLeft"] = int(pulls_left)
    if bonus is not None:
        update["bonusPulls"] = int(bonus)

    if not update:
        return jsonify({ "error": "Tidak ada data yang diupdate" }), 400

    users.update_one({ "_id": ObjectId(user_id) }, { "$set": update })
    return jsonify({ "message": "User berhasil diupdate" }), 200