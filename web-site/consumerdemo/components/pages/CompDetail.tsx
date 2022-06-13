import React from 'react'
import { IonPage,IonHeader,IonContent } from '@ionic/react'

// 投诉详情
const CompDetail =()=>{
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>投诉详情</div>
      </div> 
    </IonHeader>
    <IonContent>
      <div className='px-4 py-2 mx-2 my-2 text-sm rounded-md shadow-md'>
        <p className='text-primary-500'>投诉已提交给机构</p>
        <hr className='my-2 ' />
        <div className='leading-7'>
          <span className='pr-3 text-gray-500'>机构名称</span>
          <span className='text-gray-900'>核桃编程培训机构</span>
        </div>
        <div className='leading-7'>
          <span className='pr-3 text-gray-500'>课程名称</span>
          <span className='text-gray-900'>少儿编程</span>
        </div>
        <div className='leading-7'>
          <span className='pr-3 text-gray-500'>课程时间</span>
          <span className='text-gray-900'>第16课时</span>
        </div>
        <div className='leading-7'>
          <span className='pr-3 text-gray-500'>投诉类型</span>
          <span className='text-gray-900'>课程</span>
        </div>
        <div className='leading-7'>
          <span className='pr-3 text-gray-500'>投诉标题</span>
          <span className='text-gray-900'>课程衔接不合理</span>
        </div>
        <div className='leading-7'>
          <span className='pr-3 text-gray-500'>投诉日期</span>
          <span className='text-gray-900'>2022.06.10</span>
        </div>
        <div className='leading-7'>
          <span className='pr-3 text-gray-500'>投诉内容</span>
          <span className='text-gray-900'>老师课程衔接不好、孩子跟不上，请假了也不给补课，请尽快处理！！！</span>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default CompDetail