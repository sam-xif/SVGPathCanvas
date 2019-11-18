import React, { Component } from 'react'
import './overlay.css'

class OverlayImage extends Component {
  render() {
    const { overlayComponent, imageSrc } = this.props

    return (
      <div className={'img-overlay-wrap'}>
        <img src={imageSrc} />
        {overlayComponent}
      </div>
    )
  }
}

export default OverlayImage