import { reset } from 'redux-form'
import { Presence } from 'phoenix'

const syncPresentUsers = (dispatch, presences) => {
  const presentUsers = Presence.list(presences, (id, { metas: [first] }) => first.user)
  dispatch({
    type: 'ROOM_PRESENCE_UPDATE',
    payload: {
      presentUsers
    }
  })
}

export const connectToChannel = (socket, roomId) => {
  return (dispatch) => {
    if(!socket) return false
    const channel = socket.channel(`room:${roomId}`)
    let presences = {}

    channel.on('presence_state', (state) => {
      presences = Presence.syncState(presences, state)
      syncPresentUsers(dispatch, presences)
    })

    channel.on('presence_diff', (diff) => {
      presences = Presence.syncDiff(presences, diff)
      syncPresentUsers(dispatch, presences)
    })

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
