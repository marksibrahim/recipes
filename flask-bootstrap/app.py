from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.username

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/add_user')
def add_user():
    guest = User('guest', 'guest@example.com')
    db.session.add(guest)
    db.session.commit()
    return 'added guest'

@app.route('/print_users')
def print_users():
    users = User.query.all()
    users_dict = {}
    for user in users:
        users_dict[str(user)] = True
    return jsonify(users_dict)

if __name__ == "__main__":
    db.create_all()
    app.run()
