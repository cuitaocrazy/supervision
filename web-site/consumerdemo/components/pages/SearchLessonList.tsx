import React from 'react';
import {IonPage,IonHeader,IonContent}from "@ionic/react"
import {motion} from 'framer-motion'
import {useRouter} from 'next/router'

const SearchLessonList=()=>{
  const router = useRouter()
  return <IonPage>
    <IonHeader>
      <div className='grid h-10 grid-cols-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='col-span-9'>教育资金监管平台</div>
        <div className='text-center'>
        <svg className="w-5 h-6 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />  <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
        </div>
      </div>
    </IonHeader>
    <IonContent>
        <div className='relative bg-primary-600'>
            <div className='fixed left-0 right-0 h-5 bg-primary-600 top-15'>
                <div className='fixed left-0 right-0 h-4 bg-white rounded-t-3xl top-15'></div>
            </div>
            <div className='bg-white'>
              
              {/* 搜索框 */}
              <div className='fixed left-0 right-0 pb-2 mt-3 bg-white'>
                <div className="flex pt-3 font-mono text-xs ">
                  <input type="search" className="flex items-center justify-center pl-2 ml-3 text-gray-800 border shadow-lg rounded-l-3xl grow focus:outline-none focus:glow-primary-600"
                                placeholder="请输入搜索关键词" x-model="search" />
                  <button type="submit" className="flex items-center justify-center flex-none h-8 mr-3 bg-primary-600 rounded-r-3xl w-14 focus:outline-none hover:bg-primary-700 ">
                    <svg className="w-5 h-5 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                  </button>          
                </div>
              </div>

               {/* 课程列表card */}
               <div className='mx-3 pt-14 '>
                  <div className='mt-3 bg-white border rounded-lg '>
                    <div className='grid grid-cols-3 mx-2 h-28 rounde-xl'>
                    <a onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                    }>
                        <img className='w-24 h-24 col-span-1 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                      </a>
                      <div className='flex flex-col col-span-2 mt-2 justify-items-start'>
                      <a onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                      }>
                        <div className='mt-2 text-sm'>思维逻辑小游戏</div>
                        <div className='mt-1 text-xs text-gray-500'>锻炼孩子动手能力，提高孩子思维能力，学习完课程可组装不同形状。</div>
                        <div className='flex gap-3 mt-3'>
                          <div className='text-xs font-bold text-remind-500'>¥3558.00</div>
                          <div className='text-xs text-gray-700'>36课时</div>
                          <div className='text-xs text-gray-700'>核桃编程</div>
                        </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className='mt-3 border rounded-lg glow-third-100'>
                    <div className='grid grid-cols-3 mx-2 h-28 rounde-xl'>
                      <img className='w-24 h-24 col-span-1 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                      <div className='flex flex-col col-span-2 mt-2 justify-items-start'>
                        <div className='mt-2 text-sm'>思维逻辑小游戏</div>
                        <div className='mt-1 text-xs text-gray-500'>锻炼孩子动手能力，提高孩子思维能力，学习完课程可组装不同形状。</div>
                        <div className='flex gap-3 mt-3'>
                          <div className='text-xs font-bold text-remind-500'>¥3558.00</div>
                          <div className='text-xs text-gray-700'>36课时</div>
                          <div className='text-xs text-gray-700'>核桃编程</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-3 border rounded-lg glow-third-200'>
                    <div className='grid grid-cols-3 mx-2 h-28 rounde-xl'>
                      <img className='w-24 h-24 col-span-1 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                      <div className='flex flex-col col-span-2 mt-2 justify-items-start'>
                        <div className='mt-2 text-sm'>思维逻辑小游戏</div>
                        <div className='mt-1 text-xs text-gray-500'>锻炼孩子动手能力，提高孩子思维能力，学习完课程可组装不同形状。</div>
                        <div className='flex gap-3 mt-3'>
                          <div className='text-xs font-bold text-remind-500'>¥3558.00</div>
                          <div className='text-xs text-gray-700'>36课时</div>
                          <div className='text-xs text-gray-700'>核桃编程</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-3 border rounded-lg glow-third-300'>
                    <div className='grid grid-cols-3 mx-2 h-28 rounde-xl'>
                      <img className='w-24 h-24 col-span-1 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                      <div className='flex flex-col col-span-2 mt-2 justify-items-start'>
                        <div className='mt-2 text-sm'>思维逻辑小游戏</div>
                        <div className='mt-1 text-xs text-gray-500'>锻炼孩子动手能力，提高孩子思维能力，学习完课程可组装不同形状。</div>
                        <div className='flex gap-3 mt-3'>
                          <div className='text-xs font-bold text-remind-500'>¥3558.00</div>
                          <div className='text-xs text-gray-700'>36课时</div>
                          <div className='text-xs text-gray-700'>核桃编程</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-3 border rounded-lg glow-third-300'>
                    <div className='grid grid-cols-3 mx-2 h-28 rounde-xl'>
                      <img className='w-24 h-24 col-span-1 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                      <div className='flex flex-col col-span-2 mt-2 justify-items-start'>
                        <div className='mt-2 text-sm'>思维逻辑小游戏</div>
                        <div className='mt-1 text-xs text-gray-500'>锻炼孩子动手能力，提高孩子思维能力，学习完课程可组装不同形状。</div>
                        <div className='flex gap-3 mt-3'>
                          <div className='text-xs font-bold text-remind-500'>¥3558.00</div>
                          <div className='text-xs text-gray-700'>36课时</div>
                          <div className='text-xs text-gray-700'>核桃编程</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>


              </div>
        </div>
    </IonContent>
  </IonPage>
}

export default SearchLessonList