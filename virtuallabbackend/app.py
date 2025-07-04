from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from simulation import simulate_reaction
from user_management import add_user, get_user, add_assignment, get_assignments_for_student, get_assignments_for_teacher, update_assignment_result
import os
import uuid

app = Flask(__name__)
CORS(app)

FRONTEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../Virtual Chemistry Lab'))

@app.route('/')
def serve_index():
    return send_from_directory(FRONTEND_DIR, 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(FRONTEND_DIR, filename)

@app.route('/reactions', methods=['GET'])
def get_reactions():
    from simulation import reactions_data
    # Only return reactants and products for listing
    reactions_list = [
        {
            "reactants": r["reactants"],
            "products": r["products"],
            "reactionType": r["reactionType"]
        } for r in reactions_data
    ]
    return jsonify(reactions_list)

@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.get_json()
    if not data or "reactants" not in data:
        return jsonify({"error": "Missing reactants in request"}), 400
    reactants = data.get("reactants", [])
    result = simulate_reaction(reactants)
    if "error" in result:
        return jsonify(result), 404
    return jsonify(result)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or 'email' not in data or 'role' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    if get_user(data['email']):
        return jsonify({'error': 'User already exists'}), 400
    add_user(data)
    return jsonify({'success': True})

@app.route('/assign_experiment', methods=['POST'])
def assign_experiment():
    data = request.get_json()
    # teacher_email, student_email, experiment (dict)
    if not all(k in data for k in ('teacher_email', 'student_email', 'experiment')):
        return jsonify({'error': 'Missing fields'}), 400
    assignment = {
        'id': str(uuid.uuid4()),
        'teacher_email': data['teacher_email'],
        'student_email': data['student_email'],
        'experiment': data['experiment'],
        'result': None
    }
    add_assignment(assignment)
    return jsonify({'success': True})

@app.route('/student_assignments', methods=['POST'])
def student_assignments():
    data = request.get_json()
    if 'student_email' not in data:
        return jsonify({'error': 'Missing student_email'}), 400
    return jsonify(get_assignments_for_student(data['student_email']))

@app.route('/teacher_assignments', methods=['POST'])
def teacher_assignments():
    data = request.get_json()
    if 'teacher_email' not in data:
        return jsonify({'error': 'Missing teacher_email'}), 400
    return jsonify(get_assignments_for_teacher(data['teacher_email']))

@app.route('/evaluate_assignment', methods=['POST'])
def evaluate_assignment():
    data = request.get_json()
    if not all(k in data for k in ('assignment_id', 'result')):
        return jsonify({'error': 'Missing fields'}), 400
    update_assignment_result(data['assignment_id'], data['result'])
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)