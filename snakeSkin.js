var t = 0;	 // time keeper
var fR = 60; // frame Rate

// square variables
var squares, sqRadius, sqBorder;
// environment variables
var angle, shrinkRate, rotRate;
// auxiliary squares
var sq1, sq2, sq3, sq4;

function setup(){
	createCanvas(640, 480);
	frameRate(fR);
	colorMode(HSB, 360, 100, 100, 100);

	// variable initialization
	squares = []; // [x, y, rotation, radius, hue]
	sqRadius = 200;
	sqBorder = 8;

	shrinkRate = 1.2;
	rotRate = 10;
	angle = radians(10/fR);

	rectMode(CENTER);
	noFill();
	// stroke(255, 255, 255, 80);
	strokeWeight(sqBorder);

  // sq1 = [100, 100, 0.2, sqRadius-30];
  // sq2 = [200, 100, 0.3, sqRadius-20];
  // sq3 = [300, 100, 0.4, sqRadius-10];
  // sq4 = [400, 100, 0.5, sqRadius];
  // squares = [sq1, sq2, sq3, sq4];
}

function draw(){
	background(0);

	shrinkSquares();
	spinSquares();
	drawSquares();

	t++;
}

// This function draws every square contained in the "squares" array
function drawSquares(){
	for (var i = 0; i < squares.length; i++) {
		var col = color(squares[i][4], 100, 100, 60);
		stroke(col);
		push();
		translate(squares[i][0], squares[i][1]);
		rotate(squares[i][2]);
		rect(0, 0, squares[i][3], squares[i][3]);
		pop();
	}
}
// This function shrinks the squares and removes them from the array
function shrinkSquares(){
	for (var i = 0; i < squares.length; i++) {
		squares[i][3] -= shrinkRate;
		if(squares[i][3] <= 0){
			squares.splice(i, 1);
		}
	}
}
// This function spins the squares according to their size
function spinSquares(){
	for (var i = 0; i < squares.length; i++) {
		squares[i][2] += angle * sqRadius/squares[i][3];
	}
}
// This function creates a square and adds it to the array
function createSquare(xpos, ypos, rotation, rad, hue) {
	// Create a new square
	var newSquare = [xpos, ypos, rotation, rad, hue];
	// Add it to the array
	squares.push(newSquare);
}

function mouseDragged(){
	var theta = radians(t);
	var h = t%360;
	createSquare(mouseX, mouseY, theta, sqRadius, h);
}
