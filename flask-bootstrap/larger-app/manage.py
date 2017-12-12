"""
Exposes migration commands via cli
    >>> python manage.py db init
    >>> python manage.py db migrate
"""

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from application import db, create_app

# initialize app
app = create_app()

migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == "__main__":
    manager.run()
