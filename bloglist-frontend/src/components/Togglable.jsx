import React, { useImperativeHandle, useState } from 'react'

import styled from 'styled-components'

const Button = styled.button`
  background: grey;
  padding: 0.2em;
  border-radius: 3px;
  margin-top: 0.1em;
  font-weight: bold;
  color: white; 
  
`

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <Button onClick={() => setVisible(true)}>{props.btnName}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
      <div style={showWhenVisible}>
        <Button onClick={() => setVisible(false)}>cancel</Button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable