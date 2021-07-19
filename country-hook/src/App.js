import React, { useState, useEffect } from 'react'
import countryServices from './services/country'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (countryName, ...params) => {
  const [country, setCountry] = useState(null)

  useEffect( async () => {
    if (!countryName) {
      return null
    }
    try {
      const countries = await countryServices.find(countryName)
      let country = {}
      params.forEach((e) => {
        country[e] = countries[0][e]
      })
      setCountry({
        found: true,
        data: {
          ...country
        }
      })
    } catch(e) {
      setCountry({ found: false })
    }
  },[countryName])
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name, 'name','capital', 'population','flag')

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
