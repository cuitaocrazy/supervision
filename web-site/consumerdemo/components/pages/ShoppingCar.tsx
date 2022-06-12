import React from 'react';
import {IonPage,IonHeader,IonContent}from "@ionic/react"
import {motion} from 'framer-motion'
import {useRouter} from 'next/router'

// 购物车页面
const ShoppingCar=()=>{
  const router=useRouter();
  return <IonPage>
    <IonHeader>
      <div className='grid h-10 grid-cols-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='col-span-9 font-medium'>购物车</div>
        <div className='text-center'>
        <svg className="w-5 h-6 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />  <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
        <motion.div key="2" className={'absolute top-2 right-5 ' } animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div>
        </div>
      </div>
    </IonHeader>
    <IonContent>
        <div className='relative mb-3 bg-white pb-14 scroll-auto'>
         
          <div className='mx-3 '>
             {/* 课程列表card */}
                  <div className='mt-2 bg-white '>
                  <div className='flex items-center mx-4 mb-1'>
                    <input className='mr-3' type="checkbox" id="cbox1" value="first_checkbox" />
                    <label className='text-sm text-center text-gray-500 '>核桃编程培训机构</label>
                  </div>

                    <div className='rounded-lg shadow-md glow-third-200'>
                    <div className='grid grid-cols-12 mx-2 h-28 rounde-xl'>
                    <div className='flex items-center justify-center'>
                      <input className='col-span-1' type="checkbox"  />
                    </div>
                    <a className='col-span-4 mt-2 mr-2' onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                    }>
                        <img className='w-24 h-24 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                      </a>
                      <div className='flex flex-col col-span-7 mt-2 mr-3 justify-items-start'>
                      <a onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                      }>
                        <div className='flex justify-between mt-1'>
                        <div className='overflow-hidden text-sm text-ellipsis'>思维逻辑小游戏</div>
                        <svg className="w-4 h-4 text-gray-400"  width="6" height="6" viewBox="0 0 24 23" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </div>
                        <div className='h-8 mt-1 overflow-hidden text-xs text-gray-500 text-ellipsis'>锻炼孩子动手能力，提高孩子思维能力，学习完课程可组装不同的形状</div>
                        <div className='flex gap-3 mt-3'>
                          <div className='text-xs font-bold text-remind-500'>¥3558.00</div>
                          <div className='text-xs text-gray-700'>36课时</div>
                        </div>
                        </a>
                      </div>
                    </div>
                    </div>
                  </div>

                  
                  <div className='mt-3 bg-white '>
                  <div className='flex items-center mx-4 mb-1'>
                    <input className='mr-3' type="checkbox" id="cbox1" value="first_checkbox" />
                    <label className='text-sm text-center text-gray-500 '>核桃编程培训机构</label>
                  </div>
                    <div className='rounded-lg shadow-md glow-third-200'>
                    <div className='grid grid-cols-12 mx-2 h-28 rounde-xl'>
                    <div className='flex items-center justify-center'>
                      <input className='col-span-1' type="checkbox"  />
                    </div>
                    <a className='col-span-4 mt-2 mr-2' onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                    }>
                        <img className='w-24 h-24 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                      </a>
                      <div className='flex flex-col col-span-7 mt-2 mr-3 justify-items-start'>
                      <a onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                      }>
                        <div className='flex justify-between mt-1'>
                        <div className='overflow-hidden text-sm text-ellipsis'>思维逻辑小游戏</div>
                        <svg className="w-4 h-4 text-gray-400"  width="6" height="6" viewBox="0 0 24 23" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </div>
                        <div className='h-8 mt-1 overflow-hidden text-xs text-gray-500 text-ellipsis'>锻炼孩子动手能力，提高孩子思维能力，学习完课程可组装不同的形状</div>
                        <div className='flex gap-3 mt-3'>
                          <div className='text-xs font-bold text-remind-500'>¥3558.00</div>
                          <div className='text-xs text-gray-700'>36课时</div>
                        </div>
                        </a>
                      </div>
                    </div>
                    </div>
                  </div>


                  <div className='mt-3 bg-white '>
                  <div className='flex items-center mx-4 mb-1'>
                    <input className='mr-3' type="checkbox" id="cbox1" value="first_checkbox" />
                    <label className='text-sm text-center text-gray-500 '>核桃编程培训机构</label>
                  </div>
                    <div className='rounded-lg shadow-md glow-third-200'>
                    <div className='grid grid-cols-12 mx-2 h-28 rounde-xl'>
                    <div className='flex items-center justify-center'>
                      <input className='col-span-1' type="checkbox"  />
                    </div>
                    <a className='col-span-4 mt-2 mr-2' onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                    }>
                        <img className='w-24 h-24 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                      </a>
                      <div className='flex flex-col col-span-7 mt-2 mr-3 justify-items-start'>
                      <a onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                      }>
                        <div className='flex justify-between mt-1'>
                        <div className='overflow-hidden text-sm text-ellipsis'>思维逻辑小游戏</div>
                        <svg className="w-4 h-4 text-gray-400"  width="6" height="6" viewBox="0 0 24 23" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </div>
                        <div className='h-8 mt-1 overflow-hidden text-xs text-gray-500 text-ellipsis'>锻炼孩子动手能力，提高孩子思维能力，学习完课程可组装不同的形状</div>
                        <div className='flex gap-3 mt-3'>
                          <div className='text-xs font-bold text-remind-500'>¥3558.00</div>
                          <div className='text-xs text-gray-700'>36课时</div>
                        </div>
                        </a>
                      </div>
                    </div>
                    </div>
                  </div>


                  <div className='mt-3 bg-white '>
                  <div className='flex items-center mx-4 mb-1'>
                    <input className='mr-3' type="checkbox" id="cbox1" value="first_checkbox" />
                    <label className='text-sm text-center text-gray-500 '>核桃编程培训机构</label>
                  </div>
                    <div className='rounded-lg shadow-md glow-third-200'>
                    <div className='grid grid-cols-12 mx-2 h-28 rounde-xl'>
                    <div className='flex items-center justify-center'>
                      <input className='col-span-1' type="checkbox"  />
                    </div>
                    <a className='col-span-4 mt-2 mr-2' onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                    }>
                        <img className='w-24 h-24 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                      </a>
                      <div className='flex flex-col col-span-7 mt-2 mr-3 justify-items-start'>
                      <a onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                      }>
                        <div className='flex justify-between mt-1'>
                        <div className='overflow-hidden text-sm text-ellipsis'>思维逻辑小游戏</div>
                        <svg className="w-4 h-4 text-gray-400"  width="6" height="6" viewBox="0 0 24 23" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </div>
                        <div className='h-8 mt-1 overflow-hidden text-xs text-gray-500 text-ellipsis'>锻炼孩子动手能力，提高孩子思维能力，学习完课程可组装不同的形状</div>
                        <div className='flex gap-3 mt-3'>
                          <div className='text-xs font-bold text-remind-500'>¥3558.00</div>
                          <div className='text-xs text-gray-700'>36课时</div>
                        </div>
                        </a>
                      </div>
                    </div>
                    </div>
                  </div>

                  
                </div>
          
        </div>
        
        {/* 底部菜单 */}
        <div className='fixed bottom-0 flex justify-between w-full pl-5 mt-6 bg-white border-t h-14'>
              <div className='flex ml-2'>
                <div className='self-center mr-2'>
                  <input className='col-span-1' type="checkbox"  />
                </div>
                <div className='self-center text-xs text-gray-500'>全选</div>
              </div>
              <div className='flex justify-items-end'>
                <div className='self-center text-xs text-gray-500'>合计：</div>
                <div className='self-center mr-4 text-2xl font-black text-red-500 grow'>¥11120.00</div>
                <button className='self-center h-10 px-6 mt-1 mr-2 text-sm font-medium text-white justify-self-end bg-primary-500 rounded-3xl'>去结算</button>
              </div>
            </div>
    </IonContent>
  </IonPage>
}

export default ShoppingCar