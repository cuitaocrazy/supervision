import { FC, useState } from 'react'
import { IonPage, IonHeader, IonContent } from '@ionic/react'
import { RadioGroup } from '@headlessui/react'
import {useRouter} from 'next/router'
import CompTypeRadioGroup from '../CompTypeRadioGroup'
import Navbar from 'components/Navbar'

// 申请投诉页面
const MyApplyComp = () => {
  const router=useRouter();
  return <IonPage>
    <IonHeader>
      <Navbar title="投诉内容" />
    </IonHeader>
    <IonContent>
      <form className='text-sm bg-white'>
        <p className=''>
          <CompTypeRadioGroup />
        </p>
        <div className='px-4 pt-2 mx-2 mt-2 rounded-md shadow-md'>
          <p className='px-3 py-2 mt-2 leading-7 rounded-md bg-primary-50'>
            <span className='pr-3'>机构名称</span>
            <span>核桃编程</span>
          </p>
          <p className='pt-2 mt-2 leading-6 '>投诉标题</p>
          <input type="text" placeholder='请输入您的投诉标题'
            className='w-full pl-2 mb-2 leading-6 rounded-md focus:outline-none ' />
          <p className='mt-4'>投诉内容</p>
          <textarea placeholder='请描述您要投诉的内容......'
            className='w-full h-40 py-2 pl-2 mt-1 mb-2 rounded-md bg-gray-50 focus:outline-none' />
        </div>
        <div className='flex justify-center'>
          <input className='w-full py-3 mx-6 mt-6 font-bold tracking-wider text-center text-white shadow-md bg-primary-600 shadow-primary-500 rounded-3xl focus:outline-none focus:border-primary-700'
            value="提交投诉" 
            type="button"
            onClick={()=>{router.push("./compList")}}/>
        </div>
      </form>
    </IonContent>
  </IonPage>
}

export default MyApplyComp