//Lesson的详细页面
import React, { useState,Fragment } from 'react';
import {
  IonPage,
  IonCard,
  IonCardContent,
  useIonToast
} from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { AppContext, setLessonAudit } from '../../../appState';
import { Lesson } from '../../../types/types';
import { PickerColumn } from '@ionic/core';
import { Dialog, Transition } from '@headlessui/react';
import Quit from '../../Quit'

export const LessonAudit: React.FC = () => {
  const [present, dismiss] = useIonToast();
  // 课程审核dialog页面状态
  let [isAuditOpen, setIsAuditOpen] = useState(false);
  function closeAuditModal() {
    setIsAuditOpen(false);
  }
  function openCreateModal() {
    setIsAuditOpen(true);
  }
  console.log('LessonAudit');
  const modifyURL = 'http://localhost:3003/edb/lesson/audit';
  const { state, dispatch } = useContext(AppContext);
  // const {SubscribeDurationDays,TranAmt,USVOrgID,USVItemName,USVItemID,USVItemDesc,SubscribeStartDate,LessonType} = state.lessonDetail

  const [lessonState, setLessonState] = useState(state.lesson.lessonAudit);
  const [isPickOpen, setPickOpen] = useState(false);
  const setBack = useCallback(() => {
    dispatch(setLessonAudit(undefined));
  }, []);

  const onBack = () => () => {
    
    setBack();
  };
  if (state.lesson.lessonAudit === undefined) {
    return <Redirect to={state.backPage} />;
  }

  const onModify = (status:string) => () => {
    fetch(modifyURL, {
      method: 'POST',
      body: JSON.stringify({
        lessonId:lessonState.lessonId,
        lessonStatus:status
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.result) 
        {
          present('课程审核通过，操作成功', 3000);
          // onQuery();
        } else 
        present({
          buttons: [{ text: '关闭', handler: () => dismiss() }],
          message: '课程审核通过，操作失败',
          onDidDismiss: () => console.log('dismissed'),
          onWillDismiss: () => console.log('will dismiss'),
        })
        setBack();
      });
  };
  const lessonTypePickerColumn = {
    name: 'lessonTypePickerColumn',
    options: [
      { text: '语文', value: '0' },
      { text: '数学', value: '1' },
    ],
  } as PickerColumn;


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
          <span className="pr-1 text-gray-600">教育机构管理</span>/
          <span className="pl-1 pr-1 text-primary-500">课程管理</span>/
            <span className="pl-1 text-primary-500">课程审核</span>
          </div>
        </div>
        <IonCardContent>
          {/* 详情 */}
          <div className="font-bold text-gray-800"></div>
          <hr className="mt-2 mb-4" />
          <div className="grid grid-cols-2 justify-items-center ">
            <div className="flex items-center mb-4 leading-10 justify-items-center">
              <div className="flex justify-end w-32 mr-2">教育机构名称:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="eduName"
                type="text"
                value={lessonState.eduName}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课程名称:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonName"
                type="text"
                value={lessonState.lessonName}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">总课时:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonTotalQuantity"
                type="text"
                value={lessonState.lessonTotalQuantity}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">总价格（元）:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonTotalPrice"
                type="text"
                value={lessonState.lessonTotalPrice}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课程类型:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonType"
                type="text"
                value={lessonState.lessonType}
                readOnly
              />
            </div>

            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">教师姓名:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="teacherName"
                type="text"
                value={lessonState.teacherName}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">开课日期:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonStartDate"
                type="text"
                value={lessonState.lessonStartDate}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">开课时间:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonStartTime"
                type="text"
                value={lessonState.lessonStartTime}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">结束日期:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonEndDate"
                type="text"
                value={lessonState.lessonEndDate}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">结束时间:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonEndTime"
                type="text"
                value={lessonState.lessonEndTime}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">创建日期:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonCreateDate"
                type="text"
                value={lessonState.lessonCreateDate}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">创建时间:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonCreateTime"
                type="text"
                value={lessonState.lessonCreateTime}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课程状态:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonState"
                type="text"
                value={lessonState.lessonState}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">更新日期:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonUpdateDate"
                type="text"
                value={lessonState.lessonUpdateDate}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课程介绍:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonUpdateDate"
                type="text"
                value={lessonState.lessonIntroduce}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课程大纲:</div>
              <a className="w-64 px-2" href="/contract/outline">
                请查看课程大纲
              </a>
            </div>
            </div>
            {/* TODO：课程表缺少课程人数 */}
            {/* <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">人数:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonType"
                type="text"
                value={}
                readOnly
              />
            </div> */}
          <div className="flex justify-center gap-10 mt-8">
            <input
              value="通过"
              type="button"
              onClick={onModify('on')}
              className="flex w-20 px-6 py-2 font-bold text-white rounded-md bg-primary-600 focus:bg-primary-700"
            />
            <input
              value="不通过"
              type="button"
              onClick={openCreateModal}
              className="flex w-20 px-6 py-2 font-bold bg-gray-100 rounded-md text-primary-600 focus:bg-gray-200"
            />
          </div>
          {/* 课程审核通过dialog */}
          <Transition appear show={isAuditOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeAuditModal}>
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
                    <form
                      className="flex flex-col items-center mt-8 rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end w-24 p-1">不合格原因:</div>
                          <textarea
                            className="h-32 p-1 text-gray-600 bg-gray-100 border rounded-md w-72 justify-self-start focus:outline-none"
                            name="eduName"
                            placeholder='请输入审核不通过原因'
                            value={lessonState.lesson_update_reason}
                            onChange={e =>
                              setLessonAudit({
                                ...lessonState,
                                lesson_update_reason: e.nativeEvent.target?.value,
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
                          value="button"
                          type="submit"
                          className="px-6 py-2 text-white border rounded-md bg-primary-600"
                          onClick={()=>{onModify('reject')();closeAuditModal()}}
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

export default LessonAudit;
