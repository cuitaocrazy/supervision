import React from 'react'
import { IonPage, IonHeader, IonContent } from '@ionic/react'
import Navbar from 'components/Navbar'

// 我的投诉列表组件card
const CompListCard = () => {
  return <div className='flex items-center justify-between px-4 py-4 mx-2 my-2 text-sm rounded-md shadow-md'>
    <div >
      <p className='text-gray-900 '>核桃编程培训机构</p>
      <p className='leading-6 text-gray-400'>少儿编程</p>
    </div>
    <div className='text-red-400'>待办</div>
  </div>
}

// 我的投诉列表
const MyCompList = () => {
  return <IonPage>
    <IonHeader>
      <Navbar title="我的投诉" />
    </IonHeader>
    <IonContent>
      <div className='text-sm'>
        <CompListCard />
      </div>
    </IonContent>
  </IonPage>
}

export default MyCompList