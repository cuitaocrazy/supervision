//课程协商的详细页面
import React, { useState } from "react";
import {
  IonPage,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { Redirect } from "react-router-dom";
import { useCallback, useContext } from "react";
import { AppContext, setDiscussDetail } from "../../../appState";
import { Link } from "react-router-dom";
import Quit from "components/components/Quit";

export const DiscussDetail: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const [discussState, setDiscussState] = useState(state.discuss.discussDetail);

  const setBack = useCallback(() => {
    dispatch(setDiscussDetail(undefined));
  }, []);
  const onBack = () => {
    setBack();
  };
  if (state.discuss.discussDetail === undefined) {
    return <Redirect to={state.backPage} />;
  }
  return (
    <IonPage className="bg-gray-100">
      <div className="h-screen overflow-auto">
        <Quit />
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
            <span className="pr-1 text-gray-600 ">业务管理</span>/
            <span className="px-1 text-gray-600 ">课程协商管理</span>/
            <span className="pl-1 text-primary-500">课程协商详情</span>
          </div>
        </div>
        <IonCardContent className="m-4 bg-white rounded-lg">
          {/* 详情 */}
          <div className="font-bold text-gray-800">课程协商详情</div>
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
      </div>
    </IonPage>
  );
};
