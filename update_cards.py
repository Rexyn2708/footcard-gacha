from pymongo import MongoClient
from dotenv import load_dotenv
import os, json

load_dotenv()
client = MongoClient(os.getenv('MONGO_URI'))
db = client['footcard_gacha']
cards = db['cards']

with open('data/players.json', 'r', encoding='utf-8') as f:
    players = json.load(f)

player_map = {p['id']: p for p in players}

updated = 0
for card in cards.find():
    player_id = card.get('playerId')
    if player_id and player_id in player_map:
        new_image = player_map[player_id]['image']
        if card.get('image') != new_image:
            cards.update_one(
                {'_id': card['_id']},
                {'$set': {'image': new_image}}
            )
            updated += 1

print(f'Updated {updated} cards')