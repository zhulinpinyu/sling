import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
  roomSidebar: {
    color: '#ab9ba9',
    background: '#4d394b'
  },
  header: {
    padding: '20px 15px',
    marginBottom: '10px',
    width: '220px'
  },
  roomName: {
    marginBottom: '0',
    lineHeight: '1',
    fontSize: '22px',
    color: '#fff'
  },
  userList: {
    paddingLeft: '15px',
    listStyle: 'none'
  },
  username: {
    position: 'relative',
    paddingLeft: '20px',
    fontSize: '14px',
    fontWeight: '300',
    ':after': {
      position: 'absolute',
      top: '7px',
      left: 0,
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: 'rgb(64,151,141)',
      content: '""'
    }
  },
  listHeading: {
    marginBottom: '15px',
    marginLeft: '5px',
    fontSize: '13px',
    textTransform: 'uppercase'
  }
})

class RoomSidebar extends Component {
  static propTypes = {
    room: PropTypes.object,
    currentUser: PropTypes.object,
    presentUsers: PropTypes.array
  }

  static defaultProps = {
    room: {},
    currentUser: {},
    presentUsers: []
  }

  render() {
    const { room, currentUser, presentUsers } = this.props
    return (
      <div className={css(styles.roomSidebar)}>
        <div className={css(styles.header)}>
          <h2 className={css(styles.roomName)}>{room.name}</h2>
          <div style={{ fontSize: '13px' }}>{currentUser.name}</div>
        </div>
        <div className={css(styles.listHeading)}>Active Users</div>
        <ul className={css(styles.userList)}>
          {
            presentUsers.map((user) => {
              return (
                <li key={user.id} className={css(styles.username)}>{user.username}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default RoomSidebar
