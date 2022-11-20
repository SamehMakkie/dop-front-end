import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    id: 1,
    username: "Sameh",
    dateOfBirth: "Dec 08 1999",
  },
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.value = action.payload
    },
    clearUser: (state) => {
        state.value = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = user.actions

export default user.reducer