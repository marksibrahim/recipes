import os

class Config:
    """Default configs"""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = "sqlite:/"


class DevConfig(Config):
    DEBUG = True
    MY_SECRET = "banana"


class ProdConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")


# dictionary used to export settings
app_config = {
        "development": DevConfig,
        "production": ProdConfig,
        }
