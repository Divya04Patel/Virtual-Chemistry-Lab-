from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Use your actual MySQL password here and escape '@' as '%40'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Saniya%40123@localhost:3306/virtual_chem_lab'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route('/')
def home():
    return "Virtual Chemistry Lab connected to MySQL!"

if __name__ == '__main__':
    app.run(debug=True)
