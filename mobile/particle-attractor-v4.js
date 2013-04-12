
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
	
	var w = $('canvas').width();
	var h = $('canvas').height();
	var fieldsize = 3;
	
	var touches = [];
	var touching = false;
	var count = 300;
	var assign = 0;
	var p = [];
	
	var highspeed = 0;
	var slowspeed = 500;
	var speedrange = Math.abs(highspeed - slowspeed);
	
	//console.log("Distance test:", 1 < 2);
	//console.log(touches);
	//console.log((10-20)/5);
	//console.log(Math.sqrt(Math.pow(Math.abs(-2),2) + Math.pow(Math.abs(-3),2)));
	
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
		console.log("TOUCH STOP")
		if (touches.length == 0) {
			newTarget();
		}
		//console.log(touches);
	});

	// Particle object
	function Particle(radius,xp,yp,rgb,s) {
		
		assign++;
		this.id = assign;
		this.size = radius;
		this.x = xp;
		this.y = yp;
		this.colour = rgb;
		this.speed = s;
		//console.log(this.speed);
		this.accel = 0;
		this.xtarget = this.x;
		this.ytarget = this.y;
		this.distance = null; // ********************************************** //
		this.distances = [];
		this.tracked = false;
		
		function move() {
			
			// if there's a touch!
			if (touching == true) {
				
				
				this.distance = null; // ********************************************** //
				//console.log("i am touched");
			
			// now you need to find out what touch you are closest to!
				var xn, yn;
				for (var i=0,touch;touch=touches[i];i++) {
					//console.log(touches.length);
					
					var hyp = Math.sqrt(Math.pow(Math.abs(this.x - touch.pageX),2) + Math.pow(Math.abs(this.y - touch.pageY),2));
					var sum = Math.abs(this.x - touch.pageX) + Math.abs(this.y - touch.pageY);
					//console.log("HYP " + i + " " + hyp);
					if (hyp < this.distance || this.distance == null) {
						this.distance = hyp;
						this.xtarget = touch.pageX;
						this.ytarget = touch.pageY;
					}
					
				}
				if (this.tracked == true) {
					console.log(this.accel);
				}
				if ((this.speed - this.accel) > (highspeed/4)) {
					this.accel+=0.25;
				} else if ((this.speed - this.accel) < (highspeed/4)) {
					this.accel = 0;
				}
			}
			/*
				this.x = this.x - (this.x - this.xtarget)/(this.speed);
				this.y = this.y - (this.y - this.ytarget)/(this.speed);
			*/
			/*
			if (this.distance > 0) {
				if (this.tracked == true && touching == true) {
					console.log("MOVE");
				}
				*/
				
				this.x = this.x - (this.x - this.xtarget)/(this.speed - this.accel);
				this.y = this.y - (this.y - this.ytarget)/(this.speed - this.accel);
				//this.accel+=0.25;
				
			/*
			} else if (this.distance < 0.05) {
				if (this.tracked == true ) {
					console.log("STOP");
				}
				this.x = this.xtarget;
				this.y = this.ytarget;
				this.accel = 0;
			}
			*/
			
			
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
			
			part.xtarget = Math.floor(Math.random() * (w*fieldsize)) - w;
			part.ytarget = Math.floor(Math.random() * (h*fieldsize)) - h;
			part.accel = 0;
			
		}
		
	}
	
	// initial particle creation and positioning
	function init() {
		
		for (var i=0;i<count;i++) {
			var xr = Math.floor(Math.random() * (w*fieldsize)) - w;
			var yr = Math.floor(Math.random() * (h*fieldsize)) - h;
			var spd = Math.random() * speedrange + highspeed;
			//console.log(spd);
			if (i > 0) {
			
			//var alpha = highspeed / spd;
			var alpha = (slowspeed - spd) / speedrange;
			//console.log(alpha);
			var rgba = 'rgba(255,255,255,' + alpha + ')';
			p[i] = new Particle(2,xr,yr,rgba,spd);
			} else {
			p[i] = new Particle(2,xr,yr,'rgba(255,255,255,1)',highspeed);
			p[i].tracked = true;
			console.log(p[i].accel);
			}
			//console.log((p[i].x - xt),(p[i].y - yt));
		}
		
		update();
		
	}
	
	// drawing function
	function update() {
		
		ctx.clearRect(0, 0, w, h);
		
		for (var i=0;i<p.length;i++) {
			p[i].move();
		}
		
		requestAnimationFrame(update);
	}
	init();
});
