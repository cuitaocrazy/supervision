import React from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import Navbar from 'components/Navbar'

type FormData = {
  name: string;
}

// 学生信息card
const StuInfoCard = () => {
  const router = useRouter()
  return <div className='grid items-center grid-cols-2 py-3 pl-2 mx-3 my-3 text-base bg-white rounded-lg shadow-md'>
    <div className='items-center justify-center text-sm font-medium leading-6 '>
      <div className='flex leading-6 '>
        <div className='pr-2 text-gray-400'>姓名:</div>
        <div className='font-bold text-gray-700'>张大宝</div>
      </div>
      <div className='flex leading-5'>
        <div className='pr-2 text-gray-400'>年龄:</div>
        <div className='text-gray-700'>11周岁</div>
      </div>
      <div className='flex'>
        <div className='pr-2 text-gray-400'>家长:</div>
        <div className='text-gray-700'>孔莉</div>
      </div>
      <div className='flex'>
        <div className='pr-2 text-gray-400'>关系:</div>
        <div className='text-gray-700'>亲子</div>
      </div>
    </div>
    <a className='mr-2 cursor-pointer justify-self-end' onClick={() => { router.push("./editStuInfo") }}>
      <svg className="w-5 h-5 text-gray-300" width="24"  height="24"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
    </a>
  </div>
}

// 学生信息管理页面
const StuInfoList = () => {
  const router = useRouter()

  return <IonPage>
    <IonHeader>
      <Navbar title="学生信息管理"/>
    </IonHeader>
    <IonContent>
      <div className='mb-3 bg-white pb-14 scroll-auto'>
        <StuInfoCard />
        <StuInfoCard />
      </div>
      <div className='fixed bottom-0 flex w-full mt-6 bg-white border-t h-14 justify-items-center'>
        <button className='self-center w-full h-10 mx-6 mt-1 text-sm font-medium text-white bg-primary-600 rounded-3xl' onClick={() => { router.push("addStuInfo") }}>新增学生</button>
      </div>
    </IonContent>
  </IonPage>
}

export default StuInfoList