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

    // As we're drawing a new line
    // we need to keep track of where we're drawing from
    this.startDot = null

    this.handleSetCode = this.handleSetCode.bind(this)
  }

  // Generate a new code whenever we draw a new line
  handleSetCode() {
    let lines = this.lines.map(line => {
      return [line.dot1.id, line.dot2.id].sort((a, b) => a - b).join('-')
    })
    let uniqueLines = Array.from(new Set(lines)).sort()
    let code = uniqueLines.join(';')
    this.props.setCode(code)
  }

  componentDidMount() {
    this.sketch = new p5(p5 => {
      p5.setup = () => {
        // Create and mount canvas
        const canvas = p5.createCanvas(400, 400);
        canvas.parent('p5-container');

        // Create grid Dots
        let id = 0
        for (var y = 0; y < 5; y++) {
          for (var x = 0; x < 5;  x++) {
            this.dots.push(new Dot(75 + x * 62.5, 75 + y * 62.5, id++, p5))
          }
        }
      }

      p5.draw = () => {
        // Resets the drawing data
        if(this.props.resetGrid) {
          this.lines = []
          this.startDot = null
          this.props.setResetGrid(false)
        }

        p5.clear();
        const dotColor = this.props.camera ? 'rgb(100, 255, 200)' : 110;

        // Grid
        this.dots.forEach(dot => {
          dot.draw(dotColor)

          if (this.startDot) {
            const lineLength = Math.hypot(this.startDot.x - p5.mouseX, this.startDot.y - p5.mouseY)
            if (lineLength > 85) {
              // If lineLength is too long, cancel it
              this.startDot = null
            } else {
              // otherwise draw where user is going
              p5.strokeWeight(1);
              p5.line(this.startDot.x, this.startDot.y, p5.mouseX, p5.mouseY)
            }
          }

          if (this.drawing) {
            if (dot.inDot(p5.mouseX, p5.mouseY)) {
              if (!this.startDot) {
                // If this is the first dot they've drawn on
                // add it as the starting point
                this.startDot = dot
              } else if (this.startDot.id !== dot.id) {
                // If they touch another dot
                // create a new line and update code
                this.lines.push(new Line(this.startDot, dot, p5))
                this.startDot = null
                this.handleSetCode()
              }
            }
          }
        })

        this.lines.forEach(line => line.draw(dotColor))
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
    // Create p5 mount
    return <div id="p5-container" className={!this.props.camera ? 'p5-container--background': ''}></div>
  }
}

export default Grid