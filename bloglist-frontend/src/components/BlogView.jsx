import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const BlogView = (props) => {
  const history = useHistory()
  if (!props.blog) {
    return null
  }
  const dispatch = useDispatch()
  console.log(props.blog)
  const { title, url, likes, author, id } = props.blog
  const handleLike = async (data) => {
    dispatch(likeBlog(data))
  }
  const handleDeleteBlog = async (id, title, author) => {
    const confirm = window.confirm(`Remove blog ${title} by ${author}?`)
    if (confirm) {
      dispatch(deleteBlog({ id }))
      history.push('/blogs')
    }
  }
  const username = useSelector(store => store.user.username)
  const removeBtn = username === props.blog.user.username
    ? <button className='remove' onClick={() => handleDeleteBlog(id,title,author)}>remowe</button>
    : null
  return (
    <div>
      <h3>{title} {author}</h3>
      <a href={url}>{url}</a>
      <div className='likes'>{likes}
        <button className='likesBtn' onClick={() => handleLike({ title, url, likes, author, id })}>likes</button>
      </div>
      <div>added {props.blog.user.name}</div>
      {removeBtn}
    </div>
  )
}

export default BlogView