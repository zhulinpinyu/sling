const INIT_STATE = {
  all: [],
  currentRooms: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'FETCH_ROOMS_SUCCESS':
      return {
        ...state,
        all: action.payload.data
      }
    case 'FETCH_USER_ROOMS_SUCCESS':
      return {
        ...state,
        currentRooms: action.payload.data
      }
    case 'CREATE_ROOM_SUCCESS':
      return {
        ...state,
        currentRooms: [
          ...state.currentRooms,
          action.payload.data
        ],
        all: [
          action.payload.data,
          ...state.all
        ]
      }
    case 'JOINED_ROOM':
      return {
        ...state,
        currentRooms: [
          ...state.currentRooms,
          action.payload.data
        ]
      }
    default:
      return state
  }
}
