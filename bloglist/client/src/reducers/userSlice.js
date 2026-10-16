import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationSlice'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const loginUser = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification(`Welcome back, ${user.name}!`, 'success', 5))
      return user
    } catch (error) {
      dispatch(setNotification('wrong username or password', 'error', 5))
      throw error
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    dispatch(clearUser())
    dispatch(setNotification('Logged out successfully', 'success', 3))
  }
}

export default userSlice.reducer