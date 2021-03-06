import React from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

type FormData = {
  name: string;
}

// 数币系统的支付结果页面
const ECNYPayResult = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    // router.push('/searchLessonList')
  }
  return <IonPage>
    <IonHeader>
      <Navbar title='支付结果' />
    </IonHeader>
    <IonContent>
      <div className='relative '>
        <div className='grid justify-center grid-rows-1'>
          <div className='mt-20 '>
            <img className='w-48 h-32 rounded-lg' src="http://placekitten.com/g/200/300"></img>
          </div>
          <div className='pt-4 pb-16 text-lg text-center text-gray-700'>支付成功！</div>
        </div>
        <div className='flex mx-3'>
          <Link to='payResult'>
          <button className='w-full py-2 mx-6 text-base font-bold text-white shadow-md shadow-primary-500 bg-primary-500 rounded-3xl'
                 >返回教育机构</button>
          </Link>

        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default ECNYPayResult