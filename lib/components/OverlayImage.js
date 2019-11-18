import React, { Component } from 'react'
import './overlay.css'

class OverlayImage extends Component {
  render() {
    const { overlayComponent, imageComponent } = this.props

    return (
      <div className={'img-overlay-wrap'}>
        {imageComponent}
        {overlayComponent}
      </div>
    )
  }
}

export default OverlayImage