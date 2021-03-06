const INIT_STATE = {
  isAuthenticated: false,
  willAuthenticate: true,
  currentUser: {},
  socket: null
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'AUTHENTICATION_REQUEST':
      return {
        ...state,
        willAuthenticate: true
      }
    case 'AUTHENTICATION_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        willAuthenticate: false,
        currentUser: action.payload.data
      }
    case 'AUTHENTICATION_FAILURE':
      return {
        ...state,
        willAuthenticate: false
      }
    case 'LOGOUT':
      return {
        ...INIT_STATE,
        willAuthenticate: false
      }
    case 'SOCKET_CONNECTED':
      return {
        ...state,
        socket: action.payload.socket
      }
    default:
      return state
  }
}
