
import OrgLessonInfo from './OrgLessonInfo'
import LessonEvalCard from "./LessonEvalCard"
import LessonFrame from "./LessonFrame"
import LessonIntroduce from 'components/LessonIntroduce';
import TeacherIntroduce from 'components/TeacherIntroduce';
import { Tab } from '@headlessui/react';
import { Lesson, Teacher, EduOrg,Contract } from '../types/types'
import {useRouter} from 'next/router'
import {AppContext} from '../appState';
import { useContext } from 'react';
 import OrderInfo from './OrderInfo';

// 课程详情标签选项卡
const LessonDetailTabs = () => {
  const router = useRouter();
  const { item } = router.query
  const { state } = useContext(AppContext);
  let order :Contract=state.contractDetail
  // console.log('pc端课程详情页面:'+JSON.stringify(order))
  return (
    <Tab.Group defaultIndex={0}>
      <Tab.List className="grid items-center grid-cols-3 gap-10 py-2 mx-10 mt-3 text-sm text-gray-500 justify-items-center ">
        <Tab className={({ selected }) =>
          selected ? 'font-medium text-primary-600 flex justify-center focus:outline-none' : 'bg-white text-gray-500'
        }>课程详情</Tab>
        <Tab className={({ selected }) =>
          selected ? 'font-medium text-primary-600 flex justify-center focus:outline-none' : 'bg-white text-gray-500'
        }>课程大纲</Tab>
        <Tab className={({ selected }) =>
          selected ? 'font-medium text-primary-600 flex justify-center focus:outline-none ' : 'bg-white text-gray-500'
        }>评价(<span>14</span><span>)</span></Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className="grid grid-cols-4 justify-center  justify-items-center w-3/4 mx-auto mt-10">
          <div className='mx-3 text-sm rounded-lg shadow-md '>
            <OrgLessonInfo lessonName={order.lessonName} teacherName={order.teacherName} lessonTotalPrice={order.lessonTotalPrice} lessonTotalQuantity={order.lessonTotalQuantity} eduAddress={order.eduAddress} eduContactPhone={order.eduContactPhone} />
          </div>
          <div className='mx-3 text-sm rounded-lg shadow-md '>
            <LessonIntroduce lessonIntroduce={order.lessonIntroduce} />
          </div>
          <div className='mx-3 text-sm rounded-lg shadow-md '>
            <TeacherIntroduce teacherIntroduce={order.teacherIntroduce} />
          </div>
          <div className='mx-3 text-sm rounded-lg shadow-md '>
           <OrderInfo orderNo={order.contractId} contractDate={order.contractDate} contractTime={order.contractTime} consumerName={order.consumerName} consumerStuName={order.consumerStuName} lessonTotalPrice={order.lessonTotalPrice} />
          </div>
          
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

export default LessonDetailTabs