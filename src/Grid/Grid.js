import React, { Component } from 'react'
import p5 from 'p5'

import Dot from './Dot'
import Line from './Line'
import './Grid.css'

class Grid extends Component {
  constructor(props) {
    super(props)

    this.drawing = false
    this.dots = []
    this.lines = []
    this.startDot = null

    this.handleSetCode = this.handleSetCode.bind(this)
  }

  handleSetCode() {
    let lines = this.lines.map(line => {
      return [line.dot1.id, line.dot2.id].sort((a, b) => a - b).join('-')
    })
    let uniqueLines = Array.from(new Set(lines)).sort()
    let code = uniqueLines.join(';')
    // console.log(code)
    this.props.setCode(code)
  }

  componentDidMount() {
    this.sketch = new p5(p5 => {
      p5.setup = () => {
        const canvas = p5.createCanvas(400, 400);
        canvas.parent('p5-container');

        let id = 0
        for (var y = 0; y < 5; y++) {
          for (var x = 0; x < 5;  x++) {
            this.dots.push(new Dot(100 + x * 50, 100 + y * 50, id++, p5))
          }
        }
      }

      p5.draw = () => {
        if(this.props.resetGrid) {
          this.lines = []
          this.startDot = null
          this.props.setResetGrid(false)
        }

        p5.clear();
        const dotColor = this.props.camera ? 'rgb(100, 255, 200)' : 110;

        // Dot Aesthetic
        p5.stroke(dotColor);
        p5.fill(dotColor);
        p5.strokeWeight(2);
  
        // Grid
        this.dots.forEach(dot => {
          dot.draw()

          if (this.startDot) {
            const lineLength = Math.hypot(this.startDot.x - p5.mouseX, this.startDot.y - p5.mouseY)
            if (lineLength > 85) {
              this.startDot = null
            } else {
              p5.line(this.startDot.x, this.startDot.y, p5.mouseX, p5.mouseY)
            }
          }

          if (this.drawing) {
            if (dot.inDot(p5.mouseX, p5.mouseY)) {
              if (!this.startDot) {
                this.startDot = dot
              } else if (this.startDot.id !== dot.id) {
                this.lines.push(new Line(this.startDot, dot, p5))
                this.startDot = null
                this.handleSetCode()
              }
            }
          }
        })

        this.lines.forEach(line => line.draw())
      }

      p5.mousePressed = () => {
        this.drawing = true;
      }

      p5.touchStarted = () => {
        this.drawing = true;
      }

      p5.mouseReleased = () => {
        this.drawing = false;
        this.startDot = null;
      }

      p5.touchEnded = () => {
        this.drawing = false;
        this.startDot = null;
      }
    })
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.camera !== nextProps.camera) {
      return true;
    }

    return false;
  }

  render() {
    return <div id="p5-container" className={!this.props.camera ? 'p5-container--background': ''}></div>
  }
}

export default Grid