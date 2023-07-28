import { createSlice } from '@reduxjs/toolkit'

export const addressSlice = createSlice({
  name: 'address',
  initialState: {
    value: '',
  },
  reducers: {
    setAddressValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const nameSlice = createSlice({
    name: 'name',
    initialState: {
      value: '',
    },
    reducers: {
      setnameValue: (state, action) => {
        state.value = action.payload
      },
    },
  })

  export const emailSlice = createSlice({
    name: 'email',
    initialState: {
      value: '',
    },
    reducers: {
      setemailValue: (state, action) => {
        state.value = action.payload
      },
    },
  })

  export const allSlice = createSlice({
    name: 'all',
    initialState: {
      value: '',
    },
    reducers: {
      setallValue: (state, action) => {
        state.value = action.payload
      },
    },
  })


  export const mobileSlice = createSlice({
    name: 'mobile',
    initialState: {
      value: '',
    },
    reducers: {
      setMobileValue: (state, action) => {
        state.value = action.payload
      },
    },
  })
//actions
export const {setAddressValue} = addressSlice.actions
export const {setnameValue} = nameSlice.actions
export const {setemailValue} = emailSlice.actions
export const {setMobileValue} = mobileSlice.actions
export const {setallValue} = allSlice.actions
//reducers
const addressReducer = addressSlice.reducer
const nameReducer = nameSlice.reducer
const emailreducer = emailSlice.reducer
const mobileReducer = mobileSlice.reducer
const allReducer = allSlice.reducer

export {addressReducer, nameReducer, emailreducer, mobileReducer, allReducer};