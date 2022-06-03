import React from 'react';
import {IonPage,IonHeader,IonContent}from "@ionic/react"
import {motion} from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

type FormData = {
  name: string;
}

const AddStuInfo=()=>{
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const router = useRouter()
  
  return <IonPage>
    <IonHeader>
      <div className='grid h-10 grid-cols-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='col-span-9'>添加学员信息</div>
        <div className='text-center'>
        <svg className="w-5 h-6 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />  <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
        <motion.div key="2" className={'absolute top-2 right-5 ' } animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div>
        </div>
      </div>
    </IonHeader>
    <IonContent>
        <div className='mt-5 mb-3 ml-4 mr-3 text-base bg-white pb-15 scroll-auto'>
            <div className='p-2 pt-4 pb-4 border rounded-lg'>
              <div className='flex justify-between gap-5'>
                <div className='pr-2 text-gray-400'>与客户关系：</div>
                <div className='flex gap-6'>
                  <div className='px-4 text-white border border-orange-400 bg-secondary-400 rounded-3xl focus:bg-secondary-500'>子女</div>
                  <div className='px-4 text-gray-500 border rounded-3xl'>其他</div>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4 mt-3 justify-items-stretch'>
                <div className='pr-2 text-gray-400 '>姓名:</div>
                <input className='pl-2 text-gray-800 border rounded-md' placeholder="请输入学员姓名"></input>
              </div>
              

              <div className='grid grid-cols-2 gap-4 mt-3 justify-items-stretch'>
                <div className='pr-2 text-gray-400'>出生日期:</div>
                <input className='pl-2 text-gray-800 border' placeholder='请输入日期'></input>
              </div>
              <div className='grid grid-cols-2 gap-4 mt-3 justify-items-stretch'>
                <div className='pr-2 text-gray-400'>学生性别:</div>
                <select className='w-full pl-2 mr-4 text-gray-800 border rounded-md'>
                  <option value="" selected >男</option>
                  <option value="">女</option>
                </select>
              </div>
            </div>
        </div>
        <div className='fixed bottom-0 flex w-full mt-6 bg-white border-t h-14 justify-items-center'>
            <button className='self-center w-full h-10 mx-6 mt-1 text-sm font-medium text-white bg-gray-400 rounded-3xl' onClick={()=>{router.push("addStuInfo")}}>取消</button>
            <button className='self-center w-full h-10 mx-6 mt-1 text-sm font-medium text-white bg-primary-500 rounded-3xl' onClick={()=>{router.push("addStuInfo")}}>确定</button>
        </div>
    </IonContent>
  </IonPage>
}

export default AddStuInfo