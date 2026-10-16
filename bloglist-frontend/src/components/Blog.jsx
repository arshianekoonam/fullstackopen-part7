import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  // State to manage the visibility of blog details
  const [visible, setVisible] = useState(false)

  // Basic styling for the blog item container
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // Toggle visibility state
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // Handle like button click
  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id || blog.user._id : null
    }
    updateLikes(blog.id, updatedBlog)
  }

  // Handle delete button click with confirmation dialog
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  // Check if the logged-in user is the creator of the blog
  const showDeleteButton = blog.user && user && (blog.user.username === user.username || blog.user.id === user.id || blog.user._id === user.id);

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
          <div>{blog.user && blog.user.name}</div>
          {showDeleteButton && <button onClick={handleDelete}>remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default Blog