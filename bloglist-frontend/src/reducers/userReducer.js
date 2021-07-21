import userService from '../services/login'
import { setNotification } from './notificationReducer'
import { setNotificationError } from './notificationReducer'

const userReducer = (state = null, action) => {

  switch (action.type) {

  case 'USER_LOGIN': {
    return  action.data
  }

  case 'SET_USER': {
    return  action.data
  }
  case 'LOGOUT_USER': {
    return  action.data
  }

  default:
    return state
  }

}

export const loginUser = (data) => {
  return async (dispatch) => {
    try {const user = await userService.login(data)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      dispatch({
        type: 'USER_LOGIN',
        data: user,
      })
      dispatch(setNotification('login ;)', 5))
    } catch(e) {
      dispatch(setNotificationError('wrong username or password', 5))
    }
  }
}

export const setUser = (data) => {
  return ({
    type: 'SET_USER',
    data,
  })
}

export const logoutUser = () => {
  window.localStorage.clear()
  return ({
    type: 'LOGOUT_USER',
    data: null,
  })
}

export default userReducer