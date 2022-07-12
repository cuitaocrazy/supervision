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
    <IonPage className="bg-gray-100">
      <IonCard>
        {/* 导航 */}
        <div className="flex px-2 pt-2 mx-2 my-2 text-gray-800">
          <div className="mr-2 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <span className="pr-1 text-gray-600 ">教师管理</span>/
            <span className="pl-1 text-primary-500">教师信息编辑</span>
          </div>
        </div>
        <IonCardContent>
          <form onSubmit={onModify}>
            {/* 编辑内容 */}
            <div className="font-bold text-gray-800">教师信息编辑</div>
            <hr className="mt-2 mb-4" />
            <div className="grid grid-cols-2 justify-items-center ">
              <div className="flex items-center mb-4 leading-10 justify-items-center">
                <div className="flex justify-end w-32 mr-2">教师姓名:</div>
                <input
                  className="w-64 px-2 border rounded-md focus:outline-none focus:glow-primary-600"
                  type="text"
                  name="teacherName" 
                  value={teacherState.teacherName} 
                  onChange={e => setTeacherEdit({...teacherState,...{teacherName:e.nativeEvent.target?.value}})} 
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">身份证号:</div>
                <input
                  className="w-64 px-2 border rounded-md focus:outline-none focus:glow-primary-600"
                  type="text"
                  name="teacherIdentityNo" 
                  value={teacherState.teacherIdentityNo} 
                  onChange={e => setTeacherEdit({...teacherState,...{teacherIdentityNo:e.nativeEvent.target?.value}})}
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">专业领域:</div>
                <input
                  className="w-64 px-2 border rounded-md"
                  type="text"
                  name="teacherField" 
                  value={teacherState.teacherField} 
                  onChange={e => setTeacherEdit({...teacherState,...{teacherField:e.nativeEvent.target?.value}})}
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">
                  从业经验:
                </div>
                <input
                  className="w-64 px-2 border rounded-md focus:outline-none focus:glow-primary-600"
                  type="text"
                  name="teacherExperience" 
                  value={teacherState.teacherExperience} 
                  onChange={e => setTeacherEdit({...teacherState,...{teacherExperience:e.nativeEvent.target?.value}})}
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">教师简介:</div>
                <textarea
                  className="w-64 px-2 border rounded-md focus:outline-none focus:glow-primary-600"
                  name="teacherIntroduce" 
                  value={teacherState.teacherIntroduce} 
                  onChange={e => setTeacherEdit({...teacherState,...{teacherIntroduce:e.nativeEvent.target?.value}})}
                  required
                />
              </div>
             
            </div>
          </form>
          <div className="flex justify-center">
            <input
              value="确定修改"
              type="button"
              onClick={() => {
                onBack();
              }}
              className="flex w-20 px-6 py-2 font-bold text-white rounded-md bg-primary-600 focus:bg-primary-700"
            />
          </div>
        </IonCardContent>
      </IonCard>
    </IonPage>
    
    // <IonPage>
    //   <IonCard>
    //   <IonCardHeader>
    //     <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
    //   </IonCardHeader>
    //     <IonCardContent>
    //     <form onSubmit={onModify}>
    //     <tbody>
    //     <tr>
    //         <td>
    //               <label  className='myLabel'>教师姓名:</label>
    //         </td>
    //         <td>        
    //               <IonInput className='normalInput' name="teacherName" value={teacherState.teacherName} onIonChange={e => setTeacherEdit({...teacherState,...{teacherName:e.detail.value!}})} required></IonInput>
    //         </td>
    //     </tr>
    //     <tr>
    //       <td>
    //             <label  className='myLabel'>身份证号:</label>
    //       </td>
    //       <td>
    //             <IonInput className='normalInput' name="teacherName" value={teacherState.teacherIdentityNo} onIonChange={e => setTeacherEdit({...teacherState,...{teacherIdentityNo:e.detail.value!}})} required></IonInput>
    //       </td>
    //     </tr>
    //     <tr>
    //         <td>
    //               <label className='myLabel'>专业领域：</label>
    //         </td>
    //         <td>
    //             <IonInput className='normalInput' name="teacherName" value={teacherState.teacherIntroduce} onIonChange={e => setTeacherEdit({...teacherState,...{teacherIntroduce:e.detail.value!}})} required></IonInput>
    //         </td>
    //     </tr>
    //     <tr>
    //     <td>
    //         <label  className='myLabel'>从业经历(年)：</label>              
    //         </td>
    //         <td>
    //               <IonInput className='normalInput' name="teacherName" value={teacherState.teacherExperience} onIonChange={e => setTeacherEdit({...teacherState,...{teacherExperience:e.detail.value!}})} required></IonInput>
    //         </td>
    //     </tr>
    //     <tr>
    //         <td>
    //               <label className='myLabel'>教师简介:</label>
    //         </td>
    //         <td>
    //           <IonInput className='normalInput' name="teacherName" value={teacherState.teacherIntroduce} onIonChange={e => setTeacherEdit({...teacherState,...{teacherExperience:e.detail.value!}})} required></IonInput>
    //         </td>
    //     </tr> 

    //     <tr>
    //         <td>
    //           <button className="submutButton" type='submit'>提交</button>
    //         </td>
    //         <td>
    //           <button className="m-5 text-base cancelButton " onClick={onBack()} >返回 </button>
    //         </td>
    //     </tr> 
    //       </tbody>
    //     </form>
    //   </IonCardContent>
    //   </IonCard>
    //   </IonPage>
      )
    };

    export default TeacherDetail