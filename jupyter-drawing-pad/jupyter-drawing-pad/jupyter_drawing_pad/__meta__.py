
def _get_version(version_info):
    dic = {'alpha': 'a',
           'beta': 'b',
           'candidate': 'rc',
           'final': ''}
    vi = version_info
    specifier = '' if vi[3] == 'final' else dic[vi[3]] + str(vi[4])
    version = '%s.%s.%s%s' % (vi[0], vi[1], vi[2], specifier)
    return version

########################################@
# meta data

__name__ = 'widget_d3_slider'

version_info = (0, 1, 0, 'alpha', 0)
__version__ = _get_version(version_info)

__description__ = 'd3 based slider Jupyter Widget - for demo'
__long_description__ = 'See repo README'
__author__ = 'oscar6echo'
__author_email__ = 'olivier.borderies@sgcib.com'
__url__ = 'https://gitlab.com/oscar6echo/' + __name__
__download_url__ = 'https://gitlab.com/oscar6echo/' + \
    __name__ + '/repository/archive.tar.gz?ref=' + __version__
__keywords__ = ['jupyter-widget', 'd3']
__license__ = 'MIT'
__classifiers__ = ['Development Status :: 4 - Beta',
                   'License :: OSI Approved :: MIT License',
                   'Programming Language :: Python :: 3.5',
                   'Programming Language :: Python :: 3.6'
                   ]
__include_package_data__ = True
__data_files__ = [
    ('share/jupyter/nbextensions/jupyter-drawing-pad', [
        'widget_d3_slider/static/extension.js',
        'widget_d3_slider/static/index.js',
        'widget_d3_slider/static/index.js.map',
    ]),
]
__install_requires__ = ['ipywidgets>=7.0.0']
__zip_safe__ = False
