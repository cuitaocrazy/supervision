import React from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Navbar from '../Navbar'

// 订单课程信息card
const ConOrderLessCard = () => {
  return <div className='pt-1 pb-2 mt-3 mb-3 bg-white rounded-lg shadow-md'>
    <div className='mt-2 rounded-lg'>
      <div className='py-2 pl-3 font-medium'>核桃编程培训机构</div>
      <div className='grid h-24 grid-cols-12 mx-2 rounded-lg'>
        <img className='w-20 h-20 col-span-4 mt-2 ml-1 mr-2 rounded-xl' src="http://placekitten.com/g/200/300"></img>
        <div className='flex flex-col col-span-8 mt-5 mr-3 justify-items-start'>
          <div className='overflow-hidden text-sm font-medium tracking-wide text-ellipsis'>思维逻辑小游戏</div>
          <div className='h-8 mt-2 overflow-hidden text-xs text-gray-500 text-ellipsis'>锻炼孩子动手能力，提高孩子思维能力，学习完课程可组装不同的形状</div>
        </div>
      </div>
      {/* 培训信息 */}
      <div className='mx-3 text-sm leading-6'>
        <div className='flex items-center mb-1'>
          <div className='mr-2 text-center text-gray-500'>培训课时:</div>
          <div className='font-medium text-center text-gray-800'>58课时</div>
        </div>

        <div className='flex items-center mb-1'>
          <div className='mr-2 text-center text-gray-500'>培训周期:</div>
          <div className='font-medium text-center text-gray-800'>2022年5月5日-2023年5月5日</div>
        </div>
        <div className='flex items-center mb-1'>
          <div className='mr-2 text-center text-gray-500'>培训地址:</div>
          <div className='font-medium text-center text-gray-800'>北京市海淀区大钟寺东路</div>
        </div>
      </div>
    </div>
  </div>
}

// 确认订单页面
const ConOrder = () => {
  const router = useRouter();
  return <IonPage>
    <IonHeader>
      <Navbar title='确认订单' />
    </IonHeader>
    <IonContent>
      <div className='mb-3 bg-white pb-14 scroll-auto'>
        <div className='h-full mx-3 bg-white'>
          <div className='pt-3 ml-1 text-base font-bold text-gray-800'>
            请选择学生
          </div>
          <div className='grid items-center grid-cols-2 py-3 pl-2 mt-3 text-base bg-white rounded-lg shadow-md'>
            <div className='items-center justify-center font-medium text-gray-700'>可新增或修改学生信息</div>
            <a className='mr-2 cursor-pointer justify-self-end' onClick={() => { router.push("./stuInfoList") }}>
              <svg className="w-5 h-5 text-gray-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="9 6 15 12 9 18" /></svg>
            </a>
          </div>

          <ConOrderLessCard />

          {/* <div className='flex justify-between gap-4 p-3 mt-2 border rounded-md'>
                    <div  className='w-24 p-5 border border-orange-300 rounded-md glow-secondary-400'>
                      <div className='font-semibold text-orange-400'>张小云</div>
                      <div className='pt-1 text-xs text-center text-gray-500'>12周岁</div>
                    </div>
                    <div className='w-24 p-5 border'>
                      <div className='font-semibold text-gray-400'>张文岱</div>
                      <div className='pt-1 text-xs text-center text-gray-500'>8周岁</div>
                    </div>
                    <div className='w-24 p-5 border'>
                    <svg className="w-8 h-8 mt-1 ml-3 text-secondary-300"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
                    </div>
                  </div> */}

        </div>
      </div>

      {/* 底部菜单 */}
      <div className='fixed bottom-0 flex w-full pl-5 mt-6 bg-white border-t h-14 justify-items-stretch'>
        <div className='self-center justify-around text-xs text-gray-500'>合计：</div>
        <div className='self-center mr-4 text-2xl font-black text-red-500 grow justify-self-end'>¥11120.00</div>
        <button className='self-center h-10 px-6 mt-1 mr-2 text-sm font-medium text-white justify-self-end bg-primary-500 rounded-3xl'
          onClick={() => { router.push("./eCNYPay") }}>立即支付</button>
      </div>
    </IonContent>
  </IonPage>
}

export default ConOrder