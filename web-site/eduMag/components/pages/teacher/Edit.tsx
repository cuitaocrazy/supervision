//Teacher管理的详细页面
import React, { useState } from "react";
import {
  IonPage,
  IonCard,
  IonCardContent,
  useIonToast
} from "@ionic/react";
import { Redirect } from "react-router-dom";
import { useCallback, useContext } from "react";
import { AppContext, setTeacherEdit } from "../../../appState";
import { Teacher } from "../../../types/types";
import { PickerColumn } from "@ionic/core";
import Quit from "components/components/Quit";

export const TeacherDetail: React.FC = () => {
  const [present, dismiss] = useIonToast();
  const modifyURL = "http://localhost:3003/edu/teacher/modify";
  const { state, dispatch } = useContext(AppContext);

  const [teacherState, setTeacherState] = useState(state.teacher.teacherEdit);
  const [isPickOpen, setPickOpen] = useState(false);
  const setBack = useCallback(() => {
    dispatch(setTeacherEdit(undefined));
  }, []);
  const onBack = () => {
    setBack();
  };
  if (state.teacher.teacherEdit === undefined) {
    return <Redirect to={state.backPage} />;
  }
  const onModify = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(teacherState);
    fetch(modifyURL, {
      method: "POST",
      body: JSON.stringify(teacherState),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const result=json
        if (result) 
        {
          present({
            message: '教师编辑成功',
            position:'top',
            duration:3000
          })
        } else 
        present({
          buttons: [{ text: '关闭', handler: () => dismiss() }],
          message: '教师编辑失败',
          position:'top',
        })
        setBack();
      });
  };

  return (
    <IonPage className="bg-gray-100">
      <div>
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
            <span className="pr-1 text-gray-600 ">教师管理</span>/
            <span className="pl-1 text-primary-500">教师信息编辑</span>
          </div>
        </div>
        <IonCardContent className="m-4 bg-white rounded-lg">
          <form onSubmit={onModify}>
            {/* 编辑内容 */}
            <div className="font-bold text-gray-800">教师信息编辑</div>
            <hr className="mt-2 mb-4" />
            <div className="grid grid-cols-2 justify-items-center ">
              <div className="flex items-center mb-4 leading-10 justify-items-center">
                <div className="flex justify-end w-32 mr-2">教师姓名:</div>
                <input
                  className="w-64 px-2 border rounded-md focus:outline-none focus:glow-primary-600"
                  type="text"
                  name="teacherName"
                  value={teacherState.teacherName}
                  onChange={(e) =>
                    setTeacherState({
                      ...teacherState,
                      ...{ teacherName: e.nativeEvent.target?.value },
                    })
                  }
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">身份证号:</div>
                <input
                  className="w-64 px-2 border rounded-md focus:outline-none focus:glow-primary-600"
                  type="text"
                  name="teacherIdentityNo"
                  value={teacherState.teacherIdentityNo}
                  onChange={(e) =>
                    setTeacherState({
                      ...teacherState,
                      ...{ teacherIdentityNo: e.nativeEvent.target?.value },
                    })
                  }
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">专业领域:</div>
                <input
                  className="w-64 px-2 border rounded-md"
                  type="text"
                  name="teacherField"
                  value={teacherState.teacherField}
                  onChange={(e) =>
                    setTeacherState({
                      ...teacherState,
                      ...{ teacherField: e.nativeEvent.target?.value },
                    })
                  }
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">从业经验:</div>
                <input
                  className="w-64 px-2 border rounded-md focus:outline-none focus:glow-primary-600"
                  type="text"
                  name="teacherExperience"
                  value={teacherState.teacherExperience}
                  onChange={(e) =>
                    setTeacherState({
                      ...teacherState,
                      ...{ teacherExperience: e.nativeEvent.target?.value },
                    })
                  }
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">教师简介:</div>
                <textarea
                  className="w-64 px-2 border rounded-md focus:outline-none focus:glow-primary-600"
                  name="teacherIntroduce"
                  value={teacherState.teacherIntroduce}
                  onChange={(e) =>
                    setTeacherState({
                      ...teacherState,
                      ...{ teacherIntroduce: e.nativeEvent.target?.value },
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-10">
              <input
                value="取消"
                type="button"
                className="px-6 py-2 border rounded-md "
                onClick={setBack}
              />
              <input
                value="确定"
                type="submit"
                className="px-6 py-2 text-white border rounded-md bg-primary-600"
              />
            </div>
          </form>
        </IonCardContent>
      </div>
    </IonPage>
  );
};

export default TeacherDetail;
