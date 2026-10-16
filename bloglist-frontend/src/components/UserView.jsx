import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

const UserView = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users.find(u => u.id === id))

  if (!user) {
    return <div style={{ padding: '20px', color: '#64748b' }}>User not found...</div>
  }

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '10px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <h2 style={{ margin: '0 0 16px 0', color: '#0f172a' }}>{user.name}</h2>
      <h3 style={{ margin: '0 0 12px 0', color: '#334155', fontSize: '17px' }}>added blogs</h3>
      {user.blogs && user.blogs.length > 0 ? (
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {user.blogs.map(b => (
            <li key={b.id} style={{ marginBottom: '8px' }}>
              <Link to={`/blogs/${b.id}`} style={{ color: '#0284c7', textDecoration: 'none' }}>
                {b.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#94a3b8', fontStyle: 'italic', margin: 0 }}>no blogs added yet...</p>
      )}
    </div>
  )
}

export default UserView