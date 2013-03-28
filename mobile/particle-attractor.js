
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
	var count = 300;
	var p = [];
	
	xt = 200;
	yt = 200;
	
	console.log(touches);
	console.log((10-20)/5);
	console.log(Math.sqrt(Math.pow(Math.abs(-2),2) + Math.pow(Math.abs(-3),2)));
	
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
		console.log(touches);
		console.log(touches.length)
	});

	// Particle object
	function Particle(radius,xp,yp,rgb,s) {
		
		this.size = radius;
		this.x = xp;
		this.y = yp;
		this.colour = rgb;
		this.speed = s;
		this.xtarget = this.x;
		this.ytarget = this.y;
		this.distance = 0;
		this.distances = [];
		
		function move() {
			/*
			// if there's a touch!
			if (touching == true) {
			// now you need to find out what touch you are closest to!
				var xn, yn;
				for (var i=0,touch;touch=touches[i];i++) {
					var hyp = Math.sqrt(Math.pow(Math.abs(this.x - touch.pageX),2) + Math.pow(Math.abs(this.y - touch.pageY),2));
					var sum = Math.abs(this.x - touch.pageX) + Math.abs(this.y - touch.pageY);
					if (hyp < this.distance) {
					//if (sum > this.distance) {
						//this.distance = hyp;
						this.xtarget = touch.pageX;
						this.ytarget = touch.pageY;
					}
				}
				//this.xtarget = xn;
				//this.ytarget = yn;
			}
			
			for (var i=0,touch;touch=touches[i];i++) {
				var hyp = Math.sqrt(Math.pow(Math.abs(this.x - touch.pageX),2) + Math.pow(Math.abs(this.y - touch.pageY),2));
				if (hyp > this.distance) {
					this.distance = hyp;
					this.xtarget = touch.pageX;
					this.ytarget = touch.pageY;
				}
			}
			*/
			if (touching == true) {
				this.xtarget = touches[0].pageX;
				this.ytarget = touches[0].pageY;
			}
			
			this.x = this.x - (this.x - this.xtarget)/this.speed;
			this.y = this.y - (this.y - this.ytarget)/this.speed;
			
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.size,0,Math.PI*2,true);
			ctx.closePath();
			ctx.fillStyle = this.colour;
			ctx.fill();
		}
		
		this.move = move;
		
		p.push(this);
		
	}
	
	// Touchend burst
	function newTarget() {
		
		for (var i=0,part;part=p[i];i++) {
			
			part.xtarget = Math.floor(Math.random() * ($('canvas').width()*3)) - $('canvas').width();
			part.ytarget = Math.floor(Math.random() * ($('canvas').height()*3)) - $('canvas').height();
			
		}
		
	}
	
	// initial particle creation and positioning
	function init() {
		
		for (var i=0;i<count;i++) {
			var xr = Math.floor(Math.random() * ($('canvas').width()*3)) - $('canvas').width();
			var yr = Math.floor(Math.random() * ($('canvas').height()*3)) - $('canvas').height();
			var spd = Math.random() * (300 - 50) + 50;
			var alpha = 50 / spd;
			var rgba = 'rgba(255,255,255,' + alpha + ')';
			p[i] = new Particle(2,xr,yr,rgba,spd);
			
			//console.log((p[i].x - xt),(p[i].y - yt));
		}
		
		update();
		
	}
	
	// drawing function
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
