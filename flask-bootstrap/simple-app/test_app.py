import pytest
from app import create_app
from app import db
from app import bp


@pytest.fixture
def app(request):
    """
    Returns a Flask app for testing
    Following https://github.com/pallets/flask/blob/master/examples/flaskr/tests/test_flaskr.py
    """
    app = create_app({"TESTING": True})

    with app.app_context():
        db.init_app(app)
        db.create_all(app=app)
        app.register_blueprint(bp)
        yield app


@pytest.fixture
def client(request, app):
    a_client = app.test_client()
    return a_client


def test_hello(client):
    result = client.get('/')
    assert b"Hello" in result.data


def test_print_users(client):
    result = client.get('/print_users')
    assert b"{}" in result.data
