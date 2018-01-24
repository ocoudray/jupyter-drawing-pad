from .example import *
from .widget import *

from .__meta__ import __version__

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyter-drawing-pad',
        'require': 'jupyter-drawing-pad/extension'
    }]
