# Mother Dough

A mother dough for baking the most delicious python project.
Inspired by [Kenneth's blog](https://www.kennethreitz.org/essays/repository-structure-and-python).

## Structure 

### project code
main code directories. See `motherdough` and `bread` directories.
* include `__init__.py` to allow importing (and specify in setup.py)

### tests
group tests together in a single directory. My preferred framework is [PyTest](https://docs.pytest.org/en/latest/), because it's succinct and easy to use.

### setup.py

Why bother? [setup.py](http://setuptools.readthedocs.io/en/latest/setuptools.html#basic-use) allows you to pip install your repo as a package so you can test and reuse code without relative paths. For example, 
`from motherdough import ferment` works anywhere (even in tests). To install your repo as a package, run:

```bash
pip install -e .
```
pip uses the setup.py file settings to install the package.

This sample setup.py uses `find_packages` to determine which packages can be imported and installs them. 



## Development Style Guide
A good set of [best practices](https://gist.github.com/sloria/7001839) to follow.

Good principles to keep in mind
> “A single responsibility for each class, method, or module” (unix philosophy)

>“Clean Architecture: decouple I/O from logic”—Brandon Rhodes


### Automatic Style Checks
* [PyCodestyle](https://github.com/PyCQA/pycodestyle): enforces PEP8, without being too picky.
* [PyLint](https://www.pylint.org/): covers much more than PEP8, but is absurdly picky out-of-the-box (not always with good reason).

* [PyFlakes](https://pypi.python.org/pypi/pyflakes): checks correctness without complaining about style or importing the code. 

Go with [Flake8](https://pypi.python.org/pypi/flake8), which runs both pycodestyle and pyflakes.

### Conventions
*How should I name directories and packages?*
 
[PEP8](https://www.python.org/dev/peps/pep-0008/#package-and-module-names) discourages the use of underscores in package names.
Although Guido in the [Google Style doc](https://google.github.io/styleguide/pyguide.html?showone=Naming#Naming) recommends underscores for longer names. In either case, packages should be lowercase.

*How should I format doc strings?*

I prefer [Google style doc strings](http://sphinxcontrib-napoleon.readthedocs.io/en/latest/example_google.html), which are human friendly and compatible with Sphinx for generating documentation.
The TensorFlow Python API is a good place to look for examples.

*How should I print variables in strings?*

[Perfer .format](https://zerokspot.com/weblog/2015/12/31/new-string-formatting-in-python/) over %s or string concatenation: `"hi {0}, {1}".format(var1, var2)`

