const INIT_STATE = {
  isAuthenticated: false,
  currentUser: {}
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'AUTHENTICATION_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload.data
      }
    case 'LOGOUT':
      return INIT_STATE
    default:
      return state
  }
}
