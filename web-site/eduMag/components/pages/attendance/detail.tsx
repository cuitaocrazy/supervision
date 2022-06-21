//attendance的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardHeader,IonRow,IonCol, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
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
  const getChineseattendanceType = (attendanceType:string)=>{
    switch(attendanceType){
        case 'attendanceType':
        return '有效'
        default : return '11'
    }
  }
  return (
    <IonPage>
      <IonCard>
      <IonCardHeader>
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonRow>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">课程名称</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="lessonName" value={attendanceState.lessonName} readonly required></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">客户姓名</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="consumerName" value={attendanceState.consumerName} readonly required></IonInput>
              </IonItem>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">学生姓名：</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="consumerStuName" value={attendanceState.consumerStuName} readonly required></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">考勤类型：</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="attendanceType" value={getChineseattendanceType(attendanceState.attendanceType)} readonly required></IonInput>
              </IonItem>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">考勤课时：</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="consumerStuName" value={attendanceState.attendanceLessonTimes} readonly required></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">考勤日期</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="attendanceType" value={getChineseattendanceType(attendanceState.attendanceDate)} readonly required></IonInput>
              </IonItem>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">更新日期:</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="teacherName" value={attendanceState.updateDate} readonly required></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">考勤状态:</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="teacherName" value={attendanceState.attendanceStatus} readonly required></IonInput>
              </IonItem>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">更新日期:</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="teacherName" value={attendanceState.teacherUpdatedDate} readonly required></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonLabel position="floating">更新时间:</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                  <IonInput name="teacherName" value={attendanceState.teacherUpdateTime} readonly required></IonInput>
              </IonItem>
            </IonCol>
        </IonRow> 
          <IonItem className="">
            <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
          </IonItem>

        {/* <Link to="/tabs/query"> 返回 </Link> */}
      </IonCardContent>
    </IonCard>
    </IonPage>
  );

}
