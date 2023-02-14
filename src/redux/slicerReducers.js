import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      likes: [],
      user_id: null
    }
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    fetchUser: (state, action) => {
      state.value = action.payload
    },
    addLike: (state, action) => {
      let likeIndex = 0
      state.value.likes.map((like,index)=>{
        if(like.recipe_id === action.payload.recipe_id){
          likeIndex = index
        }
      })
      state.value.likes.splice(likeIndex,1)
      state.value.likes.push(action.payload)
    }
  }
})

export const { increment, decrement, incrementByAmount, fetchUser, addLike } = counterSlice.actions

export default counterSlice.reducer

export const selectUser = state => state.users.value