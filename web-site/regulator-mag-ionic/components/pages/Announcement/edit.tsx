//Announcement的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setAnnouncementEdit} from '../../../appState';

import {Announcement} from '../../../types/types'
import { PickerColumn } from "@ionic/core";

export const AnnouncementEdit: React.FC = () => {
  const modifyURL = 'http://localhost:3003/announcement/modify'
  const { state, dispatch } = useContext(AppContext);

  const [announcementState, setAnnouncementState] = useState(state.announcement.announcementEdit);
  const [isPickOpen, setPickOpen] = useState(false);
  const statueTypePickerColumn = {
    name: "statueTypePickerColumn",
    options: [{'text':'开启','value':'on'},{'text':'下线','value':'off'}],
  } as PickerColumn;
  const setBack = useCallback(() => {
    dispatch(setAnnouncementEdit(undefined));
  },[]);
  const onBack = ()=>() => {
    setBack()
  }
  if(state.announcement.announcementEdit===undefined){
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
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
      <form onSubmit={onModify}>
      <IonList>
      <IonLabel position="stacked" color="primary">发布者</IonLabel>
      <IonInput name="announcementAnnouncer" type="text" value={announcementState.announcementAnnouncer} spellCheck={false} autocapitalize="off" onIonChange={e => setAnnouncementEdit({...announcementState,...{announcementAnnouncer:e.detail.value!}})} required>      </IonInput>
      <IonLabel position="stacked" color="primary">标题</IonLabel>
              <IonInput name="supervisorPhone" type="text" value={announcementState.announcementTitle} spellCheck={false} autocapitalize="off" onIonChange={e => setAnnouncementEdit({...announcementState,...{announcementTitle:e.detail.value!}})} required>
      </IonInput>
      <IonLabel position="stacked" color="primary">内容</IonLabel>
              <IonInput name="announcementContent" type="text" value={announcementState.announcementContent} spellCheck={false} autocapitalize="off" onIonChange={e => setAnnouncementEdit({...announcementState,...{announcementContent:e.detail.value!}})} required>
      </IonInput>
      <IonLabel position="stacked" color="primary" onClick={()=>setPickOpen(true)}>状态</IonLabel>
      <IonPicker
                              isOpen={isPickOpen}
                              columns={[statueTypePickerColumn]}
                              buttons={[
                                {
                                  text: "取消",
                                  role: "cancel",
                                  handler: value => {
                                    setPickOpen(false);
                                  }
                                },
                                {
                                  text: "确认",
                                  handler: value => { 
                                    setPickOpen(false);
                                    setAnnouncementEdit({...announcementState,...{announcementContent:value.statueTypePickerColumn.value}})
                                  }
                                }
                              ]}
                            ></IonPicker>
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

}
