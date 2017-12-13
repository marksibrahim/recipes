import os

class Config:
    """Base configs"""
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = "sqlite://"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
    # matches convention used by Heroku
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

class DevelopmentConfig(Config):
    DEBUG = True
    TEMPLATES_AUTO_RELOAD = True


# dictionary used to export settings
app_config = {
              "production": ProductionConfig,
              "development": DevelopmentConfig,
             }
