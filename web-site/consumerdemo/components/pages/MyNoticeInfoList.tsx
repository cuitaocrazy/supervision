import React from 'react'
import { IonPage, IonHeader, IonContent } from '@ionic/react'
import Navbar from 'components/Navbar'

// 公告信息组件
const NoticeInfoListCard = () => {
  return (
    <div className='px-4 py-3 mx-2 my-2 text-sm rounded-md shadow-md'>
      <div className='flex items-center justify-between'>
        <div className='flex font-bold text-gray-900'>监管机构公告</div>
        <div className='flex pr-1 text-gray-400'>2022/05/18</div>
      </div>
      <div className='leading-8 text-gray-400 truncate'>今日调整监管机构存放法则相关条例相关法则如下:今日调整监管机构存放法则相关条例相关法则如下</div>
    </div>
  )
}

// 公告信息
const MyNoticeInfoList = () => {
  return <IonPage>
    <IonHeader>
      <Navbar title="公告信息" />
    </IonHeader>
    <IonContent>
        <NoticeInfoListCard />
    </IonContent>
  </IonPage>
}

export default MyNoticeInfoList