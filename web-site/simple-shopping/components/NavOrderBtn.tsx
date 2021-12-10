import { FC } from 'react'
import { useAppSelector } from '../app/hook'
import { selectCount, selectCarList } from '../features/order-cart/counterSlice'
import { motion } from 'framer-motion'
import Router from 'next/router'

const NavOrderBtn: FC = () => {
  const count = useAppSelector(selectCount)
  const carList = useAppSelector(selectCarList)
  const carListStr = carList.map((item) => {
    return JSON.stringify(item)
  })

  return <button className="relative text-white" onClick={() => { Router.push({ pathname: '/shoppingCarList', query: { carList: carListStr } }) }}>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
  <motion.div key={count} className={'absolute top-0 right-0 ' + (count === 0 && 'hidden')} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{count}</span></motion.div>
</button>
}

export default NavOrderBtn
