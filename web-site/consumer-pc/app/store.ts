import { configureStore } from '@reduxjs/toolkit'
import orderCartCounter from '../features/order-cart/counterSlice'

export const store = configureStore({
  reducer: orderCartCounter({}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch