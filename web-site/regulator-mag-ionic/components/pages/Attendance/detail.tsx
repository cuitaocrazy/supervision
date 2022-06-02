//attendance的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setAttendanceDetail} from '../../../appState';

import {Attendance} from '../../../types/types'
import { Link } from 'react-router-dom';

export const AttendanceDetail: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const [attendanceState, setAttendanceState] = useState(state.attendance.attendanceDetail);
  const [isPickOpen, setPickOpen] = useState(false);
  
  const setBack = useCallback(() => {
    dispatch(setAttendanceDetail(undefined));
  },[]);
  const onBack = ()=>() => {
    setBack()
  }
  if(state.attendance.attendanceDetail===undefined){
    return <Redirect to={state.backPage} />
  }
  
  return (
    <IonPage>
      <IonCard>
      <IonCardHeader>
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
      <IonList>
      <IonLabel position="stacked" color="primary">合同ID</IonLabel>
      <IonInput name="attendanceId" type="text" value={attendanceState.attendanceId} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">教育机构名称</IonLabel>
      <IonInput name="attendanceDate" type="text" value={attendanceState.eduName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">课程名称</IonLabel>
      <IonInput name="attendanceTime" type="text" value={attendanceState.lessonName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">客户姓名</IonLabel>
      <IonInput name="attendanceUpdateReason" type="text" value={attendanceState.consumerName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">签到日期</IonLabel>
      <IonInput name="eduId" type="text" value={attendanceState.eduId} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">签到时间</IonLabel>
      <IonInput name="eduName" type="text" value={attendanceState.eduName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">签到类型</IonLabel>
      <IonInput name="lessonType" type="text" value={attendanceState.lessonType} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      </IonList>
      <IonItem className="">
          <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
        </IonItem>

        {/* <Link to="/tabs/query"> 返回 </Link> */}
      </IonCardContent>
    </IonCard>
    </IonPage>
  );

}
