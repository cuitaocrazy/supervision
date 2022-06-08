//eduOrg管理的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard,IonRadioGroup,IonRadio,IonRow,IonCol, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setEduOrgDetail} from '../../../appState';
import {EduOrg} from '../../../types/types'
import { PickerColumn } from "@ionic/core";

export const EduOrgDetail: React.FC = () => {
  const modifyURL = 'http://localhost:3003/eduOrg/modifyURL'
  const { state, dispatch } = useContext(AppContext);

  const [eduOrgState, setEduOrgState] = useState(state.eduOrg.eduOrgDetail);
  const [isPickOpen, setPickOpen] = useState(false);
  const setBack = useCallback(() => {
    dispatch(setEduOrgDetail(undefined));
  },[]);`                                                       `
  const onBack = ()=>() => {
    setBack()
  }
  if(state.eduOrg.eduOrgDetail===undefined){
    return <Redirect to={state.backPage} />
  }

  const onModify = async (e: React.FormEvent)=>() => {
    e.preventDefault();
    fetch(modifyURL, {
      method: 'PUT',
      body: JSON.stringify(eduOrgState),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      alert(json.result)
    })
  }
  // const eduOrgTypePickerColumn = {
  //   name: "eduOrgTypePickerColumn",
  //   options: [{'text':'','value':'0'},{'text':'数学','value':'1'}],
  // } as PickerColumn;
             /**todo 教育机构所在城市*/
  return (
    
    <IonPage>
      <IonCard>
      <IonCardHeader>
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonRow>
          <IonCol>
          <IonLabel position="floating">教育机构ID</IonLabel>
                <IonInput name="eduName" value={eduOrgState.eduId} readonly></IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">教育机构名称</IonLabel>
                <IonInput name="eduName" value={eduOrgState.eduName} readonly></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>

          <IonLabel position="floating">教育机构城市</IonLabel>
                <IonInput name="eduName" value={eduOrgState.eduAddress} readonly></IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">教育机构地址</IonLabel>
                <IonInput name="eduName" value={eduOrgState.eduAddress} readonly></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">教育机构法人</IonLabel>
                <IonInput name="eduLegalPerson" value={eduOrgState.eduLegalPerson} readonly ></IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">教育机构法人联系方式</IonLabel>
                <IonInput name="eduLegalPhone" value={eduOrgState.eduLegalPhone} readonly > </IonInput>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">是否公立</IonLabel>
                <IonInput name="Public" value={eduOrgState.eduIsPublic} ></IonInput>   
          </IonCol>
          <IonCol>
          <IonLabel position="floating">许可证状态</IonLabel>
                <IonInput name="eduAnnualInspection" value={eduOrgState.eduStatus} readonly > </IonInput>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">许可证文件</IonLabel>
                <IonInput name="Public" readonly ></IonInput>   
          </IonCol>
          <IonCol>
          <IonLabel position="floating">年检状态</IonLabel>
                <IonInput name="eduAnnualInspection" value={eduOrgState.eduAnnualInspection} readonly > </IonInput>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">年检日期</IonLabel>
                <IonInput name="Public" value={eduOrgState.eduAnnualInspectionDate} readonly ></IonInput>   
          </IonCol>
          <IonCol>
          <IonLabel position="floating">年检时间</IonLabel>
                <IonInput name="eduAnnualInspectionTime" value={eduOrgState.eduAnnualInspectionTime} readonly > </IonInput>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">监管账户</IonLabel>
                <IonInput name="eduSupervisedAccount" value={eduOrgState.eduSupervisedAccount} readonly ></IonInput>   
          </IonCol>
          <IonCol>
          <IonLabel position="floating">普通账户</IonLabel>
                <IonInput name="normalAccount" value={eduOrgState.normalAccount} readonly > </IonInput>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">监管商户号</IonLabel>
                <IonInput name="eduSupervisedMerNo" value={eduOrgState.eduSupervisedMerNo} readonly ></IonInput>   
          </IonCol>
          <IonCol>
          <IonLabel position="floating">登录名</IonLabel>
                <IonInput name="eduAnnualInspectionTime" value={eduOrgState.eduLoginName} readonly > </IonInput>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">监管机构名</IonLabel>
                <IonInput name="Public" value={eduOrgState.supervisorOrgId} readonly ></IonInput>   
          </IonCol>
          <IonCol>
          <IonLabel position="floating">是否为黑名单</IonLabel>
                <IonInput name="eduAnnualInspectionTime" value={'否'} readonly > </IonInput>
        </IonCol>
        </IonRow>    
          <IonItem className="">

            <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
          </IonItem>
      </IonCardContent>
      </IonCard>
      </IonPage>
      )
    };

    export default EduOrgDetail