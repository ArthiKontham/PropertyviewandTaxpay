from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def load_json(relative_path):
    path = os.path.join(BASE_DIR, relative_path)
    print("📂 Loading:", path)
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    return []


# ---------- HOME ----------
@app.route("/")
def home():
    return "Backend running"


# ---------- STATES ----------
@app.route("/states")
def get_states():
    return jsonify(load_json("data/states.json"))


# ---------- DISTRICTS ----------
@app.route("/districts/<int:state_id>")
def get_districts(state_id):
    return jsonify(load_json(f"data/districts/{state_id}.json"))


# ---------- MANDALS (STATE LEVEL FILE) ----------
@app.route("/mandals/<int:state_id>")
def get_mandals(state_id):
    return jsonify(load_json(f"data/mandals/{state_id}.json"))


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
