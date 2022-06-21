//手工退课
import React, { useState } from 'react';
import { useEffect,useCallback,useContext
 } from 'react'
import { IonPage, IonModal,IonRow,IonCol,IonCard,IonRadioGroup,IonRadio, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import {AppContext,setAttendenceLanuchList,setAttendenceLanuchDetail} from '../../../appState';
import {Lesson} from '../../../types/types'
import { PickerColumn } from "@ionic/core";

const queryURL = 'http://localhost:3003/contractNego/query'

const demoLessonList:Lesson[] = [
    {  
      lessonId: '2',
      lessonName: '第二课',
      lessonPerPrice: '12',
      lessonTotalTimes:'10',
      lessonTotalPrice: '120',
      lessonIntroduce: '第二课程介绍',
      lessonType: '第二课程类型',
      lessonOutline: '第二课程大纲',
      lessonStartDate: '2020-01-01',
      lessonStartTime: '00:00:00',
      lessonEndDate: '2021-01-01',
      lessonEndTime: '00:00:00',
      lessonStatus: 'pending',
      lessonCreateDate: '2020-01-01',
      lessonCreateTime: '00:00:00',
      lessonUpdateDate: '2020-01-01',
      lessonUpdateTime:   '00:00:00',
      lessonUpdateReason: '第二课程更新原因',
      eduId: '1',
      edu: {
        eduId: '1',
        eduName:'第一学院',
        eduLoginName:'第一学院登录名',
        supervisorOrgId: '1',
      },
      teacherId: '1',
      teacher: {
        teacherId: '1',
        teacherName: '第一老师',
      }},
          {  
            lessonId: '2',
            lessonName: '第3课',
            lessonTotalTimes:'10',
            lessonPerPrice: '12',
            lessonTotalPrice: '120',
            lessonIntroduce: '第3课程介绍',
            lessonType: '第3课程类型',
            lessonOutline: '第3课程大纲',
            lessonStartDate: '2020-01-01',
            lessonStartTime: '00:00:00',
            lessonEndDate: '2021-01-01',
            lessonEndTime: '00:00:00',
            lessonStatus: 'on',
            lessonCreateDate: '2020-01-01',
            lessonCreateTime: '00:00:00',
            lessonUpdateDate: '2020-01-01',
            lessonUpdateTime:   '00:00:00',
            lessonUpdateReason: '第3课程更新原因',
            eduId: '1',
            edu: {
              eduId: '1',
              eduName:'第一学院',
              eduLoginName:'第一学院登录名',
              supervisorOrgId: '1',
            },
            teacherId: '2',
            teacher: {
              teacherId: '2',
              teacherName: '第2老师',
            }}
        ]

const ContractNegoQuery:React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({lessonName:''})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail,setDetail]= useState({} as any);
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
    lessonName:queryInfo.lessonName,
 },queryURL)
 const refreshList = useCallback((lessons:Lesson[]) => {
  dispatch(setAttendenceLanuchList(lessons));
},[dispatch]);
const onDetail = (item:Lesson)=>() => {
  setDetail(item);
  setIsModalOpen(true);
  
  // doSetDetail(item)
}

const onManual =()=>{
  //todo fetch
  console.log('提交')
}



// const doSetDetail = useCallback((lesson: Lesson) => {
//   dispatch({...setAttendenceLanuchDetail(lesson),...{backPage:'/tabs/contractNego/query'}});
// },[dispatch]);
useEffect(() => { 
  // fetch(paramStr, {
  //   method: 'GET',
  //   headers: {
  //     'Content-type': 'application/json;charset=UTF-8',
  //   },
  // }).then(res => res.json())
  // .then((json) => {
  // const {contractNegoList} = json 
  
  // refreshList(democontractNegoList.filter((contractNego:ContractNego)=>contractNego.contractId.indexOf(queryInfo.contractId)>-1))
  // return 
  // })
  refreshList(demoLessonList)
},[]);

