from flask import Flask, request, render_template, redirect
import sqlite3
from werkzeug.security import generate_password_hash

app = Flask(__name__)

def init_db():
    with sqlite3.connect("lab.db") as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT,
            email TEXT UNIQUE,
            school_college TEXT,
            grade_class TEXT,
            password_hash TEXT
        )''')
        conn.execute('''CREATE TABLE IF NOT EXISTS teachers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT,
            email TEXT UNIQUE,
            institution_name TEXT,
            subject_specialization TEXT,
            password_hash TEXT
        )''')

@app.route('/register_student', methods=['POST'])
def register_student():
    data = request.form
    pw_hash = generate_password_hash(data['password'])

    with sqlite3.connect("lab.db") as conn:
        conn.execute("INSERT INTO students (full_name, email, school_college, grade_class, password_hash) VALUES (?, ?, ?, ?, ?)",
                     (data['full_name'], data['email'], data['school'], data['grade'], pw_hash))
    return redirect('/success')

@app.route('/register_teacher', methods=['POST'])
def register_teacher():
    data = request.form
    pw_hash = generate_password_hash(data['password'])

    with sqlite3.connect("lab.db") as conn:
        conn.execute("INSERT INTO teachers (full_name, email, institution_name, subject_specialization, password_hash) VALUES (?, ?, ?, ?, ?)",
                     (data['full_name'], data['email'], data['institution'], data['subject'], pw_hash))
    return redirect('/success')

@app.route('/success')
def success():
    return "Registration Successful!"

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
