//Lesson协商的详细页面
import React, { useState, Fragment } from "react";
import { IonPage, IonCard, IonCardContent, useIonToast } from "@ionic/react";
import { Redirect } from "react-router-dom";
import { useCallback, useContext } from "react";
import { AppContext, setDiscussAudit } from "../../../appState";
import { Dialog, Transition } from "@headlessui/react";
import Quit from "components/components/Quit";
import { eduLessonAuditURL } from "const/consts";

export const DiscussAudit: React.FC = () => {
  const [present, dismiss] = useIonToast();
  // 课程协商审核dialog页面状态
  let [isAuditOpen, setIsAuditOpen] = useState(false);
  function closeAuditModal() {
    setIsAuditOpen(false);
  }
  function openCreateModal() {
    setIsAuditOpen(true);
  }
  const modifyURL = eduLessonAuditURL;
  const { state, dispatch } = useContext(AppContext);
  // const {SubscribeDurationDays,TranAmt,USVOrgID,USVItemName,USVItemID,USVItemDesc,SubscribeStartDate,LessonType} = state.lessonDetail

  const [discussState, setDiscussState] = useState(state.discuss.discussAudit);
  const [isPickOpen, setPickOpen] = useState(false);
  const setBack = useCallback(() => {
    dispatch(setDiscussAudit(undefined));
  }, []);

  const onBack = () => () => {
    setBack();
  };

  const onAduit = (status: string) => () => {
    fetch(modifyURL, {
      method: "POST",
      body: JSON.stringify({
        discussId: discussState.discussId,
        discussStatus: status,
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const result = json;
        if (result) {
          present({
            message: "操作成功",
            position: "top",
            duration: 3000,
          });
        } else
          present({
            buttons: [{ text: "关闭", handler: () => dismiss() }],
            message: "操作失败",
            position: "top",
          });
        setBack();
      });
  };

  if (state.discuss.discussAudit === undefined) {
    return <Redirect to={state.backPage} />;
  }

  return (
    <IonPage className="bg-gray-100">
      <Quit />
      <IonCard className="h-screen mx-6 overflow-auto">
        {/* 导航 */}
        <div className="flex px-2 pt-2 mx-2 my-2 text-gray-800">
          <div className="mr-2 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <span className="pr-1 text-gray-600">课程协商管理</span>/
            <span className="pl-1 text-primary-500">课程协商审核</span>
          </div>
        </div>
        <IonCardContent>
          {/* 详情 */}
          <div className="font-bold text-gray-800"></div>
          <hr className="mt-2 mb-4" />
          <div className="grid grid-cols-2 justify-items-center ">
            <div className="flex items-center mb-4 leading-10 justify-items-center">
              <div className="flex justify-end w-32 mr-2">课程名称:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                value={discussState.lessonName}
                readOnly
              />
            </div>
            <div className="flex items-center mb-4 leading-10 justify-items-center">
              <div className="flex justify-end w-32 mr-2">本次课时:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                value={discussState.lessonQuantity}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课时状态:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                value={discussState.attendanceState}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">上课日期:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                value={discussState.lessonDate}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">上课时间:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                value={discussState.lessonTime}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">客户姓名:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                value={discussState.consumerName}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">联系方式:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                value={discussState.consumerPhone}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">学生姓名:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                value={discussState.stuName}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">协商标题:</div>
              <input
                className="w-64 h-10 px-2 rounded-md bg-primary-100 focus:outline-none"
                value={discussState.discussTitle}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">协商内容:</div>
              <textarea
                className="w-64 h-32 px-2 rounded-md bg-primary-100 focus:outline-none"
                value={discussState.discussContent}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">提交协商日期:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                value={discussState.discussDate}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">提交协商时间:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                value={discussState.discussTime}
                readOnly
              />
            </div>
          </div>
          <div className="flex justify-center gap-10 mt-8">
            <input
              value="通过"
              type="button"
              onClick={onAduit("on")}
              className="flex w-20 px-6 py-2 font-bold text-white rounded-md bg-primary-600 focus:bg-primary-700"
            />
            <input
              value="不通过"
              type="button"
              onClick={openCreateModal}
              className="flex w-20 px-6 py-2 font-bold bg-gray-100 rounded-md text-primary-600 focus:bg-gray-200"
            />
          </div>
          {/* 课程审协商核通过dialog */}
          <Transition appear show={isAuditOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={closeAuditModal}
            >
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
                        审核结果
                        <hr className="mt-2 mb-4" />
                      </Dialog.Title>
                      <form className="flex flex-col items-center mt-8 rounded-lg justify-items-center">
                        <div className="flex items-center mb-4 justify-items-center">
                          <div className="flex leading-7 justify-items-center">
                            <div className="flex justify-end w-24 p-1">
                              不通过原因:
                            </div>
                            <textarea
                              className="h-32 p-1 text-gray-600 bg-gray-100 border rounded-md w-72 justify-self-start focus:outline-none"
                              name="eduName"
                              placeholder="请输入审核不通过原因"
                              value={discussState.discussReason}
                              onChange={(e) =>
                                setDiscussAudit({
                                  ...discussState,
                                  discussReason: e.target?.value,
                                })
                              }
                            ></textarea>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 justify-items-center">
                          <input
                            value="返回"
                            type="button"
                            className="px-6 py-2 border rounded-md "
                            onClick={closeAuditModal}
                          />
                          <input
                            value="提交"
                            type="button"
                            className="px-6 py-2 text-white border rounded-md bg-primary-600"
                            onClick={() => {
                              onAduit("reject")();
                              closeAuditModal();
                            }}
                          />
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default DiscussAudit;
