import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link
} from 'react-router-dom'

const Users = () => {

  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }
  return (
    <div>
      <h2>Users</h2>
      <h4>blogs created</h4>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id} >
              <div >
                <Link to={`/users/${user.id}`} >{user.name}</Link>
                <span> {user.blogs.length}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Users