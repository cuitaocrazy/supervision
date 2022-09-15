import {createSlice,ReducersMapObject,Action,AnyAction} from '@reduxjs/toolkit'
import {Lesson} from '../../types/types'

const carListInit:Lesson[]=[]
export const counterSlice=createSlice({
  name:'contractCartItemCounter',
  initialState:{
    value:0,
    carList:carListInit,
  },
  reducers:{
    increment:(state,{payload})=>{
      state.value+=1
      state.carList.push(payload.payload)
      console.log("state.carList"+state.carList)
      console.log("payload.payload"+payload.payload)
    },
    decrement:(state,{payload})=>{
      state.carList.splice(payload,1)
      state.value-=1
    },
    clear:(state)=>{
      state.value=0
      state.carList=[]
    }
  }
})

export const {increment,decrement,clear}=counterSlice.actions

export const selectCount=(state:{[counterSlice.name]:ReturnType<typeof counterSlice.reducer>})=>state[counterSlice.name].value

export const selectCarList = (state: {[counterSlice.name]: ReturnType<typeof counterSlice.reducer>}) => state[counterSlice.name].carList

const appendReducer = <S, A extends Action = AnyAction>(reducerMap: ReducersMapObject<S, A>) => ({ ...reducerMap, [counterSlice.name]: counterSlice.reducer })

export default appendReducer
