import { createStore } from 'redux'
import blogReducer from './reducers/blogReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware , combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
})

const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store