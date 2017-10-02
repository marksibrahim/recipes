# Mother Dough

A mother dough for baking the most delicious python project.
Inspired by [Kenneth's blog](https://www.kennethreitz.org/essays/repository-structure-and-python).

## Structure 

### project code: bread + motherdough
main code directories
* include `__init__.py` to allow importing (and specify in setup.py)

### tests
group tests together in a single directory. My preferred framework is [PyTest](https://docs.pytest.org/en/latest/), because it's succinct and easy to use.

### setup.py

Why bother? [setup.py](http://setuptools.readthedocs.io/en/latest/setuptools.html#basic-use) allows you to pip install your repo as a package so you can test and reuse code across your module without relative paths. For example, 
`from motherdough import ferment` works anywhere in your project (even tests). To install your repo as a package, run:

```bash
pip install -e .
```
pip uses the setup.py file settings to install the package.

This sample setup.py uses `find_packages` to determine which packages can be imported and installs them. 

*How should I name directories and packages?*
 
[PEP8](https://www.python.org/dev/peps/pep-0008/#package-and-module-names) discourages the use of underscores in package names.
Although Guido in the [Google Style doc](https://google.github.io/styleguide/pyguide.html?showone=Naming#Naming) recommends underscores for longer names. In either case, packages should be lowercase.


## Development Style Guide

A good set of [best practices](https://gist.github.com/sloria/7001839) to follow

### Automatic Style Checks
* [pycodestyle](https://github.com/PyCQA/pycodestyle): enforces PEP8, without being too picky.
* [pylint](https://www.pylint.org/): covers much more than PEP8, but is absurdly picky out-of-the-box (not always with good reason).
