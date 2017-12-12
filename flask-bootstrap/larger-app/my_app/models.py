from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Recipe(db.Model):
    """Recipe with a name """
    __tablename__ = 'recipes'

    name = Column(String, primary_key=True)
    deliciousness = Column(String)

    def __repr__(self):
        return "{}".format(self.name)
