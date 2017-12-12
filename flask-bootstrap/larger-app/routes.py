"""
Defines routes
logic and database communication are left up to my_app/controller.py
"""

from flask import Blueprint
from my_app import controller

# Blueprints define the routes the routes of the app, without creating one
    # this way you can separate app creation and bind blueprints to many apps!
    # there's a register blueprints method on the app object
bp = Blueprint("my_app", __name__)


@bp.route('/')
def hello_world():
    return "Hello"


@bp.route('/db_get')
def get_db():
    result = controller.get_recipe()
    print(result)
    return str(result)
