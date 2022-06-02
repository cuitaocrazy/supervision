//Contract的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setContractDetail} from '../../../appState';

import {Contract} from '../../../types/types'
import { Link } from 'react-router-dom';

export const ContractDetail: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const [contractState, setContractState] = useState(state.Contract.ContractDetail);
  const [isPickOpen, setPickOpen] = useState(false);
  
  const setBack = useCallback(() => {
    dispatch(setContractDetail(undefined));
  },[]);
  const onBack = ()=>() => {
    setBack()
  }
  if(state.Contract.ContractDetail===undefined){
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
      <IonInput name="contractId" type="text" value={contractState.contractId} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">合同日期</IonLabel>
      <IonInput name="contractDate" type="text" value={contractState.contractDate} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">合同时间</IonLabel>
      <IonInput name="contractTime" type="text" value={contractState.contractTime} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">更新原因</IonLabel>
      <IonInput name="contractUpdateReason" type="text" value={contractState.contractUpdateReason} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">教育机构ID</IonLabel>
      <IonInput name="eduId" type="text" value={contractState.eduId} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">教育机构名称</IonLabel>
      <IonInput name="eduName" type="text" value={contractState.eduName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">课程类型</IonLabel>
      <IonInput name="lessonType" type="text" value={contractState.lessonType} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">课程名称</IonLabel>
      <IonInput name="lessonName" type="text" value={contractState.lessonName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">课程介绍</IonLabel>
      <IonInput name="lessonIntroduce" type="text" value={contractState.lessonIntroduce} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">课程大纲</IonLabel>
      <Link  to={'/contract/outline'}></Link>
      <IonLabel position="stacked" color="primary">教师姓名</IonLabel>
      <IonInput name="teacherName" type="text" value={contractState.teacherName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">课程开始日期</IonLabel>
      <IonInput name="lessonStartDate" type="text" value={contractState.lessonStartDate} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">课程开始时间</IonLabel>
      <IonInput name="lessonStartTime" type="text" value={contractState.lessonStartTime} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">课程结束日期</IonLabel>
      <IonInput name="lessonEndDate" type="text" value={contractState.lessonEndDate} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">课程结束时间</IonLabel>
      <IonInput name="lessonEndTime" type="text" value={contractState.lessonEndTime} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">总价格</IonLabel>
      <IonInput name="lessonTotalPrice" type="text" value={contractState.lessonTotalPrice} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">总课时</IonLabel>
      <IonInput name="lessonTotalQuantity" type="text" value={contractState.lessonTotalQuantity} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">课时单价</IonLabel>
      <IonInput name="lessonPerPrice" type="text" value={contractState.lessonPerPrice} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">客户姓名</IonLabel>
      <IonInput name="consumerName" type="text" value={contractState.consumerName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
      <IonLabel position="stacked" color="primary">交易系统订单号</IonLabel>
      <IonInput name="orderNo" type="text" value={contractState.orderNo} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
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
