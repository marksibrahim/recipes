# Start a New Project
1. define models in `models.py`
2. define app logic in `controllers.py`
3. expose routes in `routes.py`
4. add integration tests in `test_application.py`

# Structure 
Aims to isolate concerns into models and views. The structure uses [blueprints](http://flask.pocoo.org/docs/0.12/blueprints/#blueprints) and the [app factory pattern](http://flask.pocoo.org/docs/0.12/patterns/appfactories/).

Inspired by [pattern in Flask docs](http://flask.pocoo.org/docs/0.12/patterns/packages/).

| | |
| ------------- | ------------- |
| `my_app/models.py` | defines SQLAlchemy models |
| `my_app/controller.py` | defines app logic |
| `test_application.py` | integration tests using pytest fixtures |
| `config.py` | contains configs for each environment |
| `routes.py` | defines routes using blueprints |
| `manage.py` | handles database migrations such as a new column |
| `application.py` | defines app factory and Flask app instance |


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


