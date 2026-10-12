from flask import Blueprint, request, jsonify
from config.db import users
from middleware.auth import token_required
from abc import ABC, abstractmethod
from datetime import datetime, timedelta
from bson import ObjectId
import bcrypt
import jwt
import os

auth_bp = Blueprint("auth", __name__)


class User:
    def __init__(self, username, email, role="user"):
        self.username = username
        self.email = email
        self.role = role
        self.__password_hash = None   

    def set_password(self, plain_password):
        hashed = bcrypt.hashpw(plain_password.encode("utf-8"), bcrypt.gensalt())
        self.__password_hash = hashed.decode("utf-8")

    def check_password(self, plain_password):
        if not self.__password_hash:
            return False
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            self.__password_hash.encode("utf-8")
        )

    def get_password_hash(self):
        return self.__password_hash

    def get_default_pulls(self):
        return 3

    def to_dict(self):
        return {
            "username":      self.username,
            "email":         self.email,
            "password":      self.get_password_hash(),
            "role":          self.role,
            "pullsLeft":     self.get_default_pulls(),
            "bonusPulls":    0,
            "lastPullTime":  None,
            "serialCounter": 0,
            "redeemUsed":    [],
            "createdAt":     datetime.utcnow()
        }


class AdminUser(User):
    def __init__(self, username, email):
        super().__init__(username, email, role="admin")   

    def get_default_pulls(self):  
        return 999


class AuthService(ABC):

    @abstractmethod
    def register_user(self, username, email, password):
        pass

    @abstractmethod
    def login_user(self, email, password):
        pass


class JwtAuthService(AuthService):

    def __init__(self, secret_key):
        self.secret_key = secret_key

    def register_user(self, username, email, password):
        if users.find_one({ "email": email }):
            return None, 
        if users.find_one({ "username": username }):
            return None, "Username sudah dipakai"

        user = User(username, email)
        user.set_password(password)

        result = users.insert_one(user.to_dict())
        return str(result.inserted_id), None

    def login_user(self, email, password):
        doc = users.find_one({ "email": email })
        if not doc:
            return None, 

        user = User(doc["username"], doc["email"], doc.get("role", "user"))
        user._User__password_hash = doc["password"] 

        if not user.check_password(password):
            return None, 

        token = self.generate_token(str(doc["_id"]))
        return token, None

    def generate_token(self, user_id):
        return jwt.encode({
            "user_id": user_id,
            "exp":     datetime.utcnow() + timedelta(days=7)
        }, self.secret_key, algorithm="HS256")


auth_service = JwtAuthService(secret_key=os.getenv("JWT_SECRET"))


@auth_bp.route("/register", methods=["POST"])
def register():
    data     = request.json
    username = data.get("username")
    email    = data.get("email")
    password = data.get("password")

    user_id, error = auth_service.register_user(username, email, password)
    if error:
        return jsonify({ "error": error }), 400

    return jsonify({ "message": "Register berhasil", "userId": user_id }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data     = request.json
    email    = data.get("email")
    password = data.get("password")

    token, error = auth_service.login_user(email, password)
    if error:
        status = 404 if error == "User tidak ditemukan" else 401
        return jsonify({ "error": error }), status

    return jsonify({ "message": "Login berhasil", "token": token }), 200


@auth_bp.route("/me", methods=["GET"])
@token_required
def me():
    user = users.find_one({ "_id": ObjectId(request.user_id) })
    if not user:
        return jsonify({ "error": "User tidak ditemukan" }), 404
    return jsonify({
        "username":   user["username"],
        "email":      user["email"],
        "role":       user.get("role", "user"),
        "pullsLeft":  user["pullsLeft"],
        "bonusPulls": user["bonusPulls"],
        "redeemUsed": user["redeemUsed"]
    }), 200