import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import Blog from './Blog'
import { likeBlog } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'

const BlogList = ({ username }) => {
  const dispatch = useDispatch()
  const blogdS = useSelector(state => state.blogs)
  const blogsSort = [...blogdS.sort((a,b) => b.likes - a.likes)]

  const handleLike = async (data) => {
    dispatch(likeBlog(data))
  }
  const handleDeleteBlog = async (id, title, author) => {
    const confirm = window.confirm(`Remove blog ${title} by ${author}?`)
    if (confirm) {
      dispatch(deleteBlog({ id }))
    }
  }

  return (
    blogsSort.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={handleLike}
        handleDeleteBlog={handleDeleteBlog}
        username={username}
      />
    ))

}
export default BlogList



