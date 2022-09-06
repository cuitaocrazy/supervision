//Lesson的详细页面
import React, { useState } from 'react';
import {
  IonPage,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { AppContext, setLessonDetail } from '../../../appState';
import { Lesson } from '../../../types/types';
import { PickerColumn } from '@ionic/core';
import Quit from '../../Quit'
import { getLessonType, getLessonStatusForList } from "const/dicData";
export const LessonDetail: React.FC = () => {
  console.log('LessonDetail');
  const modifyURL = 'http://localhost:3003/lesson/modifyURL';
  const { state, dispatch } = useContext(AppContext);
  // const {SubscribeDurationDays,TranAmt,USVOrgID,USVItemName,USVItemID,USVItemDesc,SubscribeStartDate,LessonType} = state.lessonDetail

  const [lessonState, setLessonState] = useState(state.lesson.lessonDetail);
  const [isPickOpen, setPickOpen] = useState(false);
  const setBack = useCallback(() => {
    dispatch(setLessonDetail(undefined));
  }, []);
  `                                                       `;
  const onBack = () => () => {
    setBack();
  };
  if (state.lesson.lessonDetail === undefined) {
    return <Redirect to={state.backPage} />;
  }

  const onModify = async (e: React.FormEvent) => () => {
    e.preventDefault();
    fetch(modifyURL, {
      method: 'PUT',
      body: JSON.stringify({
        USVItemID: lessonState.USVItemID,
        USVItemName: lessonState.USVItemName,
        USVOrgID: lessonState.USVOrgID,
        USVItemDesc: lessonState.USVItemDesc,
        TranAmt: lessonState.TranAmt,
        SubscribeDurationDays: lessonState.SubscribeDurationDays,
        SubscribeStartDate: lessonState.SubscribeStartDate,
        LessonType: lessonState.LessonType,
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        alert(json.result);
      });
  };
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
            <span className="pl-1 text-primary-500">课程详情</span>
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
                value={lessonState.lessonTotalPrice / 100}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课程类型:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonType"
                type="text"
                value={getLessonType(lessonState.lessonType)}
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
                value={getLessonStatusForList(lessonState.lessonStatus)}
                readOnly
              />
            </div>

            <div className="flex mb-4 leading-10" hidden={lessonState.lessonStatus == 'off' ? false : true}>
              <div className="flex justify-end w-32 mr-2">下架原因:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                type="text"
                value={getLessonStatusForList(lessonState.lessonUpdateReason)}
                readOnly
              />
            </div>

            <div className="flex mb-4 leading-10 " hidden={lessonState.lessonStatus == 'reject' ? false : true}>
              <div className="flex justify-end w-32 mr-2">下架原因:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                type="text"
                value={getLessonStatusForList(lessonState.lessonUpdateReason)}
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

          <div className="flex justify-center">
            <input
              value="返回"
              type="button"
              onClick={onBack()}
              className="flex w-20 px-6 py-2 font-bold text-white rounded-md bg-primary-600 focus:bg-primary-700"
            />
          </div>

        </IonCardContent>
      </IonCard>
    </IonPage >
  );
};

export default LessonDetail;
