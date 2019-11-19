import React, { Component } from 'react'

class SVGPath extends Component {
  static propTypes = {
  
  }

  generatePathD() {
    const { points } = this.props

    if (points.length === 0) {
      return ''
    }

    let strArray = [`M${points[0][0]} ${points[0][1]}`]

    for (let point of points.slice(1)) {
      let coordsString = `L${point[0]} ${point[1]}`
      strArray.push(coordsString)
    }

    strArray.push('Z')

    return strArray.join(' ')
  }

  render() {
    const { points, style, ...rest } = this.props

    return (
      <path d={this.generatePathD()}
            style={
              style === undefined ? {
                pointerEvents: 'none'
              } : {
                pointerEvents: 'none',
                ...style
              }
            }
            {...rest}
      />
    )
  }
}

export default SVGPath