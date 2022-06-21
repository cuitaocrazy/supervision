import React from 'react'
import { IonPage, IonHeader, IonContent } from '@ionic/react'
import AttendanceStateDownList from 'components/AttendanceStateDownList'
import {useRouter} from 'next/router'
import Navbar from '../Navbar'

// 申请协商页面
const ApplyDiscuss = () => {
  const router=useRouter();
  return <IonPage>
    <IonHeader>
      <Navbar title='协商详情' />
    </IonHeader>
    <IonContent>
      <form>
        <div className='px-4 py-2 mx-2 my-2 text-sm rounded-md shadow-md'>
          <p>
            <span className='pr-4 leading-7 text-gray-500'>课程名称</span>
            <span className='text-gray-800'>小画室绘画</span>
          </p>
          <p>
            <span className='pr-4 leading-7 text-gray-500'>上课日期</span>
            <span className='text-gray-800' >2022年05月15日</span>
          </p>
          <p>
            <span className='pr-4 leading-7 text-gray-500'>课程内容</span>
            <span className='text-gray-800'>水果篮子</span>
          </p>
          <p>
            <span className='pr-4 leading-7 text-gray-500'>投诉标题</span>
            <span className='text-gray-800'>课程协商不合理</span>
          </p>
          <div className='flex '>
            <span className='pr-4 leading-7 text-gray-500'>修改考勤</span>
            <AttendanceStateDownList />
          </div>
          <div>
            <span className='pr-2 leading-7 text-gray-500'>修改原因</span>
            <textarea className='w-full p-2 rounded-md bg-gray-50 h-28 focus:outline-none' placeholder='请输入您要修改的原因~' />
          </div>
        </div>
        <div className='flex mt-10 text-sm'>
          <input value="提交协商申请" type="button"
            className='w-full py-2 mx-10 font-bold text-white shadow-md rounded-3xl bg-primary-600 shadow-primary-600 focus:outline-none'
             onClick={()=>{router.push("")}}/>
        </div>
      </form>
    </IonContent>
  </IonPage>
}

export default ApplyDiscuss