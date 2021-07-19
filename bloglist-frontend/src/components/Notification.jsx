import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => {
    return state.notification
  })

  return (
    <div className={'info'}>
      {notification}
    </div>
  )
}
export default Notification



