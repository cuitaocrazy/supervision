//eduOrg管理的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard,IonRadioGroup,IonRadio, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker,IonCol,IonRow } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setEduOrgEdit} from '../../../appState';
import {EduOrg} from '../../../types/types'
import { PickerColumn } from "@ionic/core";

export const EduOrgEdit: React.FC = () => {
  const modifyURL = 'http://localhost:3003/eduOrg/modifyURL'
  const { state, dispatch } = useContext(AppContext);

  const [eduOrgState, setEduOrgState] = useState(state.eduOrg.eduOrgEdit);
  const [isPickOpen, setPickOpen] = useState(false);
  const setBack = useCallback(() => {
    dispatch(setEduOrgEdit(undefined));
  },[]);`                                                       `
  const onBack = ()=>() => {
    setBack()
  }
  console.log('state')
  console.log(state)
  if(state.eduOrg.eduOrgEdit===undefined){
    return <Redirect to={state.backPage} />
  }

  const onModify = async (e: React.FormEvent)=>() => {
    e.preventDefault();
    fetch(modifyURL, {
      method: 'POST',
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
  
  return (
    
    <IonPage>
      <IonCard>
      <IonCardHeader>
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <form onSubmit={onModify}>
        <IonRow>
          <IonCol>
          <IonLabel position="floating">教育机构ID</IonLabel>
                <IonInput name="eduId" value={eduOrgState.eduId} readonly></IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">教育机构名称</IonLabel>
                <IonInput name="eduName" value={eduOrgState.eduName} onIonChange={e => setEduOrgState({...eduOrgState, eduName: e.detail.value!})}></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>

          <IonLabel position="floating">教育机构城市</IonLabel>
                <IonInput name="eduName" value={eduOrgState.eduAddress} readonly></IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">教育机构地址</IonLabel>
                <IonInput name="eduName" value={eduOrgState.eduAddress} onIonChange={e => setEduOrgState({...eduOrgState, eduAddress: e.detail.value!})} ></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">教育机构法人</IonLabel>
                <IonInput name="eduLegalPerson" value={eduOrgState.eduLegalPerson} onIonChange={e => setEduOrgState({...eduOrgState, eduLegalPerson: e.detail.value!})} ></IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">教育机构法人联系方式</IonLabel>
                <IonInput name="eduLegalPhone" value={eduOrgState.eduLegalPhone}  onIonChange={e => setEduOrgState({...eduOrgState, eduLegalPhone: e.detail.value!})} > </IonInput>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
          <IonLabel position="floating" >是否公立</IonLabel>
                <IonRadioGroup onIonChange={e => setEduOrgState({...eduOrgState, eduIsPublic: e.detail.value!})}>
                      <IonItem>
                      <IonLabel>公立</IonLabel>
                      <IonRadio value={true} />
                    </IonItem>
                    <IonItem>
                      <IonLabel>非公立</IonLabel>
                      <IonRadio value={false} />
                    </IonItem>
                  </IonRadioGroup>  
          </IonCol>
          <IonCol>
          <IonLabel position="floating">许可证状态</IonLabel>
                <IonRadioGroup onIonChange={e => setEduOrgState({...eduOrgState, eduStatus: e.detail.value!})}>
                      <IonItem>
                      <IonLabel>有效</IonLabel>
                      <IonRadio value={"valid"} />
                    </IonItem>
                    <IonItem>
                      <IonLabel>无效</IonLabel>
                      <IonRadio value={"invalid"} />
                    </IonItem>
                    <IonItem>
                      <IonLabel>待审核</IonLabel>
                      <IonRadio value={"pending"} />
                    </IonItem>
                    <IonItem>
                      <IonLabel>拒绝</IonLabel>
                      <IonRadio value={"reject"} />
                    </IonItem>
                  </IonRadioGroup>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">许可证文件</IonLabel>
                <IonInput name="Public" readonly ></IonInput>   
          </IonCol>
          <IonCol>
          <IonLabel position="floating">年检状态</IonLabel>
          <IonRadioGroup onIonChange={e => setEduOrgState({...eduOrgState, eduAnnualInspection: e.detail.value!})}>
                      <IonItem>
                      <IonLabel>合格</IonLabel>
                      <IonRadio value={"qualified"} />
                    </IonItem>
                    <IonItem>
                      <IonLabel>不合格</IonLabel>
                      <IonRadio value={"unqualified"} />
                    </IonItem>
                    <IonItem>
                      <IonLabel>待审核</IonLabel>
                      <IonRadio value={"pending"} />
                    </IonItem>
                    <IonItem>
                      <IonLabel>拒绝</IonLabel>
                      <IonRadio value={"reject"} />
                    </IonItem>
                  </IonRadioGroup>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">年检日期</IonLabel>
                <IonInput name="eduAnnualInspectionDate" value={eduOrgState.eduAnnualInspectionDate} onIonChange={e => setEduOrgState({...eduOrgState, eduAnnualInspectionDate: e.detail.value!})}></IonInput>
         </IonCol>
          <IonCol>
          <IonLabel position="floating">年检时间</IonLabel>
          <IonInput name="eduAnnualInspectionTime" value={eduOrgState.eduAnnualInspectionTime} onIonChange={e => setEduOrgState({...eduOrgState, eduAnnualInspectionTime: e.detail.value!})}></IonInput>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">监管账户</IonLabel>
                <IonInput name="eduSupervisedAccount" value={eduOrgState.eduSupervisedAccount} onIonChange={e => setEduOrgState({...eduOrgState, eduSupervisedAccount: e.detail.value!})}></IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">普通账户</IonLabel>
          <IonInput name="normalAccount" value={eduOrgState.normalAccount} onIonChange={e => setEduOrgState({...eduOrgState, normalAccount: e.detail.value!})}></IonInput>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">监管商户号</IonLabel>
                <IonInput name="Public" value={eduOrgState.eduSupervisedMerNo} onIonChange={e => setEduOrgState({...eduOrgState, eduSupervisedMerNo: e.detail.value!})}                    ></IonInput>   
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
          <IonButton className="m-5 text-base " type='submit' fill="solid">提交</IonButton>
            <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
          </IonItem>
        </form>
      </IonCardContent>
      </IonCard>
      </IonPage>
      )
    };

    export default EduOrgEdit