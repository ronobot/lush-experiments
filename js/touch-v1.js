
$(document).ready(function() {
	//alert("mouse___");
	/*
	$('.invader').mousedown(function(e) {
		$('body').css('background','#000');
	})
	$('.invader').mouseup(function(e) {
		$('body').css('background','#fff');
	})
	
	$('.invader').onclick(function(e) {
		void(0);
	})
	*/
	$(document).on("touchstart",".invader", function(e) {
		e.preventDefault();
		$(this).css('background','#000');
		$('p').html('touchy!');
		//alert(event.touches[0].pageX);
	});
	
	$(document).on("touchmove",".invader",function(e) {
		e.preventDefault();
		$(this).offset({top:(event.touches[0].pageY-25),left:(event.touches[0].pageX-25)});
	});
	$(document).on("touchend",".invader", function(e) {
		e.preventDefault();
		$(this).css('background','#fff');
		//alert("touchy endy!");
	});
	
	/*
	function touchStart(event) {
		event.preventDefault();
		alert("mousedowwwwnnnn");
	}
	*/
});
