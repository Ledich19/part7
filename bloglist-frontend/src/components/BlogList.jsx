import React from 'react'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import styled from 'styled-components'


const StyledLink = styled(Link)`
  text-decoration: none;
  padding-left: 1em;
  display: block;
  height: 2em;
  color: black;
`
const List = styled.div`
  text-decoration: none;
  padding-left: 1em;
  a:nth-child(2n) {
    background: #f0f0f0; /* Цвет фона */
   } 
`

const BlogList = () => {
  const blogdS = useSelector(state => state.blogs)
  const blogsSort = [...blogdS.sort((a, b) => b.likes - a.likes)]

  return (
    <List>
      <h2>blogs</h2>
      {blogsSort.map(blog =>
        <StyledLink key={blog.id} to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </StyledLink>
      )}
    </List>
  )
}
export default BlogList



