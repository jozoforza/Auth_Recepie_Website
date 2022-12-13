import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slicerReducers'


export default configureStore({
  reducer: {
    users: userReducer,
  }
})