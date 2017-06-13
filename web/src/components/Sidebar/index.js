import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite'

import RoomLink from './RoomLink'

const styles = StyleSheet.create({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgb(38,28,37)'
  },
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
  },
  logoutButton: {
    padding: '0',
    background: 'transparent',
    border: '0',
    cursor: 'pointer'
  }
})

class Sidebar extends Component {
  static propTypes = {
    rooms: PropTypes.array.isRequired,
    onLogoutClick: PropTypes.func,
    router: PropTypes.object.isRequired
  }

  static defaultProps = {
    onLogoutClick: () => {}
  }

  render(){
    const { rooms } = this.props
    return (
      <div className={css(styles.sidebar)}>
        {rooms.map(room => <RoomLink key={room.id} room={room} />)}
        <Link
          to="/"
          activeOnlyWhenExact
          className={css(styles.link)}
          activeClassName={css(styles.activeLink)}
        >
          <div className={css(styles.badge)}>
            <span className="fa fa-plus" />
          </div>
        </Link>
        <div style={{ flex: '1' }} />
        <button
          onClick={() => this.props.onLogoutClick(this.props.router)}
          className={css(styles.link, styles.logoutButton)}
        >
          <div className={css(styles.badge)}>
            <span className="fa fa-sign-out" />
          </div>
        </button>
      </div>
    )
  }
}

export default Sidebar
