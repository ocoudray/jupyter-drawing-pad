from .__meta__ import version_info, __version__

from .example import *

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyter-drawing-pad',
        'require': 'jupyter-drawing-pad/extension'
    }]