import React from 'react'

const Anecdote = ({ anecdote }) => {

  const padding = {
    paddingBottom: 5
  }

  return (
    <div style={padding}>
      <h3>`{anecdote.content} by {anecdote.author}`</h3>
      <span>`has {anecdote.votes} votes`</span>
    </div>
  )
}

export default Anecdote