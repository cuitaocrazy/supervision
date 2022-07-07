//attendance的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
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
  
  return (
    <IonPage>
    <IonCard className='h-screen mx-6 overflow-auto'>
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
       <span className="pl-1 text-primary-500">考勤详情</span>
     </div>
   </div>
   <IonCardContent>
       {/* 详情 */}
       <div className="font-bold text-gray-800"></div>
       <hr className="mt-2 mb-4" />
       <div className="grid grid-cols-2 justify-items-center ">
         <div className="flex items-center mb-4 leading-10 justify-items-center">
           <div className="flex justify-end w-32 mr-2">合同ID:</div>
           <input
             className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
             name="attendanceId" type="text" value={attendanceState.attendanceId}
             readOnly
           />
         </div>
         <div className="flex mb-4 leading-10">
           <div className="flex justify-end w-32 mr-2">教育机构名称:</div>
           <input
             className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
             name="attendanceDate" type="text" value={attendanceState.eduName}
             readOnly
           />
         </div>
         <div className="flex mb-4 leading-10">
           <div className="flex justify-end w-32 mr-2">课程名称:</div>
           <input
             className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
             name="attendanceTime" type="text" value={attendanceState.lessonName}
             readOnly
           />
         </div>
         <div className="flex mb-4 leading-10">
           <div className="flex justify-end w-32 mr-2">
             客户姓名:
           </div>
           <input
             className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
             name="attendanceUpdateReason" type="text" value={attendanceState.consumerName} 
             readOnly
           />
         </div>
         <div className="flex mb-4 leading-10">
           <div className="flex justify-end w-32 mr-2">签到日期:</div>
           <input
             className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
             name="eduId" type="text" value={attendanceState.eduId}
             readOnly
           />
         </div>

         <div className="flex mb-4 leading-10">
           <div className="flex justify-end w-32 mr-2">签到时间:</div>
           <input className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
             name="eduName" type="text" value={attendanceState.eduName}
             readOnly
           />
         </div>
         <div className="flex mb-4 leading-10">
           <div className="flex justify-end w-32 mr-2">签到类型:</div>
           <input
             className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
             name="lessonType" type="text" value={attendanceState.lessonType}
             readOnly
           />
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
 </IonPage>
    // <IonPage>
    //   <IonCard>
    //   <IonCardHeader>
    //     <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
    //   </IonCardHeader>
    //   <IonCardContent>
    //   <IonList>
    //   <IonLabel position="stacked" color="primary">合同ID</IonLabel>
    //   <IonInput name="attendanceId" type="text" value={attendanceState.attendanceId} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">教育机构名称</IonLabel>
    //   <IonInput name="attendanceDate" type="text" value={attendanceState.eduName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">课程名称</IonLabel>
    //   <IonInput name="attendanceTime" type="text" value={attendanceState.lessonName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">客户姓名</IonLabel>
    //   <IonInput name="attendanceUpdateReason" type="text" value={attendanceState.consumerName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">签到日期</IonLabel>
    //   <IonInput name="eduId" type="text" value={attendanceState.eduId} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">签到时间</IonLabel>
    //   <IonInput name="eduName" type="text" value={attendanceState.eduName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">签到类型</IonLabel>
    //   <IonInput name="lessonType" type="text" value={attendanceState.lessonType} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   </IonList>
    //   <IonItem className="">
    //       <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
    //     </IonItem>
    //   </IonCardContent>
    // </IonCard>
    // </IonPage>
  );

}
