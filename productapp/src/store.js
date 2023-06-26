import { configureStore } from '@reduxjs/toolkit'
import { addressReducer, emailreducer, nameReducer } from './reduxslice'
export default configureStore({
    reducer: {
      address : addressReducer,
      name : nameReducer,
      email : emailreducer

    },
  })