import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link
} from 'react-router-dom'

import styled from 'styled-components'

const StyledLink = styled(Link)`
  text-decoration: none;
  padding-left: 1em;
  display: block;
  height: 2em;
  color: black;
`
const List = styled.ul`
  text-decoration: none;
  padding-left: 1em;
  li:nth-child(odd) {
    background: #f0f0f0; /* Цвет фона */
   } 
`

const Users = () => {

  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }
  return (
    <div>
      <h2>Users</h2>
      <h4>blogs created</h4>
      <List>
        {users.map((user) => {
          return (
            <li key={user.id} >
              <div >
                <StyledLink to={`/users/${user.id}`} >{user.name} <span>{user.blogs.length}</span></StyledLink>
              </div>
            </li>
          )
        })}
      </List>
    </div>
  )
}

export default Users