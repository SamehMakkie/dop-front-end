import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const isVisible = createSlice({
  name: 'searchVisibility',
  initialState,
  reducers: {
    toggle: (state) => {
        state.value = !state.value
    },
    setFalse: (state) => {
        state.value = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { setFalse, toggle } = isVisible.actions

export default isVisible.reducer