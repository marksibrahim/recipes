from flask import Blueprint

# Blueprints define the routes the routes of the app, without creating one
    # this way you can separate app creation and bind blueprints to many apps!
    # there's a register blueprints method on the app object
bp = Blueprint("my_app", __name__)


@bp.route('/')
def hello_world():
    return "Hello"


@bp.route('/db_get')
def get_db():
    return "Hello"
