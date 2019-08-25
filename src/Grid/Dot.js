export default class Dot {
  constructor(x, y, id, p5) {
    this.x = x
    this.y = y
    this.id = id
    this.r = 5
    this.p5 = p5
  }

  draw() {
    this.p5.ellipse(this.x,this.y, this.r * 2);
  }

  inDot(x, y) {
    return Math.sqrt(
      (x-this.x)*(x-this.x) + (y-this.y)*(y-this.y)
    ) < this.r
  }
}