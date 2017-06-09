import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

const appReducer = combineReducers({
  form
})

export default (state, action) => {
  if(action.type === 'LOGOUT'){
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}
