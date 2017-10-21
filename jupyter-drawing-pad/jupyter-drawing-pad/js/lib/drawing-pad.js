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
	
	var mouse = {x: 0, y: 0};
	window.that = that;


	
	/* Mouse Capturing Work */
	canvas.addEventListener('mousemove', function(e) {
		var rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
	  }, false);
	
	/* Drawing on Paint App */
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	
	ctx.strokeStyle = "red";
	function getColor(colour){ctx.strokeStyle = colour;}
	
	function getSize(size){ctx.lineWidth = size;}
	
	var x_tab = [];
	var y_tab = [];
	console.log("x : ")
	console.log(x_tab);
	console.log("y : ")
	console.log(y_tab);
	//ctx.strokeStyle = 
	//ctx.strokeStyle = document.settings.colour[1].value;
	 
	canvas.addEventListener('mousedown', function(e) {
		ctx.beginPath();
		ctx.moveTo(mouse.x, mouse.y);
		canvas.addEventListener('mousemove', onPaint, false);
	}, false);
	 
	canvas.addEventListener('mouseup', function() {
		canvas.removeEventListener('mousemove', onPaint, false);
	}, false);
	 
	var onPaint = function() {
		console.log("Painting");
		ctx.lineTo(mouse.x, mouse.y);
		x_tab.push(mouse.x);
		y_tab.push(mouse.y);
		ctx.stroke();
	};
};



var slider = {
	create: create
};

module.exports = slider;

