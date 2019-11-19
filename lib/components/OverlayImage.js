import React, { Component } from 'react'
import './overlay.css'

class OverlayImage extends Component {
  render() {
    const { overlayComponent, imageComponent, className, ...rest } = this.props

    return (
      <div className={className} {...rest}>
        <div className={'img-overlay-wrap'}>
          {imageComponent}
          {overlayComponent}
        </div>
      </div>
    )
  }
}

export default OverlayImage