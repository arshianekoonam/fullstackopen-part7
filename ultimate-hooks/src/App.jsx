import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setResources(response.data)
      })
      .catch(error => console.log('Error fetching resource:', error))
  }, [baseUrl])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources(resources.concat(response.data))
    return response.data
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.reset()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
    name.reset()
    number.reset()
  }

  const { reset: resetContent, ...contentInput } = content
  const { reset: resetName, ...nameInput } = name
  const { reset: resetNumber, ...numberInput } = number

  return (
    <div style={{ maxWidth: 650, margin: '30px auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...contentInput} placeholder="note content..." style={{ padding: '6px 10px', width: '250px' }} required />
        <button type="submit" style={{ marginLeft: 8, padding: '6px 14px', cursor: 'pointer' }}>create</button>
      </form>
      <ul style={{ marginTop: 15, paddingLeft: 20 }}>
        {notes.map(n => <li key={n.id} style={{ margin: '4px 0' }}>{n.content}</li>)}
      </ul>

      <h2 style={{ marginTop: 30 }}>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <div style={{ marginBottom: 8 }}>
          name: <br />
          <input {...nameInput} placeholder="full name..." style={{ padding: '6px 10px', width: '250px' }} required />
        </div>
        <div>
          number: <br />
          <input {...numberInput} placeholder="phone number..." style={{ padding: '6px 10px', width: '250px' }} required />
          <button type="submit" style={{ marginLeft: 8, padding: '6px 14px', cursor: 'pointer' }}>create</button>
        </div>
      </form>
      <ul style={{ marginTop: 15, paddingLeft: 20 }}>
        {persons.map(p => <li key={p.id} style={{ margin: '4px 0' }}>{p.name} {p.number}</li>)}
      </ul>
    </div>
  )
}

export default App