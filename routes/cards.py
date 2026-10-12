from flask import Blueprint, request, jsonify
from config.db import cards
from middleware.auth import token_required
from bson import ObjectId

cards_bp = Blueprint("cards", __name__)


class Card:
    def __init__(self, doc):
        self.__id          = str(doc["_id"])
        self.__user_id     = str(doc["userId"])
        self.__player_name = doc.get("playerName")
        self.__rarity      = doc.get("rarity")
        self.__image       = doc.get("image")
        self.__serial      = doc.get("serial")
        self.__obtained_at = doc.get("obtainedAt")

  
    def get_rarity(self):
        return self.__rarity

    def get_public_data(self):
        """Data yang aman ditampilkan ke user lewat API."""
        return {
            "_id":        self.__id,
            "userId":     self.__user_id,
            "playerName": self.__player_name,
            "rarity":     self.__rarity,
            "image":      self.__image,
            "serial":     self.__serial,
            "obtainedAt": self.__obtained_at,
        }


@cards_bp.route("/", methods=["GET"])
@token_required
def get_cards():
    rarity  = request.args.get("rarity")
    search  = request.args.get("search")
    sort_by = request.args.get("sort", "terbaru")

    query = { "userId": ObjectId(request.user_id) }

    if rarity:
        query["rarity"] = rarity
    if search:
        query["playerName"] = { "$regex": search, "$options": "i" }

    sort_map = {
        "terbaru": [("obtainedAt", -1)],
        "terlama": [("obtainedAt",  1)],
        "serial":  [("serial",      1)]
    }
    sort   = sort_map.get(sort_by, [("obtainedAt", -1)])
    result = list(cards.find(query).sort(sort))


    formatted = [Card(doc).get_public_data() for doc in result]

    return jsonify({ "total": len(formatted), "cards": formatted }), 200