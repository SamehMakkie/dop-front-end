import { configureStore } from '@reduxjs/toolkit'
import searchVisibilityReducer from './features/searchVisibilitySlice'
import userReducer from './features/userSlice'
import cartReducer from './features/cartSlice'


const store = configureStore({
  reducer: {
    searchVisibilityReducer,
    userReducer,
    cartReducer
  },
})

export default store