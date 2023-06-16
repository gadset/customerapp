import { createSlice } from '@reduxjs/toolkit'

export const modelSlice = createSlice({
  name: 'model',
  initialState: {
    value: '',
  },
  reducers: {
    setModelValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const IssueSlice = createSlice({
  name: 'issues',
  initialState: {
    value: [],
  },
  reducers: {
    setIssueValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const AddressSlice = createSlice({
  name: 'address',
  initialState: {
    value: {},
  },
  reducers: {
    setAddressValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const DateSlice = createSlice({
  name: 'date',
  initialState: {
    value: {},
  },
  reducers: {
    setDateValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const MobileSlice = createSlice({
  name: 'mobile',
  initialState: {
    value: {},
  },
  reducers: {
    setMobileValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const ImageSlice = createSlice({
  name: 'image',
  initialState: {
    value: {},
  },
  reducers: {
    setImageValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const UserIdSlice = createSlice({
  name: 'userid',
  initialState: {
    value: {},
  },
  reducers: {
    setUserIdValue: (state, action) => {
      state.value = action.payload
    },
  },
})
// Action creators are generated for each case reducer function
export const {setModelValue} = modelSlice.actions
export const {setIssueValue} = IssueSlice.actions
export const {setAddressValue} = AddressSlice.actions
export const {setDateValue} = DateSlice.actions
export const {setMobileValue} = MobileSlice.actions
export const {setImageValue} = ImageSlice.actions
export const {setUserIdValue} = UserIdSlice.actions

const modelReducer = modelSlice.reducer
const issueReducer = IssueSlice.reducer
const addressReducer = AddressSlice.reducer
const DateReducer = DateSlice.reducer
const MobileReducer = MobileSlice.reducer
const ImageReducer = ImageSlice.reducer
const UserReducer = UserIdSlice.reducer
export {modelReducer, issueReducer, addressReducer, DateReducer, MobileReducer, ImageReducer, UserReducer};
