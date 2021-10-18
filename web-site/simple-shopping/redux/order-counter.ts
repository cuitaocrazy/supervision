import { createSlice, configureStore } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'orderCounter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
      state.value + 1
    },
    decrement: (state) => {
      state.value - 1
    },
    clear: (state) => {
      state.value = 0
    }
  }
})

export const {increment, decrement, clear} = slice.actions

export const selectCounter = (state: {[slice.name]: ReturnType<typeof slice.reducer>})=> state[slice.name].value

export default slice.reducer

const store = configureStore({reducer: {
  [slice.name]: slice.reducer
}})

