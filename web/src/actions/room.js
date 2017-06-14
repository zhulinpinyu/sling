import { reset } from 'redux-form'

export const connectToChannel = (socket, roomId) => {
  return (dispatch) => {
    if(!socket) return false
    const channel = socket.channel(`room:${roomId}`)

    channel.on('message_created', (message) => {
      dispatch({
        type: 'MESSAGE_CREATED',
        payload: { message }
      })
    })

    channel.join().receive('ok', (response) => {
      dispatch({
        type: 'ROOM_CONNECT_TO_CHANNEL',
        payload: {
          channel,
          room: response.room,
          messages: response.messages
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

export const createMessage = (channel, data) => {
  return dispatch => new Promise((resolve, reject) => {
    channel.push('new_message', data)
      .receive('ok', () => resolve(
        dispatch(reset('newMessage'))
      ))
      .receive('error', () => reject())
  })
}
