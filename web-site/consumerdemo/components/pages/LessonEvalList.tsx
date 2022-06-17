import React from 'react'
import { IonPage, IonHeader, IonContent } from '@ionic/react'
import LessonEvalCard from 'components/LessonEvalCard'

// 我的评价列表
const LessonEvalList = () => {
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>我的评价</div>
      </div>
    </IonHeader>
    <IonContent>
      <div className='px-2 pt-4 pb-3 mx-3 my-2 mb-2 text-xs rounded-md shadow-md'>
        <LessonEvalCard />
        <LessonEvalCard />
      </div>
      <p className='my-4 text-center text-gray-400'>上滑加载更多评论~</p>
    </IonContent>
  </IonPage>
}

export default LessonEvalList