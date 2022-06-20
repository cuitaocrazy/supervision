import React from 'react'
import { IonPage, IonContent, IonHeader } from '@ionic/react'
import Calendar from '../Calendar'

// 所有课程的签到列表页面
const MyAllCheckInList = () => {
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>签到列表</div>
      </div>
    </IonHeader>
    <IonContent>
      <div>
        <Calendar />
        {/* 签到信息card */}
        <div className='pl-2 mx-3 mt-3'>
          <div className='text-sm leading-7'>
            <span className='text-green-500 '>已签到</span>
            <span className='pl-2 text-gray-500 '>签到类型：</span>
            <span className='pl-1 text-gray-500 '>自动签到</span>
          </div>
          <div className='text-sm leading-7'>
            <span>少儿编程</span>
            <span>（张大宝）</span>
            <span>第</span>
            <span>12</span>
            <span className='inline'>课</span>
          </div>
          <div className='leading-7'>
            <span className='font-bold'>签到时间:</span>
            <span className='font-bold'>08:21</span>
            <input className='inline px-2 ml-4 text-xs text-center border border-secondary-300 text-secondary-300 rounded-3xl' type="button" value="去协商" />
          </div>
        </div>

        <div className='pl-2 mx-3 mt-3'>
          <div className='text-sm leading-7'>
            <span className=' text-remind-500'>已请假</span>
            <span className='pl-2 text-gray-500 '>签到类型：</span>
            <span className='pl-1 text-gray-500 '>未签到</span>
          </div>
          <div className='text-sm leading-7'>
            <span>英语口语</span>
            <span>（张二宝）</span>
            <span>第</span>
            <span>12</span>
            <span className='inline'>课</span>
          </div>
          <div className='leading-7'>
            <span className='font-bold'>签到时间:</span>
            <span className='font-bold'>08:21</span>
            <input className='inline px-2 ml-4 text-xs text-center border border-secondary-300 text-secondary-300 rounded-3xl' type="button" value="去协商" />
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default MyAllCheckInList