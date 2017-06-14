const INIT_STATE = {
  channel: null,
  currentRoom: {},
  messages: []
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
    default:
      return state
  }
}
