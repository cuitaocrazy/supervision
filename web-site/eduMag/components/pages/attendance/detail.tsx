//attendance的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardHeader,IonRow,IonCol, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setAttendanceDetail} from '../../../appState';

import {Attendance} from '../../../types/types'
import { Link } from 'react-router-dom';

export const AttendanceDetail: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const [attendanceState, setAttendanceState] = useState(state.attendance.attendanceDetail);
  const [isPickOpen, setPickOpen] = useState(false);
  
  const setBack = useCallback(() => {
    dispatch(setAttendanceDetail(undefined));
  },[]);
  const onBack = ()=>() => {
    setBack()
  }
  if(state.attendance.attendanceDetail===undefined){
    return <Redirect to={state.backPage} />
  }
  const getChineseattendanceType = (attendanceType:string)=>{
    switch(attendanceType){
        case 'attendanceType':
        return '有效'
        default : return '11'
    }
  }
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
            <span className="pr-1 text-gray-600 ">考勤管理</span>/
            <span className="pl-1 text-primary-500">课程考勤详情</span>
          </div>
        </div>
        <IonCardContent>
            {/* 详情 */}
            <div className="font-bold text-gray-800">课程考勤详情</div>
            <hr className="mt-2 mb-4" />
            <div className="grid grid-cols-2 justify-items-center ">
              <div className="flex items-center mb-4 leading-10 justify-items-center">
                <div className="flex justify-end w-32 mr-2">课程名称:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={attendanceState.lessonName}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">客户姓名:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={attendanceState.consumerName}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">学生姓名:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={attendanceState.consumerStuName}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">
                  考勤类型:
                </div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={attendanceState.attendanceType}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">考勤课时:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={attendanceState.attendanceLessonTimes}
                  readOnly
                />
              </div>

              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">考勤日期:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={attendanceState.attendanceDate}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">考勤时间:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={attendanceState.attendanceTime}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">更新日期:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={attendanceState.attendanceUpdateDate}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">更新时间:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={attendanceState.attendanceUpdateTime}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">更新原因:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={attendanceState.attendanceUpdateReason}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">考勤状态:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={attendanceState.attendanceState}
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
    // <IonPage>
    //   <IonCard>
    //   <IonCardHeader>
    //     <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
    //   </IonCardHeader>
    //   <IonCardContent>
    //     <IonRow>
    //         <IonCol>
    //           <IonItem>
    //               <IonLabel position="floating">课程名称</IonLabel>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonInput name="lessonName" value={attendanceState.lessonName} readonly required></IonInput>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonLabel position="floating">客户姓名</IonLabel>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonInput name="consumerName" value={attendanceState.consumerName} readonly required></IonInput>
    //           </IonItem>
    //         </IonCol>
    //     </IonRow>
    //     <IonRow>
    //         <IonCol>
    //           <IonItem>
    //               <IonLabel position="floating">学生姓名：</IonLabel>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonInput name="consumerStuName" value={attendanceState.consumerStuName} readonly required></IonInput>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonLabel position="floating">考勤类型：</IonLabel>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonInput name="attendanceType" value={getChineseattendanceType(attendanceState.attendanceType)} readonly required></IonInput>
    //           </IonItem>
    //         </IonCol>
    //     </IonRow>
    //     <IonRow>
    //         <IonCol>
    //           <IonItem>
    //               <IonLabel position="floating">考勤课时：</IonLabel>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonInput name="consumerStuName" value={attendanceState.attendanceLessonTimes} readonly required></IonInput>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonLabel position="floating">考勤日期</IonLabel>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonInput name="attendanceType" value={getChineseattendanceType(attendanceState.attendanceDate)} readonly required></IonInput>
    //           </IonItem>
    //         </IonCol>
    //     </IonRow>
    //     <IonRow>
    //         <IonCol>
    //           <IonItem>
    //               <IonLabel position="floating">更新日期:</IonLabel>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonInput name="teacherName" value={attendanceState.updateDate} readonly required></IonInput>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonLabel position="floating">考勤状态:</IonLabel>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonInput name="teacherName" value={attendanceState.attendanceStatus} readonly required></IonInput>
    //           </IonItem>
    //         </IonCol>
    //     </IonRow>
    //     <IonRow>
    //         <IonCol>
    //           <IonItem>
    //               <IonLabel position="floating">更新日期:</IonLabel>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonInput name="teacherName" value={attendanceState.teacherUpdatedDate} readonly required></IonInput>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonLabel position="floating">更新时间:</IonLabel>
    //           </IonItem>
    //         </IonCol>
    //         <IonCol>
    //           <IonItem>
    //               <IonInput name="teacherName" value={attendanceState.teacherUpdateTime} readonly required></IonInput>
    //           </IonItem>
    //         </IonCol>
    //     </IonRow> 
    //       <IonItem className="">
    //         <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
    //       </IonItem>
    //   </IonCardContent>
    // </IonCard>
    // </IonPage>
  );

}
