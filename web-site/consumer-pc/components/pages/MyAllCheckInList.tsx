import React from 'react'
import { IonPage, IonContent, IonHeader } from '@ionic/react'
import Calendar from '../Calendar'
import CheckInResultListCard from '../CheckInResultListCard'
import Navbar from 'components/Navbar'

// 所有课程的签到列表页面
const MyAllCheckInList = () => {
  return <IonPage>
    <IonHeader>
      <Navbar title="签到列表" />
    </IonHeader>
    <IonContent>
      <div>
        <Calendar />
        {/* 签到信息card */}
        {/* <CheckInResultListCard /> */}
      </div>
    </IonContent>
  </IonPage>
}

export default MyAllCheckInList