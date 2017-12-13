# Simple App: Single Module
Keep most code in a single `app.py` file. 
* `html` templates go in a `templates` directory
* `css, js` files go in a `static` directory


# Large App: Package
Aims to isolate concerns into models, controllers for app logic, and routes for views. 

Incorporates
* Flask Blueprints for views
* Flask-SQLAlchemy
* Flask-Migrate (Alembic)

