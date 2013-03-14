$(document).ready(function() {
	var invader = document.createElement('img');
	invader.src = "img/invader-1.gif";
	
	//console.log(invader.offsetWidth)
	var fleet = new Array();
	var fleetamount = 6;
	var formation = 40;
	var xorigin = 0;
	var yorigin = 0;
	var movement = 10;
	var direction = 0;
	var xdir = 0;
	var blownup;
	
	function setup(parent) {
		
		for (i=0;i<fleetamount;i++) {
			//console.log(formation * i);
			var guy = $('<img>',{
				"src":"img/invader-1-2x.gif",
				"class":"invader"
			});
			guy.offset({ top:0, left: formation * i})
			guy.css("width",33);
			guy.css("height",24);
			guy.data("direction",0);
			guy.data("xdir",0);
			guy.appendTo('div');
			fleet[i] = guy;
		}
		/*console.log(fleet.length);
		*/
	}
	
	console.log($('img'))
	
	function move(which) {
		//console.log(which.offset().left);
		for (i=0;i<fleet.length;i++) {
			if (which[i].offset().top > 300) {
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
			
		}
		
	}
	
	function kill(which) {
		//alert("boom! " + which);
		$(which).remove();
	}
	
	$(document).on("touchstart",".invader", function(e) {
		e.preventDefault();
		$(this).attr('src','img/blow-up-1-2x.gif');
		blownup = this
		setTimeout(function() { kill(blownup);},1000);
	});
	/*
	$(document).on("touchmove",".invader",function(e) {
		e.preventDefault();
		//$(this).offset({top:(event.touches[0].pageY-25),left:(event.touches[0].pageX-25)});
	});
	
	$(document).on("touchend",".invader", function(e) {
		e.preventDefault();
		//$(this).css('background','#fff');
		//alert("touchy endy!");
	});
	*/
	setup();
	var action = setInterval( function() { move(fleet); },1000);
});