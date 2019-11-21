import React, { Component } from 'react'
import PathSVGRenderer from './PathSVGRenderer'
import CircleSVGRenderer from './CircleSVGRenderer'

const DRAW = 0, ERASE = 1

class CircleCanvas extends Component {
  state = {
    circles: this.props.circles || [],
    radius: this.props.initialRadius,
    mouseDown: false,
    mode: DRAW
  }

  constructor(props) {
    super(props)
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this)
    this.handleOnMouseUp = this.handleOnMouseUp.bind(this)
    this.handleOnMouseMove = this.handleOnMouseMove.bind(this)
  }

  _distanceBetween(p1, p2) {
    // todo
    return Math.sqrt(
      Math.pow(p1[0] - p2[0], 2) +
      Math.pow(p1[1] - p2[1], 2)
    )
  }

  _pointInCircle(p, cir) {
    return this._distanceBetween(p, [cir[1], cir[2]]) < cir[0]
  }

  _eraseAllAt(p) {
    let circles = this.state.circles
    circles = circles.filter(
      cir => !this._pointInCircle(p, cir)
    )

    return circles
  }

  getCoordsRelativeToSVG(e) {
    const boundingRect = e.target.getBoundingClientRect()
    const offsetX = boundingRect.left
    const offsetY = boundingRect.top

    const coordsRelativeToSVG = [e.clientX - offsetX, e.clientY - offsetY]

    return coordsRelativeToSVG
  }

  handleOnMouseDown(e) {
    // Create new currentPath
    let mode = this.state.mode

    if (e.button === 0) {
      mode = DRAW
    } else {
      mode = ERASE
    }

    const coords = this.getCoordsRelativeToSVG(e)

    if (mode === DRAW) {
      let circles = this.state.circles
      circles.push([this.state.radius, coords[ 0 ], coords[ 1 ]])

      this.setState({
        circles: circles,
        mouseDown: true
      })
    } else {
      this.setState({
        circles: this._eraseAllAt(coords),
        mouseDown: true
      })
    }

    if (mode !== this.state.mode) {
      this.setState({
        mode: mode
      })
    }
  }

  handleOnMouseUp(e) {
    this.setState({
      mouseDown: false
    })
  }

  handleOnMouseMove(e) {
    // Add coordinates to currentPath if enough distance has been covered
    // Set some minimum distance between points

    const minDistance = 5 // adjust as necessary

    if (this.state.circles.length === 0 || this.state.mouseDown === false) {
      return
    }

    const lastCircle = this.state.circles[this.state.circles.length - 1]
    const lastPoint = [lastCircle[1], lastCircle[2]]
    const coords = this.getCoordsRelativeToSVG(e)

    if (this.state.mode === DRAW) {
      if (this._distanceBetween(coords, lastPoint) >= minDistance) {
        let tmpArr = this.state.circles

        tmpArr.push([this.state.radius, coords[0], coords[1]])

        this.setState({
          circles: tmpArr
        })
      }
    } else {
      this.setState({
        circles: this._eraseAllAt(coords)
      })
    }
  }

  render() {
    const { onPathFinish, circles, ...rest } = this.props

    return (
      <CircleSVGRenderer
        onMouseDown={this.handleOnMouseDown}
        onMouseUp={this.handleOnMouseUp}
        onMouseMove={this.handleOnMouseMove}
        onContextMenu={(e) => { e.preventDefault() }}
        circles={this.state.circles}
        {...rest}
      />
    )
  }
}

export default CircleCanvas