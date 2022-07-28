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
import { AppContext, setLessonEdit } from "../../../appState";
import { Lesson } from "../../../types/types";
import { PickerColumn } from "@ionic/core";
import LessonTypeList from "../../components/LessonType";
import LessonStateList from "../../components/LessonState";
import Quit from "components/components/Quit";

export const LessonDetail: React.FC = () => {
  const modifyURL = "http://localhost:3003/edu/lesson/edit";
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
  console.log(state)
  if (state.lesson.lessonEdit === undefined) {
    return <Redirect to={state.backPage} />;
  }

  const onModify = (e:any) => {
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
        console.log(json)
        setBack();
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
                <div className="flex justify-end w-32 mr-2">课程名称:</div>
                <input
                  type="text"
                  className="w-64 px-2 border rounded-md"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonName: e.nativeEvent.target?.value,
                    })
                  }
                  value={lessonState.lessonName}
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">总课时:</div>
                <input
                  className="w-64 px-2 border rounded-md"
                  type="text"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonTotalQuantity: e.nativeEvent.target?.value,
                    })
                  }
                  value={lessonState.lessonTotalQuantity}
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">总价格（元）:</div>
                <input
                  className="w-64 px-2 border rounded-md"
                  type="text"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonTotalPrice: e.nativeEvent.target?.value,
                    })
                  }
                  value={lessonState.lessonTotalPrice}
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">
                  课程单价（元）:
                </div>
                <input
                  className="w-64 px-2 border rounded-md"
                  type="text"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonPerPrice: e.nativeEvent.target?.value,
                    })
                  }
                  value={lessonState.lessonPerPrice}
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程类型:</div>
                <LessonTypeList />
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
                  className="w-64 px-2 border rounded-md"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonStartDate: e.nativeEvent.target?.value,
                    })
                  }
                  required
                  value={lessonState.lessonStartDate}
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程开始时间:</div>
                <input
                  className="w-64 px-2 border rounded-md"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonStartTime: e.nativeEvent.target?.value,
                    })
                  }
                  required
                  value={lessonState.lessonStartTime}
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程结束日期:</div>
                <input
                  className="w-64 px-2 border rounded-md"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      lessonEndDate: e.nativeEvent.target?.value,
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
                      lessonEndTime: e.nativeEvent.target?.value,
                    })
                  }
                  required
                  value={lessonState.lessonEndTime}
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">课程状态:</div>
                {/* <input className='w-64 px-2 border rounded-md' type="text" onChange={e => setLessonState({ ...lessonState, lessonState: e.nativeEvent.target?.value })} required value={lessonState.lessonState} /> */}
                <LessonStateList />
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
                          eduName: e.nativeEvent.target?.value,
                        },
                      },
                    })
                  }
                  required
                  value={lessonState.edu.eduName}
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">教师姓名:</div>
                <input
                  className="w-64 h-10 px-2 border rounded-md"
                  type="text"
                  onChange={(e) =>
                    setLessonState({
                      ...lessonState,
                      teacherName:e.nativeEvent.target?.value,
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
                      lessonIntroduce: e.nativeEvent.target?.value,
                    })
                  }
                  required
                  value={lessonState.lessonIntroduce}
                />
              </div>
            </div>
            <div className="flex justify-center">
            <input
              value="修改"
              type="submit"
              className="flex w-20 px-6 py-2 font-bold text-white rounded-md bg-primary-600 focus:bg-primary-700"
            />
          </div>
            <div className="flex justify-center">
            <input
              value="返回"
              type="button"
              onClick={onBack()}
              className="flex w-20 px-6 py-2 font-bold text-white rounded-md bg-primary-600 focus:bg-primary-700"
            />
          </div>
          </form>

        </IonCardContent>
      </IonCard>
    </IonPage>
    // <IonPage>
    //   <IonCard>
    //     <IonCardHeader>
    //       <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
    //     </IonCardHeader>
    //     <IonCardContent>
    //       <form onSubmit={onModify}>
    //         <IonList>
    //           <IonLabel position="stacked" color="primary">机构ID</IonLabel>
    //           <IonInput name="eduId" type="text" value={lessonState.eduId} spellCheck={false} autocapitalize="off" readonly required>
    //           </IonInput>
    //           <IonLabel position="stacked" color="primary">课程ID</IonLabel>
    //           <IonInput name="lessonId" type="text" value={lessonState.lessonId} spellCheck={false} autocapitalize="off" readonly required>
    //           </IonInput>
    //           <IonLabel position="stacked" color="primary">课程名称</IonLabel>
    //           <IonInput name="lessonName" type="text" value={lessonState.lessonName} spellCheck={false} autocapitalize="off" onIonChange={e => setLessonState({ ...lessonState, ...{ lessonName: e.detail.value! } })} required>
    //           </IonInput>
    //           <IonLabel position="stacked" color="primary">课程描述</IonLabel>
    //           <IonInput name="lessonIntroduce" type="text" value={lessonState.lessonIntroduce} spellCheck={false} autocapitalize="off" onIonChange={e => setLessonState({ ...lessonState, ...{ lessonIntroduce: e.detail.value! } })} required>
    //           </IonInput>
    //           <IonLabel position="stacked" color="primary">课程类型</IonLabel>
    //           <IonPicker
    //             isOpen={isPickOpen}
    //             columns={[lessonTypePickerColumn]}
    //             buttons={[
    //               {
    //                 text: "取消",
    //                 role: "cancel",
    //                 handler: value => {
    //                   setPickOpen(false);
    //                 }
    //               },
    //               {
    //                 text: "确认",
    //                 handler: value => {
    //                   setPickOpen(false);
    //                   setLessonState({ ...lessonState, ...{ lessonType: value.lessonTypePickerColumn.value } })
    //                 }
    //               }
    //             ]}
    //           ></IonPicker>
    //           <IonLabel position="stacked" color="primary">课程大纲</IonLabel>
    //           <IonInput name="lessonOutline" type="text" value={lessonState.lessonOutline} spellCheck={false} autocapitalize="off" onIonChange={e => setLessonState({ ...lessonState, ...{ lessonOutline: e.detail.value! } })} required>
    //           </IonInput>
    //           <IonLabel position="stacked" color="primary">课程开始日期</IonLabel>
    //           <IonDatetime className="flex w-56 h-6 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md" value={lessonState.lessonStartDate} name='lessonStartDate' onIonChange={e => { setLessonState({ ...lessonState, ...{ lessonStartDate: e.detail.value! } }) }}></IonDatetime>
    //           <IonLabel position="stacked" color="primary">课程结束日期</IonLabel>
    //           <IonDatetime className="flex w-56 h-6 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md" value={lessonState.lessonEndDate} name='lessonStartDate' onIonChange={e => { setLessonState({ ...lessonState, ...{ lessonEndDate: e.detail.value! } }) }}></IonDatetime>
    //           <IonLabel position="stacked" color="primary">课程状态</IonLabel>
    //           <IonInput name="lessonStatus" type="text" value={lessonState.lessonStatus} spellCheck={false} autocapitalize="off" readonly required>
    //           </IonInput>
    //           <IonLabel position="stacked" color="primary">课程创建时间</IonLabel>
    //           <IonInput name="lessonCreateDate" type="text" value={lessonState.lessonCreateDate} spellCheck={false} autocapitalize="off" readonly required>
    //           </IonInput>
    //           <IonLabel position="stacked" color="primary">课程修改时间</IonLabel>
    //           <IonInput name="lessonCreateDate" type="text" value={lessonState.lessonUpdateDate} spellCheck={false} autocapitalize="off" readonly required>
    //           </IonInput>
    //           <IonLabel position="stacked" color="primary">修改原因</IonLabel>
    //           <IonInput name="lessonUpdateReason" type="text" value={lessonState.lessonUpdateReason} spellCheck={false} autocapitalize="off" onIonChange={e => setLessonState({ ...lessonState, ...{ lessonUpdateReason: e.detail.value! } })} required>
    //           </IonInput>
    //           <IonLabel position="stacked" color="primary">教育机构ID</IonLabel>
    //           <IonInput name="eduId" type="text" value={lessonState.eduId} spellCheck={false} autocapitalize="off" readonly required>
    //           </IonInput>
    //           <IonLabel position="stacked" color="primary">教师ID</IonLabel>
    //           <IonInput name="teacherId" type="text" value={lessonState.teacherId} spellCheck={false} autocapitalize="off" onIonChange={e => setLessonState({ ...lessonState, ...{ teacherId: e.detail.value! } })} required>
    //           </IonInput>

    //         </IonList>

    //         <IonItem className="">
    //           <IonButton className="m-5 text-base " type='submit' fill="solid">更新</IonButton>
    //         </IonItem>
    //         <IonItem className="">
    //           <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
    //         </IonItem>
    //       </form>
    //     </IonCardContent>
    //   </IonCard>
    // </IonPage>
  );
};

export default LessonDetail;
