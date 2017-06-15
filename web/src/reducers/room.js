const INIT_STATE = {
  channel: null,
  currentRoom: {},
  messages: [],
  presentUsers: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'ROOM_CONNECT_TO_CHANNEL':
      return {
        ...state,
        channel: action.payload.channel,
        currentRoom: action.payload.room,
        messages: action.payload.messages.reverse()
      }
    case 'USER_LEFT_ROOM':
      return INIT_STATE
    case 'MESSAGE_CREATED':
      return {
        ...state,
        messages: [
          ...state.messages,
          action.payload.message
        ]
      }
    case 'ROOM_PRESENCE_UPDATE':
      return {
        ...state,
        presentUsers: action.payload.presentUsers
      }
    default:
      return state
  }
}
