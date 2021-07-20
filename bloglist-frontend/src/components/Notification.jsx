import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => {
    return state.notification
  })

  return (
    notification
      ? <div className={'info'}>{notification}</div>
      : null
  )
}
export default Notification



