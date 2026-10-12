"""
migrate_from_mongo.py
======================
Jalankan SEKALI SAJA untuk memindahkan data lama dari MongoDB
(users, cards, transactions, premium_tokens) ke file JSON baru
(data/users.json, data/cards.json, dst) yang dipakai JSONStore.

SYARAT:
- Jalankan script ini SEBELUM kamu ganti config/db.py & routes/*.py
  ke versi JSONStore (soalnya script ini masih butuh koneksi MongoDB
  yang lama buat baca datanya).
- pymongo & dnspython masih harus terinstall saat menjalankan ini
  (boleh di-uninstall SETELAH migrasi selesai).
- .env masih ada MONGO_URI yang valid & terisi.

CARA PAKAI:
    python migrate_from_mongo.py

Aman dijalankan berkali-kali — data yang sudah ada di file JSON
(dicocokkan lewat _id) akan di-skip, tidak dobel.
"""

import json
import os
import sys
from datetime import datetime

from dotenv import load_dotenv
from pymongo import MongoClient
from bson import ObjectId

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)


def _json_default(obj):
    if isinstance(obj, (datetime,)):
        return obj.isoformat()
    if isinstance(obj, ObjectId):
        return str(obj)
    raise TypeError(f"Tipe data {type(obj)} tidak bisa disimpan ke JSON")


def _convert_ids(doc):
    """Ubah semua ObjectId (di _id maupun field lain seperti userId) jadi string."""
    converted = {}
    for k, v in doc.items():
        if isinstance(v, ObjectId):
            converted[k] = str(v)
        elif isinstance(v, dict):
            converted[k] = _convert_ids(v)
        elif isinstance(v, list):
            converted[k] = [
                str(item) if isinstance(item, ObjectId) else
                (_convert_ids(item) if isinstance(item, dict) else item)
                for item in v
            ]
        else:
            converted[k] = v
    return converted


def load_existing(filepath):
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read().strip()
            return json.loads(content) if content else []
    return []


def save_json(filepath, docs):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(docs, f, indent=2, ensure_ascii=False, default=_json_default)


def migrate_collection(mongo_db, collection_name, output_filename):
    print(f"\n── Migrasi koleksi '{collection_name}' ──")
    collection = mongo_db[collection_name]
    mongo_docs = list(collection.find({}))
    print(f"  Ditemukan {len(mongo_docs)} dokumen di MongoDB.")

    output_path = os.path.join(DATA_DIR, output_filename)
    existing    = load_existing(output_path)
    existing_ids = { str(d.get("_id")) for d in existing }

    added = 0
    for doc in mongo_docs:
        converted = _convert_ids(doc)
        if converted["_id"] in existing_ids:
            continue
        existing.append(converted)
        added += 1

    save_json(output_path, existing)
    print(f"  {added} dokumen baru ditambahkan ke {output_filename} "
          f"(total sekarang: {len(existing)}).")


def main():
    mongo_uri = os.getenv("MONGO_URI")
    if not mongo_uri:
        print("❌ MONGO_URI tidak ketemu di .env — tidak bisa migrasi.")
        sys.exit(1)

    print("Menghubungkan ke MongoDB...")
    client   = MongoClient(mongo_uri)
    mongo_db = client["footcard_gacha"]

    migrate_collection(mongo_db, "users",          "users.json")
    migrate_collection(mongo_db, "cards",          "cards.json")
    migrate_collection(mongo_db, "transactions",   "transactions.json")
    migrate_collection(mongo_db, "premium_tokens", "premium_tokens.json")

    print("\n✅ Migrasi selesai! Sekarang kamu boleh:")
    print("   1. Ganti config/db.py & routes/*.py ke versi JSONStore")
    print("   2. Restart server (python app.py)")
    print("   3. Coba login pakai akun lama kamu — datanya sudah pindah semua")


if __name__ == "__main__":
    main()
