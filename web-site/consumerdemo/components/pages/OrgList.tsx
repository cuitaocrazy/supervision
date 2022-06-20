import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { IonPage, IonHeader, IonToolbar, IonContent, IonTitle, IonSearchbar, IonImg, IonList, IonItem, IonThumbnail, IonLabel, IonAvatar, IonChip, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from "@ionic/react"
import { motion } from 'framer-motion'

type Item = {
  src: string;
  text: string;
};
const items: Item[] = [{ src: 'http://placekitten.com/g/200/300', text: 'a picture of a cat' },
];

// 机构列表card组件
const OrgListCard = () => {
  return (
    <div className="flex flex-col max-w-sm mb-3 ml-2 mr-2 bg-white rounded-lg shadow-md h-36">
      <img className="h-20 rounded-t-lg cursor-pointer" src='http://placekitten.com/g/200/300' alt="" />
      <div className="flex flex-col justify-center px-2 pt-1">
        <div className='flex items-center justify-center'>
          <div className='flex flex-auto text-xs font-bold text-gray-900 truncate cursor-pointer justify-self-start'>核桃编程</div>
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
        {/* <p className="text-xs font-bold text-gray-900 truncate cursor-pointer ">核桃编程</p> */}
        <p className='pt-1 text-xs text-gray-400 truncate'>地址：廊坊市安次区和平路荣益广场3层206</p>
        <p className="text-xs text-gray-400 truncate">电话：0316-1234569</p>
      </div>
    </div>
  )
}

// 教育机构列表页面
const OrgList = () => {
  const router = useRouter()

  return <IonPage>
    <IonHeader>
      <div className='grid h-10 grid-cols-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='col-span-9'>教育资金监管平台</div>
        <div className='text-center'>
          <svg className="w-5 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />  <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
          <motion.div key="2" className={'absolute top-2 right-5 '} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div>
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
          <div className='fixed left-0 right-0 mt-3 bg-white'>
            <div className="flex pt-3 font-mono text-xs ">
              <input type="search" className="flex items-center justify-center pl-4 ml-3 text-gray-800 border shadow-lg rounded-l-3xl grow focus:outline-none focus:glow-primary-600"
                placeholder="请输入搜索关键词" x-model="search" />
              <button type="submit" className="flex items-center justify-center flex-none h-8 mr-3 bg-primary-600 rounded-r-3xl w-14 focus:outline-none hover:bg-primary-700 ">
                <svg className="w-5 h-5 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
              </button>
            </div>
          </div>

          {/* 搜索框以下内容设置为滚动 */}
          {/* 轮播图 */}
          <div className='pt-20 mx-3'>
            <img className="w-full h-32 rounded-lg cursor-pointer " src='http://placekitten.com/g/200/300' alt="" />
          </div>
          {/* 精选机构 */}
          <div className='grid items-center grid-cols-6 mt-3'>
            <div className='col-span-5 text-sm font-bold text-gray-900'>
              <svg className="inline w-5 h-5 ml-1 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="4" x2="12" y2="19" /></svg>
              <div className='inline'>精选机构</div>
            </div>
            <div className='flex mb-1 mr-3 text-xs text-gray-400 justify-self-end'>
              <a href="http://www.w3school.com.cn">
                <div>
                  更多
                  <svg className="inline w-3 h-3 mb-1 text-gray-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="9 6 15 12 9 18" /></svg>
                </div>
              </a>
            </div>
          </div>
          {/* 机构列表card */}
            <div className="grid py-2 sm1:grid-cols-2 sm2:grid-cols-2 sm3:grid-cols-2">
              <OrgListCard />
            </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default OrgList


