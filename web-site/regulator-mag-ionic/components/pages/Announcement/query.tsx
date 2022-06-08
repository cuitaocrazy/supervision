
import React, { useState } from 'react';
import { useEffect,useCallback,useContext
 } from 'react'
import { IonPage, IonRow,IonCardTitle,IonCol,IonCard,IonRadioGroup,IonRadio, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import {AppContext,setAnnouncementList,setAnnouncementDetail,setAnnouncementEdit} from '../../../appState';
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
    announcementStatus:'on',
  },
  {
  announcementId:'2',
  announcementDate:'2020-01-01',
  announcementTime:'00:00:00',
  announcementAnnouncer:'介绍2',
  announcementTitle:'标题2',
  announcementContent:'介绍2',
  announcementStatus:'on',
},
]

const AnnouncementQuery:React.FC = () => {
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
const onEdit = (item:Announcement)=>() => {
  doSetEdit(item)
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

const doSetDetail = useCallback(item => {
  dispatch({...setAnnouncementDetail(item),...{backPage:'/tabs/announcement/query'}});
},[dispatch]);

const doSetEdit = useCallback(item => {
  dispatch({...setAnnouncementEdit(item),...{backPage:'/tabs/announcement/query'}});
},[dispatch]);
useEffect(() => { 
  // fetch(paramStr, {
  //   method: 'GET',
  //   headers: {
  //     'Content-type': 'application/json;charset=UTF-8',
  //   },
  // }).then(res => res.json())
  // .then((json) => {
  // const {TeacherList} = json 
  
  // refreshList(demoAnnouncementList.filter((announcement:Announcement)=>announcement.announcementTitle.indexOf(queryInfo.announcementTitle)>-1))
  // })
  refreshList(demoAnnouncementList)
},[]);

const onQuery = ()=>{
  // fetch(paramStr, {
  //   method: 'GET',
  //   headers: {
  //     'Content-type': 'application/json;charset=UTF-8',
  //   },
  // }).then(res => res.json())
  // .then((json) => {
  // const {TeacherList} = json 
  
  // refreshList(demoAnnouncementList.filter((announcement:Announcement)=>announcement.announcementTitle.indexOf(queryInfo.announcementTitle)>-1))
  // return 
  // })

  refreshList(demoAnnouncementList.filter((announcement:Announcement)=>announcement.announcementTitle.indexOf(queryInfo.announcementTitle)>-1))
}

const ListEntry = ({ announcement,key, ...props } : {announcement:Announcement,key:any}) => (
  <IonItem key={key} >
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
      <p  className='text-center'>{announcement.announcementTime}</p>
    </IonLabel>
    <IonLabel>
       <div className='flex gap-2'>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(announcement)}>详情</button>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onEdit(announcement)}>编辑</button>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onCancel(announcement)}>删除</button>
       </div>
    </IonLabel>
  </IonItem>
  );
  if(state.announcement.announcementDetail){
    return <Redirect to="/tabs/announcement/detail" />
  }
  if(state.announcement.announcementEdit){
    return <Redirect to="/tabs/announcement/edit" />
  }
  if(state.announcement.announcementDetail==null||state.announcement.announcementDetail==undefined){
    return   <IonPage >
                <div className='relative'>
                <div className='flex'>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>快速查询</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                    <IonRow className='flex justify-between '>
                          <IonCol className='flex ml-8'>
                            <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>发布标题：</IonLabel>
                            <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{announcementTitle:e.target.value}})} />
                          </IonCol>
                          <IonCol className='flex ml-8'> 
                            <button onClick={()=>onQuery()} >查询</button>
                          </IonCol>  
                    </IonRow>
                  
                    </IonCardContent>
                </IonCard>
                </div>
              <div className='absolute w-full mt-10'>
                <IonList>
                  <IonItem key='title'>
                    <IonLabel>
                      <div className='font-black text-center'>政策标题</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>政策内容</div>
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
export default AnnouncementQuery;

