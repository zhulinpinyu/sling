import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const middleware = [thunk]
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

export default createStoreWithMiddleware(reducers)
