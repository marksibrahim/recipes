"""
contains application logic including db access
"""

from my_app.models import Recipe


def get_recipe():
    return Recipe.query.limit(1).all()

