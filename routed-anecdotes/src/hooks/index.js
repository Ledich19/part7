import {
  useState
} from 'react'

export const useFild = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return [{
    name,
    value,
    onChange,
  }, reset]
}