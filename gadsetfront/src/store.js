import { configureStore } from '@reduxjs/toolkit'
import { modelReducer, addressReducer, issueReducer, DateReducer } from './reduxstore'
export default configureStore({
  reducer: {
    model : modelReducer,
    address : addressReducer,
    issues : issueReducer,
    date : DateReducer,
  },
})
