import { useState } from 'react'
import {
  Routes, Route, Link,
  useNavigate, useMatch
} from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 10
  }
  return (
    <div style={{ marginBottom: 15, padding: '10px 0', borderBottom: '1px solid #cbd5e1' }}>
      <Link to="/" style={padding}>anecdotes</Link>
      <Link to="/create" style={padding}>create new</Link>
      <Link to="/about" style={padding}>about</Link>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  if (!anecdote) return <div>Anecdote not found.</div>
  return (
    <div style={{ margin: '15px 0' }}>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <a href={anecdote.info} target="_blank" rel="noreferrer">{anecdote.info}</a>
      </p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul style={{ paddingLeft: 20 }}>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id} style={{ margin: '8px 0' }}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <blockquote style={{ borderLeft: '4px solid #cbd5e1', paddingLeft: 12, fontStyle: 'italic' }}>
      An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."
    </blockquote>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div style={{ marginTop: 30, paddingTop: 15, borderTop: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b' }}>
    Anecdote app for <a href="https://fullstackopen.com/" target="_blank" rel="noreferrer">Full Stack Open</a>.
    See <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js" target="_blank" rel="noreferrer">source code</a>.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  // Destructure out reset so it is not passed to the HTML input element (Fix for 7.6)
  const { reset: resetContent, ...contentInput } = content
  const { reset: resetAuthor, ...authorInput } = author
  const { reset: resetInfo, ...infoInput } = info

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          content: <br />
          <input {...contentInput} style={{ width: '320px', padding: '6px' }} required />
        </div>
        <div style={{ marginBottom: 10 }}>
          author: <br />
          <input {...authorInput} style={{ width: '320px', padding: '6px' }} required />
        </div>
        <div style={{ marginBottom: 15 }}>
          url for more info: <br />
          <input {...infoInput} style={{ width: '320px', padding: '6px' }} required />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="submit" style={{ padding: '6px 14px' }}>create</button>
          <button type="button" onClick={handleReset} style={{ padding: '6px 14px' }}>reset</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote '${anecdote.content}' created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  return (
    <div style={{ maxWidth: 700, margin: '20px auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && (
        <div style={{
          border: '1px solid #059669',
          backgroundColor: '#ecfdf5',
          color: '#065f46',
          padding: 10,
          borderRadius: 4,
          marginBottom: 15
        }}>
          {notification}
        </div>
      )}
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App