import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  connectToChannel,
  leaveChannel,
  createMessage,
  loadMoreMessages
} from '../../actions/room'
import RoomNavBar from '../../components/RoomNavBar'
import MessageList from '../../components/MessageList'
import MessageForm from '../../components/MessageForm'
import RoomSidebar from '../../components/RoomSidebar'

class Room extends Component {
  static propTypes = {
    params: PropTypes.object,
    connectToChannel: PropTypes.func,
    leaveChannel: PropTypes.func,
    createMessage: PropTypes.func,
    loadMoreMessages: PropTypes.func,
    socket: PropTypes.any,
    channel: PropTypes.any,
    room: PropTypes.object,
    messages: PropTypes.array,
    currentUser: PropTypes.object,
    presentUsers: PropTypes.array,
    pagination: PropTypes.object,
    loadingOlderMessages: PropTypes.bool
  }

  static defaultProps = {
    params: {},
    connectToChannel: () => {},
    leaveChannel: () => {},
    createMessage: () => {},
    loadMoreMessages: () => {},
    room: {},
    messages: [],
    socket: null,
    channel: null,
    currentUser: {},
    presentUsers: [],
    pagination: {},
    loadingOlderMessages: false
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

  handleMessageCreate = (data) => {
    this.props.createMessage(this.props.channel, data)
    this.messagelist.scrollToBottom()
  }

  handleLoadMore = () => {
    this.props.loadMoreMessages(
      this.props.params.id,
      { last_seen_id: this.props.messages[0].id }
    )
  }

  render() {
    const {
      room,
      messages,
      currentUser,
      presentUsers,
      pagination: { total_pages, page_number },
      loadingOlderMessages
    } = this.props
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <RoomSidebar
          room={room}
          currentUser={currentUser}
          presentUsers={presentUsers}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RoomNavBar room={room} />
          <MessageList
            moreMessages={total_pages > page_number}
            messages={messages}
            onLoadMore={this.handleLoadMore}
            loadingOlderMessages={loadingOlderMessages}
            ref={(c) => { this.messagelist = c }}
          />
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
    messages: room.messages,
    currentUser: session.currentUser,
    presentUsers: room.presentUsers,
    pagination: room.pagination,
    loadingOlderMessages: room.loadingOlderMessages
  }
}

export default connect(mapStateToProps, {
  connectToChannel,
  leaveChannel,
  createMessage,
  loadMoreMessages
})(Room)
