/**
 * @author Lush Concepts
 */
$(document).ready(function() {
	
	var canvas = $('#can');
	var context = $("#can")[0].getContext('2d');
	
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	 
	// requestAnimationFrame polyfill by Erik Möller
	// fixes from Paul Irish and Tino Zijdel
	 
	(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
	                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
	 
	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	 
	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());

	var fps = 24;
	
	var drawing;
	//drawing = setInterval( function() { draw(); },1000 / fps);
	
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
	
	var mouseX;
	var mouseY;
	
	var centerX = 400;
	var centerY = 175;
	var radius = 100;
	var sRadius = 5;
	
	var blackX = centerX;
	var blackY = centerY - radius;
	var trail = 50;
	var mover = 0;
	
	var planets = 5;
	var followers = 20;
	var dropoffsize = sRadius / followers;
	var dropoffcolour = Math.round(255 / followers);
	console.log(dropoffcolour);
	
	mouseX = centerX;
	mouseY = centerY;
	
	var orbit = 0.5;
	var trail = orbit;
	
	canvas.mousemove(function(e) {
		mouseX = e.pageX - this.offsetLeft;
		mouseY = e.pageY - this.offsetTop;
	});
	
	$(document).on("touchstart","#can",function(e) {
		e.preventDefault();
		mouseX = event.touches[0].pageX;
		mouseY = event.touches[0].pageY;
	});
	$(document).on("touchmove","#can",function(e) {
		e.preventDefault();
		mouseX = event.touches[0].pageX;
		mouseY = event.touches[0].pageY;
	})
	$(document).on("touchend","#can",function(e) {
		e.preventDefault();
	})
	
	//console.log(canvas.attr('width'));
	
	function draw() {
		
		context.clearRect(0, 0, canvas.attr('width'), canvas.attr('height'));
		
		/* 
		// VISIBLE ORBIT
		context.beginPath();
		context.arc(mouseX,mouseY,radius,0,Math.PI*2,true);
		context.closePath();
		context.strokeStyle = "rgb(128,128,128)";
		context.stroke();
		*/
		
		for (i=0;i<planets;i++) {
			
			/*
			// ORIGINAL ORBITER
			var x = mouseX + radius * Math.cos(2 * Math.PI * (i+orbit) / planets);
			var y = mouseY + radius * Math.sin(2 * Math.PI * (i+orbit) / planets);
			
			context.beginPath();
			context.arc(x,y,sRadius,0,Math.PI*2,true);
			context.closePath();
			context.fillStyle = "rgb(255,255,255)";
			context.fill();
			*/
			
			for (j=0;j<followers;j++) {
				
				//console.log("j ", j);
				
				var xt = mouseX + radius * Math.cos(2 * Math.PI * (i+(orbit+0.025*(j+1))) / planets);
				var yt = mouseY + radius * Math.sin(2 * Math.PI * (i+(orbit+0.025*(j+1))) / planets);
				
				context.beginPath();
				context.arc(xt,yt,sRadius-dropoffsize*(followers-j),0,Math.PI*2,true);
				context.closePath();
				
				
				var colour = 'rgb(' + (0+(j+1)*dropoffcolour) + ',' + (0+(j+1)*dropoffcolour) + ',' + (0+(j+1)*dropoffcolour) + ')';
				//console.log(colour);
				context.fillStyle = colour;
				context.fill();
				
				//trail-=0.05
				/*
				context.strokeStyle = "rgb(128,128,128)";
				context.stroke();
				*/
			}
			
			
			
		}
		orbit+=0.025;
		radius-=0.5;
		
		window.requestAnimationFrame(draw);
	}
	
	draw();
});
