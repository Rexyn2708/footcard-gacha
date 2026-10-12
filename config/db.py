from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db     = client["footcard_gacha"]

users          = db["users"]
cards          = db["cards"]
transactions   = db["transactions"]
premium_tokens = db["premium_tokens"]