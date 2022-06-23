import { FC } from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import LessonEvalCard from "../LessonEvalCard"
import LessonFrame from "../LessonFrame"
import LessonIntroduce from 'components/LessonIntroduce';
import TeacherIntroduce from 'components/TeacherIntroduce';
import { Tab } from '@headlessui/react';
import Router,{ useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { increment, selectCount, selectCarList } from '../../features/order-cart/counterSlice'
import { Lesson, Teacher, EduOrg } from '../../types/types'
import Navbar from 'components/Navbar'
import { motion } from 'framer-motion'
import TeacherName from 'components/TeacherName';
import OrgAddressAndPhone from 'components/OrgAddressAndPhone'

// 标签选项卡
const MyTabs = () => {
  const router = useRouter();
  const { item } = router.query
  let lesson: Lesson = { lessonName: "小熊美术课程3-5岁", lessonTotalPrice: 880.00, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001" }
  let teacher: Teacher = { teacherName: "李梅", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" }
  let eduOrg: EduOrg = { eduAddress: "河北省廊坊市", eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }
  if (typeof item === 'string') {
    lesson = JSON.parse(item)
  }
  return (
    <Tab.Group defaultIndex={0}>
      <Tab.List className="grid items-center grid-cols-3 gap-10 py-2 mx-10 mt-3 text-sm text-gray-500 justify-items-center">
        <Tab className={({ selected }) =>
          selected ? 'font-medium text-primary-600 flex justify-center focus:outline-none' : 'bg-white text-gray-500'
        }>课程详情</Tab>
        <Tab className={({ selected }) =>
          selected ? 'font-medium text-primary-600 flex justify-center focus:outline-none' : 'bg-white text-gray-500'
        }>课程大纲</Tab>
        <Tab className={({ selected }) =>
          selected ? 'font-medium text-primary-600 flex justify-center focus:outline-none' : 'bg-white text-gray-500'
        }>评价(<span>14</span><span>)</span></Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <OrgInfo lessonName={lesson.lessonName} teacherName={teacher.teacherName} lessonTotalPrice={lesson.lessonTotalPrice} lessonTotalQuantity={lesson.lessonTotalQuantity} eduAddress={eduOrg.eduAddress} eduContactPhone={eduOrg.eduContactPhone} />
          <TeacherIntroduce teacherIntroduce={teacher.teacherIntroduce} />
        </Tab.Panel>
        <Tab.Panel>
          <LessonFrame />
        </Tab.Panel>
        <Tab.Panel>
          <LessonEvalCard />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

interface lessonProps {
  lessonName?: string
  teacherName?: string
  lessonTotalPrice?: number
  lessonTotalQuantity?: number
  eduAddress?: string
  eduContactPhone?: string
  lessonIntroduce?:string
}

// 课程的培训机构信息组件
const OrgInfo: FC<lessonProps> = (props) => {

  const dispatch = useAppDispatch()
  return (<>
    <div className='px-3 py-1 mx-3 rounded-lg shadow-md'>
      <div className='text-lg font-bold'>{props.lessonName}</div>
      <TeacherName teacherName={props.teacherName} />
      <div className='flex pt-1 text-xs'>
        <div className="text-red-500 "><span>¥</span>{props.lessonTotalPrice}</div>
        <div className='pl-3 text-gray-500'>{props.lessonTotalQuantity}<span>课时</span></div>
      </div>
      <OrgAddressAndPhone eduContactPhone={props.eduContactPhone} eduAddress={props.eduAddress}  />
    </div>
    <div className='p-3 mx-3 mt-2 text-xs rounded-lg shadow-md'>
      <div className='text-sm font-bold text-gray-600'>课程介绍</div>
      <div className='pt-1 text-gray-500'>{props.lessonIntroduce}</div>
    </div>
  </>
  )

}

interface LessonDetailBottomMenuProps{
  item:Lesson
}
// 课程详情页面底部菜单组件
const LessonDetailBottomMenu:FC<LessonDetailBottomMenuProps> = (props) => {
  console.log("进入LessonDetailBottomMenu")
  const router = useRouter();
  let lesson: Lesson = { lessonName: "小熊美术课程3-5岁", lessonTotalPrice: 880, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001" }
  const { item } = router.query
  if (typeof item === 'string') {
    lesson = JSON.parse(item)
    console.log("lesson"+lesson)
  }
  const count = useAppSelector(selectCount)
  //console.log("count"+count)
  const carList = useAppSelector(selectCarList)
  //console.log("carList"+carList)
  const carListStr = carList.map((item) => {
    return JSON.stringify(item)
  })
  //console.log("carListStr"+carListStr)
  const dispatch = useAppDispatch()

  return <div className='fixed bottom-0 flex w-full pl-5 mt-6 ml-3 mr-5 bg-white h-14'>
    <a className='mt-2 mr-6'
      href="./orgLessonList">
      <div>
        <svg className="w-5 h-5 ml-1 text-gray-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M3 21v-13l9-4l9 4v13" />  <path d="M13 13h4v8h-10v-6h6" />  <path d="M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3" /></svg>
      </div>
      <div className='text-xs text-gray-500'>机构</div>
    </a>
    <a className='mt-2 '
      href="./shoppingCar">
      <div>
        <svg className="w-5 h-5 ml-2 text-gray-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="9" cy="19" r="2" />  <circle cx="17" cy="19" r="2" />  <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" /></svg>
        <motion.div key={count} className={'absolute bottom-6 left-20 ' + (count === 0 && 'hidden')} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{count}</span></motion.div>
      </div>

      <div className='mr-4 text-xs text-gray-500'
        onClick={() => { Router.push({ pathname: './shoppingCar', query: { carList: carListStr } }) }}>购物车</div>
    </a>
    <button className='h-10 mt-2 ml-8 text-sm font-medium text-white bg-orange-400 rounded-l-3xl grow focus:bg-orange-600'
      onClick={() => { dispatch(increment({ payload: lesson })) }}>加入购物车</button>
    <button className='h-10 px-3 mt-2 mr-8 text-sm font-medium text-white grow bg-primary-500 rounded-r-3xl'
      onClick={() => {
        Router.push("./conOrder")
      }}>立即购买</button>
  </div>
}

// 课程详情页面
const SearchLessonDetail = () => {
  return <IonPage>
    <IonHeader>
      <Navbar title="课程详情" />
    </IonHeader>
    <IonContent>
      <div className='relative mb-3 bg-white pb-14 scroll-auto'>
        {/* 课程图片 */}
        <div>
          <img className='w-full h-40' src="http://placekitten.com/g/200/300"></img>
        </div>
        <MyTabs />
      </div>
      <LessonDetailBottomMenu />
    </IonContent>
  </IonPage>
}

export default SearchLessonDetail