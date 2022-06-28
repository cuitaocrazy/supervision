//Lesson的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setLessonDetail} from '../../../appState';
import {Lesson} from '../../../types/types'
import { PickerColumn } from "@ionic/core";


export const LessonDetail: React.FC = () => {
  console.log('LessonDetail')
  const modifyURL = 'http://localhost:3003/lesson/modifyURL'
  const { state, dispatch } = useContext(AppContext);
  // const {SubscribeDurationDays,TranAmt,USVOrgID,USVItemName,USVItemID,USVItemDesc,SubscribeStartDate,LessonType} = state.lessonDetail

  const [lessonState, setLessonState] = useState(state.lesson.lessonDetail);
  const [isPickOpen, setPickOpen] = useState(false);
  const setBack = useCallback(() => {
    dispatch(setLessonDetail(undefined));
  },[]);`                                                       `
  const onBack = ()=>() => {
    setBack()
  }
  if(state.lesson.lessonDetail===undefined){
    return <Redirect to={state.backPage} />
  }

  const onModify = async (e: React.FormEvent)=>() => {
    e.preventDefault();
    fetch(modifyURL, {
      method: 'PUT',
      body: JSON.stringify({
        "USVItemID":lessonState.USVItemID,
        "USVItemName":lessonState.USVItemName, 
        "USVOrgID":lessonState.USVOrgID,
        "USVItemDesc": lessonState.USVItemDesc,
        "TranAmt": lessonState.TranAmt,
        "SubscribeDurationDays":lessonState.SubscribeDurationDays,
        "SubscribeStartDate":lessonState.SubscribeStartDate,
        "LessonType":lessonState.LessonType
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      alert(json.result)
    })
  }
  const lessonTypePickerColumn = {
    name: "lessonTypePickerColumn",
    options: [{'text':'语文','value':'0'},{'text':'数学','value':'1'}],
  } as PickerColumn;
  
  return (
    <IonPage>
      <IonCard>
      <IonCardHeader>
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <form onSubmit={onModify}>
        <IonList>
        <IonLabel position="stacked" color="primary">机构ID</IonLabel>
                <IonInput name="eduId" type="text" value={lessonState.eduId} spellCheck={false} autocapitalize="off" readonly required>
        </IonInput>
        <IonLabel position="stacked" color="primary">课程ID</IonLabel>
                <IonInput name="lessonId" type="text" value={lessonState.lessonId} spellCheck={false} autocapitalize="off" readonly required>
        </IonInput>
        <IonLabel position="stacked" color="primary">课程名称</IonLabel>
                <IonInput name="lessonName" type="text" value={lessonState.lessonName} spellCheck={false} autocapitalize="off" readonly required>
        </IonInput>
        <IonLabel position="stacked" color="primary">课程描述</IonLabel>
                <IonInput name="lessonIntroduce" type="text" value={lessonState.lessonIntroduce} spellCheck={false} autocapitalize="off" readonly required>
        </IonInput>
        <IonLabel position="stacked" color="primary">课程类型</IonLabel>
        <IonInput name="lessonIntroduce" type="text" value={lessonState.lessonType} spellCheck={false} autocapitalize="off" readonly required>
        </IonInput>
        <IonLabel position="stacked" color="primary">课程大纲</IonLabel>
                <IonInput name="lessonOutline" type="text" value={lessonState.lessonOutline} spellCheck={false} autocapitalize="off" readonly required>
        </IonInput>
        <IonLabel position="stacked" color="primary">课程开始日期</IonLabel>
            <IonDatetime className="flex w-56 h-6 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md" value={lessonState.lessonStartDate} name='lessonStartDate'  readonly></IonDatetime>
        <IonLabel position="stacked" color="primary">课程结束日期</IonLabel>
            <IonDatetime className="flex w-56 h-6 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md" value={lessonState.lessonEndDate} name='lessonStartDate'  readonly></IonDatetime>      
        <IonLabel position="stacked" color="primary">课程状态</IonLabel>
                <IonInput name="lessonStatus" type="text" value={lessonState.lessonStatus} spellCheck={false} autocapitalize="off" readonly required>
        </IonInput>
        <IonLabel position="stacked" color="primary">课程创建时间</IonLabel>
                <IonInput name="lessonCreateDate" type="text" value={lessonState.lessonCreateDate} spellCheck={false} autocapitalize="off" readonly required>
        </IonInput>
        <IonLabel position="stacked" color="primary">课程修改时间</IonLabel>
                <IonInput name="lessonCreateDate" type="text" value={lessonState.lessonUpdateDate} spellCheck={false} autocapitalize="off" readonly required>
        </IonInput>
        <IonLabel position="stacked" color="primary">修改原因</IonLabel>
                <IonInput name="lessonUpdateReason" type="text" value={lessonState.lessonUpdateReason} spellCheck={false} autocapitalize="off" readonly required>
        </IonInput>
        <IonLabel position="stacked" color="primary">教育机构ID</IonLabel>
                <IonInput name="eduId" type="text" value={lessonState.eduId} spellCheck={false} autocapitalize="off" readonly required>
        </IonInput>
        <IonLabel position="stacked" color="primary">教师ID</IonLabel>
                <IonInput name="teacherId" type="text" value={lessonState.teacherId} spellCheck={false} autocapitalize="off" readonly required>
        </IonInput>
        

        </IonList>

     </form>
        <IonItem className="">
          <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
        </IonItem>
        {/* <Link to="/tabs/query"> 返回 </Link> */}
      </IonCardContent>
    </IonCard>
    </IonPage>
  );
};

export default LessonDetail
