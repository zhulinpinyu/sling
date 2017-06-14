export const connectToChannel = (socket, roomId) => {
  return (dispatch) => {
    if(!socket) return false
    const channel = socket.channel(`room:${roomId}`)

    channel.join().receive('ok', (response) => {
      dispatch({
        type: 'ROOM_CONNECT_TO_CHANNEL',
        payload: {
          channel,
          room: response.room
        }
      })
    })
    return false
  }
}

export const leaveChannel = (channel) => {
  return (dispatch) => {
    if(channel){
      channel.leave()
    }
    dispatch({
      type: 'USER_LEFT_ROOM'
    })
  }
}