const onQuery = () => {
    // fetch(paramStr, {
  //   method: 'GET',
  //   headers: {
  //     'Content-type': 'application/json;charset=UTF-8',
  //   },
  // }).then(res => res.json())
  // .then((json) => {
  // const {contractNegoList} = json 
  
  // refreshList(democontractNegoList.filter((contractNego:ContractNego)=>contractNego.contractId.indexOf(queryInfo.contractId)>-1))
  // return 
  // })
  refreshList(demoLessonList.filter((lesson:Lesson)=>lesson.lessonName.indexOf(queryInfo.lessonName)>-1))
}

const ListEntry = ({ lesson,key, ...props } : {lesson:Lesson,key:any}) => (
  <IonItem key={key} >

    <IonLabel>
      <p  className='text-center'>{lesson.lessonId}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{lesson.lessonName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{lesson.lessonFinishTimes}课时</p>
    </IonLabel>
    <IonLabel>
       <div className='flex gap-2'>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={()=>{setDetail(lesson);setIsModalOpen(true)}}>发起签到</button>
       </div>
    </IonLabel>
  </IonItem>
  );
  
    return   <IonPage >
                <div className='relative'>
                <div className='flex'>
                <IonRow className='flex justify-between '>
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>合同ID</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{contractId:e.target.value}})} />
                      </IonCol>     
                      <IonCol className='flex ml-8'>
                          <button onClick={()=>{onQuery()}}>查询</button>
                        </IonCol>  
                </IonRow>
                </div>
                <IonModal isOpen={isModalOpen}>
                        < IonCardContent>
                          <form onSubmit={onManual}>
                              <IonList>
                                  <IonRow>
                                    <IonCol>
                                      <IonLabel>
                                        <p  className='text-center'>课程ID:</p>
                                      </IonLabel> 
                                    </IonCol>
                                    <IonCol>
                                      <IonLabel>
                                        <p  className='text-center'>{detail.lessonId}</p>
                                      </IonLabel> 
                                    </IonCol>
                                  </IonRow>
                                  <IonRow>
                                    <IonCol>
                                      <IonLabel>
                                        <p  className='text-center'>课程名称:</p>
                                      </IonLabel> 
                                    </IonCol>
                                    <IonCol>
                                      <IonLabel>
                                        <p  className='text-center'>{detail.lessonName}</p>
                                      </IonLabel> 
                                    </IonCol>
                                  </IonRow>   
                                  <IonRow>
                                    <IonCol>
                                      <IonLabel>
                                        <p  className='text-center'>上课日期时间 </p>
                                      </IonLabel> 
                                    </IonCol>
                                    <IonCol>
                                      <IonDatetime  onIonChange={e => setDetail({...detail,...{dateitme:e.detail.value!}})}></IonDatetime>
                                    </IonCol>
                                  </IonRow> 
                                  <IonRow>
                                    <IonCol>
                                      <IonLabel>
                                        <p  className='text-center'>上课日期时间 </p>
                                      </IonLabel> 
                                    </IonCol>
                                    <IonCol>
                                      <IonInput  onIonChange={e => setDetail({...detail,...{times:e.detail.value!}})}></IonInput>
                                    </IonCol>
                                  </IonRow>                                  
                              </IonList>
                              
                              
                          </form>
                        </IonCardContent>
                    </IonModal> 
              <div className='absolute w-full mt-10'>
                <IonList>
                  <IonItem key='title'>
                    <IonLabel>
                      <div className='font-black text-center'>课程ID</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>课程名称</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>已上课时</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>操作</div>
                    </IonLabel>
                </IonItem>
                    <div className=''>
                    {state.attendenceLanuch.attendenceLanuchDetail.map((list:Lesson, i: any) => (
                    <ListEntry lesson={list} key={i} />
                  ))}
                    </div>
                </IonList>
            </div> 
            </div>            
      </IonPage>
}
export default ContractNegoQuery;

