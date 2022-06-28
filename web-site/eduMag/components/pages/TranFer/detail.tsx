//transfer管理的详细页面
import React, { useState } from 'react';
import { IonPage,IonCard, IonCardHeader, IonCardSubtitle, IonCardContent,IonItem,IonButton,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setTransferDetail} from '../../../appState';


export const TransferDetail: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const setBack = useCallback(() => {
    dispatch(setTransferDetail(undefined));
  },[]);
  const onBack = ()=>() => {
    setBack()
  }
  if(state.transfer?.transferDetail===undefined){
    return <Redirect to={state.backPage} />
  }

  return (  
    <IonPage>
      <IonCard>
      <IonCardHeader>
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <tbody>
          <tr>
            <td>
             
                <label className='myLabel' >教育机构名称：</label>
                </td><td>
                <input className='readonlyInput' name="transferName" value={state.transfer.transferDetail.eduName} readOnly required></input>
              
            </td>
            <td>
                <label className='myLabel' >课程名称：</label>
                </td><td>
                <input className='readonlyInput'  name="transferIdentityNo" value={state.transfer.transferDetail.lessonName} readOnly required></input>
              </td>
          </tr>
          <tr>
          <td>
                <label className='myLabel' >客户姓名：</label>
                </td><td>
                <input className='readonlyInput'   name="transferExperience" value={state.transfer.transferDetail.consumerName} readOnly required></input>
              </td>
              <td>
                <label className='myLabel' >划拨原因</label>
                </td><td>
                <input className='readonlyInput'   name="transferExperience" value={state.transfer.transferDetail.reason} readOnly required></input>
              </td>
          </tr>
          <tr>
            <td>
              
                <label className='myLabel' >考勤日期：</label>
                </td><td>
                <input className='readonlyInput'   name="transferExperience" value={state.transfer.transferDetail.attendanceDate} readOnly required></input>
            </td>
            <td> 
              
                <label className='myLabel' >考勤时间:</label>
                </td><td>
                <input className='readonlyInput'   name="transferIntroduce" value={state.transfer.transferDetail.attendanceTime} readOnly required></input>
              
            </td>
          </tr>
          <tr>
            <td>
              
                <label className='myLabel' >划拨金额：</label>
                </td><td>
                <input className='readonlyInput'   name="transferRating" value={state.transfer.transferDetail.transferAmt} readOnly required ></input>
                </td>
            <td> 
                <label className='myLabel' >划拨结果：</label>
                </td><td>
                <input className='readonlyInput'   name="transferIntroduce" value={state.transfer.transferDetail.transferResult} readOnly required></input>
            </td>
          </tr>
          </tbody>
          <IonItem className="">
            <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
          </IonItem>
      </IonCardContent>
      </IonCard>
      </IonPage>
      )
    };

    export default TransferDetail