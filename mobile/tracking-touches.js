
$(document).ready(function() {
	var can = $('canvas')[0];
	var ctx = $('canvas')[0].getContext('2d');
	
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
	
	$('canvas')[0].setAttribute('width',$(window).width());
	$('canvas')[0].setAttribute('height',$(window).height());
	
	var colourwidth = $('canvas').width() / 255;
	var colourheight = $('canvas').height() / 255;

 	var blocksize = 20;
 	var xdiv = $('canvas').width() / blocksize;
 	var ydiv = $('canvas').height() / blocksize;
 	console.log('divisions: ',xdiv,ydiv)

	var newcolour = "rgba(128,128,128,1)";
	
	var touching = false;
	var touches = new Array();
	
	var mx = new Array();
	var my = new Array();
	
	function setColour(fx,fy) {
		newcolour = "rgba(" + fx + "," + fy + ",128,1)"
	}
	
	document.ontouchstart = function(e){ e.preventDefault(); }
	document.ontouchmove = function(e){ e.preventDefault(); }
	document.ontouchend = function(e){ e.preventDefault(); }
	
	$(document).on("touchstart","canvas", function(e) {
		e.preventDefault();
		//touching = true;
		touches = event.touches;
		console.log(event.touches[0].identifier,touches[0].identifier)
	});
	$(document).on("touchmove","canvas", function(e) {
		e.preventDefault();
		touches = event.touches;
	});
	$(document).on("touchend","canvas", function(e) {
		e.preventDefault();
		//touching = false;
		touches = event.touches;
		console.log(event.touches.length);
	});
	$(document).on("mousedown","canvas",function(e) {
		e.preventDefault();
		//touching = true;
		setColour(e.pageX,e.pageY);
	})
	$(document).on("mousemove","canvas",function(e) {
		e.preventDefault();
		setColour(e.pageX,e.pageY);
	})
	$(document).on("mouseup","canvas",function(e) {
		//touching = false;
	});
	
	var followers = 2;
	var alphastep = 0.25;
	
	function fingerCross() {
		for (i=0;i<touches.length;i++) {
				
				//console.log(touches[i].pageX,touches[i].pageY);
				mx = touches[i].pageX;
				my = touches[i].pageY;
				
				var xloc = Math.floor(mx / blocksize);
				var yloc = Math.floor(my / blocksize);
				
								ctx.fillStyle = "rgba(255,255,255,0.75)";
				ctx.fillRect(xloc*blocksize,yloc*blocksize,blocksize,blocksize);
				
				for (j=0;j<followers;j++) {
					var xloc1 = xloc - (j+1);
					var xloc2 = xloc + (j+1);
					var yloc1 = yloc - (j+1);
					var yloc2 = yloc + (j+1);
					
					//console.log(xloc1,xloc,xloc2);
					
					ctx.fillStyle = "rgba(255,255,255," + (0.75 - (alphastep*(j+1))) + ")";
					ctx.fillRect(xloc1*blocksize,yloc*blocksize,blocksize,blocksize);
					ctx.fillRect(xloc2*blocksize,yloc*blocksize,blocksize,blocksize);
					
					ctx.fillRect(xloc*blocksize,yloc1*blocksize,blocksize,blocksize);
					ctx.fillRect(xloc*blocksize,yloc2*blocksize,blocksize,blocksize);
				}

				
			}
	}
	
	function draw() {
		
		ctx.clearRect(0, 0, $('canvas').width(), $('canvas').height());
		
		if (touches.length > 0) {
			var tlog = new String();
				for (i=0;i<touches.length;i++){
					tlog += touches[i].identifier + " ";
					tlog += touches[i].pageX + " ";
					tlog += touches[i].pageY + " ";
				}
			console.log(tlog);
			
			fingerCross();	
			
		}
		
		requestAnimationFrame(draw);
	}
	
	draw();
});