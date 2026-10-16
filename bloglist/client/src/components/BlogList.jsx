import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogFormRef = useRef()
  const blogs = useSelector(state => {
    return [...state.blogs].sort((a, b) => (b.likes || 0) - (a.likes || 0))
  })

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm onBlogCreated={() => blogFormRef.current?.toggleVisibility()} />
      </Togglable>

      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {blogs.map(blog => (
          <div
            key={blog.id}
            style={{
              padding: '16px 20px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
          >
            <Link
              to={`/blogs/${blog.id}`}
              style={{
                textDecoration: 'none',
                color: '#0f172a',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              {blog.title} <span style={{ color: '#64748b', fontWeight: '400', fontSize: '14px' }}>— {blog.author}</span>
            </Link>
            <span style={{
              backgroundColor: '#e0f2fe',
              color: '#0369a1',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600'
            }}>
              ❤️ {blog.likes || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList