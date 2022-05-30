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
    
    <IonPage>
      <IonCard>
      <IonCardHeader>
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <form onSubmit={onModify}>
        <IonList>
              <IonItem>
                <IonLabel position="floating">教师ID</IonLabel>
                <IonInput name="teacherId" value={teacherState.teacherId} readonly required ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教师名称</IonLabel>
                <IonInput name="teacherName" value={teacherState.teacherName} readonly required></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构法人</IonLabel>
                <IonInput name="teacherIdentityNo" value={teacherState.teacherIdentityNo} readonly required></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构法人联系方式</IonLabel>
                <IonInput name="teacherExperience" value={teacherState.teacherExperience} readonly required></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构联系人</IonLabel>
                <IonInput name="teacherIntroduce" value={teacherState.teacherIntroduce} readonly required></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构法人联系方式</IonLabel>
                <IonInput name="teacherRating" value={teacherState.teacherRating} readonly required ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">注册日期</IonLabel>
                <IonInput name="teacherCreatedDate" value={teacherState.eduLicense} readonly required></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">注册时间</IonLabel>
                <IonInput name="teacherCreateTime" value={teacherState.eduLicense} readonly required></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">更新日期</IonLabel>
                <IonInput name="teacherUpdatedDate" value={teacherState.eduLicense} readonly required></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">更新时间</IonLabel>
                <IonInput name="teacherUpdateTime" value={teacherState.eduLicense} readonly required
                ></IonInput>
              </IonItem>
              </IonList>

            
          <IonItem className="">
            <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
          </IonItem>
        </form>
      </IonCardContent>
      </IonCard>
      </IonPage>
      )
    };

    export default TeacherDetail