import React from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import LessonEvalCard from "../LessonEvalCard"
import LessonFrame from "../LessonFrame"
import Schedule from 'components/Schedule';
import LessonIntroduce from 'components/LessonIntroduce';
import TeacherIntroduce from 'components/TeacherIntroduce';
// import Schedule from '../Schedule'

// 课程详情页面底部菜单
const BottomMenu = () => {
  return <div className='fixed bottom-0 grid w-full grid-cols-3 mt-6 bg-white border-t h-14 justify-items-center'>
    <a className='mt-2 text-primary-500'
       href="./checkInAndLeave">
      <div>
        <svg className="w-5 h-5 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
      <div className='text-xs'>签到/请假</div>
    </a>
    <a className='mt-2 text-green-500 '
       href="./checkInList">
      <div className='pl-3'>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <line x1="8" y1="6" x2="21" y2="6" />  <line x1="8" y1="12" x2="21" y2="12" />  <line x1="8" y1="18" x2="21" y2="18" />  <line x1="3" y1="6" x2="3.01" y2="6" />  <line x1="3" y1="12" x2="3.01" y2="12" />  <line x1="3" y1="18" x2="3.01" y2="18" /></svg>
      </div>
      <div className='mr-4 text-xs'>签到列表</div>
    </a>
    <a className='mt-2 text-secondary-300'
       href="./lessonEvalDetail">
      <div>
        <svg className="w-5 h-5 " width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
      </div>
      <div className='mr-4 text-xs'>评价</div>
    </a>
  </div>
}
// 课程详情页面
const LessonDetail = () => {
  return <IonPage>
    <IonHeader>
      <div className='grid h-10 grid-cols-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='col-span-9'>课程详情</div>
        <div className='text-center'>
          <svg className="w-5 h-6 text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="5" cy="12" r="1" />  <circle cx="12" cy="12" r="1" />  <circle cx="19" cy="12" r="1" /></svg>
        </div>
      </div>
    </IonHeader>
    <IonContent>
      <div className='relative mb-3 bg-white pb-14 scroll-auto'>
        {/* 课程图片 */}
        <div>
          <img className='w-full h-40' src="http://placekitten.com/g/200/300"></img>
        </div>
        <div className='flex pt-2 mx-10 text-xs text-gray-500 justify-items-stretch'>
          <div className='grid grow justify-items-center'>
            <div className='font-medium text-primary-600'>课程详情</div>
            <div className=''>
              <svg className="w-5 h-5 text-primary-500" viewBox="0 7 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">  <line x1="5" y1="12" x2="19" y2="12" /></svg>
            </div>
          </div>
          <div className='flex justify-center grow hover:text-primary-600 hover:font-medium'>课程大纲</div>
          <div className='flex justify-center grow hover:text-primary-600 hover:font-medium' >评价(14)</div>
        </div>



        {/* 培训机构介绍 */}
        <div className='px-3 py-1 mx-3 rounded-lg shadow-md'>
          <div className='text-lg font-bold'>小画家美术培训</div>

          <div className='flex pt-1'>
            <div className='text-sm text-gray-500'>讲师:</div>
            <div className='text-sm'>&nbsp;&nbsp;李雷</div>
            <div className='flex flex-auto justify-self-end'>
              <svg className="w-3 h-3 m-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <svg className="w-3 h-3 mt-1 mr-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <svg className="w-3 h-3 mt-1 mr-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <svg className="w-3 h-3 mt-1 mr-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <svg className="w-3 h-3 mt-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>

          <div className='flex pt-1 text-xs'>
            <div className="text-red-500 ">¥888.00</div>
            <div className='pl-3 text-gray-500'>56课时</div>
          </div>
          <div className='flex pt-1 text-xs'>
            <div className='text-gray-500'>地址：</div>
            <div>北京市海淀区远大路22号D座2层</div>
          </div>
          <div className='flex pt-1 text-xs'>
            <div className='text-gray-500'>电话：</div>
            <div>010-87667890</div>
          </div>
        </div>
        <Schedule />
        <LessonIntroduce />
        <TeacherIntroduce />

        {/* <LessonFrame />
        <LessonEvalCard />
        <LessonEvalCard /> */}

      </div>

      {/* 底部菜单 */}
      <BottomMenu />

    </IonContent>
  </IonPage>
}

export default LessonDetail