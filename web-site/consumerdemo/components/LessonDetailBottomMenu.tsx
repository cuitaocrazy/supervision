import { FC } from 'react';
import { motion } from 'framer-motion'
import Router,{ useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { increment, selectCount, selectCarList } from '../features/order-cart/counterSlice'
import { Lesson, Teacher, EduOrg } from '../types/types'

// 课程详情页面底部菜单组件
const LessonDetailBottomMenu = () => {
  console.log("进入LessonDetailBottomMenu")
  const router = useRouter();
  let lesson: Lesson = {  lessonId:"lesson-001",teacherId:"teacher-001"}
  const { item } = router.query
  if (typeof item === 'string') {
    lesson = JSON.parse(item)
  }
  const count = useAppSelector(selectCount)
  const carList = useAppSelector(selectCarList)
  const carListStr = carList.map((item) => {
    return JSON.stringify(item)
  })
  const dispatch = useAppDispatch()

  return <div className='fixed bottom-0 flex w-full pl-5 mt-6 ml-3 mr-5 bg-white h-14'>
    <a className='mt-2 mr-6'
      href="./orgLessonList">
      <div>
        <svg className="w-5 h-5 ml-1 text-gray-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M3 21v-13l9-4l9 4v13" />  <path d="M13 13h4v8h-10v-6h6" />  <path d="M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3" /></svg>
      </div>
      <div className='text-xs text-gray-500'>机构</div>
    </a>
    <a className='mt-2 '
      href="./shoppingCar">
      <div>
        <svg className="w-5 h-5 ml-2 text-gray-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="9" cy="19" r="2" />  <circle cx="17" cy="19" r="2" />  <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" /></svg>
        <motion.div key={count} className={'absolute bottom-6 left-20 ' + (count === 0 && 'hidden')} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{count}</span></motion.div>
      </div>
      <div className='mr-4 text-xs text-gray-500'
        onClick={() => { Router.push({ pathname: './shoppingCar', query: { carList: carListStr } }) }}>购物车</div>
    </a>
    <button className='h-10 mt-2 ml-8 text-sm font-medium text-white bg-orange-400 rounded-l-3xl grow focus:bg-orange-600'
      onClick={() => { dispatch(increment({ payload: lesson })) }}>加入购物车</button>
    <button className='h-10 px-3 mt-2 mr-8 text-sm font-medium text-white grow bg-primary-500 rounded-r-3xl'
      onClick={() => {
        Router.push("./conOrder")
      }}>立即购买</button>
  </div>
}

export default LessonDetailBottomMenu