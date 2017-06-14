import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
  navbar: {
    padding: '15px',
    background: '#fff',
    borderBottom: '1px solid rgb(240, 240, 240)'
  }
})

class RoomNavBar extends Component {
  static propTypes = {
    room: PropTypes.object
  }

  static defaultProps = {
    room: {}
  }

  render() {
    return (
      <nav className={css(styles.navbar)}>
        <div>{this.props.room.name}</div>
      </nav>
    )
  }
}

export default RoomNavBar
