import { reset } from 'redux-form'
import api from '../api'
import { fetchUserRooms } from './rooms'

const setCurrentUser = (dispatch, response) => {
  localStorage.setItem('token', JSON.stringify(response.meta.token))
  dispatch({
    type: 'AUTHENTICATION_SUCCESS',
    payload: response
  })
  dispatch(fetchUserRooms(response.data.id))
}

export const login = (data, router) =>
  dispatch => api.post('/sessions', data)
    .then((response) => {
      setCurrentUser(dispatch, response)
      dispatch(reset('login'))
      router.transitionTo('/')
    })

export const signup = (data, router) =>
  dispatch => api.post('/users', data)
    .then((response) => {
      setCurrentUser(dispatch, response)
      dispatch(reset('signup'))
      router.transitionTo('/')
    })

export const logout = router =>
  dispatch => api.delete('/sessions')
    .then(() => {
      localStorage.removeItem('token')
      dispatch({ type: 'LOGOUT' })
      router.transitionTo('/')
    })

export const authenticate = () => {
  return (dispatch) => {
    dispatch({ type: 'AUTHENTICATION_REQUEST' })
    api.post('/sessions/refresh')
    .then((response) => {
      setCurrentUser(dispatch, response)
    }).catch(() => {
      localStorage.removeItem('token')
      window.location = '/login'
    })
  }
}

export const unauthenticate = () => {
  return { type: 'AUTHENTICATION_FAILURE' }
}
