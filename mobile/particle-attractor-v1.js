
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
	
	// set canvas size to window size
	$('canvas')[0].setAttribute('width',$(window).width());
	$('canvas')[0].setAttribute('height',$(window).height());
	
	/** PARTICLE ATTRACTOR **/
	
	var touches = [];
	var touching = false;
	var xt, yt;
	var count = 50;
	var p = [];
	
	xt = 200;
	yt = 200;
	
	console.log((10-20)/5);
	
	// input sources
	document.ontouchstart = function(e){ e.preventDefault(); }
	document.ontouchmove = function(e){ e.preventDefault(); }
	document.ontouchend = function(e){ e.preventDefault(); }
	$(document).on("touchstart","canvas", function(e) {
		e.preventDefault();
		touching = true;
		touches = event.touches;
	});
	$(document).on("touchmove","canvas", function(e) {
		e.preventDefault();
		touches = event.touches;
	});
	$(document).on("touchend","canvas", function(e) {
		e.preventDefault();
		touching = false;
		touches = event.touches;
		newTarget();
	});

	function Particle(radius,xp,yp,rgb) {
		
		this.size = radius;
		this.x = xp;
		this.y = yp;
		this.colour = rgb;
		this.xtarget = xt;
		this.ytarget = yt;
		
		function move() {
			
			if (touching == true) {
				this.xtarget = touches[0].pageX;
				this.ytarget = touches[0].pageY;
			}
			
			this.x = this.x - (this.x - this.xtarget)/150;
			this.y = this.y - (this.y - this.ytarget)/150;
			
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.size,0,Math.PI*2,true);
			ctx.closePath();
			ctx.fillStyle = this.colour;
			ctx.fill();
		}
		
		this.move = move;
		
		p.push(this);
		
	}
	
	function newTarget() {
		
		for (var i=0,part;part=p[i];i++) {
			
			part.xtarget = Math.floor(Math.random() * $('canvas').width());
			part.ytarget = Math.floor(Math.random() * $('canvas').height());
			
		}
		
	}
	
	function init() {
		
		for (var i=0;i<count;i++) {
			var xr = Math.floor(Math.random() * $('canvas').width());
			var yr = Math.floor(Math.random() * $('canvas').height());		
			p[i] = new Particle(2,xr,yr,'rgb(191,191,191)');
			
			console.log((p[i].x - xt),(p[i].y - yt));
		}
		
		update();
		
	}
	
	function update() {
		
		ctx.clearRect(0, 0, $('canvas').width(), $('canvas').height());
		
		if (touches.length > 0) {
			xt = touches[0].pageX;
			yt = touches[0].pageY;			
		}

		for (var i=0;i<p.length;i++) {
			p[i].move();
		}
		
		requestAnimationFrame(update);
	}
	init();
});
