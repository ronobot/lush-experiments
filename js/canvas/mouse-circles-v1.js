/**
 * @author Lush Concepts
 */
$(document).ready(function() {
	
	var canvas = $('#can');
	var context = $("#can")[0].getContext('2d');
	
	var drawing;
	var mouseX;
	var mouseY;
	
	drawing = setInterval( function() { draw(); },60);
	/*
	canvas.mouseover(function(e) {
		mouseX = e.pageX - this.offsetLeft;
		mouseY = e.pageY - this.offsetTop;
		drawing = setInterval( function() { draw(mouseX,mouseY); }, 60)
	});
	canvas.mouseout(function(e) {
		clearInterval(drawing);
	});
	*/
	
	var centerX = 400;
	var centerY = 175;
	var radius = 50;
	
	context.translate(centerX,centerY);
	
	var blackX = centerX;
	var blackY = centerY - radius;
	var trail = 50;
	var mover = 0;
	
	function draw() {
		console.log("drawing")
		
		context.clearRect(0, 0, canvas.attr('width'), canvas.attr('height'));
		
		context.translate(0,0)
		//context.translate(mx,my);
		/*
		canvas.mouseover(function(e) {
			mouseX = e.pageX - this.offsetLeft;
			mouseY = e.pageY - this.offsetTop;
			
			//drawing = setInterval( function() { draw(mouseX,mouseY); }, 60)
		});
		canvas.unbind('mousemove');
		*/
		//context.translate(342,47);
		
		//context.beginPath();
		//context.arc(0,0,radius,0,Math.PI*2,true);
		//context.closePath();
		//context.strokeStyle = "rgb(255,255,255)";
		//context.stroke();
		
		for (i=trail;i>0;i--) {
			
			console.log(trail, " trails", i, " eyes");
			context.beginPath();
			
			var newX = blackX+(trail-i);
			var newY = blackY+(trail-i);
			console.log(Math.PI)
			//
			context.rotate(Math.PI*2/(trail-3))
			//var newX;
			//var newY;
			//
			context.arc(radius,radius,5,0,Math.PI*2,true);
			
			context.closePath();
			var colour = 'rgb(' + (255-i*10) + ',' + (255-i*10) + ',' + (255-i*10) + ')';
			console.log(colour);
			context.fillStyle = colour;
			context.fill();
			
		}
		//blackX++;
		//blackY++;
		//trail++;
		mover++;
		
	}
});
