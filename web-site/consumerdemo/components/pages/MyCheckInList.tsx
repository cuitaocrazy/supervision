import React from 'react'
import { IonPage, IonContent, IonHeader } from '@ionic/react'
import Calendar from '../Calendar'
import CheckInResultList from 'components/CheckInResultList'

// 一门课程的签到结果列表页面
const MyCheckInList = () => {
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>签到列表</div>
      </div>
    </IonHeader>
    <IonContent>
      <div>
        <Calendar />
        <CheckInResultList />
      </div>
    </IonContent>
  </IonPage>
}

export default MyCheckInList