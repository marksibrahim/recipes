from flask import Flask
from routes import bp
from configs import app_config
from my_app.models import Recipe, db


def create_app(config_name):
    """
    Returns a Flask app bound to the sqlalchemy db
    Args:
        config (dict): override Flask app configs
    """
    app = Flask(__name__)
    app.config.from_object(app_config[config_name])
    app.register_blueprint(bp)
    db.init_app(app)
    return app


# production app for gunicorn. gunicorn expects an app object
app = create_app("production")


if __name__ == "__main__":
    # override production app for local development
    app = create_app("development")
    db.create_all(app=app)
    app.run()

