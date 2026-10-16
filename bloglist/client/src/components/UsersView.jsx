import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersView = () => {
  const users = useSelector(state => state.users)

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '10px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <h2 style={{ margin: '0 0 20px 0', color: '#0f172a' }}>Users</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ padding: '10px 14px', color: '#475569' }}>User</th>
            <th style={{ padding: '10px 14px', color: '#475569' }}>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '12px 14px' }}>
                <Link to={`/users/${u.id}`} style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '500' }}>
                  {u.name}
                </Link>
              </td>
              <td style={{ padding: '12px 14px', color: '#64748b', fontWeight: '600' }}>
                {u.blogs ? u.blogs.length : 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView