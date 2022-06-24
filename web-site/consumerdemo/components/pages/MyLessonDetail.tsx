import { IonPage, IonHeader, IonContent } from "@ionic/react"
import Navbar from 'components/Navbar'
import MyLessonInfoDetailTabs from '../MyLessonInfoDetailTabs'
import LessonImage from '../LessonImage'
import {Lesson} from '../../types/types'
import MyLessonDetailBottomMenu from '../MyLessonDetailBottomMenu'

let lesson:Lesson={lessonImgs:"http://placekitten.com/g/200/300"}

// 我的课程详情页面
const MyLessonDetail= () => {
  return <IonPage>
    <IonHeader>
      <Navbar title="课程详情" />
    </IonHeader>
    <IonContent>
      <div className='relative mb-3 bg-white pb-14 scroll-auto'>
        {/* 课程图片 */}
        <LessonImage lessonImage={lesson.lessonImgs} />
        <MyLessonInfoDetailTabs />
      </div>
      <MyLessonDetailBottomMenu />
    </IonContent>
  </IonPage>
}

export default MyLessonDetail