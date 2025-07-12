import json
import os

USERS_FILE = os.path.join(os.path.dirname(__file__), 'users.json')
ASSIGNMENTS_FILE = os.path.join(os.path.dirname(__file__), 'assignments.json')

# Helper functions for user and assignment management

def load_json(path):
    if not os.path.exists(path):
        return []
    with open(path, 'r') as f:
        return json.load(f)

def save_json(path, data):
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)

def add_user(user):
    users = load_json(USERS_FILE)
    users.append(user)
    save_json(USERS_FILE, users)

def get_user(email):
    users = load_json(USERS_FILE)
    for user in users:
        if user['email'] == email:
            return user
    return None

def add_assignment(assignment):
    assignments = load_json(ASSIGNMENTS_FILE)
    assignments.append(assignment)
    save_json(ASSIGNMENTS_FILE, assignments)

def get_assignments_for_student(student_email):
    assignments = load_json(ASSIGNMENTS_FILE)
    return [a for a in assignments if a['student_email'] == student_email]

def get_assignments_for_teacher(teacher_email):
    assignments = load_json(ASSIGNMENTS_FILE)
    return [a for a in assignments if a['teacher_email'] == teacher_email]

def update_assignment_result(assignment_id, result):
    assignments = load_json(ASSIGNMENTS_FILE)
    for a in assignments:
        if a['id'] == assignment_id:
            a['result'] = result
    save_json(ASSIGNMENTS_FILE, assignments)
