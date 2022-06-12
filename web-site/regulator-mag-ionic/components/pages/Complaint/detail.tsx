//complaint管理的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setComplaintDetail} from '../../../appState';


export const ComplaintDetail: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const setBack = useCallback(() => {
    dispatch(setComplaintDetail(undefined));
  },[]);
  const onBack = ()=>() => {
    setBack()
  }
  if(state.complaint.complaintDetail===undefined){
    return <Redirect to={state.backPage} />
  }

  return (  
    <IonPage>
      <IonCard>
      <IonCardHeader>
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
              <IonItem>
                <IonLabel position="floating">合同ID：</IonLabel>
                <IonInput name="complaintId" value={state.contractId} readonly required ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构名称：</IonLabel>
                <IonInput name="complaintName" value={state.complaint.complaintDetail.eduName} readonly required></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">课程名称：</IonLabel>
                <IonInput name="complaintIdentityNo" value={state.complaint.complaintDetail.lessonName} readonly required></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">客户姓名：</IonLabel>
                <IonInput name="complaintExperience" value={state.complaint.complaintDetail.consumerName} readonly required></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">划拨结果：</IonLabel>
                <IonInput name="complaintIntroduce" value={state.complaint.complaintDetail.complaintResult} readonly required></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">划拨金额：</IonLabel>
                <IonInput name="complaintRating" value={state.complaint.complaintDetail.complaintAmt} readonly required ></IonInput>
              </IonItem>
              </IonList>
          <IonItem className="">
            <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
          </IonItem>
      </IonCardContent>
      </IonCard>
      </IonPage>
      )
    };

    export default ComplaintDetail