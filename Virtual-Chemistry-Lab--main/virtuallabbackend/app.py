from flask import Flask, request, jsonify
from flask_cors import CORS
from simulation import simulate_reaction
from user_management import (
    add_user, get_user, add_assignment,
    get_assignments_for_student,
    get_assignments_for_teacher,
    update_assignment_result
)
import uuid

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Virtual Chemistry Lab Backend Running"

@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.get_json()
    if not data or "reactants" not in data:
        return jsonify({"error": "Missing reactants"}), 400
    return jsonify(simulate_reaction(data["reactants"]))

# (keep your API routes)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
