//Teacher管理的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard,IonRow,IonCol,IonRadioGroup,IonRadio, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
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
        <IonRow>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">教师姓名</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="teacherName" value={teacherState.teacherName} readonly required></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">身份证号</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="teacherName" value={teacherState.teacherIdentityNo} readonly required></IonInput>
              </IonItem>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">专业领域：</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="teacherName" value={teacherState.teacherIntroduce} readonly required></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">从业经历：</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="teacherName" value={teacherState.teacherExperience} readonly required>年</IonInput>
              </IonItem>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">创建日期:</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="teacherName" value={teacherState.teacherCreatedDate} readonly required></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">创建时间:</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="teacherName" value={teacherState.teacherCreateTime} readonly required></IonInput>
              </IonItem>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">更新日期:</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="teacherName" value={teacherState.teacherUpdatedDate} readonly required></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">更新时间:</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="teacherName" value={teacherState.teacherUpdateTime} readonly required></IonInput>
              </IonItem>
            </IonCol>
        </IonRow> 
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
