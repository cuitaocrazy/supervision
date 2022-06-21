//transfer管理的详细页面
import React, { useState } from 'react';
import { IonPage,IonRow,IonCol, IonCard, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setTransferDetail} from '../../../appState';


export const TransferDetail: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const setBack = useCallback(() => {
    dispatch(setTransferDetail(undefined));
  },[]);
  const onBack = ()=>() => {
    setBack()
  }
  if(state.transfer?.transferDetail===undefined){
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
          <IonRow>
            <IonCol>
             <IonItem>
                <IonLabel position="floating">教育机构名称：</IonLabel>
                <IonInput name="transferName" value={state.transfer.transferDetail.eduName} readonly required></IonInput>
              </IonItem>
            </IonCol>
            <IonItem>
                <IonLabel position="floating">课程名称：</IonLabel>
                <IonInput name="transferIdentityNo" value={state.transfer.transferDetail.lessonName} readonly required></IonInput>
              </IonItem>
          </IonRow>
          <IonRow>
          <IonCol>
              <IonItem>
                <IonLabel position="floating">客户姓名：</IonLabel>
                <IonInput name="transferExperience" value={state.transfer.transferDetail.consumerName} readonly required></IonInput>
              </IonItem>
              </IonCol>
              <IonCol>
              <IonItem>
                <IonLabel position="floating">划拨原因</IonLabel>
                <IonInput name="transferExperience" value={state.transfer.transferDetail.reason} readonly required></IonInput>
              </IonItem>
              </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">考勤日期：</IonLabel>
                <IonInput name="transferExperience" value={state.transfer.transferDetail.attendanceDate} readonly required></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">考勤时间:</IonLabel>
                <IonInput name="transferIntroduce" value={state.transfer.transferDetail.attendanceTime} readonly required></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">划拨金额：</IonLabel>
                <IonInput name="transferRating" value={state.transfer.transferDetail.transferAmt} readonly required ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">划拨结果：</IonLabel>
                <IonInput name="transferIntroduce" value={state.transfer.transferDetail.transferResult} readonly required></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          </IonList>
          <IonItem className="">
            <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
          </IonItem>
      </IonCardContent>
      </IonCard>
      </IonPage>
      )
    };

    export default TransferDetail