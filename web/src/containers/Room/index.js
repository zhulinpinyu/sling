import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { connectToChannel, leaveChannel } from '../../actions/room'

class Room extends Component {
  static propTypes = {
    params: PropTypes.object,
    connectToChannel: PropTypes.func,
    leaveChannel: PropTypes.func,
    socket: PropTypes.any,
    channel: PropTypes.any
  }

  static defaultProps = {
    params: {},
    connectToChannel: () => {},
    leaveChannel: () => {},
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

  render() {
    return (
      <div>Room: {this.props.params.id}</div>
    )
  }
}

const mapStateToProps = ({ session, room }) => {
  return {
    socket: session.socket,
    room: room.currentRoom,
    channel: room.channel
  }
}

export default connect(mapStateToProps, {
  connectToChannel,
  leaveChannel
})(Room)
