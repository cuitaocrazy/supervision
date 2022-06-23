//Teacher管理的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
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
        <tr>
            <td>
                  <label className='myLabel' >教师姓名</label>          
            </td>
            <td>
                  <input className='readonlyInput'name="teacherName" value={teacherState.teacherName} readOnly required></input>
            </td>
            <td>
                  <label className='myLabel' >身份证号</label>
            </td>
            <td>
                  <input className='readonlyInput'name="teacherName" value={teacherState.teacherIdentityNo} readOnly required></input>            
            </td>
        </tr>
        <tr>
            <td>
                  <label className='myLabel' >专业领域：</label>
            </td>
            <td>
                  <input className='readonlyInput'name="teacherName" value={teacherState.teacherIntroduce} readOnly required></input>
            </td>
            <td>
                  <label className='myLabel' >从业经历：</label>
            </td>
            <td>
                  <input className='readonlyInput'name="teacherName" value={teacherState.teacherExperience+'年'} readOnly required></input>
            </td>
        </tr>
        <tr>
            <td>
                  <label className='myLabel' >创建日期:</label>
            </td>
            <td>
                  <input className='readonlyInput'name="teacherName" value={teacherState.teacherCreatedDate} readOnly required></input>
            </td>
            <td>
                  <label className='myLabel' >创建时间:</label>
            </td>
            <td>
                  <input className='readonlyInput'name="teacherName" value={teacherState.teacherCreateTime} readOnly required></input>
            </td>
        </tr>
        <tr>
            <td>
                  <label className='myLabel' >更新日期:</label>
            </td>
            <td>
                  <input className='readonlyInput'name="teacherName" value={teacherState.teacherUpdatedDate} readOnly required></input>
            </td>
            <td>
                  <label className='myLabel' >更新时间:</label>
            </td>
            <td>
                  <input className='readonlyInput'name="teacherName" value={teacherState.teacherUpdateTime} readOnly required></input>
            </td>
        </tr> 
          <tr>
            <td>
            <button className="m-5 text-base " onClick={onBack()} >返回</button>
            </td>
          </tr>
        </form>
      </IonCardContent>
      </IonCard>
      </IonPage>
      )
    };

    export default TeacherDetail
