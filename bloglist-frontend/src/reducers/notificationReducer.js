const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data

  case 'CLEAN_NOTIFICATION':
    return ''
  default:
    return state
  }
}

let timerID
export const setNotification = (data, time) => {
  return (dispatch) => {
    const notification = {
      type: 'SET_NOTIFICATION',
      data
    }
    clearTimeout(timerID)
    dispatch(notification)
    timerID = setTimeout(() => {
      dispatch({
        type: 'CLEAN_NOTIFICATION',
      })
    }, time * 1000)
  }
}

export const cleanNotification = () => {
  return {
    type: 'CLEAN_NOTIFICATION',
  }
}

export default notificationReducer