import OrgLessonInfo from "./OrgLessonInfo";

import { Lesson, Teacher, EduOrg } from "../types/types";
import { useRouter } from "next/router";
import { AppContext } from "../appState";
import { useContext, Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { FC } from "react";
import TeacherName from "./TeacherName";
import OrgAddressAndPhone from "./OrgAddressAndPhone";

interface lessonDetailProps {
  lessonName?: string;
  teacherName?: string;
  lessonTotalPrice?: number;
  lessonTotalQuantity?: number;
  eduAddress?: string;
  eduContactPhone?: string;
  lessonIntroduce?: string;
}

// 课程的培训机构课程信息组件
const SearchOrgLessonInfo: FC<lessonDetailProps> = (props) => {
  return (
    <div className="">
    <div className="text-lg font-bold ">{props.lessonName}</div>
    <div className="flex mt-3">
      <div className="mr-4 text-sm text-gray-500 mx-2">
        {props.lessonTotalQuantity}
        <span>个课程包</span>
      </div>
      <TeacherName teacherName={props.teacherName} />
    </div>
    <OrgAddressAndPhone
      eduContactPhone={props.eduContactPhone}
      eduAddress={props.eduAddress}
    />
    <div className="flex items-center pt-1 text-xs justify-items-center">
      <div className="text-2xl text-center text-gray-800">
        <span className="pr-1">¥</span>
        {props.lessonTotalPrice}
      </div>
    </div>
  </div>

    
  );
};



// 课程详情标签选项卡
const LessonDetailTabs = ({ openLoginModal }: { openLoginModal: () => void }) => {
  // 添加提示登录dialog状态
  let [isRemindOpen, setIsRemindOpen] = useState(false);
  function closeRemindModal() {
    setIsRemindOpen(false);
  }
  function openRemindModal() {
    setIsRemindOpen(true);
  }
  const { state, dispatch } = useContext(AppContext);
  const username = state.loginUser.username;
  const history = useHistory();
  const router = useRouter();

  let lesson: Lesson = state.lessonDetail; //{ lessonName: "小熊美术课程3-5岁", lessonTotalPrice: 880.00, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001",lessonOutline:"01. 太阳（圆型 暖色调）1" }
  let teacher: Teacher = state.lessonDetail.teacher; //Teacher = { teacherName: "李梅", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" }
  let eduOrg: EduOrg = state.lessonDetail.edu; //{ eduAddress: "河北省廊坊市", eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }

  return (
    <div className="flex flex-row items-start w-3/4 px-6 py-6 mt-4 bg-white rounded-lg shadow-xl justify-items-start">
      <div className="flex h-80">
        <img className="rounded-md" src="https://s3.bmp.ovh/imgs/2022/09/07/7745c096bcbd3af9.jpg" />
      </div>
      <div className="pt-10 ml-10 ">
        <SearchOrgLessonInfo
          lessonName={lesson.lessonName}
          teacherName={teacher.teacherName}
          lessonTotalPrice={lesson.lessonTotalPrice}
          lessonTotalQuantity={lesson.lessonTotalQuantity}
          eduAddress={eduOrg.eduAddress}
          eduContactPhone={eduOrg.eduContactPhone}
          lessonIntroduce={lesson.lessonIntroduce}
        />
        <div className="mt-10 mr-5 bg-white " >
          <button
            className="px-8 py-2 mr-8 text-sm font-medium text-center text-white grow bg-primary-500 rounded-3xl"
            onClick={() => {
              if (username) { history.push("/conOrder") }
              else {
                openRemindModal()
                //
                // setloginIsOpen(true)
                // history.push("/searchLessonDetail")
              }
            }}

          >
            立即购买
          </button>
        </div>
      </div>
      {/* 提示登录模态框  */}
      <Transition appear show={isRemindOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeRemindModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-center text-gray-900"
                  >
                    提示登录
                    <hr className="mt-2 mb-4" />
                  </Dialog.Title>
                  <form
                    // onSubmit={setAgree(Number(disAgree)+1)}
                    className="flex flex-col items-center rounded-lg justify-items-center"
                  >
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex leading-7 justify-items-center">
                        <div className="flex justify-center p-1 w-52">购买之前，请先登录</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 justify-items-center">
                      <input
                        value="好的"
                        type="button"
                        className="px-6 py-2 border rounded-md "
                        onClick={() => { closeRemindModal(); openLoginModal() }}
                      />
                      {/* <Link to="/eCNYPay">
                   <input 
                     value="同意"
                     type="button"
                     className="px-6 py-2 text-white border rounded-md bg-primary-600"
                     onClick={closeRemindModal}
                   />
                   </Link> */}
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>

  );
};

export default LessonDetailTabs;

{/* <button className="self-center h-10 px-6 mt-2 mr-2 text-sm font-medium text-white justify-self-end bg-primary-500 rounded-3xl"
            onClick={()=>{
              if(disAgree){history.push("/eCNYPay")}
              else openModal()
              
            }}
            >
              立即支付
            </button> */}
            // to="/conOrder"