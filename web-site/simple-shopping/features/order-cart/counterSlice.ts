import { createSlice, ReducersMapObject, Action, AnyAction } from '@reduxjs/toolkit'
export type Order ={
  USVOrgID?: string,
  USVItemID?: string,
  USVItemName?: string,
  USVItemDesc?: string,
  PayerRemark?: string,
  TranAmt: number,
  image:string
}

export const counterSlice = createSlice({
  name: 'orderCartItemCounter',
  initialState: {
    value: 0,
    carList: [],
  },
  reducers: {
    increment: (state, { payload }) => {
      state.value += 1
      state.carList.push(payload.payload)
    },
    decrement: (state, { payload }) => {
      state.value -= 1
      // for (let i = 0; i < state.carList.length; i++) {
      //   if (state.carList.USVItemID === payload.payload.USVItemID) {
      //     state.carList.splice(i, 1)
      //     state.value -= 1
      //     break
      //   }
      // }
    },
    clear: (state) => {
      state.value = 0
      state.carList = []
    },
  },
})

export const { increment, decrement, clear } = counterSlice.actions

export const selectCount = (state: {[counterSlice.name]: ReturnType<typeof counterSlice.reducer>}) => state[counterSlice.name].value

export const selectCarList = (state: {[counterSlice.name]: ReturnType<typeof counterSlice.reducer>}) => state[counterSlice.name].carList

const appendReducer = <S, A extends Action = AnyAction>(reducerMap: ReducersMapObject<S, A>) => ({ ...reducerMap, [counterSlice.name]: counterSlice.reducer })

export default appendReducer
