"""
Describes code as a package that pip can install
"""

from setuptools import setup, find_packages

setup(
    # does not impact import name
    name='python-mother-dough' 
    packages=find_packages(exclude=('tests', 'docs')),
)
