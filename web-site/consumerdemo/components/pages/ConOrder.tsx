import React from 'react';
import {IonPage,IonHeader,IonContent}from "@ionic/react"
import {motion} from 'framer-motion'
import {useRouter} from 'next/router'

const ConOrder=()=>{
  const router=useRouter();
  return <IonPage>
    <IonHeader>
      <div className='grid h-10 grid-cols-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='col-span-9 font-medium'>确认订单</div>
        <div className='text-center'>
        <svg className="w-5 h-6 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />  <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
        <motion.div key="2" className={'absolute top-2 right-5 ' } animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div>
        </div>
      </div>
    </IonHeader>
    <IonContent>
        <div className='relative mb-3 bg-white pb-14 scroll-auto'>
         
          <div className='mx-3 '>
                  <div className='mt-2 bg-white '>
                    {/* 订单信息 */}
                    <div className='border rounded-lg'>
                      <div className='grid grid-cols-12 mx-2 h-28 rounde-xl'>
                          <img className='w-24 h-24 col-span-4 mt-2 ml-1 mr-2 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                        <div className='flex flex-col col-span-8 mt-5 mr-3 justify-items-start'>           
                            <div className='overflow-hidden text-sm tracking-wide text-ellipsis'>思维逻辑小游戏</div>
                        <div className='h-8 mt-2 overflow-hidden text-xs text-gray-500 text-ellipsis'>锻炼孩子动手能力，提高孩子思维能力，学习完课程可组装不同的形状</div>
                        </div>
                      </div>
                      {/* 培训信息 */}
                        <div className='mx-3 text-xs leading-5'>
                          <div className='flex items-center mb-1'>
                            <div className='mr-2 text-center text-gray-500'>培训课时:</div>
                            <div className='text-center text-gray-800 '>58课时</div>
                          </div>
                          <div className='flex items-center mb-1'>
                            <div className='mr-2 text-center text-gray-500'>培训机构:</div>
                            <div className='text-center text-gray-800 '>核桃编程培训机构</div>
                          </div>
                          <div className='flex items-center mb-1'>
                            <div className='mr-2 text-center text-gray-500'>培训周期:</div>
                            <div className='text-center text-gray-800 '>2022年5月5日-2023年5月5日</div>
                          </div>
                          <div className='flex items-center mb-1'>
                            <div className='mr-2 text-center text-gray-500'>培训地址:</div>
                            <div className='text-center text-gray-800 '>北京市海淀区中嘉大厦C-202</div>
                          </div>
                        </div>


                    </div>
                  </div>

                  <div className='mt-2 ml-1 text-xs text-gray-800'>
                    请选择学员
                  </div>
                  <div className='flex justify-between gap-4 p-3 mt-2 border rounded-md'>
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
                  </div>
 
          </div>
        </div>
        
        {/* 底部菜单 */}
        <div className='fixed bottom-0 flex w-full pl-5 mt-6 bg-white border-t h-14 justify-items-stretch'>
              {/* <div className='flex justify-items-end'> */}
                <div className='self-center justify-around text-xs text-gray-500'>合计：</div>
                <div className='self-center mr-4 text-2xl font-black text-red-500 grow justify-self-end'>¥11120.00</div>
                <button className='self-center h-10 px-6 mt-1 mr-2 text-sm font-medium text-white justify-self-end bg-primary-500 rounded-3xl'>去支付</button>
              </div>
            {/* </div> */}
    </IonContent>
  </IonPage>
}

export default ConOrder