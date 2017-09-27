var t = 0;	 // time keeper
var fR = 60; // frame Rate
var directions; //text directions variables

var squares, sqRadius, sqBorder;  // square variables
var sq1, sq2, sq3, sq4; // auxiliary squares
var angle, decay; // environment variables

// slider variables
var spin_sliderX, spin_sliderY, spin_sliderW, spin_sliderH, spin_sliderStart, spin_sliderEnd;
var shrink_sliderX, shrink_sliderY, shrink_sliderW, shrink_sliderH, shrink_sliderStart, shrink_sliderEnd;
//variables for mapped value from sliders
var spin_sliderValue, shrink_sliderValue;

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(fR);
  	colorMode(HSB, 360, 100, 100, 100);

    // variable initialization
	  squares = []; // [x, y, rotation, radius, hue]
	  sqRadius = 200;
	  sqBorder = 8;
    decay = 0.1;

    rectMode(CENTER);
    noFill();
    strokeWeight(sqBorder);
    // stroke(255, 255, 255, 80);

    shrink_sliderX = windowWidth/30;
    shrink_sliderY = windowHeight/15;
    shrink_sliderW = windowWidth/80;
    shrink_sliderH =windowHeight/25;
    shrink_sliderStart = windowHeight/12;
    shrink_sliderEnd = windowHeight/3;
    shrink_sliderValue = 0.1;

    spin_sliderX = windowWidth/20;
    spin_sliderY = windowHeight/20;
    spin_sliderW = windowWidth/40;
    spin_sliderH = windowHeight/60;
    spin_sliderStart = windowWidth/20;
    spin_sliderEnd = windowHeight/3;
    spin_sliderValue = 5;

    angle = radians(spin_sliderValue/fR);
    instructions = "INSTRUCTIONS: click and drag the mouse to draw squares. Use the Up, Down, Left, and Right arrow keys to change the squares";
}

function draw(){
	background(0);
    showInstructions();
    spinSlider();
    shrinkSlider();
	shrinkSquares();
	spinSquares();
	drawSquares();
	t++;
}

//this function shows the instructions for how to use the program
function showInstructions () {
    push();
    fill(255);
    textSize(10);
    text(instructions,windowWidth-windowWidth/8,windowHeight/10,windowWidth/8, 100);
    pop();
}

//This function is the slider that controls the degree of spinning with the left and right arrows
function spinSlider() {
	push();
  rectMode(CORNER);
	stroke(255);
	fill(175);
  // Keep rectangle within limits of slider
  spin_sliderX = constrain(spin_sliderX, spin_sliderStart, spin_sliderEnd-spin_sliderW);
  // Draw a line for slider
  line(spin_sliderStart, spin_sliderY+spin_sliderH/2, spin_sliderEnd, spin_sliderY+spin_sliderH/2);
  // Draw rectangle for slider
  rect(spin_sliderX, spin_sliderY, spin_sliderW, spin_sliderH);
  // Take the slider's range and map it to a value between 0 and 5
  spin_sliderValue = map(spin_sliderX,spin_sliderStart,spin_sliderEnd-spin_sliderW,0,500);
	// Update the Slider Value as keys are pressed
  if  (keyIsDown(RIGHT_ARROW)){
      spin_sliderX+=5;};
  if  (keyIsDown(LEFT_ARROW)){
      spin_sliderX-=5;};
  pop();
  angle = radians(spin_sliderValue/fR);
}

//This function is the slider that controls the rate of shape decay with the up and down arrows
function shrinkSlider() {
	push();
  rectMode(CORNER);
	stroke(255);
	fill(175);
  // Keep rectangle within limits of slider
  shrink_sliderY = constrain(shrink_sliderY, shrink_sliderStart, shrink_sliderEnd-shrink_sliderH);
  // Draw a line for slider
  line(shrink_sliderX + shrink_sliderW/2, shrink_sliderStart, shrink_sliderX + shrink_sliderW/2, shrink_sliderEnd);
  // Draw rectangle for slider
  rect(shrink_sliderX, shrink_sliderY, shrink_sliderW, shrink_sliderH);
  // Take the slider's range and map it to a value between 0 and 5
  shrink_sliderValue = map(shrink_sliderY,shrink_sliderStart,shrink_sliderEnd-shrink_sliderH,0,1);
  print(shrink_sliderValue);
	// Update the Slider Value as keys are pressed
  if  (keyIsDown(DOWN_ARROW)){
      shrink_sliderY+=5;};
  if  (keyIsDown(UP_ARROW)){
      shrink_sliderY-=5;};
  pop();
  decay = shrink_sliderValue;
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
		squares[i][3] -= decay;
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
// This is the built in mousedrag function
function mouseDragged(){
	var theta = radians(t);
	var h = t%360;
	createSquare(mouseX, mouseY, theta, sqRadius, h);
}
