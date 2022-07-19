//Teacher管理的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard,IonRadioGroup,IonRadio, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setTeacherDetail} from '../../../appState';
import {Teacher} from '../../../types/types'
import { PickerColumn } from "@ionic/core";

export const TeacherDetail: React.FC = () => {
  const modifyURL = 'http://localhost:3003/teacher/modifyURL'
  const { state, dispatch } = useContext(AppContext);

  const [teacherState, setTeacherState] = useState(state.teacher.teacherDetail);
  const [isPickOpen, setPickOpen] = useState(false);
  const setBack = useCallback(() => {
    dispatch(setTeacherDetail(undefined));
  },[]);`                                                       `
  const onBack = ()=>() => {
    setBack()
  }
  if(state.teacher.teacherDetail===undefined){
    return <Redirect to={state.backPage} />
  }

  const onModify = async (e: React.FormEvent)=>() => {
    e.preventDefault();
    fetch(modifyURL, {
      method: 'PUT',
      body: JSON.stringify(teacherState),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      alert(json.result)
    })
  }
  
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
          <span className="pl-1 pr-1 text-primary-500">查看教师信息</span>/
            <span className="pl-1 text-primary-500">教师详情</span>
          </div>
        </div>
        <IonCardContent>
          {/* 详情 */}
          <div className="font-bold text-gray-800"></div>
          <hr className="mt-2 mb-4" />
          <div className="grid grid-cols-2 justify-items-center ">
            <div className="flex items-center mb-4 leading-10 justify-items-center">
              <div className="flex justify-end w-32 mr-2">所属机构:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="eduName"
                type="text"
                value={teacherState.orgName}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">教学课程:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonTotalQuantity"
                type="text"
                value={teacherState.lessonName}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">教师姓名:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonTotalPrice"
                type="text"
                value={teacherState.teacherName}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">身份证号:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonType"
                type="text"
                value={teacherState.teacherIdentityNo}
                readOnly
              />
            </div>

            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">专业领域:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="teacherName"
                type="text"
                value={teacherState.teacherFiled}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">从业经验:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonStartDate"
                type="text"
                value={teacherState.teacherExperience}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">创建日期:</div>
              <input
                className="w-64 h-12 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonStartTime"
                value={teacherState.teacherCreatedDate}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">创建时间:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonStartTime"
                value={teacherState.teacherCreateTime}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">更新日期:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonStartTime"
                value={teacherState.teacherUpdatedDate}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">更新日期:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonStartTime"
                value={teacherState.teacherUpdateTime}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">个人介绍:</div>
              <textarea
                className="w-64 h-32 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonStartTime"
                value={teacherState.teacherIntroduce}
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
    //     <form onSubmit={onModify}>
    //     <IonList>
    //           <IonItem>
    //             <IonLabel position="floating">教师ID</IonLabel>
    //             <IonInput name="teacherId" value={teacherState.teacherId} readonly required ></IonInput>
    //           </IonItem>
    //           <IonItem>
    //             <IonLabel position="floating">教师名称</IonLabel>
    //             <IonInput name="teacherName" value={teacherState.teacherName} readonly required></IonInput>
    //           </IonItem>
    //           <IonItem>
    //             <IonLabel position="floating">教育机构法人</IonLabel>
    //             <IonInput name="teacherIdentityNo" value={teacherState.teacherIdentityNo} readonly required></IonInput>
    //           </IonItem>
    //           <IonItem>
    //             <IonLabel position="floating">教育机构法人联系方式</IonLabel>
    //             <IonInput name="teacherExperience" value={teacherState.teacherExperience} readonly required></IonInput>
    //           </IonItem>
    //           <IonItem>
    //             <IonLabel position="floating">教育机构联系人</IonLabel>
    //             <IonInput name="teacherIntroduce" value={teacherState.teacherIntroduce} readonly required></IonInput>
    //           </IonItem>
    //           <IonItem>
    //             <IonLabel position="floating">教育机构法人联系方式</IonLabel>
    //             <IonInput name="teacherRating" value={teacherState.teacherRating} readonly required ></IonInput>
    //           </IonItem>
    //           <IonItem>
    //             <IonLabel position="floating">注册日期</IonLabel>
    //             <IonInput name="teacherCreatedDate" value={teacherState.eduLicense} readonly required></IonInput>
    //           </IonItem>
    //           <IonItem>
    //             <IonLabel position="floating">注册时间</IonLabel>
    //             <IonInput name="teacherCreateTime" value={teacherState.eduLicense} readonly required></IonInput>
    //           </IonItem>
    //           <IonItem>
    //             <IonLabel position="floating">更新日期</IonLabel>
    //             <IonInput name="teacherUpdatedDate" value={teacherState.eduLicense} readonly required></IonInput>
    //           </IonItem>
    //           <IonItem>
    //             <IonLabel position="floating">更新时间</IonLabel>
    //             <IonInput name="teacherUpdateTime" value={teacherState.eduLicense} readonly required
    //             ></IonInput>
    //           </IonItem>
    //           </IonList>

            
    //       <IonItem className="">
    //         <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
    //       </IonItem>
    //     </form>
    //   </IonCardContent>
    //   </IonCard>
    //   </IonPage>
      )
    };

    export default TeacherDetail