import React, { useEffect, useRef } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserBlogs from './components/UserBlogs'
import BlogView from './components/BlogView'
import Navbar from './components/Navbar'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Users from './components/Users'
import blogService from './services/blogs'
import usersService from './services/users'
import { initialBlogs  } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReduser'
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom'

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

  useEffect( async () => {
    const users = await usersService.getAll()
    dispatch(initUsers(users))
  },[])

  const users = useSelector(state => state.users)
  const match = useRouteMatch('/users/:id')
  const userShow = match
    ? users.find(u => u.id === match.params.id)
    : null

  const blogs = useSelector(state => state.blogs)
  const blogMatch = useRouteMatch('/blogs/:id')
  const blogShow = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null


  const user = useSelector(state => state.user)
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
        <Navbar />

        <Notification/>

        <Togglable btnName={'create new blog'} ref={blogFormRef}>
          <BlogForm toggleVisibility={() => blogFormRef.current.toggleVisibility()} />
        </Togglable>

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
            <BlogList />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App