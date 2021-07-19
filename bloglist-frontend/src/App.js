import React, { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { initialBlogs , addBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'

const App = () => {
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initialBlogs(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON ) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      dispatch(setNotification('login ;)', 5))

    } catch (exception) {
      dispatch(setNotification('wrong username or password', 5))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const handleAddBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlog(newBlog, user.name, user.username))
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author}`, 5))
  }

  if (user === null){
    return (
      <div>
        <Notification/>
        <LoginForm login={handleLogin} />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification/>
        <h4>{`${user.name} logged in`}
          <button onClick={handleLogout} >logout</button>
        </h4>
        <Togglable btnName={'create new blog'} ref={blogFormRef}>
          <BlogForm createBlog={handleAddBlog} />
        </Togglable>
        <BlogList username={user.username} />
      </div>
    )
  }
}

export default App