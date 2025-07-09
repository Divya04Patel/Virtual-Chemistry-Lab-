from flask import Flask, request, jsonify, send_from_directory, render_template
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
    return send_from_directory(FRONTEND_DIR, 'templates/index.html')

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

@app.route('/experiments', methods=['GET'])
def get_experiments():
    # This should return the list of experiments
    return jsonify([
        {"id": 1, "name": "Experiment 1", "description": "Description of Experiment 1"},
        {"id": 2, "name": "Experiment 2", "description": "Description of Experiment 2"},
        # Add more experiments as needed
    ])

experiments_by_class = {
    9: [
        {"id": 1, "title": "Separation of Mixtures", "description": "Learn to separate mixtures."},
        {"id": 2, "title": "Physical and Chemical Changes", "description": "Observe different changes."}
    ],
    10: [
        {"id": 3, "title": "Acids, Bases and Salts", "description": "Explore acid-base reactions."},
        {"id": 4, "title": "Metals and Non-metals", "description": "Study properties of metals."}
    ],
    11: [
        {"id": 5, "title": "Titration", "description": "Perform titration experiments."},
        {"id": 6, "title": "Preparation of Solutions", "description": "Prepare chemical solutions."}
    ],
    12: [
        {"id": 7, "title": "Qualitative Analysis", "description": "Analyze unknown samples."},
        {"id": 8, "title": "Electrochemistry", "description": "Study electrochemical cells."}
    ]
}

@app.route('/experiments_for_class', methods=['POST'])
def experiments_for_class():
    data = request.get_json()
    class_num = int(data.get('class'))
    return jsonify(experiments_by_class.get(class_num, []))

@app.route('/lab')
def lab():
    return render_template('lab.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Handle form submission
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        print(f"Contact form submitted:\nName: {name}\nEmail: {email}\nMessage: {message}")

        return """<script>
                    alert('Thank you for contacting us!');
                    window.location.href = "/contact";
                  </script>"""
    # Show contact form
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)