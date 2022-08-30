import { IonPage, IonHeader, IonContent,IonToolbar,IonButtons,IonBackButton } from "@ionic/react"
import Navbar from 'components/Navbar'
import LessonDetailTabs from '../LessonDetailTabs'
import LessonImage from '../LessonImage'
import LessonDetailBottomMenu from '../LessonDetailBottomMenu'
import {Lesson} from '../../types/types'

let lesson:Lesson={lessonImgs:"https://s3.bmp.ovh/imgs/2022/08/30/28f95385d82b4f7c.jpg"}

interface LessonProps {
  lesson_imgs?: string
  lesson_name?: string
  lesson_introduce?: string
  edu_address?: string
  item?: Lesson
}
// 课程详情页面

const SearchLessonDetail= (props:LessonProps) => {

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