import OrgLessonInfo from "./OrgLessonInfo";
import LessonEvalCard from "./LessonEvalCard";
import LessonFrame from "./LessonFrame";

import { Tab } from "@headlessui/react";
import { Lesson, Teacher, EduOrg } from "../types/types";
import { useRouter } from "next/router";
import { AppContext } from "../appState";
import { useContext } from "react";
import LessonDetailBottomMenu from "./LessonDetailBottomMenu";
import { Link, Redirect } from "react-router-dom";

// 课程详情标签选项卡
const LessonDetailTabs = () => {
  const { state } = useContext(AppContext);
  console.log(state);
  const router = useRouter();
  const { item } = router.query;

  let lesson: Lesson = state.lessonDetail; //{ lessonName: "小熊美术课程3-5岁", lessonTotalPrice: 880.00, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001",lessonOutline:"01. 太阳（圆型 暖色调）1" }
  let teacher: Teacher = state.lessonDetail.teacher; //Teacher = { teacherName: "李梅", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" }
  let eduOrg: EduOrg = state.lessonDetail.edu; //{ eduAddress: "河北省廊坊市", eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }
  // if (typeof item === 'string') {
  //   lesson = JSON.parse(item)
  // }
  return (
    <div className="flex flex-row items-start w-3/4 px-6 py-6 mt-4 bg-white rounded-lg shadow-xl justify-items-start">
      <div className="flex h-80">
        <img className="rounded-md" src="https://s3.bmp.ovh/imgs/2022/09/07/7745c096bcbd3af9.jpg" />
      </div>
      <div className="pt-10 ml-10 ">
        <OrgLessonInfo
          lessonName={lesson.lessonName}
          teacherName={teacher.teacherName}
          lessonTotalPrice={lesson.lessonTotalPrice}
          lessonTotalQuantity={lesson.lessonTotalQuantity}
          eduAddress={eduOrg.eduAddress}
          eduContactPhone={eduOrg.eduContactPhone}
          lessonIntroduce={lesson.lessonIntroduce}
        />
        <div className="mt-10 mr-5 bg-white " >
        <Link
          className="px-8 py-2 mr-8 text-sm font-medium text-center text-white grow bg-primary-500 rounded-3xl"
          to="/conOrder"
        >
          立即购买
        </Link>
        </div>
      </div>
    </div>
    // <Tab.Group defaultIndex={0}>
    //   <Tab.List className="grid items-center grid-cols-3 gap-10 py-2 mx-10 mt-3 text-sm text-gray-500 justify-items-center">
    //     <Tab className={({ selected }) =>
    //       selected ? 'font-medium text-primary-600 flex justify-center focus:outline-none' : 'bg-white text-gray-500'
    //     }>课程详情</Tab>
    //     <Tab className={({ selected }) =>
    //       selected ? 'font-medium text-primary-600 flex justify-center focus:outline-none' : 'bg-white text-gray-500'
    //     }>课程大纲</Tab>
    //     <Tab className={({ selected }) =>
    //       selected ? 'font-medium text-primary-600 flex justify-center focus:outline-none' : 'bg-white text-gray-500'
    //     }>评价(<span>14</span><span>)</span></Tab>
    //   </Tab.List>
    //   <Tab.Panels className="text-center ">
    //     <Tab.Panel>

    //     </Tab.Panel>
    //     <Tab.Panel>
    //       <LessonFrame lessonOutline={lesson.lessonOutline}  />
    //     </Tab.Panel>
    //     <Tab.Panel>
    //       <LessonEvalCard />
    //     </Tab.Panel>
    //   </Tab.Panels>
    // </Tab.Group>
  );
};

export default LessonDetailTabs;
