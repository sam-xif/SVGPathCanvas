import React, { Component } from 'react'
import SVGCircle from './SVGCircle'

class CircleSVGRenderer extends Component {
  render() {
    const { onMouseDown, onMouseMove, onMouseUp, circles, circleProps, ...rest } = this.props

    return (
      <svg
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        {...rest}
      >
        {
          circles.map(circle => <SVGCircle radius={circle[0]} cx={circle[1]} cy={circle[2]} {...circleProps} />)
        }
      </svg>
    )
  }
}

export default CircleSVGRenderer