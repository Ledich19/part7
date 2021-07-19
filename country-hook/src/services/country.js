import axios from 'axios'
const findUrl = 'https://restcountries.eu/rest/v2/name'

const find = async (name) => {
  const response = await axios.get(`${findUrl}/${name}?fullText=true`)
  return response.data
}

export default { find }