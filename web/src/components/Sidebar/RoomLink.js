import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
  link: {
    position: 'relative',
    display: 'flex',
    width: '65px',
    color: 'rgba(255,255,255,.6)',
    ':hover': {
      textDecoration: 'none'
    },
    ':focus': {
      textDecoration: 'none'
    }
  },
  activeLink: {
    color: '#fff',
    ':after': {
      position: 'absolute',
      top: '12px',
      bottom: '12px',
      left: '0',
      width: '3px',
      background: 'rgba(255,255,255,.2)',
      borderTopRightRadius: '3px',
      borderBottomRightRadius: '3px',
      content: '""'
    }
  },
  badge: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45px',
    height: '45px',
    margin: '12px auto',
    fontSize: '20px',
    background: 'rgba(255,255,255,.2)',
    borderRadius: '5px'
  }
})

class RoomLink extends Component {
  static propTypes = {
    room: PropTypes.object.isRequired
  }

  render(){
    const { room } = this.props
    return (
      <Link to={`/r/${room.id}`} className={css(styles.link)} activeClassName={css(styles.activeLink)}>
        <div className={css(styles.badge)}>
          <span>{room.name.charAt(0)}</span>
        </div>
      </Link>
    )
  }
}

export default RoomLink
