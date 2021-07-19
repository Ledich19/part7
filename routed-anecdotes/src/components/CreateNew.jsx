import React from 'react'
import { useFild } from '../hooks'
import { useHistory } from 'react-router'

const CreateNew = (props) => {
  const [content,contentReset] = useFild('content')
  const [author,authirReset] = useFild('author')
  const [info,infoReset] = useFild('info')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNotification(content)
    history.push('/')
  }

  const handleReset = (event) => {
    event.preventDefault()
    contentReset()
    authirReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input  {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input  {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset} >reset</button>
      </form>
    </div>
  )

}
export default CreateNew