import { IonPage, IonHeader, IonContent } from "@ionic/react"
import Search from '../Search'
import Navbar from '../Navbar'
import { Lesson } from '../../types/types'
import LessonListCard from '../LessonListCard'
import LessonImages from "components/LessonImages"
import FeaturedRecommendAndMore from '../FeaturedRecommendAndMore'
import RoundedCornersStyles from '../RoundedCornersStyles'

// 首页
const Home = () => {
  // 轮播图数据
  let lesson: Lesson = { lessonImgs: "http://placekitten.com/g/200/300" }
  // 课程列表数据
  let lessonListDemo: Lesson[] = [
    { lessonImgs: "http://placekitten.com/g/200/300", lessonName: "小熊美术课程3-5岁", lessonTotalPrice: 880.00, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", edu: { eduAddress: '地址：廊坊市安次区和平路荣益广场3层206',eduName:'教育机构1', eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }, lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001",lessonOutline:"01. 太阳（圆型 暖色调）1",teacher:{ teacherName: "李梅1", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" },lessonStartDate:'20200101' },
    { lessonImgs: "http://placekitten.com/g/200/300", lessonName: "小熊美术课程5-7岁", lessonTotalPrice: 880.00, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", edu: { eduAddress: '地址：廊坊市安次区和平路荣益广场3层206',eduName:'教育机构1', eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }, lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001" ,lessonOutline:"01. 太阳（圆型 暖色调）1",teacher:{ teacherName: "李梅2", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" } ,lessonStartDate:'20200101'},
    { lessonImgs: "http://placekitten.com/g/200/300", lessonName: "小熊美术课程7-9岁", lessonTotalPrice: 880.00, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", edu: { eduAddress: '地址：廊坊市安次区和平路荣益广场3层206',eduName:'教育机构1', eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }, lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001" ,lessonOutline:"01. 太阳（圆型 暖色调）1" ,teacher:{ teacherName: "李梅3", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" },lessonStartDate:'20200101'},
    { lessonImgs: "http://placekitten.com/g/200/300", lessonName: "小熊美术课程9-11岁", lessonTotalPrice: 880.00, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", edu: { eduAddress: '地址：廊坊市安次区和平路荣益广场3层206',eduName:'教育机构1', eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }, lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001",lessonOutline:"01. 太阳（圆型 暖色调）1" ,teacher:{ teacherName: "李梅4", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" },lessonStartDate:'20200101'},
    { lessonImgs: "http://placekitten.com/g/200/300", lessonName: "小熊美术课程11-13岁", lessonTotalPrice: 880.00, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", edu: { eduAddress: '地址：廊坊市安次区和平路荣益广场3层206',eduName:'教育机构1', eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }, lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001" ,lessonOutline:"01. 太阳（圆型 暖色调）1" ,teacher:{ teacherName: "李梅5", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" },lessonStartDate:'20200101'},
    { lessonImgs: "http://placekitten.com/g/200/300", lessonName: "小熊美术课程13-15岁", lessonTotalPrice: 880.00, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", edu: { eduAddress: '地址：廊坊市安次区和平路荣益广场3层206',eduName:'教育机构1', eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }, lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001" ,lessonOutline:"01. 太阳（圆型 暖色调）1" ,teacher:{ teacherName: "李梅6", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" },lessonStartDate:'20200101'},
  ]
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
            {lessonListDemo.map((item, index) => {
              return <LessonListCard key={index} lesson_imgs={item.lessonImgs} lesson_name={item.lessonName} lesson_introduce={item.lessonIntroduce} item={item} edu_address={item.edu?.eduAddress} />
            })}
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default Home