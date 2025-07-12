from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Use PyMySQL as the driver
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Saniya%40123@localhost:3306/virtual_chem_lab'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from flask import render_template, request, redirect

# Student Registration Route
@app.route('/register_student', methods=['GET', 'POST'])
def register_student():
    if request.method == 'POST':
        full_name = request.form['full_name']
        email = request.form['email']
        school_college = request.form['school_college']
        grade_class = request.form['grade_class']
        password = request.form['password']  # You can hash this for security

        # SQL INSERT using SQLAlchemy (if you have Student model)
        db.engine.execute(
            f"INSERT INTO students (full_name, email, school_college, grade_class, password_hash) "
            f"VALUES ('{full_name}', '{email}', '{school_college}', '{grade_class}', '{password}')"
        )
        return redirect('/student_dashboard')

    return render_template('register_student.html')
@app.route('/register_teacher', methods=['GET', 'POST'])
def register_teacher():
    if request.method == 'POST':
        full_name = request.form['full_name']
        email = request.form['email']
        institution_name = request.form['institution_name']
        subject_specialization = request.form['subject_specialization']
        password = request.form['password']

        db.engine.execute(
            f"INSERT INTO teachers (full_name, email, institution_name, subject_specialization, password_hash) "
            f"VALUES ('{full_name}', '{email}', '{institution_name}', '{subject_specialization}', '{password}')"
        )
        return redirect('/teacher_dashboard')

    return render_template('register_teacher.html')


if __name__ == '__main__':
    app.run(debug=True)