import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const { title,author } = blog

  return (
    <div className='blog'>
      <div className='blogMin'>
        {title} {author}
      </div>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog