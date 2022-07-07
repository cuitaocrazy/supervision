//Lesson的详细页面
import React, { useState } from 'react';
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
} from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { AppContext, setLessonDetail } from '../../../appState';
import { Lesson } from '../../../types/types';
import { PickerColumn } from '@ionic/core';

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
  const lessonTypePickerColumn = {
    name: 'lessonTypePickerColumn',
    options: [
      { text: '语文', value: '0' },
      { text: '数学', value: '1' },
    ],
  } as PickerColumn;

  return (
    <IonPage className="bg-gray-100">
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
                value={lessonState.teacher.teacherName}
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
    </IonPage>
    // <IonPage>
    //   <IonCard>
    //     <IonCardHeader>
    //       <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
    //     </IonCardHeader>
    //     <IonCardContent>
    //       <form onSubmit={onModify}>
    //         <IonList>
    //           <IonLabel position="stacked" color="primary">
    //             机构ID
    //           </IonLabel>
    //           <IonInput
    //             name="eduId"
    //             type="text"
    //             value={lessonState.eduId}
    //             spellCheck={false}
    //             autocapitalize="off"
    //             readonly
    //             required
    //           ></IonInput>
    //           <IonLabel position="stacked" color="primary">
    //             课程ID
    //           </IonLabel>
    //           <IonInput
    //             name="lessonId"
    //             type="text"
    //             value={lessonState.lessonId}
    //             spellCheck={false}
    //             autocapitalize="off"
    //             readonly
    //             required
    //           ></IonInput>
    //           <IonLabel position="stacked" color="primary">
    //             课程名称
    //           </IonLabel>
    //           <IonInput
    //             name="lessonName"
    //             type="text"
    //             value={lessonState.lessonName}
    //             spellCheck={false}
    //             autocapitalize="off"
    //             onIonChange={e =>
    //               setLessonState({ ...lessonState, ...{ lessonName: e.detail.value! } })
    //             }
    //             required
    //           ></IonInput>
    //           <IonLabel position="stacked" color="primary">
    //             课程描述
    //           </IonLabel>
    //           <IonInput
    //             name="lessonIntroduce"
    //             type="text"
    //             value={lessonState.lessonIntroduce}
    //             spellCheck={false}
    //             autocapitalize="off"
    //             onIonChange={e =>
    //               setLessonState({ ...lessonState, ...{ lessonIntroduce: e.detail.value! } })
    //             }
    //             required
    //           ></IonInput>
    //           <IonLabel position="stacked" color="primary">
    //             课程类型
    //           </IonLabel>
    //           <IonPicker
    //             isOpen={isPickOpen}
    //             columns={[lessonTypePickerColumn]}
    //             buttons={[
    //               {
    //                 text: '取消',
    //                 role: 'cancel',
    //                 handler: value => {
    //                   setPickOpen(false);
    //                 },
    //               },
    //               {
    //                 text: '确认',
    //                 handler: value => {
    //                   setPickOpen(false);
    //                   setLessonState({
    //                     ...lessonState,
    //                     ...{ lessonType: value.lessonTypePickerColumn.value },
    //                   });
    //                 },
    //               },
    //             ]}
    //           ></IonPicker>
    //           <IonLabel position="stacked" color="primary">
    //             课程大纲
    //           </IonLabel>
    //           <IonInput
    //             name="lessonOutline"
    //             type="text"
    //             value={lessonState.lessonOutline}
    //             spellCheck={false}
    //             autocapitalize="off"
    //             onIonChange={e =>
    //               setLessonState({ ...lessonState, ...{ lessonOutline: e.detail.value! } })
    //             }
    //             required
    //           ></IonInput>
    //           <IonLabel position="stacked" color="primary">
    //             课程开始日期
    //           </IonLabel>
    //           <IonDatetime
    //             className="flex w-56 h-6 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md"
    //             value={lessonState.lessonStartDate}
    //             name="lessonStartDate"
    //             displayFormat="YYYYMMDD"
    //             onIonChange={e => {
    //               setLessonState({ ...lessonState, ...{ lessonStartDate: e.detail.value! } });
    //             }}
    //           ></IonDatetime>
    //           <IonLabel position="stacked" color="primary">
    //             课程结束日期
    //           </IonLabel>
    //           <IonDatetime
    //             className="flex w-56 h-6 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md"
    //             value={lessonState.lessonEndDate}
    //             name="lessonStartDate"
    //             displayFormat="YYYYMMDD"
    //             onIonChange={e => {
    //               setLessonState({ ...lessonState, ...{ lessonEndDate: e.detail.value! } });
    //             }}
    //           ></IonDatetime>
    //           <IonLabel position="stacked" color="primary">
    //             课程状态
    //           </IonLabel>
    //           <IonInput
    //             name="lessonStatus"
    //             type="text"
    //             value={lessonState.lessonStatus}
    //             spellCheck={false}
    //             autocapitalize="off"
    //             readonly
    //             required
    //           ></IonInput>
    //           <IonLabel position="stacked" color="primary">
    //             课程创建时间
    //           </IonLabel>
    //           <IonInput
    //             name="lessonCreateDate"
    //             type="text"
    //             value={lessonState.lessonCreateDate}
    //             spellCheck={false}
    //             autocapitalize="off"
    //             readonly
    //             required
    //           ></IonInput>
    //           <IonLabel position="stacked" color="primary">
    //             课程修改时间
    //           </IonLabel>
    //           <IonInput
    //             name="lessonCreateDate"
    //             type="text"
    //             value={lessonState.lessonUpdateDate}
    //             spellCheck={false}
    //             autocapitalize="off"
    //             readonly
    //             required
    //           ></IonInput>
    //           <IonLabel position="stacked" color="primary">
    //             修改原因
    //           </IonLabel>
    //           <IonInput
    //             name="lessonUpdateReason"
    //             type="text"
    //             value={lessonState.lessonUpdateReason}
    //             spellCheck={false}
    //             autocapitalize="off"
    //             onIonChange={e =>
    //               setLessonState({ ...lessonState, ...{ lessonUpdateReason: e.detail.value! } })
    //             }
    //             required
    //           ></IonInput>
    //           <IonLabel position="stacked" color="primary">
    //             教育机构ID
    //           </IonLabel>
    //           <IonInput
    //             name="eduId"
    //             type="text"
    //             value={lessonState.eduId}
    //             spellCheck={false}
    //             autocapitalize="off"
    //             readonly
    //             required
    //           ></IonInput>
    //           <IonLabel position="stacked" color="primary">
    //             教师ID
    //           </IonLabel>
    //           <IonInput
    //             name="teacherId"
    //             type="text"
    //             value={lessonState.teacherId}
    //             spellCheck={false}
    //             autocapitalize="off"
    //             onIonChange={e =>
    //               setLessonState({ ...lessonState, ...{ teacherId: e.detail.value! } })
    //             }
    //             required
    //           ></IonInput>
    //         </IonList>
    //       </form>
    //       <IonItem className="">
    //         <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">
    //           返回
    //         </IonButton>
    //       </IonItem>
    //     </IonCardContent>
    //   </IonCard>
    // </IonPage>
  );
};

export default LessonDetail;
