import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Room extends Component {
  static propTypes = {
    params: PropTypes.object
  }

  static defaultProps = {
    params: {}
  }

  render() {
    return (
      <div>Room: {this.props.params.id}</div>
    )
  }
}

export default Room
