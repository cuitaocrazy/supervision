import { IonPage, IonHeader, IonContent } from "@ionic/react"
import Navbar from 'components/Navbar'
import LessonDetailTabs from '../LessonDetailTabs'
import LessonImage from '../LessonImage'
import LessonDetailBottomMenu from '../LessonDetailBottomMenu'
import {Lesson} from '../../types/types'

let lesson:Lesson={lessonImgs:"http://placekitten.com/g/200/300"}

// 课程详情页面
const SearchLessonDetail= () => {
  return <IonPage>
    <IonHeader>
      <Navbar title="课程详情" />
    </IonHeader>
    <IonContent>
      <div className='relative mb-3 bg-white pb-14 scroll-auto'>
        {/* 课程图片 */}
        <LessonImage lessonImage={lesson.lessonImgs} />
        <LessonDetailTabs />
      </div>
      <LessonDetailBottomMenu />
    </IonContent>
  </IonPage>
}

export default SearchLessonDetail