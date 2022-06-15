import React from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

type FormData = {
  name: string;
}

// 教育机构的支付结果页面
const PayResult = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const router = useRouter()
  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    router.push('/searchLessonList')
  }
  return <IonPage>
    <IonHeader>
      <div className='grid h-10 grid-cols-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='col-span-9'>支付结果</div>
        <div className='text-center'>
          <svg className="w-5 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />  <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
          <motion.div key="2" className={'absolute top-2 right-5 '} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div>
        </div>
      </div>
    </IonHeader>
    <IonContent>
      <div className='relative '>
        <div className='grid justify-center grid-rows-1'>
          <div className='mt-20 '>
            <img className='w-48 h-32 rounded-lg' src="http://placekitten.com/g/200/300"></img>
          </div>
          <div className='pt-4 pb-16 text-lg text-center text-gray-700'>恭喜您支付成功！</div>
        </div>
        <div className='grid grid-cols-3 gap-3 mx-3'>
          <button className='py-2 text-sm text-white shadow-md shadow-primary-500 bg-primary-500 rounded-3xl'>返回首页</button>
          <button className='py-2 text-sm text-white shadow-md shadow-secondary-300 bg-secondary-300 rounded-3xl'>继续购买</button>
          <button className='py-2 text-sm text-white bg-red-400 shadow-md shadow-remind-400 rounded-3xl'>查看详情</button>
        </div>


      </div>
    </IonContent>
  </IonPage>
}

export default PayResult