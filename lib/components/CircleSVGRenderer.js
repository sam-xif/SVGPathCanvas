import React, { Component } from 'react'
import SVGCircle from './SVGCircle'

class CircleSVGRenderer extends Component {
  componentDidMount() {
    const { onWheel } = this.props

    for (let elem of document.getElementsByTagName('svg')) {
      elem.addEventListener('wheel', onWheel,
        {
          passive: false
        })
    }
  }

  render() {
    const {
      onMouseDown,
      onMouseMove,
      onMouseUp, circles,
      circleProps,
      currentRadius,
      cursorCoords,
      ...rest } = this.props

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
        <SVGCircle
          stroke={'black'}
          strokeWidth={2}
          fill={'transparent'}
          radius={currentRadius}
          cx={cursorCoords[0]}
          cy={cursorCoords[1]}
        />
      </svg>
    )
  }
}

export default CircleSVGRenderer