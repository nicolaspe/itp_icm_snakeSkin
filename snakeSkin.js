var t = 0;	 // time keeper
var fR = 60; // frame Rate
var directions; //text directions variables

var squares, sqRadius; // square variables
var sq1, sq2, sq3, sq4;// auxiliary squares
var angle, sliderValue;// environment variables

var spin_sliderX, spin_sliderY, spin_sliderW, spin_sliderH, spin_sliderStart, spin_sliderEnd, shrink_sliderX, shrink_sliderY, shrink_sliderW, shrink_sliderH, shrink_sliderStart, shrink_sliderEnd;// slider variables
var spin_sliderValue, shrink_sliderValue;       //variables for mapped value from sliders

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(fR);

    rectMode(CENTER);
    noFill();
    strokeWeight(2);
    stroke(255, 255, 255, 80);

    // variable initialization
    squares = []; // [x, y, rotation, radius]
    sqRadius = 100;
    
    Spin_sliderX = windowWidth/20;
    sliderY = windowHeight/20;
    sliderW = windowWidth/40;
    sliderH = windowHeight/60;
    sliderStart = windowWidth/20;
    sliderEnd = windowHeight/3;
    sliderValue = 5;
    
    spin_sliderX = windowWidth/20;
    spin_sliderY = windowHeight/20;
    spin_sliderW = windowWidth/40;
    spin_sliderH = windowHeight/60;
    spin_sliderStart = windowWidth/20;
    spin_sliderEnd = windowHeight/3;
    spin_sliderValue = 5;

    sq1 = [100, 100, 0.2, sqRadius-30];
    sq2 = [200, 100, 0.3, sqRadius-20];
    sq3 = [300, 100, 0.4, sqRadius-10];
    sq4 = [400, 100, 0.5, sqRadius];
    angle = radians(sliderValue/fR);
    instructions ="INSTRUCTIONS: click and drag the mouse to draw squares. Use the Left and Right arrows to change the spin speed";

  squares = [sq1, sq2, sq3, sq4];
}

function draw(){
	background(0);
    showInstructions();
    spinSlider();
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

// This function draws every square contained in the "squares" array
function drawSquares(){
	for (var i = 0; i < squares.length; i++) {
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
		squares[i][3] -= 0.1;
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
function createSquare(xpos, ypos, rotation, rad) {
	// Create a new square
	var newSquare = [xpos, ypos, rotation, rad];
	// Add it to the array
	squares.push(newSquare);
}

function mouseDragged(){
	createSquare(mouseX, mouseY, 0, sqRadius);
}
