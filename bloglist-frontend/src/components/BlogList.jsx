import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import Blog from './Blog'
import { likeBlog } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

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
      <Link key={blog.id} to={`/blogs/${blog.id}`}>
        <Blog
          blog={blog}
          handleLike={handleLike}
          handleDeleteBlog={handleDeleteBlog}
          username={username}
        />
      </Link>
    ))

}
export default BlogList



