import React, { Component } from 'react'

class SVGCircle extends Component {
  render() {
    const { radius, cx, cy, style, ...rest } = this.props

    return (
      <circle
        r={radius}
        cx={cx}
        cy={cy}
        style={
          style === undefined ? {
            pointerEvents: 'none'
          } : {
            pointerEvents: 'none',
            ...style
          }
        }
        {...rest} />
    )
  }
}

export default SVGCircle