# Start a New Project

1. Define routes in `view.py`
2. Add database models to `models.py`
3. Add logic to `controllers.py`

# Structure 

Based on larger app [pattern in Flask docs](http://flask.pocoo.org/docs/0.12/patterns/packages/). Digital Ocean also has a nice [article](https://www.digitalocean.com/community/tutorials/how-to-structure-large-flask-applications).

| `run.py` | creates app instances and runs server |
| `config.py` | contains configs for each environment |
| `app/__init__.py` | defines app factory for generating a Flask app instance |

## Blueprints

Allow you to group views into components such as dashboard or admin. 
You can bind blueprints to many app instances.

## Manage.py
Handles database creation and migration using `Flask-Migrate`

Initiate DB
`$ python manage.py db init`

Migrate DB
1. stage changes
`$ python manage.py db migrate`
2. commit changes to DB
`$ python manage.py db upgrade`

This generates a versions folder used for the migration.

# Flask-SQLAlchemy
Serializes sql data into Python objects defined by models.

# Flask-Migrate

Alembic
