import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice'

export default configureStore({
  reducer: {
    user: userSliceReducer,
  },
})