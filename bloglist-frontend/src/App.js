import React, { useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { initialBlogs  } from './reducers/blogReducer'
// import usersService from './services/users'
import { logoutUser, setUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import { useSelector } from 'react-redux'
// import { initUsers } from './reducers/usersReduser'
import Users from './components/Users'
import usersService from './services/users'
import { initUsers } from './reducers/usersReduser'


import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom'
import UserBlogs from './components/UserBlogs'
import BlogView from './components/BlogView'

const App = () => {

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(async () => {
    const blogs = await blogService.getAll()
    dispatch(initialBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON ) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  useEffect( async () => {
    const users = await usersService.getAll()
    dispatch(initUsers(users))
  },[])

  const users = useSelector(state => state.users)
  const match = useRouteMatch('/users/:id')
  const userShow = match
    ? users.find(u => u.id === match.params.id)
    : null
  const user = useSelector(state => state.user)

  const blogs = useSelector(state => state.blogs)
  console.log(blogs)
  const blogMatch = useRouteMatch('/blogs/:id')
  const blogShow = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null
  console.log(blogShow)


  if (user === null){
    return (
      <div>
        <Notification/>
        <LoginForm  />
      </div>
    )
  } else {
    return (
      <div>

        <div>
          <span>
            <Link to='/' >blogs </Link>
            <Link to='/users' >users </Link>
          </span>
          <span>
            <span>{`${user.name} logged in`}</span>
            <button onClick={handleLogout} >logout</button>
          </span>
        </div>

        <Notification/>
        <h2>blogs</h2>
        <Switch>
          <Route path='/users/:id' >
            <UserBlogs user={userShow}/>
          </Route>

          <Route path='/blogs/:id' >
            <BlogView blog={blogShow} />
          </Route>

          <Route path='/users' >
            <Users/>
          </Route>
          <Route path='/' >
            <BlogList username={user.username} />
          </Route>
        </Switch>

        <Togglable btnName={'create new blog'} ref={blogFormRef}>
          <BlogForm toggleVisibility={() => blogFormRef.current.toggleVisibility()} />
        </Togglable>
      </div>
    )
  }
}

export default App