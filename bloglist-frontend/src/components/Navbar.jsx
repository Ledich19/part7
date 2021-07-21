import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  color: white;
  font-size: 1.1em;
  text-decoration: none;
  padding-left: 1em;
`
const StyledNavbar = styled.div`
  background: grey;
  padding: 0.3em;
  border-radius: 3px;
`
const Button = styled.button`
  border: 2px solid Chocolate; 
  background: grey;
  padding: 0.2em;
  border-radius: 3px;
  margin-left: 1em;
  font-weight: bold;

`
const Info = styled.span`
  margin-left: 1em;
  font-weight: bold;
`

useDispatch
const Navbar = () => {
  const name = useSelector(store => store.user.name)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <StyledNavbar>
      <span>
        <StyledLink to='/' >blogs </StyledLink>
        <StyledLink to='/users' >users </StyledLink>
      </span>
      <Info>
        <span>{`${name} logged in`}</span>
        <Button onClick={handleLogout} >logout</Button>
      </Info>
    </StyledNavbar>
  )
}

export default Navbar