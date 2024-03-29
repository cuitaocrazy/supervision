import { IonPage, IonContent } from "@ionic/react"
import LessonDetailTabs from '../LessonDetailTabs'
import Search from '../Search'
import { useEffect, useState, useContext, useRef } from "react"
import { searchLessonURL } from '../../const/const'
import LessonIntroduce from 'components/LessonIntroduce';
import TeacherIntroduce from 'components/TeacherIntroduce';
import { AppContext } from '../../appState';
import { Lesson, Teacher, EduOrg } from '../../types/types'



interface LessonProps {
  lesson_imgs?: string
  lesson_name?: string
  lesson_introduce?: string
  edu_address?: string
  item?: Lesson
}
// 课程详情页面



const SearchLessonDetail = (props: LessonProps) => {
  const { state } = useContext(AppContext);
  console.log(state.loginUser.username)
  const onQuery = () => {
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
      .then((json) => {
        setLessonList(json.result)
      })
  }
  const [lessonList, setLessonList] = useState([] as Lesson[])
  let lesson: Lesson = state.lessonDetail //{ lessonName: "小熊美术课程3-5岁", lessonTotalPrice: 880.00, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001",lessonOutline:"01. 太阳（圆型 暖色调）1" }
  let teacher: Teacher = state.lessonDetail.teacher //Teacher = { teacherName: "李梅", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" }
  // let eduOrg: EduOrg = state.lessonDetail.edu//{ eduAddress: "河北省廊坊市", eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }

  useEffect(onQuery, [])

  const [queryStr, setQueryStr] = useState('')
  const [page, setPage] = useState(0)
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  const paramStr = getParamStr(
    {
      queryStr: queryStr,
      page: page,
      size: 10
    },
    searchLessonURL
  );
  // 定义搜索的框的引用
  const searchRef = useRef<{
    openLoginModal: () => void;
  }>(null)
  const openLoginModal = () => searchRef.current?.openLoginModal()
  return <IonPage>
    <IonContent>

      <div className='relative flex flex-col items-center mb-3 bg-white pb-14 scroll-auto'>
        <Search setQueryStr={setQueryStr} onQuery={onQuery} ref={searchRef} />
        <div className="flex w-3/4 mx-auto text-sm text-gray-400 mt-24 bg-gray-100 py-2 px-2">
          <div className="flex items-center ">
            <span className="pr-2">首页</span> <span className="pr-2">/</span><span className="pr-2">搜索结果</span><span className="pr-2">/</span><span>课程详情</span>
          </div>
        </div>
        {/* 课程图片 */}
        {/* <LessonImage lessonImage={lesson.lessonImgs} /> */}
        <LessonDetailTabs openLoginModal={openLoginModal} />

      </div>
      <div className="grid grid-cols-2 w-3/4 mx-auto mt-2 bg-white rounded-lg shadow-md">
        <LessonIntroduce lessonIntroduce={lesson.lessonIntroduce} />
        <TeacherIntroduce teacherIntroduce={teacher.teacherIntroduce} />
      </div>
    </IonContent>
  </IonPage>
}

export default SearchLessonDetail