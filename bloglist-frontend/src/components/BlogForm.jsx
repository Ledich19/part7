import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import styled from 'styled-components'

const Input = styled.input`
  display:block;
  width:100%;
  margin: 0 0 10px 0;
  padding:5px;
  border-radius:10px;
  border: 1px solid #eee;
  transition: .3s border-color;
  &:hover {
    border: 1px solid #aaa;
  }
`
const Form = styled.form`
  border-radius:10px;
  border: 1px solid grey;
  padding: 20px;
  width:50%;
`
const Button = styled.button`
  background: #dedfde;
  padding: 0.2em;
  border-radius: 10px;
  margin-top: 0.1em;
  font-weight: bold;
  width:100%;
  border: 1px solid Chocolate; 

  
`

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      author,
      title,
      url,
    }
    toggleVisibility()
    dispatch(addBlog(newBlog, user.name, user.username))
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author}`, 5))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      < Form onSubmit={handleAddBlog} id='blogForm'>
        <div>
          title:
          <Input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          author:
          <Input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url:
          <Input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button type="submit">create</Button>
      </Form >
    </>
  )
}

export default BlogForm