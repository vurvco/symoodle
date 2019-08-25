export default class Line {
  constructor(dot1, dot2, p5) {
    this.dot1 = dot1
    this.dot2 = dot2
    this.p5 = p5
  }

  draw() {
    this.p5.line(
      this.dot1.x,
      this.dot1.y,
      this.dot2.x,
      this.dot2.y,
    );
  }
}