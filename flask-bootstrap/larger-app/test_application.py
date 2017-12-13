import pytest
from application import create_app, db


@pytest.fixture
def app(request):
    """
    Returns a Flask app for testing
    Following https://github.com/pallets/flask/blob/master/examples/flaskr/tests/test_flaskr.py
    """
    app = create_app("development")

    with app.app_context():
        db.init_app(app)
        db.create_all(app=app)
        yield app


@pytest.fixture
def client(request, app):
    a_client = app.test_client()
    return a_client


def test_hello(client):
    result = client.get('/')
    assert b"Hello" in result.data
