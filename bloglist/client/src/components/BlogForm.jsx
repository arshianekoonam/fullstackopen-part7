import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogSlice'

const BlogForm = ({ onBlogCreated }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!title || !url) return

    try {
      await dispatch(createBlog({ title, author, url }))
      setTitle('')
      setAuthor('')
      setUrl('')
      if (onBlogCreated) onBlogCreated()
    } catch (error) {
      console.error('Failed to create blog:', error)
    }
  }

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      padding: '20px',
      borderRadius: '10px',
      border: '1px solid #e2e8f0',
      marginBottom: '20px'
    }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#0f172a' }}>create new blog</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '4px' }}>title:</label>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="blog title..."
            style={{ width: '100%', maxWidth: '400px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            required
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '4px' }}>author:</label>
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author name..."
            style={{ width: '100%', maxWidth: '400px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '4px' }}>url:</label>
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="https://..."
            style={{ width: '100%', maxWidth: '400px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '8px 18px',
            backgroundColor: '#0284c7',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm