import React, { Component } from 'react'
import PropTypes from 'prop-types'
import md5 from 'md5'

class Avatar extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    size: PropTypes.number,
    style: PropTypes.object
  }

  static defaultProps = {
    size: 40,
    style: {}
  }

  render() {
    const { email, size, style } = this.props
    const url = `https://secure.gravatar.com/avatar/${md5(email)}`
    return (
      <img
        src={url}
        alt={email}
        style={{ width: `${size}px`, height: `${size}px`, borderRadius: '4px', ...style }}
      />
    )
  }
}

export default Avatar
