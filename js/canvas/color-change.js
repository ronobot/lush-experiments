/**
 * @author Lush Concepts
 */



$( document ).ready( function() {
  //console.log(document.getElementById("can"));
  console.log($("#can")[0]);
  console.log($('#can').attr('width'),$('#can').attr('height'))
  //var canvas = $("#can");
  //if (canvas.getContext) {
  //alert("go");
  var can = $("#can")[0].getContext('2d');
  	
  	//can.fillStyle = "rgb(87,49,91)";
  	//can.fillRect(200,200,10,10)
  //}
  var img = new Image();
  img.onload = function() {
  	console.log(this.width, this.height);
  	can.drawImage(this,($('#can').attr('width') - this.width),($('#can').attr('height') - this.height));
  }
  img.src = '../img/space-invader.png';
  
  		
  //var line = can.beginPath();
  var drawing;
  var startX;
  var startY;
  var segment = 0;
  //
  $('#can').dblclick(function(e) {
  	console.log("double-clocking!")
  	can.clearRect(0, 0, $('#can').attr('width'), $('#can').attr('height'));
  	//var mouseX = e.offsetX;
  	//var mouseY = e.offsetY;
  	//
  	//startLine(mouseX,mouseY);
  });
  //$('#can').click(function(e) {
  	//var mouseX = e.offsetX;
  	//var mouseY = e.offsetY;
  	//
  	//drawLine(mouseX,mouseY);
  //});
  /*
  $('#can').mousedown(function(e) {
  	var mouseX = e.offsetX;
  	var mouseY = e.offsetY;
  	//
  	$('#can').css('cursor','crosshair');
  	drawing = setInterval( function() { drawBox(mouseX,mouseY); },100);
  	startX = mouseX;
  	startY = mouseY;
  	//drawBox(mouseX,mouseY);
  });
  $('#can').mouseup(function(e) {
  	var mouseX = e.offsetX;
  	var mouseY = e.offsetY;
  	//
  	clearInterval(drawing);
  	console.log("STOP")
  	endBox(mouseX,mouseY);
  	$('#can').css('cursor','default');
  });
  */
 	//console.log(this)
 	//
 	var blocksize = 50;
 	var xdiv = $('#can').attr('width') / blocksize;
 	var ydiv = $('#can').attr('height') / blocksize;
 	console.log('divisions: ',xdiv,ydiv)
 	var xcolorstep = 255 / xdiv;
 	var ycolorstep = 255 / ydiv;
 	var blue = 0;
 	var alpha = 1;
 	var xcolorsteps = $('#can').attr('width') / 255;
 $('#can').mousemove(function(e) {
 	can.clearRect(0, 0, $('#can').attr('width'), $('#can').attr('height'));
 	blue = Math.round((255 * (e.pageX - this.offsetLeft)) / $(this).attr('width'));
 	alpha = Math.round((100 * (e.pageY - this.offsetTop)) / $(this).attr('height')) / 100;
 	console.log(alpha);
 	for (var i=0;i<ydiv;i++){
	    for (var j=0;j<xdiv;j++){
	      can.fillStyle = 'rgba(' + Math.floor(255-ycolorstep*i) + ',' +
	                       Math.floor(255-xcolorstep*j) + ',' + blue + ',' + alpha + ')';
	      can.fillRect(j*blocksize,i*blocksize,blocksize,blocksize);
	    }
  	}
 });
  //
  // FUNCTIONS
  //
  function findMouse() {
  	
  }
  //
  function drawBox(mx,my) {
  	//
  	console.log('DRAWING')
  	can.clearRect(0, 0, $('#can').attr('width'), $('#can').attr('height'));
  	$('#can').mousemove(function(e) {
  		console.log(e.pageX, e.pageY);
	  	can.rect(startX, startY, (e.offsetX-startX),(e.offsetY-startY));
	  	can.strokeStyle = 'black';
	  	can.stroke();
  	});
  }
  function endBox(mx,my) {
  	$('#can').unbind('mousemove');
  	can.rect(startX, startY, (mx-startX),(my-startY));
  	can.strokeStyle = 'black';
  	can.stroke();
  }
  //
  function startLine(mx,my) {
  	if (segment > 0) {
  		console.log("DONE!")
  		can.closePath();
  		can.stroke();
  		segment = 0;
  	} else {
  		console.log("start a line")
  		segment++;
  		can.moveTo(mx,my);
  		console.log(segment)
  	}
  }
  //
  function drawLine(mx,my) {
  	if (segment > 0) {
  		segment++;
  		can.lineTo(mx,my);
  		can.stroke();
  	}
  }
});