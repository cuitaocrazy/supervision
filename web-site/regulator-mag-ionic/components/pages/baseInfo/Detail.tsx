
//BaseInfo的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setUserInfoDetail} from '../../../appState';

import {Lesson} from '../../../types/types'
import { PickerColumn } from "@ionic/core";

export const BaseInfoDetail: React.FC = () => {
  const modifyURL = 'http://localhost:3003/lesson/modify'
  const { state, dispatch } = useContext(AppContext);

  const [baseInfoState, setBaseInfoState] = useState(state.userInfo.userInfoDetail);
  const [isPickOpen, setPickOpen] = useState(false);
  const setBack = useCallback(() => {
    dispatch(setUserInfoDetail(undefined));
  },[]);
  const onBack = ()=>() => {
    setBack()
  }
  if(state.userInfo.userInfoDetail===undefined){
    return <Redirect to={state.backPage} />
  }

  const onModify = async (e: React.FormEvent)=>() => {
    e.preventDefault();
    fetch(modifyURL, {
      method: 'PUT',
      body: JSON.stringify(baseInfoState),
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
      <IonLabel position="stacked" color="primary">登录名称</IonLabel>
              <IonInput name="supervisorLoginName" type="text" value={baseInfoState.supervisorLoginName} spellCheck={false} autocapitalize="off" readonly required>
      </IonInput>
      <IonLabel position="stacked" color="primary">用户名称</IonLabel>
      <IonInput name="supervisorUsername" type="text" value={baseInfoState.supervisorUsername} spellCheck={false} autocapitalize="off" onIonChange={e => setBaseInfoState({...baseInfoState,...{supervisorUsername:e.detail.value!}})} required>      </IonInput>
      <IonLabel position="stacked" color="primary">用户电话</IonLabel>
              <IonInput name="supervisorPhone" type="text" value={baseInfoState.supervisorPhone} spellCheck={false} autocapitalize="off" onIonChange={e => setBaseInfoState({...baseInfoState,...{supervisorPhone:e.detail.value!}})} required>
      </IonInput>
      </IonList>
      <IonItem className="">
           <IonButton type="submit" expand="block">确认</IonButton>
          <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
        </IonItem>
     </form>

        {/* <Link to="/tabs/query"> 返回 </Link> */}
      </IonCardContent>
    </IonCard>
    </IonPage>
  );
};

export default BaseInfoDetail