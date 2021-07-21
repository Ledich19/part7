import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import Coments from './Coments'

import styled from 'styled-components'

const Likes = styled.button`
background: grey;
margin-top: 0.1em;
background: grey;
color: white;
display: inline-block;
padding: 10px;
border-radius: 10px;
`
const ButtonRemove = styled.button`
padding: 0.2em 1em;
border-radius: 10px;
margin-top: 0.1em;
margin-left: 1em;
font-weight: bold; 
color: #f25167;
margin-left: 0;
`
const Blog = styled.div`
margin-top: 0.1em;
background: #a9a9aa;
padding: 10px;
border-radius: 10px;
`

const Url= styled.a`
display: block;
`
const BlogView = (props) => {
  const username = useSelector(store => store.user.username)
  const dispatch = useDispatch()
  const history = useHistory()
  if (!props.blog) {
    return null
  }
  const { title, url, likes, author, id , comments } = props.blog
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
  const removeBtn = username === props.blog.user.username
    ? <ButtonRemove onClick={() => handleDeleteBlog(id,title,author)}>remowe blog</ButtonRemove>
    : null
  return (
    <div>
      <Blog>
        <h3>{title} {author}</h3>
        <Url href={url}>{url}</Url>
        <Likes className='likesBtn' onClick={() => handleLike({ title, url, likes, author, id })}>{likes} likes</Likes>
        <div>added {props.blog.user.name}</div>
        {removeBtn}
      </Blog>
      <Coments comments={comments} blogId={id} />
    </div>
  )
}

export default BlogView