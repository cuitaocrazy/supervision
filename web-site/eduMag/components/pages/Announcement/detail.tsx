//Announcement的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setAnnouncementDetail} from '../../../appState';

import {Announcement} from '../../../types/types'
import { PickerColumn } from "@ionic/core";

export const AnnouncementDetail: React.FC = () => {
  const modifyURL = 'http://localhost:3003/announcement/modify'
  const { state, dispatch } = useContext(AppContext);

  const [announcementState, setAnnouncementState] = useState(state.announcement.announcementDetail);

  const setBack = useCallback(() => {
    dispatch(setAnnouncementDetail(undefined));
  },[]);
  const onBack = ()=>() => {
    setBack()
  }
  if(state.announcement.announcementDetail===undefined){
    return <Redirect to={state.backPage} />
  }
  const onModify = async (e: React.FormEvent)=>() => {
    e.preventDefault();
    fetch(modifyURL, {
      method: 'PUT',
      body: JSON.stringify(announcementState),
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
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">{announcementState.announcementTitle}</IonCardSubtitle>
      </IonCardHeader>
        {announcementState.announcementDate} {announcementState.announcementTime}
      <IonCardContent>
        {announcementState.announcementContent}
      </IonCardContent>
    </IonCard>
    </IonPage>
  );

}
