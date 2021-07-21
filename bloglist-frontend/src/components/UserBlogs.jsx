import React from 'react'
import styled from 'styled-components'

const List = styled.ul`
  text-decoration: none;
  padding-left: 1em;
  li:nth-child(odd) {
    background: #f0f0f0; /* Цвет фона */
   } 
`
const UserBlogs = (props) => {
  console.log(props.blog)
  const blogs = props.user.blogs
  if (!blogs) {
    return null
  }
  return (
    <div>
      <h2>{props.user.username}</h2>
      <h4>added blogs</h4>
      <div>
        <List >
          {blogs.map((blog) => {
            return (
              <li key={blog.id}> <div  >{blog.title}</div></li>
            )
          })}
        </List>
      </div>
    </div>
  )
}

export default UserBlogs