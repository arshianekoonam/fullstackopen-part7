import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification || !notification.message) {
    return null
  }

  const isError = notification.type === 'error'

  const style = {
    padding: '12px 18px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '15px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: isError ? '#fef2f2' : '#ecfdf5',
    color: isError ? '#991b1b' : '#065f46',
    border: `1px solid ${isError ? '#fecaca' : '#a7f3d0'}`,
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
  }

  return (
    <div style={style} className="notification">
      <span>{isError ? '⚠️' : '✅'}</span>
      <span>{notification.message}</span>
    </div>
  )
}

export default Notification