import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) {
      setCountry(null)
      return
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        setCountry({
          found: true,
          data: {
            name: response.data.name.common,
            capital: response.data.capital ? response.data.capital[0] : 'N/A',
            population: response.data.population,
            flag: response.data.flags.png || response.data.flags.svg
          }
        })
      })
      .catch(() => {
        setCountry({ found: false })
      })
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div style={{ marginTop: 15, color: '#e53e3e', fontWeight: 'bold' }}>
        not found...
      </div>
    )
  }

  return (
    <div style={{ marginTop: 20, padding: 15, border: '1px solid #cbd5e1', borderRadius: 8, maxWidth: 400, background: '#f8fafc' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>{country.data.name}</h3>
      <div><strong>capital:</strong> {country.data.capital}</div>
      <div><strong>population:</strong> {country.data.population.toLocaleString()}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
        style={{ marginTop: 12, border: '1px solid #cbd5e1', borderRadius: 4, display: 'block' }}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value.trim())
  }

  return (
    <div style={{ maxWidth: 600, margin: '30px auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h2>Country Info (useCountry Hook)</h2>
      <form onSubmit={fetch}>
        <input {...nameInput} placeholder="enter country name..." style={{ padding: '6px 10px', width: '250px' }} />
        <button type="submit" style={{ marginLeft: 8, padding: '6px 14px', cursor: 'pointer' }}>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App