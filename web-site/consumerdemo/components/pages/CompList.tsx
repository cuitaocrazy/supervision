import React from 'react'
import { IonPage,IonHeader,IonContent } from '@ionic/react'

// 我的投诉列表
const CompList=()=>{
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>我的投诉</div>
      </div>
    </IonHeader>
    <IonContent>
      <div className='text-sm'>
        <div className='flex items-center justify-between px-4 py-4 mx-2 my-2 rounded-md shadow-md'>
          <div className=''>
            <p className='text-gray-900 '>核桃编程培训机构</p>
            <p className='leading-6 text-gray-400'>少儿编程</p>
          </div>
          <div className='text-red-400'>待办</div>
        </div>

        <div className='flex items-center justify-between px-4 py-4 mx-2 my-2 rounded-md shadow-md'>
          <div className=''>
            <p className='text-gray-900'>小熊美术</p>
            <p className='leading-6 text-gray-400'>绘画入门水彩课</p>
          </div>
          <div className='text-orange-400'>处理中</div>
        </div>

        <div className='flex items-center justify-between px-4 py-4 mx-2 my-2 rounded-md shadow-md'>
          <div className=''>
            <p className='text-gray-900'>核桃编程培训机构</p>
            <p className='leading-6 text-gray-400'>少儿编程</p>
          </div>
          <div className='text-primary-400'>已处理</div>
        </div>

        <div className='flex items-center justify-between px-4 py-4 mx-2 my-2 rounded-md shadow-md'>
          <div className=''>
            <p className='text-gray-900'>核桃编程培训机构</p>
            <p className='leading-6 text-gray-400'>少儿编程</p>
          </div>
          <div className='text-primary-400'>已处理</div>
        </div>

        <div className='flex items-center justify-between px-4 py-4 mx-2 my-2 rounded-md shadow-md'>
          <div className=''>
            <p className='text-gray-900'>核桃编程培训机构</p>
            <p className='leading-6 text-gray-400'>少儿编程</p>
          </div>
          <div className='text-primary-400'>已处理</div>
        </div>

        <div className='flex items-center justify-between px-4 py-4 mx-2 my-2 rounded-md shadow-md'>
          <div className=''>
            <p className='text-gray-900'>核桃编程培训机构</p>
            <p className='leading-6 text-gray-400'>少儿编程</p>
          </div>
          <div className='text-primary-400'>已处理</div>
        </div>
      </div>

    </IonContent>
  </IonPage>
}

export default CompList