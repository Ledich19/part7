import React from 'react'

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
        {blogs.map((blog) => {
          return (
            <ul key={blog.id}>
              <li> <div  >{blog.title}</div></li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}

export default UserBlogs