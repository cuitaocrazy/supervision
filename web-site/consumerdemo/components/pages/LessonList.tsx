import React from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

// 课程列表页面
const LessonList = () => {
  const router = useRouter()
  return <IonPage>
    <IonHeader>
      <div className='grid h-10 grid-cols-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='col-span-9'>课程列表</div>
        <div className='text-center'>
          <svg className="w-5 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />  <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
        </div>
      </div>
    </IonHeader>
    <IonContent>
      <div className='relative bg-primary-600'>

        <div className='bg-white'>
          {/* 课程列表card */}
          <div className='mx-3 '>
            <div className='pb-3 mt-2 bg-white rounded-lg shadow-md'>
              <div className='flex pb-1 mx-2 mb-2 rounde-xl'>
                {/* <a className='border border-green-300' onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                    }> */}
                <img className='w-20 h-20 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                {/* </a> */}
                <div className='mt-3 ml-3'>
                  {/* <a onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                      }> */}
                  <div className='text-sm font-medium text-gray-700 '>少儿编程</div>
                  <div className='flex mt-1'>
                    <div className='text-sm text-gray-400 '>学生姓名：</div>
                    <div className='text-sm text-gray-800'>张大宝</div>
                  </div>
                  <div className='flex mt-1'>
                    <div className='text-sm text-gray-400 '>总课时/已上课时：</div>
                    <div className='text-sm text-gray-700'>32/</div>
                    <div className='pl-1 text-sm text-orange-400'>6</div>
                  </div>
                  {/* </a> */}
                </div>
              </div>
              <div className='grid grid-cols-3 gap-2 text-xs text-white justify-items-center'>
                <div className='px-6 py-1 shadow-md rounded-3xl bg-primary-500 shadow-primary-300'>去评价</div>
                <div className='px-6 py-1 shadow-md rounded-3xl bg-secondary-300 shadow-secondary-300'>去投诉</div>
                <div className='px-4 py-1 shadow-md rounded-3xl bg-remind-400 shadow-remind-400'>查看详情</div>
              </div>
            </div>

            <div className='pb-3 mt-2 bg-white rounded-lg shadow-md'>
              <div className='flex pb-1 mx-2 mb-2 rounde-xl'>
                {/* <a className='border border-green-300' onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                    }> */}
                <img className='w-20 h-20 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                {/* </a> */}
                <div className='mt-3 ml-3'>
                  {/* <a onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                      }> */}
                  <div className='text-sm font-medium text-gray-700 '>少儿编程</div>
                  <div className='flex mt-1'>
                    <div className='text-sm text-gray-400 '>学生姓名：</div>
                    <div className='text-sm text-gray-800'>张大宝</div>
                  </div>
                  <div className='flex mt-1'>
                    <div className='text-sm text-gray-400 '>总课时/已上课时：</div>
                    <div className='text-sm text-gray-700'>32/</div>
                    <div className='pl-1 text-sm text-orange-400'>6</div>
                  </div>
                  {/* </a> */}
                </div>
              </div>
              <div className='grid grid-cols-3 gap-2 text-xs text-white justify-items-center'>
                <div className='px-6 py-1 shadow-md rounded-3xl bg-primary-500 shadow-primary-300'>去评价</div>
                <div className='px-6 py-1 shadow-md rounded-3xl bg-secondary-300 shadow-secondary-300'>去投诉</div>
                <div className='px-4 py-1 shadow-md rounded-3xl bg-remind-400 shadow-remind-400'>查看详情</div>
              </div>
            </div>

            <div className='pb-3 mt-2 bg-white rounded-lg shadow-md'>
              <div className='flex pb-1 mx-2 mb-2 rounde-xl'>
                {/* <a className='border border-green-300' onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                    }> */}
                <img className='w-20 h-20 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                {/* </a> */}
                <div className='mt-3 ml-3'>
                  {/* <a onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                      }> */}
                  <div className='text-sm font-medium text-gray-700 '>少儿编程</div>
                  <div className='flex mt-1'>
                    <div className='text-sm text-gray-400 '>学生姓名：</div>
                    <div className='text-sm text-gray-800'>张大宝</div>
                  </div>
                  <div className='flex mt-1'>
                    <div className='text-sm text-gray-400 '>总课时/已上课时：</div>
                    <div className='text-sm text-gray-700'>32/</div>
                    <div className='pl-1 text-sm text-orange-400'>6</div>
                  </div>
                  {/* </a> */}
                </div>
              </div>
              <div className='grid grid-cols-3 gap-2 text-xs text-white justify-items-center'>
                <div className='px-6 py-1 shadow-md rounded-3xl bg-primary-500 shadow-primary-300'>去评价</div>
                <div className='px-6 py-1 shadow-md rounded-3xl bg-secondary-300 shadow-secondary-300'>去投诉</div>
                <div className='px-4 py-1 shadow-md rounded-3xl bg-remind-400 shadow-remind-400'>查看详情</div>
              </div>
            </div>

            <div className='pb-3 mt-2 bg-white rounded-lg shadow-md'>
              <div className='flex pb-1 mx-2 mb-2 rounde-xl'>
                {/* <a className='border border-green-300' onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                    }> */}
                <img className='w-20 h-20 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                {/* </a> */}
                <div className='mt-3 ml-3'>
                  {/* <a onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                      }> */}
                  <div className='text-sm font-medium text-gray-700 '>少儿编程</div>
                  <div className='flex mt-1'>
                    <div className='text-sm text-gray-400 '>学生姓名：</div>
                    <div className='text-sm text-gray-800'>张大宝</div>
                  </div>
                  <div className='flex mt-1'>
                    <div className='text-sm text-gray-400 '>总课时/已上课时：</div>
                    <div className='text-sm text-gray-700'>32/</div>
                    <div className='pl-1 text-sm text-orange-400'>6</div>
                  </div>
                  {/* </a> */}
                </div>
              </div>
              <div className='grid grid-cols-3 gap-2 text-xs text-white justify-items-center'>
                <div className='px-6 py-1 shadow-md rounded-3xl bg-primary-500 shadow-primary-300'>去评价</div>
                <div className='px-6 py-1 shadow-md rounded-3xl bg-secondary-300 shadow-secondary-300'>去投诉</div>
                <div className='px-4 py-1 shadow-md rounded-3xl bg-remind-400 shadow-remind-400'>查看详情</div>
              </div>
            </div>

            <div className='pb-3 mt-2 bg-white rounded-lg shadow-md'>
              <div className='flex pb-1 mx-2 mb-2 rounde-xl'>
                {/* <a className='border border-green-300' onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                    }> */}
                <img className='w-20 h-20 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
                {/* </a> */}
                <div className='mt-3 ml-3'>
                  {/* <a onClick={
                      () => {
                        router.push('/searchLessonDetail')
                      }
                      }> */}
                  <div className='text-sm font-medium text-gray-700 '>少儿编程</div>
                  <div className='flex mt-1'>
                    <div className='text-sm text-gray-400 '>学生姓名：</div>
                    <div className='text-sm text-gray-800'>张大宝</div>
                  </div>
                  <div className='flex mt-1'>
                    <div className='text-sm text-gray-400 '>总课时/已上课时：</div>
                    <div className='text-sm text-gray-700'>32/</div>
                    <div className='pl-1 text-sm text-orange-400'>6</div>
                  </div>
                  {/* </a> */}
                </div>
              </div>
              <div className='grid grid-cols-3 gap-2 text-xs text-white justify-items-center'>
                <div className='px-6 py-1 shadow-md rounded-3xl bg-primary-500 shadow-primary-300'>去评价</div>
                <div className='px-6 py-1 shadow-md rounded-3xl bg-secondary-300 shadow-secondary-300'>去投诉</div>
                <div className='px-4 py-1 shadow-md rounded-3xl bg-remind-400 shadow-remind-400'>查看详情</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default LessonList