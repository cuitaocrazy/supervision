import React from 'react';
import {IonPage,IonHeader,IonContent}from "@ionic/react"
import {motion} from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

type FormData = {
  name: string;
}

const StuInfoMag=()=>{
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const router = useRouter()
  
  return <IonPage>
    <IonHeader>
      <div className='grid h-10 grid-cols-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='col-span-9'>学员信息管理</div>
        <div className='text-center'>
        <svg className="w-5 h-6 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />  <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
        <motion.div key="2" className={'absolute top-2 right-5 ' } animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div>
        </div>
      </div>
    </IonHeader>
    <IonContent>
        <div className='mb-3 bg-white pb-14 scroll-auto'>
            <div className='grid items-center grid-cols-2 py-3 pl-2 mx-3 my-3 text-base bg-white border rounded-lg'>
                    <div className='items-center justify-center text-sm font-medium leading-5 text-gray-700'>
                    <div className='flex '>
                      <div className='pr-2 text-gray-400'>姓名:</div>
                      <div className='text-gray-800'>张大宝</div>
                    </div>
                    <div className='flex leading-5'>
                      <div className='pr-2 text-gray-400'>年龄:</div>
                      <div className='text-gray-800'>11周岁</div>
                    </div>
                    <div className='flex'>
                      <div className='pr-2 text-gray-400'>家长:</div>
                      <div className='text-gray-800'>孔莉</div>
                    </div>
                    </div>
                    <a className='mr-2 cursor-pointer justify-self-end'  onClick={()=>{router.push("")}}>
                      <svg className="w-5 h-5 text-gray-300"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
                    </a>
                  </div>     


                  <div className='grid items-center grid-cols-2 py-3 pl-2 mx-3 my-3 text-base bg-white border rounded-lg'>
                    <div className='items-center justify-center text-sm font-medium leading-5 text-gray-700'>
                    <div className='flex '>
                      <div className='pr-2 text-gray-400'>姓名:</div>
                      <div className='text-gray-800'>张大宝</div>
                    </div>
                    <div className='flex leading-5'>
                      <div className='pr-2 text-gray-400'>年龄:</div>
                      <div className='text-gray-800'>11周岁</div>
                    </div>
                    <div className='flex'>
                      <div className='pr-2 text-gray-400'>家长:</div>
                      <div className='text-gray-800'>孔莉</div>
                    </div>
                    </div>
                    <a className='mr-2 cursor-pointer justify-self-end'  onClick={()=>{router.push("")}}>
                      <svg className="w-5 h-5 text-gray-300"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
                    </a>
                  </div>

                  <div className='grid items-center grid-cols-2 py-3 pl-2 mx-3 my-3 text-base bg-white border rounded-lg'>
                    <div className='items-center justify-center text-sm font-medium leading-5 text-gray-700'>
                    <div className='flex '>
                      <div className='pr-2 text-gray-400'>姓名:</div>
                      <div className='text-gray-800'>张大宝</div>
                    </div>
                    <div className='flex leading-5'>
                      <div className='pr-2 text-gray-400'>年龄:</div>
                      <div className='text-gray-800'>11周岁</div>
                    </div>
                    <div className='flex'>
                      <div className='pr-2 text-gray-400'>家长:</div>
                      <div className='text-gray-800'>孔莉</div>
                    </div>
                    </div>
                    <a className='mr-2 cursor-pointer justify-self-end'  onClick={()=>{router.push("")}}>
                      <svg className="w-5 h-5 text-gray-300"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
                    </a>
                  </div>

                  <div className='grid items-center grid-cols-2 py-3 pl-2 mx-3 my-3 text-base bg-white border rounded-lg'>
                    <div className='items-center justify-center text-sm font-medium leading-5 text-gray-700'>
                    <div className='flex '>
                      <div className='pr-2 text-gray-400'>姓名:</div>
                      <div className='text-gray-800'>张大宝</div>
                    </div>
                    <div className='flex leading-5'>
                      <div className='pr-2 text-gray-400'>年龄:</div>
                      <div className='text-gray-800'>11周岁</div>
                    </div>
                    <div className='flex'>
                      <div className='pr-2 text-gray-400'>家长:</div>
                      <div className='text-gray-800'>孔莉</div>
                    </div>
                    </div>
                    <a className='mr-2 cursor-pointer justify-self-end'  onClick={()=>{router.push("editStuInfo")}}>
                      <svg className="w-5 h-5 text-gray-300"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
                    </a>
                  </div>
        </div>
        <div className='fixed bottom-0 flex w-full mt-6 bg-white border-t h-14 justify-items-center'>
            <button className='self-center w-full h-10 mx-6 mt-1 text-sm font-medium text-white bg-primary-500 rounded-3xl' onClick={()=>{router.push("addStuInfo")}}>立即支付</button>
        </div>
    </IonContent>
  </IonPage>
}

export default StuInfoMag