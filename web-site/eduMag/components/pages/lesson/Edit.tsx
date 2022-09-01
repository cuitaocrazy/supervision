//Lesson的详细页面
import React, { useState } from "react";
import { IonPage, IonCard, IonCardContent, useIonToast } from "@ionic/react";
import { Redirect } from "react-router-dom";
import { useCallback, useContext } from "react";
import { AppContext, setLessonEdit } from "../../../appState";
import { PickerColumn } from "@ionic/core";
import LessonTypeList from "../../components/LessonType";
import LessonStateList from "../../components/LessonState";
import Quit from "components/components/Quit";
import { eduLessonEditURL } from "const/consts";
import { getLessonType, getLessonStatus } from "const/dicData";

export const LessonDetail: React.FC = () => {
  const [present, dismiss] = useIonToast();
  const modifyURL = eduLessonEditURL;
  const { state, dispatch } = useContext(AppContext);
  // const {SubscribeDurationDays,TranAmt,USVOrgID,USVItemName,USVItemID,USVItemDesc,SubscribeStartDate,LessonType} = state.lessonDetail

  const [lessonState, setLessonState] = useState(state.lesson.lessonEdit);
  const [isPickOpen, setPickOpen] = useState(false);
  const setBack = useCallback(() => {
    dispatch(setLessonEdit(undefined));
  }, []);
  const onBack = () => () => {
    setBack();
  };
  console.log(state);
  if (state.lesson.lessonEdit === undefined) {
    return <Redirect to={state.backPage} />;
  }

  const onModify = (e: any) => {
    e.preventDefault();
    fetch(modifyURL, {
      method: "POST",
      body: JSON.stringify(lessonState),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setBack();
      });
  };
  //  结果状态
  const resultState = "000";
  // 展示操作结果
  const resultFun = () => {
    if (resultState === "000") {
      present({
        message: "课程修改成功",
        position: "top",
        duration: 3000,
      });
    } else {
      present({
        buttons: [{ text: "关闭", handler: () => dismiss() }],
        message: "课程修改失败，失败原因：......",
        position: "top",
        onDidDismiss: () => console.log("dismissed"),
        onWillDismiss: () => console.log("will dismiss"),
      });
    }
  };
  return (
    <IonPage className="bg-gray-100">
      <IonCard>
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
            <span className="pr-1 text-gray-600 ">课程管理</span>/
            <span className="pl-1 text-primary-500">课程编辑</span>
          </div>
        </div>
        <IonCardContent>
          <form onSubmit={onModify}>
            {/* 编辑内容 */}
            <div className="font-bold text-gray-800">课程编辑</div>
            <hr className="mt-2 mb-4" />
            <div className="grid grid-cols-2 justify-items-center ">
              <div className="flex items-center mb-4 leading-10 justify-items-center">
                <div className="flex justify-end w-32 mr-2"> <span className='px-1 text-red-600'>*</span>课程名称:</div>
                <input
                  type="text"
                  className="w-64 px-2 border rounded-md"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonName: e.target?.value,
                    })
                  }
                  value={lessonState.lessonName}
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2"><span className='px-1 text-red-600'>*</span>总课时:</div>
                <input
                  className="w-64 px-2 border rounded-md"
                  type="text"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonTotalQuantity: e.target?.value,
                    })
                  }
                  value={lessonState.lessonTotalQuantity}
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2"> <span className='px-1 text-red-600'>*</span>总价格（元）:</div>
                <input
                  className="w-64 px-2 border rounded-md"
                  type="text"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonTotalPrice: e.target?.value,
                    })
                  }
                  value={lessonState.lessonTotalPrice}
                  required
                />
                一天
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">
                  <span className='px-1 text-red-600'>*</span>课程单价（元）:
                </div>
                <input
                  className="w-64 px-2 border rounded-md"
                  type="text"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonPerPrice: e.target?.value,
                    })
                  }
                  value={lessonState.lessonPerPrice}
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程类型:</div>
                <LessonTypeList
                  lessonType={lessonState.lessonType}
                  setlessonType={v => {
                    setLessonState({
                      ...lessonState,
                      ...{ lessonType: v },
                    });
                  }} />
                {/* <input className='w-64 px-2 border rounded-md' type="text" onChange={e => setLessonState({ ...lessonState, lessonType: e.nativeEvent.target?.value })} required value={lessonState.lessonType} /> */}
                {/* <div className='w-64 px-2 border rounded-md'>
                <IonPicker 
                isOpen={isPickOpen}
                columns={[lessonTypePickerColumn]}
                buttons={[
                  {
                    text: "取消",
                    role: "cancel",
                    handler: value => {
                      setPickOpen(false);
                    }
                  },
                  {
                    text: "确认",
                    handler: value => {
                      setPickOpen(false);
                      setLessonState({ ...lessonState, ...{ lessonType: value.lessonTypePickerColumn.value } })
                    }
                  }
                ]}
              ></IonPicker>
                </div> */}
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
                  className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                  type="date"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonStartDate: e.target?.value,
                    })
                  }
                  required
                  value={lessonState.lessonStartDate}
                ></input>


              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程开始时间:</div>
                <input
                  className="w-64 px-2 border rounded-md"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonStartTime: e.target?.value,
                    })
                  }
                  required
                  value={lessonState.lessonStartTime}
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程结束日期:</div>
                <input
                  className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                  type="date" onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonEndDate: e.target?.value,
                    })
                  }
                  required
                  value={lessonState.lessonEndDate}
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程结束时间:</div>
                <input
                  className="w-64 px-2 border rounded-md"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonEndTime: e.target?.value,
                    })
                  }
                  required
                  value={lessonState.lessonEndTime}
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程状态:</div>
                {/* <input className='w-64 px-2 border rounded-md' type="text" onChange={e => setLessonState({ ...lessonState, lessonState: e.nativeEvent.target?.value })} required value={lessonState.lessonState} /> */}
                <LessonStateList lessonStatus={lessonState.lessonStatus}
                  setlessonStatus={v => {
                    setLessonState({
                      ...lessonState,
                      ...{ lessonStatus: v },
                    });
                  }} />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2"> 教育机构名称:</div>
                <input
                  className="w-64 px-2 border rounded-md"
                  type="text"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      ...{
                        edu: {
                          ...lessonState.edu,
                          eduName: e.target?.value,
                        },
                      },
                    })
                  }
                  required
                  value={lessonState.eduName}
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2"> <span className='px-1 text-red-600'>*</span>教师姓名:</div>
                <input
                  className="w-64 h-10 px-2 border rounded-md"
                  type="text"
                  name='teacherName'
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      teacherName: e.target?.value,
                    })
                  }
                  required
                  value={lessonState.teacherName}
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程介绍:</div>
                <input
                  className="w-64 h-32 px-2 border rounded-md"
                  type="text"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonIntroduce: e.target?.value,
                    })
                  }
                  value={lessonState.lessonIntroduce}
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-10">
              <input
                value="取消"
                type="button"
                className="px-6 py-2 border rounded-md "
                onClick={onBack()}
              />
              <input
                value="确定"
                type="submit"
                className="px-6 py-2 text-white border rounded-md bg-primary-600"
                onClick={() => {
                  resultFun();
                }}
              />
            </div>
          </form>
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default LessonDetail;
