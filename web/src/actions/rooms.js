import api from '../api'

export const fetchRooms = () => {
  return dispatch => api.fetch('/rooms')
    .then((response) => {
      dispatch({
        type: 'FETCH_ROOMS_SUCCESS',
        payload: response
      })
    })
}

export const fetchUserRooms = (userId) => {
  return dispatch => api.fetch(`/users/${userId}/rooms`)
    .then((response) => {
      dispatch({
        type: 'FETCH_USER_ROOMS_SUCCESS',
        payload: response
      })
    })
}

export const createRoom = (data, router) => {
  return dispatch => api.post('/rooms', data)
    .then((response) => {
      dispatch({
        type: 'CREATE_ROOM_SUCCESS',
        payload: response
      })
      router.transitionTo(`/r/${response.data.id}`)
    })
}

export const joinRoom = (roomId, router) => {
  return dispatch => api.post(`/rooms/${roomId}/join`)
    .then((response) => {
      dispatch({
        type: 'JOINED_ROOM',
        payload: response
      })
      router.transitionTo(`/r/${response.data.id}`)
    })
}
