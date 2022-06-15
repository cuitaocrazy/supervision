import React from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

type FormData = {
  name: string;
}
// 添加学生信息页面
const AddStuInfo = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const router = useRouter()

  return <IonPage>
    <IonHeader>
      <div className='grid h-10 grid-cols-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='col-span-9'>添加学生信息</div>
        <div className='text-center'>
          <svg className="w-5 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />  <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
          <motion.div key="2" className={'absolute top-2 right-5 '} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div>
        </div>
      </div>
    </IonHeader>
    <IonContent>
      <form>
        <div className='mt-2 mb-3 ml-4 mr-3 text-base bg-white pb-15 scroll-auto'>
          <div className='p-2 px-2 pt-4 pb-4 rounded-lg shadow-md'>
            <div className='flex items-center justify-center gap-10 '>
              <div className='px-4 py-1 text-white border border-orange-400 bg-secondary-400 rounded-3xl focus:bg-secondary-500'>本人</div>
              <div className='px-4 py-1 text-gray-500 border rounded-3xl'>子女</div>
              <div className='px-4 py-1 text-gray-500 border rounded-3xl'>其他</div>
            </div>
            <div className='grid grid-cols-2 mt-3 justify-items-stretch'>
              <span className='pr-2 text-gray-400 '>学生姓名:</span>
              <input className='py-2 pl-2 text-gray-800 border rounded-md focus:outline-none' placeholder="请输入学生姓名"></input>
            </div>
            <div className='grid grid-cols-2 mt-3 justify-items-stretch'>
              <span className='flex pr-2 text-gray-400 '>出生日期:</span>
              <input className='flex py-2 pl-2 text-gray-800 border rounded-md focus:outline-none' placeholder='请输入日期'></input>
            </div>
            <div className='grid grid-cols-2 mt-3 justify-items-stretch'>
              <span className='pr-2 text-gray-400'>学生性别:</span>
              <select className='w-full h-10 pl-2 mr-4 text-gray-800 border border-gray-300 rounded outline-none cursor-pointer focus:ring-0 focus:ring-primary-600 focus:outline-none checked:bg-primary-500'>
                <option value="" selected >男</option>
                <option value="">女</option>
                <option value="">保密</option>
              </select>
            </div>
          </div>
        </div>
        <div className='fixed bottom-0 flex w-full mt-6 bg-white border-t h-14 justify-items-center'>
          <button className='self-center w-full h-10 mx-6 mt-1 text-sm font-medium text-white bg-gray-400 rounded-3xl' onClick={() => { router.push("stuInfoList") }}>取消</button>
          <button className='self-center w-full h-10 mx-6 mt-1 text-sm font-medium text-white bg-primary-500 rounded-3xl' onClick={() => { router.push("stuInfoList") }}>确定</button>
        </div>
      </form>
    </IonContent>
  </IonPage>
}

export default AddStuInfo