import jwt
import os
from functools import wraps
from flask import request, jsonify


class TokenService:
    def __init__(self, secret_key):
        self.secret_key = secret_key

    def verify(self, token):
        try:
            decoded = jwt.decode(token, self.secret_key, algorithms=["HS256"])
            return decoded["user_id"], None
        except jwt.ExpiredSignatureError:
            return None, "Token kadaluarsa"
        except jwt.InvalidTokenError:
            return None, "Token tidak valid"


token_service = TokenService(secret_key=os.getenv("JWT_SECRET"))


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]

        if not token:
            return jsonify({ "error": "Token tidak ada" }), 401

        user_id, error = token_service.verify(token)
        if error:
            return jsonify({ "error": error }), 401

        request.user_id = user_id
        return f(*args, **kwargs)
    return decorated