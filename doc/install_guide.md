# Install guide

This documentation is based on the work of [oscar6echo](https://gitlab.com/oscar6echo/jupyter-widget-d3-slider/blob/master/README.md) who has contributed heavily to this project.

## Installation

To install use pip and npm:

    $ git clone https://github.com/ocoudray/jupyter-drawing-pad.git
    $ cd jupyter-drawing-pad/js
    $ npm install
    $ cd ..
    $ pip install .
    $ jupyter nbextension enable --py --sys-prefix jupyter_drawing_pad


For a development installation:

    $ git clone https://github.com/ocoudray/jupyter-drawing-pad.git
    $ cd jupyter-drawing-pad/js
    $ npm install
    $ cd ..
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix jupyter_drawing_pad
    $ jupyter nbextension enable --py --sys-prefix jupyter_drawing_pad

## 2 - Paths

All the paths directly from a macOS system (with [Anaconda](https://www.anaconda.com/what-is-anaconda/) installed with [brew](https://brew.sh/)) where sys.prefix = `/usr/local/anaconda3`.  
It should be relatively easy to translate in other systems.  


To check where jupyter install extensions:

    $ jupyter --paths
    config:
        /Users/Olivier/.jupyter
        /usr/local/anaconda3/etc/jupyter
        /usr/local/etc/jupyter
        /etc/jupyter
    data:
        /Users/Olivier/Library/Jupyter
        /usr/local/anaconda3/share/jupyter
        /usr/local/share/jupyter
        /usr/share/jupyter
    runtime:
        /Users/Olivier/Library/Jupyter/runtime

The flag `--sys-prefix` means extension are installed in this data folder:

    /usr/local/anaconda3/share/jupyter

There you can see a `jupyter_drawing_pad` folder or symlink back to the source folder `static/`.  
For example:

    drwxr-xr-x  4 Olivier  staff   136B Sep 30 18:09 jupyter-js-widgets/
    drwxr-xr-x  5 Olivier  staff   170B Oct  3 02:42 jupyter_drawing_pad/

To check nbextensions are properly install and enabled, for example:

    $ jupyter nbextension list
    Known nbextensions:
    config dir: /Users/Olivier/.jupyter/nbconfig
        notebook section
        codefolding/main  enabled 
        - Validating: OK
        comment-uncomment/main  enabled 
        - Validating: OK
        default_style/main  enabled 
        - Validating: OK
    config dir: /usr/local/anaconda3/etc/jupyter/nbconfig
        notebook section
        jupyter-js-widgets/extension  enabled 
        - Validating: OK
        jupyter_drawing_pad/extension  enabled 
        - Validating: OK


## 3 - Commands

### 3.1 - `npm install`

It is run from folder `js/` which contains the js+css **source code**.  
It performs the following:
+ Download the node modules mentioned in fields `dependencies` and `devDependencies` in npm config file `package.json`.
+ Run `webpack` according to config file `webpack.config.js`

The first step is the `npm install` command per se.  
The second is the `prepare` command as defined in `package.json`. And `npm prepare` is automatically executed after npm install as explained in the [official doc](https://docs.npmjs.com/misc/scripts).

The result is the creation of folders `js/dist` and `jupyter_drawing_pad/static` containing compiled javascript from source code in folder `js/`.

### 3.2 - `pip install`

The full command is:
```bash
# regular install from folder containing setup.py
$ pip install .

# dev install from folder containing setup.py
$ pip install -e .
```

This command must be run **AFTER** the folder `static/` was created.

It is a standard `pip install` command:
+ The source files and egg-info are copied to `/usr/local/anaconda3/lib/python3.6/site-packages`
+ The files in folder `static/` are copied to `share/jupyter/nbextensions/jupyter_drawing_pad`
+ Note that for a **dev install**:
    + An `egg-link` file links back to the source folder
    + No file is copied to the folder `nbextensions/jupyter_drawing_pad`
    + Thanks to the `--symlink` you just need to restart the kernel to take into account any modification in the Python code

### 3.3 - `jupyter nbextension (install|uninstall)`

The full command is:
```bash
$ jupyter nbextension (install|uninstall) --py [--symlink] --sys-prefix jupyter_drawing_pad
```

It copies [create symlinks] resp. removes `static/` files to resp. from the nbextension data folder `share/jupyter/nbextensions/jupyter_drawing_pad` and adds resp. removes lines in config file `notebook.json` in config directory `/usr/local/anaconda3/etc/jupyter`.

The config file `notebook.json` contains the following:

    {
        "load_extensions": {
            "jupyter-js-widgets/extension": true,
            "jupyter_drawing_pad/extension": true
        }
    }


### 3.4 - `jupyter nbextension (enable|disable)`

The full command is:
```bash
$ jupyter nbextension (enable|disable) --py --sys-prefix jupyter_drawing_pad
```

It sets to true resp. false the `jupyter_drawing_pad/extension` line in config file `notebook.json` in config directory `/usr/local/anaconda3/etc/jupyter`.

### 3.5 - `npm run prepare`

The full command is:
```bash
# from folder js/
$ npm run prepare
```
It is a script (which simply calls `webpack`) in npm config file `package.json`.  

In an active dev activity (in the folder `js/`) substitute `npm install` by `npm run prepare` as there is no need to reload node_modules from the internet or even to get them from the local npm cache (located in `~/.npm`)

This re-compile the source js folder into `static/`. The symlinks bring back from `share/jupyter/nbextensions/jupyter_drawing_pad` to `js/static/`. So just reload the notebook. The new js is available instantly !

### 3.6 - `npm run watch`

To automate the build (i.e. running webpack) process start `npm run watch`.  
It will run in the background and trigger `npm run prepare` each time any change occurs in the `js/lib/` folder.  

## 4 - Publish on PyPI 

In order to publish a first version of your widget on PyPI:
+ Create an account on [PyPI](https://pypi.python.org/pypi?%3Aaction=register_form)
+ `pip install twine` (if not already installed)
+ `python setup.py sdist`
+ `twine upload dist/*`

To upload a new version of your widget:
+ change version in `jupyter_drawing_pad/_version.py`
+ delete `dist`
+ `python setup.py sdist`
+ `twine upload dist/*`

The full documentation can be found [here](https://packaging.python.org/tutorials/distributing-packages/)