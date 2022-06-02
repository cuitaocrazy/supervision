
import React, { useState } from 'react';
import { useEffect,useCallback,useContext
 } from 'react'
import { IonPage, IonRow,IonCol,IonCard,IonRadioGroup,IonRadio, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import {AppContext,setAnnouncementList,setAnnouncementDetail} from '../../../appState';
import {Announcement} from '../../../types/types'
import { PickerColumn } from "@ionic/core";

const queryURL = 'http://localhost:3003/announcement/query'
const delURL = 'http://localhost:3003/announcement/del'
const modifyURL = 'http://localhost:3003/announcement/modifyURL'

const demoAnnouncementList:Announcement[] = [
  {
    announcementId:'1',
    announcementDate:'2020-01-01',
    announcementTime:'00:00:00',
    announcementAnnouncer:'介绍',
    announcementTitle:'标题',
    announcementContent:'介绍',
    announcementStatus:'valid',
  },
  {
  announcementId:'2',
  announcementDate:'2020-01-01',
  announcementTime:'00:00:00',
  announcementAnnouncer:'介绍2',
  announcementTitle:'标题2',
  announcementContent:'介绍2',
  announcementStatus:'valid',
},
]

const TeacherQuery:React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({announcementTitle:''})
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
    announcementTitle:queryInfo.announcementTitle,
 },queryURL)
 const refreshList = useCallback((eduOrgs:Announcement[]) => {
  dispatch(setAnnouncementList(eduOrgs));
},[dispatch]);
const onDetail = (item:Announcement)=>() => {
  doSetDetail(item)
}

const onCancel = (item:Announcement)=>() => {
  fetch(delURL, {
    method: 'PUT',
    body: JSON.stringify({
      "announcementTitle":item.announcementTitle,
    }),
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
  }).then(res => res.json())
  .then((json) => {
    alert(json.result)
  })
}

const doSetDetail = useCallback(teacher => {
  dispatch({...setAnnouncementDetail(teacher),...{backPage:'/tabs/announcement/query'}});
},[dispatch]);
useEffect(() => { 
  fetch(paramStr, {
    method: 'GET',
  /* `teacher` is a property of `Lesson` */
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
  }).then(res => res.json())
  .then((json) => {
  const {TeacherList} = json //todo
  
  refreshList(demoAnnouncementList.filter((announcement:Announcement)=>announcement.announcementTitle.indexOf(queryInfo.announcementTitle)>-1))
  return 
  })
},[queryInfo.announcementTitle, paramStr, refreshList]);
const ListEntry = ({ announcement,key, ...props } : {announcement:Announcement,key:any}) => (
  <IonItem key={key} >
    <IonLabel>
      <p  className='text-center'>{announcement.announcementId}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{announcement.announcementTitle}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{announcement.announcementContent}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{announcement.announcementDate}</p>
    </IonLabel>
    <IonLabel>
       <div className='flex gap-2'>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(announcement)}>详情</button>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onCancel(announcement)}>删除</button>
       </div>
    </IonLabel>
  </IonItem>
  );
  if(state.announcement.announcementDetail==null||state.announcement.announcementDetail==undefined){
    return   <IonPage >
                <div className='relative'>
                <div className='flex'>
                <IonRow className='flex justify-between '>
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>教育机构名称查询：</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{eduName:e.target.value}})} />
                      </IonCol>   
                </IonRow>
                </div>
              <div className='absolute w-full mt-10'>
                <IonList>
                  <IonItem key='title'>
                    <IonLabel> 
                      <div className='font-black text-center'>政策ID</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>政策标题</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>发布日期</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>发布时间</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>操作</div>
                    </IonLabel>
                </IonItem>
                    <div className=''>
                    {state.announcement.announcementList.map((list:Announcement, i: any) => (
                    <ListEntry announcement={list} key={i} />
                  ))}
                    </div>
                </IonList>
            </div> 
            </div>            
      </IonPage>
   }
   else{
     return <Redirect to="/tabs/announcement/detail" />
   }  
}
export default TeacherQuery;

