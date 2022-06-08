import React from 'react'
import { IonPage,IonContent,IonHeader } from '@ionic/react'
import Calendar from '../Calendar'

const CheckInList=()=>{
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
            <div className='inline text-green-500'>已签到</div>
            <div className='inline pl-2 text-gray-500'>签到类型：</div>
            <div className='inline pl-1 text-gray-500'>自动签到</div>
          </div>
          <div className='text-sm leading-7'>
            <div className='inline '>少儿编程</div>
            <div className='inline'>（张大宝）</div>
            <div className='inline'>第</div>
            <div className='inline'>12</div>
            <div className='inline'>课</div>
          </div>
          <div className='leading-7'>
            <div className='inline font-bold'>签到时间:</div>
            <div className='inline font-bold'>08:21</div>
            <input className='inline px-2 ml-4 text-xs text-center border border-secondary-300 text-secondary-300 rounded-3xl' type="button" value="去协商" />
          </div>
        </div>

        <div className='pl-2 mx-3 mt-3'>
          <div className='text-sm leading-7'>
            <div className='inline text-remind-500'>已请假</div>
            <div className='inline pl-2 text-gray-500'>签到类型：</div>
            <div className='inline pl-1 text-gray-500'>未签到</div>
          </div>
          <div className='text-sm leading-7'>
            <div className='inline '>少儿编程</div>
            <div className='inline'>（张大宝）</div>
            <div className='inline'>第</div>
            <div className='inline'>12</div>
            <div className='inline'>课</div>
          </div>
          <div className='leading-7'>
            <div className='inline font-bold'>签到时间:</div>
            <div className='inline font-bold'>08:21</div>
            <input className='inline px-2 ml-4 text-xs text-center border border-secondary-300 text-secondary-300 rounded-3xl' type="button" value="去协商" />
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default CheckInList