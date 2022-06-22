import React from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import LessonEvalCard from "../LessonEvalCard"
import LessonFrame from "../LessonFrame"
import LessonIntroduce from 'components/LessonIntroduce';
import TeacherIntroduce from 'components/TeacherIntroduce';
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/router'
import { useAppDispatch } from '../../app/hook'
import { increment } from '../../features/order-cart/counterSlice'
import { Lesson, Teacher, EduOrg } from '../../types/types'
import Navbar from 'components/Navbar'

// 标签选项卡
function MyTabs() {
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
          <OrgInfo />
          <LessonIntroduce />
          <TeacherIntroduce />
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

// 课程的培训机构信息组件
const OrgInfo = () => {
  const router = useRouter();
  const { item } = router.query
  let lesson: Lesson = { lessonName: "小熊美术课程3-5岁", lessonTotalPrice: 880.00, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育",lessonId:"lesson-001",eduId:"edu-001",teacherId:"teacher-001" }
  console.log("lesson.lessonTotalPrice" + lesson.lessonTotalPrice)
  console.log("lessonTotalQuantity" + lesson.lessonTotalQuantity)
  let teacher: Teacher = { teacherName: "李梅", teacherIntroduce: "3333333", teacherId: "teacher-001" }
  let eduOrg: EduOrg = { eduAddress: "河北省廊坊市", eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }
  if (typeof item === 'string') {
    lesson = JSON.parse(item)
  }
  const dispatch = useAppDispatch()
  return <div className='px-3 py-1 mx-3 rounded-lg shadow-md'>
    <div className='text-lg font-bold'>{lesson.lessonName}</div>

    <div className='flex pt-1'>
      <div className='text-sm text-gray-500'>讲师:</div>
      <div className='text-sm'>&nbsp;&nbsp;{teacher.teacherName}</div>
      <div className='flex flex-auto justify-self-end'>
        <svg className="w-3 h-3 m-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        <svg className="w-3 h-3 mt-1 mr-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        <svg className="w-3 h-3 mt-1 mr-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        <svg className="w-3 h-3 mt-1 mr-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        <svg className="w-3 h-3 mt-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </div>
    </div>

    <div className='flex pt-1 text-xs'>
      <div className="text-red-500 "><span>¥</span>{lesson.lessonTotalPrice}</div>
      <div className='pl-3 text-gray-500'>{lesson.lessonTotalQuantity}<span>课时</span></div>
    </div>
    <div className='flex pt-1 text-xs'>
      <div className='text-gray-500'>地址：</div>
      <div>{eduOrg.eduAddress}</div>
    </div>
    <div className='flex pt-1 text-xs'>
      <div className='text-gray-500'>电话：</div>
      <div>{eduOrg.eduContactPhone}</div>
    </div>
  </div>
}

// 课程详情页面底部菜单组件
const LessonDetailBottomMenu = () => {
  const router = useRouter();
  let lesson: Lesson = { lessonName: "小熊美术课程3-5岁", lessonTotalPrice: 880, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育",lessonId:"lesson-001",eduId:"edu-001",teacherId:"teacher-001" }
  console.log("lesson" + lesson.lessonName)
  const { item } = router.query
  if (typeof item === 'string') {
    lesson = JSON.parse(item)
  }
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
      </div>
      <div className='mr-4 text-xs text-gray-500'
        onClick={() => { router.push("shoppingCar") }}>购物车</div>
    </a>
    <button className='h-10 mt-2 ml-8 text-sm font-medium text-white bg-orange-400 rounded-l-3xl grow focus:bg-orange-600'
      onClick={() => { dispatch(increment({ payload: lesson })) }}>加入购物车</button>
    <button className='h-10 px-3 mt-2 mr-8 text-sm font-medium text-white grow bg-primary-500 rounded-r-3xl'
      onClick={() => { router.push("./conOrder") }}>立即购买</button>
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