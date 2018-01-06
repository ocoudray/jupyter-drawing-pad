# jupyter-drawing-pad

[![Binder](https://mybinder.org/badge.svg)](https://mybinder.org/v2/gh/PierreMarion23/jupyter-widget-drawing-pad-binder/master)

## 1 - Overview

This is a simple widget inspired by a drawing pad (see [this example](https://codepen.io/anon/pen/aLYeNB)). Thanks to this widget, you can draw in a box whatever you want (for instance a signature). The coordinates of the points of the trajectory is synchronised with the Python kernel.

You'll find some additional functionalities :
+ a `Save` button with a text field in order to save your signature along with your name
+ a `Clear` button to clear what is drawn in the box
+ a `Login` button : by entering your name (after having saved a signature for this name) and drawing your signature, a message `Welcome (name)` should appear (if the signature is close enough to the saved one)

When you try to login, the comparison between the signature to the registered one takes into account not only the spatial coordinates but also time.

To get a feel of the result check out the [demo notebook](https://github.com/ocoudray/jupyter-drawing-pad/blob/master/Example/Demo_drawing_pad.ipynb).


## 2 - Installation

An ipywidget is a Python package with some associated javascript files.
As such the installation requires 2 step:

    $ pip install jupyter_widget_pivot_table
    $ jupyter nbextension enable --py --sys-prefix jupyter_widget_pivot_table

For more info, see the [Install Guide](https://github.com/ocoudray/jupyter-drawing-pad/blob/master/doc/install_guide.md).


