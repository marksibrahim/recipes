from flask import Flask, render_template, request
from routes import bp
from models import Recipe, db


def create_app(config=None):
    """
    Returns a Flask app bound to the sqlalchemy db
    Args:
        config (dict): override Flask app configs
    """
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///foo.db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config.update(config or {})
    app.register_blueprint(bp)
    db.init_app(app)
    return app



# gunicorn expects an app object
app = create_app()


if __name__ == "__main__":
    db.create_all(app=app)
    app.run()

