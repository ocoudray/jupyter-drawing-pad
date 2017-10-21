var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');
var drawing_pad = require('./drawing-pad');


// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.


var DrawingModel = widgets.DOMWidgetModel.extend({
	defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
		_model_name: 'DrawingModel',
		_view_name: 'DrawingView',
		_model_module: 'jupyter-drawing-pad',
		_view_module: 'jupyter-drawing-pad',
		_model_module_version: '0.1.0',
		_view_module_version: '0.1.0',
		value: 'Hello World',
		data_x: [],
		data_y : []
	})
});


// Custom View. Renders the widget model.
var DrawingView = widgets.DOMWidgetView.extend({
	render: function () {
		this.value_changed();
		console.log("Creating html");
		this.sketch = document.createElement("div");
		this.canvas = document.createElement("canvas");
		this.canvas.setAttribute("class", "drawing-pad-paint");
		this.settings_colours = document.createElement("div");
		this.settings_colours.setAttribute("class", "drawing-pad-settings");
		this.settings_brush_size = document.createElement("div");	
		this.settings_brush_size.setAttribute("class", "drawing-pad-settings");	
		console.log("create")
		drawing_pad.create(this);

		this.sketch.appendChild(this.canvas);
		this.el.appendChild(this.sketch)
		this.el.appendChild(this.settings_colours);
		this.el.appendChild(this.settings_brush_size);

		this.model.on('change:value', this.value_changed, this);
	},

	value_changed: function () {
		this.el.textContent = this.model.get('value');
	}
});


module.exports = {
	DrawingModel: DrawingModel,
	DrawingView: DrawingView
};

