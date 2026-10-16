import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotificationState(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

export const { setNotificationState, clearNotification } = notificationSlice.actions

let timeoutId = null
export const setNotification = (message, type = 'success', seconds = 5) => {
  return dispatch => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(setNotificationState({ message, type }))
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer