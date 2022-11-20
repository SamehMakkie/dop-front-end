import { configureStore } from '@reduxjs/toolkit'
import searchVisibilityReducer from './features/searchVisibilitySlice'
import userReducer from './features/userSlice'


const store = configureStore({
  reducer: {
    searchVisibilityReducer,
    userReducer
  },
})

export default store