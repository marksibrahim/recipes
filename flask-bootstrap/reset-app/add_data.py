"""
An example of using SQLAlchemy outside the Flask app
"""

from application import db, create_app, Recipe


app = create_app()

if __name__ == "__main__":
    # http://flask-sqlalchemy.pocoo.org/2.3/contexts/
    app.app_context().push()
    db.create_all()

    r = Recipe(name="hi")

    db.session.add(r)
    db.session.commit()
