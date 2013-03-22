$(document).ready(function() {
	var invader = document.createElement('img');
	invader.src = "img/invader-1.gif";
	
	//console.log(invader.offsetWidth)
	var fleet = new Array();
	var casulties = 0;
	var fleetamount = 4;
	var formation = 40;
	var xorigin = 0;
	var yorigin = 0;
	var movement = 10;
	var direction = 0;
	var xdir = 0;
	var blownup;
	var firing;
	var beamspeed = 30;
	
	function setup(parent) {
		
		var cannon = $('<img>',{
			"src":"img/player-cannon.gif",
			"class":"cannon",
		})
		cannon.css("width",39);
		cannon.css("height",24);
		cannon.appendTo('.screen');
		
		for (i=0;i<fleetamount;i++) {
			//console.log(formation * i);
			var guy = $('<img>',{
				"src":"img/invader-1-2x.gif",
				"class":"invader",
				"id":i
			});
			guy.offset({ top:0, left: formation * i})
			guy.css("width",33);
			guy.css("height",24);
			//guy.css("background","#f00")
			guy.data("direction",0);
			guy.data("xdir",0);
			guy.appendTo('.screen');
			fleet[i] = guy;
		}
		/*console.log(fleet.length);
		*/
	}
	
	console.log($('img'))
	
	function attack(which) {
		//console.log(which.offset().left);
		for (i=0;i<fleet.length;i++) {
			if (which[i].offset().top > 300) {
				$('.invader').remove();
				clearInterval(danger);
				$('.screen').html("GAME OVER");
				break;
			} else if (which[i].data("direction") == 0) {
				if (which[i].data("xdir") == 0) {
					which[i].offset({ top:(which[i].offset().top), left: (which[i].offset().left += movement)});
					//xdir = 1;
					which[i].data("xdir",1)
				} else {
					which[i].offset({ top:(which[i].offset().top), left: (which[i].offset().left -= movement)});
					//xdir = 0;
					which[i].data("xdir",0);
				}
				which[i].data("direction",1);	
				//direction = 1;	
			} else {
				which[i].offset({ top:(which[i].offset().top += movement), left: (which[i].offset().left)});
				//direction = 0;
				which[i].data("direction",0);
			}
			/* 
			if ($('.beam')) {
			var beamx = $('.beam').offset().left;
			var beamy = $('.beam').offset().top - 20;
			// - $('.beam').height()
			var thisx = which[i].offset().left;
			var thisy = which[i].offset().top;
			console.log(beamy, thisy)
			// 
			if (thisx < beamx && (thisx+33) > beamx && thisy < beamy && (thisy + 24) > beamy) {
				console.log(which[i].attr('src'));
				//$('.beam').remove();
				$('.beam').css('visibility','hidden');
				$(which[i]).attr('src','img/blow-up-1-2x.gif');
				blownup = which[i];
				setTimeout(function() { kill(blownup);},1000);
			}
			}
			*/
		}
		/*
		//while ($('.beam').offset().top )
		if (firing == true && $('.beam').offset().top > 0) {
			//alert($('.beam').offset().top)
			$('.beam').offset({top:$('.beam').offset().top -= beamspeed, left: $('.beam').offset().left});
			//alert($('.beam').offset().top)
		} else {
			$('.beam').remove();
			firing == false;
			//fire();
		}
		*/
	}
	
	function beammove(which) {
		//alert(which.offset().top);
		which.offset({top:which.offset().top -= beamspeed, left: which.offset().left});
		setTimeout( function() { beammove(which);},500);
		
		//if ()
		for (i=0;i<fleet.length;i++) {
			var beamx = which.offset().left;
			var beamy = which.offset().top - 20;
			// - $('.beam').height()
			var thisx = fleet[i].offset().left;
			var thisy = fleet[i].offset().top;
			console.log(beamy, thisy)
			// 
			if (thisx < beamx && (thisx+33) > beamx && thisy < beamy && (thisy + 24) > beamy) {
				console.log(fleet[i].attr('src'));
				which.remove();
				//$('.beam').css('visibility','hidden');
				$(fleet[i]).attr('src','img/blow-up-1-2x.gif');
				blownup = fleet[i];
				setTimeout(function() { kill(blownup);},1000);
			}			
		}
	}
	
	function kill(which) {
		$(which).remove();
		casulties++;
		if (casulties == fleet.length) {
			clearInterval(danger);
			$('.screen').html("YOU WIN");
		}
		//$('.beam').remove();
		firing == false;
		//fire();
	}
	
	// touch-to-kill on invaders
	$(document).on("touchstart",".invader", function(e) {
		//e.preventDefault();
		$(this).attr('src','img/blow-up-1-2x.gif');
		blownup = this
		setTimeout(function() { kill(blownup);},1000);
	});
	// prevent selection defaults
	document.ontouchstart = function(e){ e.preventDefault(); }
	/*
	$(document).on("touchstart","div",function(e) {
		e.preventDefault();
	})
	$(document).on("touchstart",".cannon", function(e) {
		e.preventDefault();
		//alert("touch!");
	})
	*/
	// cannon moving
	$(document).on("touchmove",".cannon",function(e) {
		e.preventDefault();
		//alert($(this).offset().left);
		//$(this).offset().left = event.touches[0].pageX-19;
		$(this).offset({top:$(this).offset().top,left:(event.touches[0].pageX-19)});
		//$(this).offset({top:(event.touches[0].pageY-25),left:(event.touches[0].pageX-25)});
	});
	$(document).on("touchend",".cannon",function(e) {
		e.preventDefault();
		fire();
	})
	$(document).on("click",".cannon", function(e) {
		alert("clicky clicky");
	})
	/*
	$(document).on("touchend",".invader", function(e) {
		e.preventDefault();
		//$(this).css('background','#fff');
		//alert("touchy endy!");
	});
	*/
	
	function fire() {
		var beam = $('<div>',{
			"class":"beam",
		});
		beam.appendTo('.screen');
		console.log("BEAM IS ", beam.offset())
		beam.offset({ top:beam.offset().top, left:$('.cannon').offset().left+19});
		beam.css("visibility","visible");
		firing = true;
		beammove(beam);
	}
	
	setup();
	//var firing = setInterval( function() { fire(); },500);
	var danger = setInterval( function() { attack(fleet); },1000);
	//var defend = setInterval( function() { defend(); },250);
	//fire();
});