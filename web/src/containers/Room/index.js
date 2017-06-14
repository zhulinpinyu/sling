import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { connectToChannel, leaveChannel, createMessage } from '../../actions/room'
import RoomNavBar from '../../components/RoomNavBar'
import MessageList from '../../components/MessageList'
import MessageForm from '../../components/MessageForm'

class Room extends Component {
  static propTypes = {
    params: PropTypes.object,
    connectToChannel: PropTypes.func,
    leaveChannel: PropTypes.func,
    createMessage: PropTypes.func,
    socket: PropTypes.any,
    channel: PropTypes.any,
    room: PropTypes.object,
    messages: PropTypes.array
  }

  static defaultProps = {
    params: {},
    connectToChannel: () => {},
    leaveChannel: () => {},
    createMessage: () => {},
    room: {},
    messages: [],
    socket: null,
    channel: null
  }

  componentDidMount(){
    const { socket, params: { id: roomId } } = this.props
    this.props.connectToChannel(socket, roomId)
  }

  componentWillReceiveProps(nextProps){
    // Room change reconnect to channel
    if(nextProps.params.id !== this.props.params.id){
      this.props.leaveChannel(this.props.channel)
      this.props.connectToChannel(nextProps.socket, nextProps.params.id)
    }

    // Socket change reconnect to channel
    if(!this.props.socket && nextProps.socket){
      this.props.connectToChannel(nextProps.socket, nextProps.params.id)
    }
  }

  componentWillUnmount(){
    this.props.leaveChannel(this.props.channel)
  }

  handleMessageCreate = data => this.props.createMessage(this.props.channel, data)

  render() {
    const { room, messages } = this.props
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RoomNavBar room={room} />
          <MessageList messages={messages} />
          <MessageForm onSubmit={this.handleMessageCreate} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ session, room }) => {
  return {
    socket: session.socket,
    room: room.currentRoom,
    channel: room.channel,
    messages: room.messages
  }
}

export default connect(mapStateToProps, {
  connectToChannel,
  leaveChannel,
  createMessage
})(Room)
