import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl,newBlog,config)
  return response.data
}

const update = async (id,newBlog) => {
  console.log(id,newBlog)
  const response = await axios.put(`${baseUrl}/${id}`,newBlog)
  console.log(response)
  return response.data
}
const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(id)
  const response = await axios.delete(`${baseUrl}/${id}`,config)
  console.log(response.data)
  return response.data
}

const addComent = async (id,comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`,{ text:comment })
  return response.data
}

export default { getAll , create, setToken, update, remove , addComent }