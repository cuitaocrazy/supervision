import { createSlice, ReducersMapObject, Action, AnyAction } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'orderCartItemCounter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    clear: (state) => {
      state.value = 0
    },
  },
})

export const { increment, decrement, clear } = counterSlice.actions

export const selectCount = (state: {[counterSlice.name]: ReturnType<typeof counterSlice.reducer>}) => state[counterSlice.name].value

const appendReducer = <S, A extends Action = AnyAction>(reducerMap: ReducersMapObject<S, A>) => ({ ...reducerMap, [counterSlice.name]: counterSlice.reducer })

export default appendReducer
