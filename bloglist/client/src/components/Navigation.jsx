import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userSlice'

const Navigation = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 24px',
      backgroundColor: '#1e293b',
      color: '#fff',
      borderRadius: '10px',
      marginBottom: '25px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#38bdf8' }}>BlogApp</span>
        <Link to="/" style={{ color: '#f1f5f9', textDecoration: 'none', fontWeight: '500' }}>blogs</Link>
        <Link to="/users" style={{ color: '#f1f5f9', textDecoration: 'none', fontWeight: '500' }}>users</Link>
      </div>
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '14px', color: '#cbd5e1' }}>
            👤 <strong>{user.name}</strong> logged in
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: '6px 14px',
              backgroundColor: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '13px'
            }}
          >
            logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navigation