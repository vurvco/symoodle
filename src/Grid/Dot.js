export default class Dot {
  constructor(x, y, id, p5) {
    this.x = x
    this.y = y
    this.id = id
    this.r = 5
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
    return Math.sqrt(
      (x-this.x)*(x-this.x) + (y-this.y)*(y-this.y)
    ) < this.r * 5
  }
}