from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import json
import os

load_dotenv()

app = Flask(__name__,
    static_folder="static",
    template_folder="templates"
)
CORS(app)

BASE_DIR     = os.path.dirname(os.path.abspath(__file__))
PLAYERS_FILE = os.path.join(BASE_DIR, "data", "players.json")

@app.route("/")
def index():
    return send_from_directory("static", "index.html")

@app.route("/login.html")
def login_page():
    return send_from_directory("static", "login.html")

@app.route("/admin.html")
def admin_page():
    return send_from_directory("static", "admin.html")

@app.route("/api.js")
def api_js():
    return send_from_directory("static", "api.js")

@app.route("/style.css")
def style_css():
    return send_from_directory("static", "style.css")

@app.route("/script.js")
def script_js():
    return send_from_directory("static", "script.js")

@app.route("/assets/<path:filename>")
def assets(filename):
    return send_from_directory("static/assets", filename)

@app.route("/api/players")
def public_players():
    """Endpoint publik (tanpa login) buat frontend ambil data pemain terbaru
    langsung dari data/players.json — tidak perlu lagi generate_players.py
    tiap kali ada pemain baru ditambahkan lewat Admin Panel."""
    if os.path.exists(PLAYERS_FILE):
        with open(PLAYERS_FILE, "r", encoding="utf-8") as f:
            players = json.load(f)
    else:
        players = []
    return jsonify({ "players": players }), 200

from routes.auth    import auth_bp
from routes.gacha   import gacha_bp
from routes.cards   import cards_bp
from routes.redeem  import redeem_bp
from routes.admin   import admin_bp

app.register_blueprint(auth_bp,    url_prefix="/api/auth")
app.register_blueprint(gacha_bp,   url_prefix="/api/gacha")
app.register_blueprint(cards_bp,   url_prefix="/api/cards")
app.register_blueprint(redeem_bp,  url_prefix="/api/redeem")
app.register_blueprint(admin_bp,   url_prefix="/api/admin")

if __name__ == "__main__":
    app.run(debug=True, port=5000, use_reloader=False)