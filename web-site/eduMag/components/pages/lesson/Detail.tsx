//Lesson的详细页面
import React, { useState } from "react";
import {
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonLabel,
  IonInput,
  IonCardContent,
  IonItem,
  IonButton,
  IonList,
  IonDatetime,
  IonPicker,
} from "@ionic/react";
import { Redirect } from "react-router-dom";
import { useCallback, useContext } from "react";
import { AppContext, setLessonDetail } from "../../../appState";
import { Lesson } from "../../../types/types";
import { PickerColumn } from "@ionic/core";
import Router from "next/router";

export const LessonDetail: React.FC = () => {
  console.log("LessonDetail");
  const modifyURL = "http://localhost:3003/lesson/modifyURL";
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
      method: "PUT",
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
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        alert(json.result);
      });
  };
  const lessonTypePickerColumn = {
    name: "lessonTypePickerColumn",
    options: [
      { text: "语文", value: "0" },
      { text: "数学", value: "1" },
    ],
  } as PickerColumn;

  return (
    <IonPage className="bg-gray-100">
      <IonCard>
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
            <span className="pr-1 text-gray-600 ">课程管理</span>/
            <span className="pl-1 text-primary-500">课程详情</span>
          </div>
        </div>
        <IonCardContent>
            {/* 详情 */}
            <div className="font-bold text-gray-800">课程详情</div>
            <hr className="mt-2 mb-4" />
            <div className="grid grid-cols-2 justify-items-center ">
              <div className="flex items-center mb-4 leading-10 justify-items-center">
                <div className="flex justify-end w-32 mr-2">课程名称:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={lessonState.lessonName}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">总课时:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={lessonState.lessonTotalQuantity}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">总价格（元）:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={lessonState.lessonTotalPrice}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">
                  课程单价（元）:
                </div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={lessonState.lessonPerPrice}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程类型:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={lessonState.lessonType}
                  readOnly
                />
              </div>

              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程大纲:</div>
                <a className="w-64" href="www.baidu.com">
                  点击查看课程大纲
                </a>
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程开始日期:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={lessonState.lessonStartDate}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程开始时间:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={lessonState.lessonStartTime}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程结束日期:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={lessonState.lessonEndDate}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程结束时间:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={lessonState.lessonEndTime}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程状态:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={lessonState.lessonState}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2"> 教育机构名称:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={lessonState.edu.eduName}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">教师姓名:</div>
                <input
                  className="w-64 h-10 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={lessonState.teacher.teacherName}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程介绍:</div>
                <textarea
                  className="w-64 h-32 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={lessonState.lessonIntroduce}
                  readOnly
                />
              </div>
            </div>
          <div className="flex justify-center">
            <input
              value="返回"
              type="button"
              onClick={() => {
                onBack();
              }}
              className="flex w-20 px-6 py-2 font-bold text-white rounded-md bg-primary-600 focus:bg-primary-700"
            />
          </div>
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default LessonDetail;
