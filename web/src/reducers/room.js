const INIT_STATE = {
  channel: null,
  currentRoom: {},
  messages: [],
  presentUsers: [],
  loadingMoreMessages: false,
  pagination: {
    page_size: 0,
    page_number: 0,
    total_pages: 0,
    total_entries: 0
  }
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'ROOM_CONNECT_TO_CHANNEL':
      return {
        ...state,
        channel: action.payload.channel,
        currentRoom: action.payload.room,
        messages: action.payload.messages.reverse(),
        pagination: action.payload.pagination
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
    case 'FETCH_MESSAGES_REQUEST':
      return {
        ...state,
        loadingMoreMessages: true
      }
    case 'FETCH_MESSAGES_SUCCESS':
      return {
        ...state,
        messages: {
          ...action.payload.messages.reverse(),
          ...state.messages
        },
        loadingMoreMessages: false,
        pagination: action.payload.pagination
      }
    case 'FETCH_MESSAGES_FAILED':
      return {
        ...state,
        loadingMoreMessages: false
      }
    default:
      return state
  }
}
