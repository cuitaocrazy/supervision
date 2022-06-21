import React from 'react'
import { IonPage, IonContent, IonHeader } from '@ionic/react'
import Calendar from '../Calendar'
import CheckInResultListCard from 'components/CheckInResultListCard'
import Navbar from 'components/Navbar'

// 一门课程的签到结果列表页面
const MyCheckInList = () => {
  return <IonPage>
    <IonHeader>
      <Navbar title="签到列表" />
    </IonHeader>
    <IonContent>
      <div>
        <Calendar />
        <CheckInResultListCard />
      </div>
    </IonContent>
  </IonPage>
}

export default MyCheckInList