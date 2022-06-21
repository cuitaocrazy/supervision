//supervisor管理的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard,IonRadioGroup,IonRadio,IonRow,IonCol, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setSupervisorOrgDetail} from '../../../appState';
import {SupervisorOrg} from '../../../types/types'
import { PickerColumn } from "@ionic/core";

export const SupervisorDetail: React.FC = () => {
  const modifyURL = 'http://localhost:3003/supervisor/modifyURL'
  const { state, dispatch } = useContext(AppContext);

  const [supervisorState, setsupervisorState] = useState(state.supervisor.supervisorDetail);
  const setBack = useCallback(() => {
    dispatch(setSupervisorOrgDetail(undefined));
  },[]);`                                                       `
  const onBack = ()=>() => {
    setBack()
  }
  if(state.supervisor.supervisorDetail===undefined){
    return <Redirect to={state.backPage} />
  }


  return (
    
    <IonPage>
      <IonCard>
      <IonCardHeader>
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonRow>
          <IonCol>
          <IonLabel position="floating">机构ID</IonLabel>
                <IonInput name="eduName" value={supervisorState.supervisorOrgId} readonly></IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">机构名称</IonLabel>
                <IonInput name="eduName" value={supervisorState.supervisorOrgName} readonly></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>

          <IonLabel position="floating">父机构ID</IonLabel>
                <IonInput name="eduName" value={supervisorState.parentSupervisorOrgId} readonly></IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">父机构名称</IonLabel>
                <IonInput name="eduName" value={supervisorState.parentSupervisorOrgName} readonly></IonInput>
          </IonCol>
        </IonRow>
        
          <IonItem className="">
            <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
          </IonItem>
      </IonCardContent>
      </IonCard>
      </IonPage>
      )
    };

    export default SupervisorDetail