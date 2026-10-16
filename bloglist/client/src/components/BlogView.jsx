import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { likeBlog, deleteBlog, addCommentToBlog } from '../reducers/blogSlice'

const BlogView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [commentText, setCommentText] = useState('')

  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const currentUser = useSelector(state => state.user)

  if (!blog) {
    return <div style={{ padding: '20px', color: '#64748b' }}>Blog not found...</div>
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id, blog.title))
      navigate('/')
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    dispatch(addCommentToBlog(blog.id, commentText.trim()))
    setCommentText('')
  }

  const blogCreatorUsername = blog.user?.username || (typeof blog.user === 'string' ? blog.user : null)
  const canDelete = currentUser && (currentUser.username === blogCreatorUsername)

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '28px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
      <h2 style={{ margin: '0 0 14px 0', color: '#0f172a' }}>
        {blog.title} <span style={{ color: '#64748b', fontWeight: '400', fontSize: '20px' }}>by {blog.author}</span>
      </h2>

      <div style={{ marginBottom: '12px' }}>
        <a href={blog.url} target="_blank" rel="noreferrer" style={{ color: '#0284c7', fontSize: '15px' }}>
          {blog.url}
        </a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <span style={{ fontSize: '16px', fontWeight: '600', color: '#334155' }}>
          {blog.likes || 0} likes
        </span>
        <button
          onClick={handleLike}
          style={{
            padding: '5px 14px',
            backgroundColor: '#0284c7',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          like 👍
        </button>
      </div>

      <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '18px' }}>
        added by <strong>{blog.user?.name || blog.user?.username || 'anonymous'}</strong>
      </div>

      {canDelete && (
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={handleDelete}
            style={{
              padding: '6px 14px',
              backgroundColor: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            remove blog
          </button>
        </div>
      )}

      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', marginTop: '20px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>comments</h3>
        <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            value={commentText}
            onChange={({ target }) => setCommentText(target.value)}
            placeholder="write a comment..."
            style={{
              flex: 1,
              maxWidth: '380px',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#10b981',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            add comment
          </button>
        </form>

        {blog.comments && blog.comments.length > 0 ? (
          <ul style={{ paddingLeft: '20px', margin: 0, color: '#334155' }}>
            {blog.comments.map((comment, idx) => (
              <li key={idx} style={{ marginBottom: '8px', lineHeight: '1.5' }}>
                {comment}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#94a3b8', fontStyle: 'italic', margin: 0 }}>no comments yet...</p>
        )}
      </div>
    </div>
  )
}

export default BlogView