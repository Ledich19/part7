import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => {
    return state.notification
  })
  console.log(notification)
  const classNitification = !notification.error
    ? 'info'
    :  'error'
  return (
    notification
      ? <div className={classNitification}>{notification.text}</div>
      : null
  )
}
export default Notification



