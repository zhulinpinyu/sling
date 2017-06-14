const INIT_STATE = {
  channel: null,
  currentRoom: {}
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'ROOM_CONNECT_TO_CHANNEL':
      return {
        ...state,
        channel: action.payload.channel,
        room: action.payload.room
      }
    case 'USER_LEFT_ROOM':
      return INIT_STATE
    default:
      return state
  }
}
