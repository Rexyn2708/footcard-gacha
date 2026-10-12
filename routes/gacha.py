from flask import Blueprint, request, jsonify
from config.db import users, cards
from middleware.auth import token_required
from bson import ObjectId
from datetime import datetime
import random
import json
import os

gacha_bp = Blueprint("gacha", __name__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PLAYERS_FILE = os.path.join(BASE_DIR, "data", "players.json")


def get_players_db():
    """Selalu baca data pemain terbaru dari data/players.json (single source of truth)."""
    if os.path.exists(PLAYERS_FILE):
        with open(PLAYERS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


RARITY_RATES = {
    "Common":   45.0,
    "Uncommon": 25.0,
    "Rare":     15.0,
    "Epic":      8.0,
    "Mythic":    4.0,
    "Secret":    2.8,
    "Heritage":  0.2
}


class Card:
    def __init__(self, player, serial, obtained_at):
        self.player_id   = player["id"]
        self.player_name = player["name"]
        self.rarity      = player["rarity"]
        self.image       = player["image"]
        self.serial      = serial
        self.obtained_at = obtained_at

    def get_bonus_message(self):
        # default, akan di-override subclass
        return f"Kamu mendapatkan {self.player_name}."

    def to_dict(self, user_id):
        return {
            "userId":     user_id,
            "playerId":   self.player_id,
            "playerName": self.player_name,
            "rarity":     self.rarity,
            "image":      self.image,
            "serial":     self.serial,
            "obtainedAt": self.obtained_at,
        }


class CommonCard(Card):
    def get_bonus_message(self):
        return f"{self.player_name} (Common) — lumayan buat pemanasan squad."


class RareCard(Card):
    def get_bonus_message(self):
        return f"{self.player_name} (Rare) — cukup solid, kepakai!"


class EpicCard(Card):
    def get_bonus_message(self):
        return f"{self.player_name} (Epic) — mantap, lumayan langka!"


class MythicCard(Card):
    def get_bonus_message(self):
        return f"{self.player_name} (Mythic) — WOW! Beruntung banget!"


class SecretCard(Card):
    def get_bonus_message(self):
        return f"{self.player_name} (Secret) — GILA! Ini jarang banget keluar!"


class HeritageCard(Card):
    def get_bonus_message(self):
        return f"{self.player_name} (Heritage) — JACKPOT LEGENDARIS! 🎉🎉🎉"


RARITY_CLASS_MAP = {
    "Common":   CommonCard,
    "Uncommon": RareCard,
    "Rare":     RareCard,
    "Epic":     EpicCard,
    "Mythic":   MythicCard,
    "Secret":   SecretCard,
    "Heritage": HeritageCard,
}


def create_card_object(player, serial, obtained_at):
    """Factory sederhana: pilih subclass Card sesuai rarity player."""
    card_class = RARITY_CLASS_MAP.get(player["rarity"], Card)
    return card_class(player, serial, obtained_at)


def random_player():
    rarities      = list(RARITY_RATES.keys())
    weights       = list(RARITY_RATES.values())
    chosen_rarity = random.choices(rarities, weights=weights, k=1)[0]
    players_db    = get_players_db()
    pool          = [p for p in players_db if p["rarity"] == chosen_rarity]
    return random.choice(pool) if pool else players_db[0]


@gacha_bp.route("/pull", methods=["POST"])
@token_required
def pull():
    user = users.find_one({ "_id": ObjectId(request.user_id) })

    if user["bonusPulls"] <= 0 and user["pullsLeft"] <= 0:
        return jsonify({ "error": "Pull habis, beli atau tunggu reset 24 jam" }), 400

    hasil = []
    for _ in range(5):
        if user["bonusPulls"] > 0:
            users.update_one({ "_id": user["_id"] }, { "$inc": { "bonusPulls": -1 } })
            user["bonusPulls"] -= 1
        else:
            users.update_one({ "_id": user["_id"] }, { "$inc": { "pullsLeft": -1 } })
            user["pullsLeft"] -= 1

        
        while True:
            users.update_one({ "_id": user["_id"] }, { "$inc": { "serialCounter": 1 } })
            updated = users.find_one({ "_id": user["_id"] })
            serial  = "SR-" + str(updated["serialCounter"]).zfill(8)
            if not cards.find_one({ "serial": serial }):
                break

        player      = random_player()
        obtained_at = datetime.utcnow()

        card_obj = create_card_object(player, serial, obtained_at)
        print(card_obj.get_bonus_message())   
        card = card_obj.to_dict(user["_id"])
        cards.insert_one(card)
        card["_id"]    = str(card["_id"])
        card["userId"] = str(card["userId"])
        hasil.append(card)

    users.update_one({ "_id": user["_id"] }, { "$set": { "lastPullTime": datetime.utcnow() } })
    return jsonify({ "message": "Pull berhasil", "cards": hasil }), 200