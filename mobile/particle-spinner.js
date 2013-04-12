
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
	var fieldmodifier = 0.5*(fieldsize-1);
	
	var touches = [];
	var touching = false;
	var count = 300;
	var assign = 0;
	var p = [];
	
	var highspeed = 10;
	var slowspeed = 500;
	var speedlimit = 1;
	var speedrange = Math.abs(highspeed - slowspeed);
	var accelerator = 0.25;
	
	var fastorbit = 20;
	var sloworbit = 1;
	var orbitrange = Math.abs(fastorbit - sloworbit);
	
	var orbitpos = 1;
	
	var tracker = false;
	
	// Particle object
	function Particle(radius,xp,yp,rgb,s,o,d) {
		
		assign++;
		this.id = assign;
		this.size = radius;
		this.x = xp;
		this.y = yp;
		this.colour = rgb;
		this.speed = s;
		this.accel = 0;
		this.direction = d;
		this.xtarget = this.x;
		this.ytarget = this.y;
		this.distance = null;
		this.tracked = false;
		this.orbit;
		this.orbiting = o;
		this.cycle = 0;
		
		function move() {
			
			// if there's a touch!
			if (touching == true) {
				this.cycle++;
				
				this.distance = null;
				
				// now you need to find out what touch you are closest to!
				var xn, yn;
				for (var i=0,touch;touch=touches[i];i++) {
					
					var hyp = Math.sqrt(Math.pow(Math.abs(this.x - touch.pageX),2) + Math.pow(Math.abs(this.y - touch.pageY),2));
					if (hyp < this.distance || this.distance == null) {
						this.distance = hyp;
						this.xtarget = touch.pageX;
						this.ytarget = touch.pageY;
					}
					
				}
				if ((this.speed - this.accel) > (speedlimit)) {
					this.accel+=accelerator;
				}
				if (this.cycle == 1) {
					//console.log("GO!")
					this.orbit = Math.acos((this.x - this.xtarget)/this.distance)/(2*Math.PI);
				}
				/*
				if (this.tracked == true) {
					var check;
					check = Math.acos((this.x - this.xtarget)/this.distance)/(2*Math.PI);
					console.log(this.orbit);
				}
				*/
				if (this.direction == 0) {
					this.orbit+=this.orbiting;
				} else {
					this.orbit-=this.orbiting;
				}
				// new spinning movement
				this.x = this.xtarget + (this.distance-=1) * Math.cos(2 * Math.PI * (this.orbit));
				this.y = this.ytarget + (this.distance-=1) * Math.sin(2 * Math.PI * (this.orbit));
			} else {
				this.x = this.x - (this.x - this.xtarget)/(this.speed - this.accel);
				this.y = this.y - (this.y - this.ytarget)/(this.speed - this.accel);
			}
			/*
			this.x = this.x - (this.x - this.xtarget)/(this.speed - this.accel);
			this.y = this.y - (this.y - this.ytarget)/(this.speed - this.accel);
			*/
			
			
			
			
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.size,0,Math.PI*2,true);
			ctx.closePath();
			ctx.fillStyle = this.colour;
			ctx.fill();
			
			orbitpos+=0.01;
			
		}
		
		this.move = move;
		
		p.push(this);
		
	}
	
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
		touches = event.touches;
		if (touches.length == 0) {
			touching = false;
			newTarget();
		}
	});

	// Touchend burst
	function newTarget() {
		
		for (var i=0,part;part=p[i];i++) {
			
			part.xtarget = Math.floor(Math.random() * (w*fieldsize)) - w*fieldmodifier;
			part.ytarget = Math.floor(Math.random() * (h*fieldsize)) - h*fieldmodifier;
			part.accel = 0;
			
		}
		
	}
	
	// initial particle creation and positioning
	function init() {
		
		for (var i=0;i<count;i++) {
			var xr = Math.floor(Math.random() * (w*fieldsize)) - w*fieldmodifier;
			var yr = Math.floor(Math.random() * (h*fieldsize)) - h*fieldmodifier;
			var spd = Math.random() * speedrange + highspeed;
			var orb = Math.round(Math.random() * orbitrange);
			var dir = Math.round(Math.random() * 1);
			//console.log(orb/orbitrange);
			if (i == 0 && tracker == true) {
				p[i] = new Particle(1.5,xr,yr,'rgba(255,255,255,1)',highspeed,1);
				p[i].tracked = true;
				//console.log("TRACKER");
				//console.log(p[i].accel);
			} else {
				//var alpha = (slowspeed - spd) / speedrange;
				var alpha = orb/orbitrange;
				var rgba = 'rgba(255,255,255,' + alpha + ')';
				p[i] = new Particle(1.5,xr,yr,rgba,spd,orb*0.001,dir);
			}
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
