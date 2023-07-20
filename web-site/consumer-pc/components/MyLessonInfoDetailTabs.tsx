// import OrgLessonInfo from './OrgLessonInfo'
// import LessonEvalCard from "./LessonEvalCard"
// import LessonFrame from "./LessonFrame"
// import TeacherIntroduce from 'components/TeacherIntroduce';
// import { Tab } from '@headlessui/react';
// import { Contract } from '../types/types'
// import { useRouter } from 'next/router'
// import Schedule from './Schedule';
// import OrderInfo from './OrderInfo';

// // 我的课程详情标签选项卡
// const MyLessonInfoDetailTabs = () => {
//   const router = useRouter();
//   const { item } = router.query
//   let lesson: Lesson = { lessonName: "小熊美术课程3-5岁", lessonTotalPrice: 880.00, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001" }
//   let teacher: Teacher = { teacherName: "李梅", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" }
//   let eduOrg: EduOrg = { eduAddress: "河北省廊坊市", eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }
//   if (typeof item === 'string') {
//     lesson = JSON.parse(item)
//   }
//   return (
//     <Tab.Group defaultIndex={0}>
//       <Tab.List className="grid items-center grid-cols-3 gap-10 py-2 mx-10 mt-3 text-sm text-gray-500 justify-items-center">
//         <Tab className={({ selected }) =>
//           selected ? 'font-medium text-primary-600 flex justify-center focus:outline-none' : 'bg-white text-gray-500'
//         }>课程详情</Tab>
//         <Tab className={({ selected }) =>
//           selected ? 'font-medium text-primary-600 flex justify-center focus:outline-none' : 'bg-white text-gray-500'
//         }>课程大纲</Tab>
//         <Tab className={({ selected }) =>
//           selected ? 'font-medium text-primary-600 flex justify-center focus:outline-none' : 'bg-white text-gray-500'
//         }>评价(<span>14</span><span>)</span></Tab>
//       </Tab.List>
//       <Tab.Panels>
//         <Tab.Panel>
//         <OrgLessonInfo lessonName={lesson.lessonName} teacherName={teacher.teacherName} lessonTotalPrice={lesson.lessonTotalPrice} lessonTotalQuantity={lesson.lessonTotalQuantity} eduAddress={eduOrg.eduAddress} eduContactPhone={eduOrg.eduContactPhone} lessonIntroduce={lesson.lessonIntroduce} />
//           <LessonIntroduce lessonIntroduce={lesson.lessonIntroduce} />
//           <TeacherIntroduce teacherIntroduce={teacher.teacherIntroduce} />
//         </Tab.Panel>
//         <Tab.Panel>
//           <LessonFrame />
//         </Tab.Panel>
//         <Tab.Panel>
//           <LessonEvalCard />
//         </Tab.Panel>
//       </Tab.Panels>
//     </Tab.Group>
//   )
// }

// export default MyLessonInfoDetailTabs

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
  // let lesson: Lesson = { lessonName: "小熊美术课程3-5岁", lessonTotalPrice: 880.00, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001" }
  // let teacher: Teacher = { teacherName: "李梅", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" }
  // let eduOrg: EduOrg = { eduAddress: "河北省廊坊市", eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }
  // if (typeof item === 'string') {
  //   order = JSON.parse(item)
  // }
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
        <Tab.Panel className="flex justify-center flex-col justify-items-center">
          <OrgLessonInfo lessonName={order.lessonName} teacherName={order.teacherName} lessonTotalPrice={order.lessonTotalPrice} lessonTotalQuantity={order.lessonTotalQuantity} eduAddress={order.eduAddress} eduContactPhone={order.eduContactPhone} />
          <LessonIntroduce lessonIntroduce={order.lessonIntroduce} />
          <TeacherIntroduce teacherIntroduce={order.teacherIntroduce} />
          <OrderInfo orderNo={order.orderNo} contractDate={order.contractDate} contractTime={order.contractTime} consumerName={order.consumerName} consumerStuName={order.consumerStuName} lessonTotalPrice={order.lessonTotalPrice} />
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