// Helper class to keep track of and draw dots
export default class Dot {
  constructor(x, y, id, p5) {
    // Used for drawing ellipse
    this.x = x
    this.y = y
    this.r = 5

    // Used for code
    this.id = id

    // Need a ref to p5 for draw
    this.p5 = p5
  }

  draw(color) {
    this.p5.stroke(color);
    this.p5.fill(color);
    this.p5.strokeWeight(1);
    this.p5.ellipse(this.x,this.y, this.r * 2);
    this.p5.noFill();
    this.p5.ellipse(this.x,this.y, this.r * 8);
  }

  inDot(x, y) {
    // Determine if x,y is within
    // the circle at this.x, this.y with a radius of this.r*5
    return Math.sqrt(
      (x-this.x)*(x-this.x) + (y-this.y)*(y-this.y)
    ) < this.r * 5
  }
}