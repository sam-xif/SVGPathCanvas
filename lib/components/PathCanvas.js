import React, { Component } from 'react'
import PathSVGRenderer from './PathSVGRenderer'

class PathCanvas extends Component {
  /*
   * User must be able to:
   * * Draw a path
   * * Delete a path if they want to draw it again
   * * confirm a path
   * * Add an annotation to a path
   */

  state = {
    paths: this.props.paths || [],
    currentPath: null
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

  getCoordsRelativeToSVG(e) {
    const boundingRect = e.target.getBoundingClientRect()
    const offsetX = boundingRect.left
    const offsetY = boundingRect.top

    const coordsRelativeToSVG = [e.clientX - offsetX, e.clientY - offsetY]

    console.dir(e.target)

    return coordsRelativeToSVG
  }

  handleOnMouseDown(e) {
    // Create new currentPath
    let currentPath = []

    currentPath.push(this.getCoordsRelativeToSVG(e))

    this.setState({
      currentPath: currentPath
    })
  }

  handleOnMouseUp(e) {
    // Display and capture confirmation/annotation user input

    const { onPathFinish } = this.props

    if (this.state.currentPath === null) {
      return
    }

    const paths = this.state.paths
    const currentPath = this.state.currentPath
    paths.push(this.state.currentPath)

    this.setState({
      paths: paths,
      currentPath: null
    })

    if (onPathFinish) {
      onPathFinish(currentPath, paths)
    }
  }

  handleOnMouseMove(e) {
    // Add coordinates to currentPath if enough distance has been covered
    // Set some minimum distance between points

    if (this.state.currentPath === null) {
      return
    }

    const threshold = 5 // adjust as necessary

    let coords = this.getCoordsRelativeToSVG(e)
    let lastPoint = this.state.currentPath[this.state.currentPath.length - 1]

    if (this._distanceBetween(coords, lastPoint) >= threshold) {
      let tmpCurPath = this.state.currentPath
      tmpCurPath.push(coords)

      this.setState({
        currentPath: tmpCurPath
      })
    }
  }

  render() {
    const pathsToRender =
      this.state.currentPath === null ?
      this.state.paths : this.state.paths.concat([this.state.currentPath])

    const { onPathFinish, paths, ...rest } = this.props


    return (
      <PathSVGRenderer
        onMouseDown={this.handleOnMouseDown}
        onMouseUp={this.handleOnMouseUp}
        onMouseMove={this.handleOnMouseMove}
        paths={pathsToRender}
        {...rest}
      />
    )
  }
}

export default PathCanvas