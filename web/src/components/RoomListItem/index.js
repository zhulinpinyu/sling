import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RoomListItem extends Component {
  static propTypes = {
    onRoomJoin: PropTypes.func.isRequired,
    room: PropTypes.object,
    currentUserRoomIds: PropTypes.array
  }

  static defaultProps = {
    room: {},
    currentUserRoomIds: []
  }

  render(){
    const { room, currentUserRoomIds } = this.props
    const isJoined = currentUserRoomIds.includes(room.id)
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ marginRight: '8px' }}>{room.name}</span>
        <button
          onClick={() => this.props.onRoomJoin(room.id)}
          disabled={isJoined}
          className="btn btn-sm"
        >
          {isJoined ? 'Joined' : 'Join'}
        </button>
      </div>
    )
  }
}

export default RoomListItem
