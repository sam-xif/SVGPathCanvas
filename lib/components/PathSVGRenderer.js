import React, { Component } from 'react'
import SVGPath from './SVGPath'

class PathSVGRenderer extends Component {
  render() {
    const { onMouseDown, onMouseMove, onMouseUp, paths, pathProps,
      ...rest } = this.props

    return (
      <svg
        {...rest}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {
          paths.map(path => {
            return <SVGPath points={path} {...pathProps} />
          })
        }
      </svg>
    )
  }
}

export default PathSVGRenderer