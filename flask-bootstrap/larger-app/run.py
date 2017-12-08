import os
from app import create_app
from app.module_one import views

config_name = "development"
app = create_app(config_name)
app.register_blueprint(views.bp)

if __name__ == "__main__":
    app.run()
