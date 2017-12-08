from flask import Blueprint

bp = Blueprint("module_one", __name__)

@bp.route('/')
def hello_world():
    return 'Hello, World!'
