from flask import Flask
from flask import jsonify
from flask import Blueprint
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

# Blueprints define the routes the routes of the app, without creating one
    # this way you can separate app creation and bind blueprints to many apps!
    # there's a register blueprints method on the app object
bp = Blueprint("vim_labs", __name__)


def create_app(config=None):
    """
    Returns a Flask app bound to the sqlalchemy db

    Args:
        config (dict): override Flask app configs
    """
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config.update(config or {})
    db.init_app(app)
    return app


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.username


@bp.route('/')
def hello_world():
    return 'Hello, World!'


@bp.route('/add_user')
def add_user():
    """Adds guest user to db"""
    guest = User('guest', 'guest@example.com')
    db.session.add(guest)
    db.session.commit()
    return 'added guest'

@bp.route('/print_users')
def print_users():
    """Returns json of all users in db"""
    users = User.query.all()
    users_dict = {}
    for user in users:
        users_dict[str(user)] = True
    return jsonify(users_dict)

if __name__ == "__main__":
    app = create_app()
    app.register_blueprint(bp)
    db.create_all(app=app)
    app.run()
