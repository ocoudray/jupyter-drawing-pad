require("./style.css")

var create = function (that) {
	var canvas = that.canvas;
	var ctx = canvas.getContext('2d');
	window.ctx = ctx;
	window.canvas = canvas;
	 
	var sketch = that.sketch;
	var sketch_style = getComputedStyle(sketch);
	canvas.width = 500;
	canvas.height = 250;
	
	var mouse = {x: 0, y: 0, t:0};
	window.that = that;


	
	/* Mouse Capturing Work */
	canvas.addEventListener('mousemove', function(e) {
		var rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
		mouse.t = e.timeStamp;
	  }, false);
	
	/* Drawing on Paint App */
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	
	ctx.strokeStyle = "red";
	function getColor(colour){ctx.strokeStyle = colour;}
	
	function getSize(size){ctx.lineWidth = size;}
	
	//ctx.strokeStyle = 
	//ctx.strokeStyle = document.settings.colour[1].value;

	// Load lists
	var x = that.model.get("data_x");
	var y = that.model.get("data_y");
	var t = that.model.get("time");
	window.x = x;
	window.y = y;
	window.t = t;
	
	canvas.addEventListener('mousedown', function(e) {
		ctx.beginPath();
		ctx.moveTo(mouse.x, mouse.y);
		canvas.addEventListener('mousemove', onPaint, false);
	}, false);
	 
	canvas.addEventListener('mouseup', function() {
		canvas.removeEventListener('mousemove', onPaint, false);
		// Set new lists in widget model
		// Without line 56, changes can't be synchronized with python... strange... 
		that.model.set({"data_x":[x], "data_y":[y], "time":[t] });
		that.model.set({"data_x":x, "data_y":y, "time":t });
		// sync with python
		that.model.save_changes();
		console.log("Save changes")
	}, false);
	 
	var onPaint = function() {
		console.log("Painting");
		ctx.lineTo(mouse.x, mouse.y);
		// that.model.attributes["data_x"].push(mouse.x);
		x.push(mouse.x);
		y.push(mouse.y);
		t.push(mouse.t);
		ctx.stroke();
	};
};



var slider = {
	create: create
};

module.exports = slider;

