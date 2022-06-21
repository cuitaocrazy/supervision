import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { IonPage, IonHeader, IonToolbar, IonContent, IonTitle, IonSearchbar, IonImg, IonList, IonItem, IonThumbnail, IonLabel, IonAvatar, IonChip, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from "@ionic/react"
import Navbar from 'components/Navbar'

type Item = {
  src: string;
  text: string;
};
const items: Item[] = [{ src: 'http://placekitten.com/g/200/300', text: 'a picture of a cat' },
];

// 教育机构课程列表card组件
const OrgLessonListCard = () => {
  return (
    <a href="./searchLessonDetail">
      <div className='mx-2 mt-3 rounded-lg shadow-md glow-third-200'>
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
    </a>
  )
}

// 教育机构课程列表页面
const OrgLessonList = () => {
  const router = useRouter()

  return <IonPage>
    <IonHeader>
      <Navbar title="教育资金监管平台" />
    </IonHeader>
    <IonContent>
      <div className='relative bg-white'>
        {/* 机构图片 */}
        <div className=''>
          <img className='fixed w-full h-36' src="http://placekitten.com/g/200/300"></img>
        </div>
        {/* 机构logo和机构名称等信息 */}
        <div className=''>
          <img className='fixed z-20 h-24 rounded-lg w-28 top-32 left-3 ' src="http://placekitten.com/g/200/300"></img>
          <div className='fixed pl-2 bg-white top-44 left-32'>
            <div className='fixed pt-3 text-xs font-bold text-gray-900'>核桃编程</div>
            <div className='fixed text-xs text-gray-700 pt-7'>孩子的第一堂编程课</div>
          </div>
        </div>
        {/* 好评度、课程数、老师数：TODO 好评度等，会一起滚动待完善  */}
        <div className=''>
          <div className='flex pt-48 pb-3 mx-3 text-xs text-gray-400 border-b justify-items-stretch'>
            <div className='flex justify-center grow'>好评度&nbsp;98%</div>
            <svg className="flex-none w-4 h-4" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="5" x2="12" y2="19" /></svg>
            <div className='flex justify-center grow'>课程数&nbsp;32</div>
            <svg className="flex-none w-4 h-4" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="5" x2="12" y2="19" /></svg>
            <div className='flex justify-center grow'>教师数&nbsp;22</div>
          </div>
        </div>
        {/* 课程列表card */}
        <OrgLessonListCard />

      </div>
    </IonContent>
  </IonPage>
}

export default OrgLessonList


