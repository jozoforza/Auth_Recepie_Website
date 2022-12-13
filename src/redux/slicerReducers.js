import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    value: 0
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    fetchUser: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount, fetchUser } = counterSlice.actions

export default counterSlice.reducer

export const selectUser = state => state.users.value