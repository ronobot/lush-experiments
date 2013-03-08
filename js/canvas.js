/**
 * @author Lush Concepts
 */

$( document ).ready( function() {
	console.log(document.getElementById("can"));
	console.log($("#can")[0]);
  	//var canvas = $("#can");
  	//if (canvas.getContext) {
  	//alert("go");
  	var can = $("#can")[0].getContext('2d');
  	
  	can.fillStyle = "rgb(87,49,91)";
  	can.fillRect(200,200,10,10)
  //}
  var line = can.beginPath();
  var segment = 0;
  $('#can').click(function(e) {
  	var mouseX = e.offsetX;
  	var mouseY = e.offsetY;
  	/*
  	var boxH = 10;
  	var boxW = 10;
  	can.fillStyle = "rgb(128,128,128)";
  	can.fillRect((mouseX - (boxW/2)),(mouseY - (boxH/2)),boxH,boxW);
  	*/
  	//can.beginPath();
  	//can.moveTo(mouseX,mouseY);
  	draw(mouseX,mouseY); 	
  	//can.moveTo(mouseX,mouseY);
  });
  function draw(mx,my) {
  	segment++;
  	if (segment > 0) {
  		can.lineTo(mx,my);
  		can.stroke();
  	} else if (segment = 0) {
  		can.moveTo(mx,my);
  	}
  }
});