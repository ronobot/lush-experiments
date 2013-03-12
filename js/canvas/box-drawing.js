/**
 * @author Lush Concepts
 */
$(document).ready(function() {
	//
	var canvas = $('#can');
	var context = $("#can")[0].getContext('2d');
	//
	var drawing;
	//drawing = setInterval( function() { draw(); },60);
	canvas.mouseover(function(e) {
		drawing = setInterval( function() { draw(); }, 60)
	});
	canvas.mouseout(function(e) {
		clearInterval(drawing);
	});
	//
	var action = false;
	var startX;
	var startY;
	//
	canvas.mousedown(function(e) {
		action = true;
		console.log("mousing down!", action)
		canvas.css('cursor','crosshair')
		startX = e.pageX - this.offsetLeft;
		startY = e.pageY - this.offsetTop;
		
	})
	canvas.mouseup(function(e) {
		action = false;
		console.log("mousing up!", action)
		canvas.css('cursor','default')
		canvas.unbind('mousemove');
		
		//
		//context.clearRect(0, 0, canvas.attr('width'), canvas.attr('height'));
		//
	})
	//
	function draw() {
		//console.log("DRARWING")
		if (action == true) {
			context.restore();
			//console.log("actioning!")
			canvas.mousemove(function(e) {
				
		  		//console.log(e.pageX, e.pageY);
		  		var newW = (e.pageX - this.offsetLeft) - startX;
		  		var newH = (e.pageY - this.offsetTop) - startY;
		  		context.clearRect(0, 0, canvas.attr('width'), canvas.attr('height'));
			  	context.strokeRect(startX, startY, newW,newH);
			  	context.strokeStyle = 'black';
			  	//
			  	context.stroke();
			  	
  			});
  			context.save();
		}
	}
	//
});
