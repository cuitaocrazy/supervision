import React from 'react'
import { IonPage, IonHeader, IonContent } from '@ionic/react'
import AtteDropDown from 'components/AtteDropDown'

// 协商详情页面
const DiscussDetail = () => {
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>协商详情</div>
      </div>
    </IonHeader>
    <IonContent>
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
        {/* <AtteDropDown /> */}
        <div className='flex '>
          <span className='pr-4 leading-7 text-gray-500'>修改考勤</span>
          <select className='w-20 h-6 pl-2 mr-4 text-gray-500 border rounded-md focus:outline-none'>
            <option value="" selected >签到</option>
            <option value="">请假</option>
            <option value="">旷课</option>
          </select>
        </div>
        <div>
          <span className='pr-2 leading-7 text-gray-500'>修改原因</span>
          <textarea className='w-full p-2 rounded-md bg-gray-50 h-28' placeholder='请输入您要修改的原因~' />
        </div>
      </div>
      <div className='flex mt-10 text-sm'>
        <input value="提交协商申请" type="button"
          className='w-full py-2 mx-10 font-bold text-white shadow-md rounded-3xl bg-primary-600 shadow-primary-600 focus:outline-none' />
      </div>
    </IonContent>
  </IonPage>
}

export default DiscussDetail