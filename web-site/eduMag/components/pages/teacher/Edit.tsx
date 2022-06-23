//Teacher管理的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard,IonRadioGroup,IonRadio, IonCardHeader, IonCardSubtitle,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setTeacherEdit} from '../../../appState';
import {Teacher} from '../../../types/types'
import { PickerColumn } from "@ionic/core";

export const TeacherDetail: React.FC = () => {
  const modifyURL = 'http://localhost:3003/teacher/modifyURL'
  const { state, dispatch } = useContext(AppContext);

  const [teacherState, setTeacherState] = useState(state.teacher.teacherEdit);
  const [isPickOpen, setPickOpen] = useState(false);
  const setBack = useCallback(() => {
    dispatch(setTeacherEdit(undefined));
  },[]);
  const onBack = ()=>() => {
    setBack()
  }
  if(state.teacher.teacherEdit===undefined){
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
        <tbody>
        <tr>
            <td>
                  <label  className='myLabel'>教师姓名:</label>
            </td>
            <td>        
                  <IonInput className='normalInput' name="teacherName" value={teacherState.teacherName} onIonChange={e => setTeacherEdit({...teacherState,...{teacherName:e.detail.value!}})} required></IonInput>
            </td>
        </tr>
        <tr>
          <td>
                <label  className='myLabel'>身份证号:</label>
          </td>
          <td>
                <IonInput className='normalInput' name="teacherName" value={teacherState.teacherIdentityNo} onIonChange={e => setTeacherEdit({...teacherState,...{teacherIdentityNo:e.detail.value!}})} required></IonInput>
          </td>
        </tr>
        <tr>
            <td>
                  <label className='myLabel'>专业领域：</label>
            </td>
            <td>
                <IonInput className='normalInput' name="teacherName" value={teacherState.teacherIntroduce} onIonChange={e => setTeacherEdit({...teacherState,...{teacherIntroduce:e.detail.value!}})} required></IonInput>
            </td>
        </tr>
        <tr>
        <td>
            <label  className='myLabel'>从业经历(年)：</label>              
            </td>
            <td>
                  <IonInput className='normalInput' name="teacherName" value={teacherState.teacherExperience} onIonChange={e => setTeacherEdit({...teacherState,...{teacherExperience:e.detail.value!}})} required></IonInput>
            </td>
        </tr>
        <tr>
            <td>
                  <label className='myLabel'>教师简介:</label>
            </td>
            <td>
              <IonInput className='normalInput' name="teacherName" value={teacherState.teacherIntroduce} onIonChange={e => setTeacherEdit({...teacherState,...{teacherExperience:e.detail.value!}})} required></IonInput>
            </td>
        </tr> 

        <tr>
            <td>
              <button className="submutButton" type='submit'>提交</button>
            </td>
            <td>
              <button className="cancelButton m-5 text-base " onClick={onBack()} >返回 </button>
            </td>
        </tr> 
          </tbody>
        </form>
      </IonCardContent>
      </IonCard>
      </IonPage>
      )
    };

    export default TeacherDetail