import app
import pytest


@pytest.fixture(scope='session')
def test_app():
    """Returns a Flask app for testing"""
    app.app.testing = True
    an_app = app.app.test_client()
    app.db.create_all()
    yield an_app


def test_hello(test_app):
    result = test_app.get('/')
    assert b"Hello" in result.data


def test_print_users(test_app):
    result = test_app.get('/print_users')
    assert b"{}" in result.data


