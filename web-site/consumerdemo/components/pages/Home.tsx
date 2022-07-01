import { IonPage, IonHeader, IonContent } from "@ionic/react"
import Search from '../Search'
import Navbar from '../Navbar'
import { Lesson } from '../../types/types'
import LessonListCard from '../LessonListCard'
import LessonImages from "components/LessonImages"
import FeaturedRecommendAndMore from '../FeaturedRecommendAndMore'
import RoundedCornersStyles from '../RoundedCornersStyles'
import { useEffect,useState } from "react"
import {searchLessonURL} from '../../const/const'

// 首页
const Home = () => {
  // 轮播图数据
  let lesson: Lesson = { lessonImgs: "http://placekitten.com/g/200/300" }
  // 课程列表数据

  const [lessonList,setLessonList] = useState([] as Lesson[])
  useEffect(()=>{
    fetch(searchLessonURL, {
      method: 'GET',
      // body: JSON.stringify({
        
      // }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      setLessonList(json.result)
    })
  })


  return <IonPage>
    <IonHeader>
      <Navbar title="教育资金监管平台" />
    </IonHeader>
    <IonContent>
      <div className='relative bg-primary-600'>
        <RoundedCornersStyles />
        <div className='bg-white'>
          <Search />
          <LessonImages lessonImages={lesson.lessonImgs} />
          <FeaturedRecommendAndMore />
          {/* 课程列表card */}
          <div className="grid py-2 sm1:grid-cols-2 sm2:grid-cols-2 sm3:grid-cols-2">
            {lessonList.map((item, index) => {
              return <LessonListCard key={index} lesson_imgs={item.lessonImgs} lesson_name={item.lessonName} lesson_introduce={item.lessonIntroduce} item={item} edu_address={item.edu?.eduAddress} />
            })}
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default Home