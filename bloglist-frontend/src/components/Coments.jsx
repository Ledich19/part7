import React from 'react'
import { useDispatch } from 'react-redux'
import { createComent } from '../reducers/blogReducer'
import styled from 'styled-components'

const List = styled.ul`
  text-decoration: none;
  padding-left: 1em;
  font-style: italic;
  li:nth-child(odd) {
    background: #f0f0f0; /* Цвет фона */
   } 
`

const Coments = ({ comments, blogId }) => {
  console.log(comments)
  const dispatch = useDispatch()

  const addComent = async (event) => {
    event.preventDefault()
    const coment = event.target.coment.value
    event.target.coment.value = ''
    dispatch(createComent(blogId,coment))
  }

  return (
    <div>
      <List>
        {comments.map(comment => <li key={comment.id}>{comment.text}</li>)}
      </List>


      < form onSubmit={addComent} id='blogForm'>
        <div>
          write comment:
          <input
            id='coment'
            type="text"
            name="coment"
          />
          <button type="submit">add</button>
        </div>
      </form >
    </div>
  )
}

export default Coments