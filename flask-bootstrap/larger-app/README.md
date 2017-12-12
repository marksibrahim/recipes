# Start a New Project
1. define models in `models.py`
2. expose routes in `routes.py`
3. add integration tests in `application.py`

# Structure 
Aims to isolate concerns into models and views. The structure uses [blueprints](http://flask.pocoo.org/docs/0.12/blueprints/#blueprints) and the [app factory pattern](http://flask.pocoo.org/docs/0.12/patterns/appfactories/).

Inspired by
* [pattern in Flask docs](http://flask.pocoo.org/docs/0.12/patterns/packages/)

| | |
| ------------- | ------------- |
| `config.py` | contains configs for each environment |
| `application.py` | defines app factory and Flask app instance |
| `routes.py` | defines routes using blueprints |
| `manage.py` | handles database migrations such as a new column |
| `test_application.py` | integration tests using pytest fixtures |


| | |
| ------------- | ------------- |
| `add_data.py` | an example of how to insert data ad-hoc into the db (using same models) |


## Blueprints
Allow you to group views into components such as dashboard or admin. 
You can bind blueprints to many app instances.


# Flask-SQLAlchemy
Serializes sql data into Python objects defined by models.

## Decoupling App from Models
See `add_data.py` for an example of how to instantiate an app for ad-hoc use of models.

# Flask-Migrate
An extension for Flask that uses [Alembic](http://alembic.zzzcomputing.com/en/latest/) (developed by the author of SQLAlchemy), for database migrations.

## Manage.py
Handles database creation and migration using `Flask-Migrate`

Initiate DB Migration Folder
`$ python manage.py db init`

Migrate DB
1. stage changes
`$ python manage.py db migrate`
2. commit changes to DB
`$ python manage.py db upgrade`


