import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationSlice'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updated = action.payload
      return state.map(b => (b.id !== updated.id ? b : updated))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch(appendBlog(newBlog))
      dispatch(setNotification(`a new blog '${newBlog.title}' by ${newBlog.author} added`, 'success', 5))
      return newBlog
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create blog'
      dispatch(setNotification(message, 'error', 5))
      throw error
    }
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    try {
      const updated = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: (blog.likes || 0) + 1,
        comments: blog.comments || [],
        user: blog.user?.id || blog.user
      }
      const saved = await blogService.update(blog.id, updated)
      dispatch(updateBlog(saved))
      dispatch(setNotification(`you liked '${blog.title}'`, 'success', 3))
    } catch (error) {
      dispatch(setNotification('Failed to like blog', 'error', 5))
    }
  }
}

export const deleteBlog = (id, title) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch(removeBlog(id))
      dispatch(setNotification(`Blog '${title}' removed successfully`, 'success', 5))
    } catch (error) {
      dispatch(setNotification('Failed to delete blog', 'error', 5))
    }
  }
}

export const addCommentToBlog = (id, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.addComment(id, comment)
      dispatch(updateBlog(updatedBlog))
      dispatch(setNotification('Comment added!', 'success', 3))
    } catch (error) {
      dispatch(setNotification('Failed to add comment', 'error', 5))
    }
  }
}

export default blogSlice.reducer