import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { css, StyleSheet } from 'aphrodite'

import {
  fetchRooms,
  createRoom,
  joinRoom
} from '../../actions/rooms'
import Navbar from '../../components/Navbar'
import RoomListItem from '../../components/RoomListItem'
import NewRoomForm from '../../components/NewRoomForm'

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto'
  }
})

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    joinRoom: PropTypes.func.isRequired,
    createRoom: PropTypes.func.isRequired,
    fetchRooms: PropTypes.func.isRequired,
    currentUserRooms: PropTypes.array,
    rooms: PropTypes.array
  }

  static defaultProps = {
    currentUserRooms: [],
    rooms: []
  }

  componentDidMount(){
    this.props.fetchRooms()
  }

  handleNewRoomSubmit = (data) => {
    this.props.createRoom(data, this.context.router)
  }

  handleRoomJoin = roomId => this.props.joinRoom(roomId, this.context.router)

  renderRooms() {
    const currentUserRoomIds = this.props.currentUserRooms.map(room => room.id)
    return this.props.rooms.map((room) => {
      return (
        <RoomListItem
          key={room.id}
          room={room}
          onRoomJoin={this.handleRoomJoin}
          currentUserRoomIds={currentUserRoomIds}
        />
      )
    })
  }

  render(){
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <div className={`card ${css(styles.card)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create a new room</h3>
          <NewRoomForm onSubmit={this.handleNewRoomSubmit} />
        </div>
        <div className={`card ${css(styles.card)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Join a room</h3>
          {this.renderRooms()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ rooms }) => {
  return {
    rooms: rooms.all,
    currentUserRooms: rooms.currentUserRooms
  }
}

export default connect(mapStateToProps, {
  fetchRooms,
  createRoom,
  joinRoom
})(Home)
