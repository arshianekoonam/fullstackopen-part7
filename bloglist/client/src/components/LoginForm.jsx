import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userSlice'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div style={{
      maxWidth: '380px',
      margin: '60px auto',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e2e8f0'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#0f172a' }}>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '6px' }}>username</label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            required
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '6px' }}>password</label>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#0284c7',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm