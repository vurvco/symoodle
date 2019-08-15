// Am I currently drawing
let drawing = false;

function setup() {
  createCanvas(400, 400);
  background('rgba(100, 255, 200, 255)');
  
}

function draw() {
  // Dot Aesthetic
  noStroke();
  fill(110);
  
  // Grid
  for (var x = 0; x < 5; x++) {
    for (var y = 0; y < 5;  y++) {
      ellipse (100 + x * 50, 100 + y * 50, 10, 10);
    }
  }

  // Drawing
  if (drawing) {
    ellipse(mouseX, mouseY, 15, 15);
    
  } else {
    }
}
  
  // Erase > "Event"
  function mousePressed() {
    // Toggle on/off drawing
    drawing = true;
}

function mouseReleased() {
  drawing = false;
}

function doubleClicked() {
  background('rgba(100,255,200, 255)');
}