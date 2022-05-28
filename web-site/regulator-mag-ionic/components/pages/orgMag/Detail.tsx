//eduOrg管理的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard,IonRadioGroup,IonRadio, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
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
  
  return (
    
    <IonPage>
      <IonCard>
      <IonCardHeader>
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <form onSubmit={onModify}>
        <IonList>
              <IonItem>
                <IonLabel position="floating">教育机构名称</IonLabel>
                <IonInput name="eduName" value={eduOrgState.eduName} onIonChange={e => setEduOrgState({...eduOrgState, eduName: e.detail.value!})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构地址</IonLabel>
                <IonInput name="eduAddress" value={eduOrgState.eduAddress} onIonChange={e => setEduOrgState({...eduOrgState, eduAddress: e.detail.value!})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构法人</IonLabel>
                <IonInput name="eduLegalPerson" value={eduOrgState.eduLegalPerson} onIonChange={e => setEduOrgState({...eduOrgState, eduLegalPerson: e.detail.value!})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构法人联系方式</IonLabel>
                <IonInput name="eduLegalPhone" value={eduOrgState.eduLegalPhone} onIonChange={e => setEduOrgState({...eduOrgState, eduLegalPhone: e.detail.value!})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构联系人</IonLabel>
                <IonInput name="eduContact" value={eduOrgState.eduContact} onIonChange={e => setEduOrgState({...eduOrgState, eduContact: e.detail.value!})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构法人联系方式</IonLabel>
                <IonInput name="eduContactPhone" value={eduOrgState.eduContactPhone} onIonChange={e => setEduOrgState({...eduOrgState, eduContactPhone: e.detail.value!})}></IonInput>
              </IonItem>
              <IonItem>
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
                </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构</IonLabel>
                <IonInput name="eduLicense" value={eduOrgState.eduLicense} onIonChange={e => setEduOrgState({...eduOrgState, eduLicense: e.detail.value!})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating" >状态</IonLabel>
                <IonRadioGroup onIonChange={e => setEduOrgState({...eduOrgState, eduAnnualInspection: e.detail.value!})}>
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
                </IonItem>

                <IonItem>
                <IonLabel position="floating" >年检状态</IonLabel>
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
                </IonItem>
                <IonItem>
                <IonLabel position="floating">年检日期</IonLabel>
                <IonInput name="eduAnnualInspectionDate" value={eduOrgState.eduAnnualInspectionDate} onIonChange={e => setEduOrgState({...eduOrgState, eduAnnualInspectionDate: e.detail.value!})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">年检时间</IonLabel>
                <IonInput name="eduAnnualInspectionTime" value={eduOrgState.eduAnnualInspectionTime} onIonChange={e => setEduOrgState({...eduOrgState, eduAnnualInspectionTime: e.detail.value!})}></IonInput>
              </IonItem>  
              <IonItem>
                <IonLabel position="floating">监管账户</IonLabel>
                <IonInput name="eduSupervisedAccount" value={eduOrgState.eduSupervisedAccount} onIonChange={e => setEduOrgState({...eduOrgState, eduSupervisedAccount: e.detail.value!})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">普通账户</IonLabel>
                <IonInput name="eduSupervisedAccount" value={eduOrgState.eduSupervisedAccount} onIonChange={e => setEduOrgState({...eduOrgState, eduSupervisedAccount: e.detail.value!})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">普通账户</IonLabel>
                <IonInput name="eduSupervisedAccount" value={eduOrgState.eduSupervisedAccount} onIonChange={e => setEduOrgState({...eduOrgState, eduSupervisedAccount: e.detail.value!})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">支付商户号</IonLabel>
                <IonInput name="eduSupervisedMerNo" value={eduOrgState.eduSupervisedMerNo} onIonChange={e => setEduOrgState({...eduOrgState, eduSupervisedMerNo: e.detail.value!})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">登录名称</IonLabel>
                <IonInput name="eduLoginName" value={eduOrgState.eduLoginName} onIonChange={e => setEduOrgState({...eduOrgState, eduLoginName: e.detail.value!})}></IonInput>
              </IonItem>
              <IonItem>
              <IonLabel position="stacked" color="primary">教育机构创建日期</IonLabel>
              <IonInput name="eduId" type="text" value={eduOrgState.eduCreateDate} spellCheck={false} autocapitalize="off" readonly required>
            </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="primary">教育机构创建时间</IonLabel>
              <IonInput name="eduId" type="text" value={eduOrgState.eduCreateTime} spellCheck={false} autocapitalize="off" readonly required>
            </IonInput>
            <IonLabel position="stacked" color="primary">教育机构修改日期</IonLabel>
              <IonInput name="eduId" type="text" value={eduOrgState.eduUpdateDate} spellCheck={false} autocapitalize="off" readonly required>
            </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="primary">教育机构修改时间</IonLabel>
              <IonInput name="eduId" type="text" value={eduOrgState.eduUpdateTime} spellCheck={false} autocapitalize="off" readonly required>
            </IonInput>
            </IonItem>
              </IonList>

            
          <IonItem className="">
            <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
          </IonItem>
        </form>
      </IonCardContent>
      </IonCard>
      </IonPage>
      )
    };

    export default EduOrgDetail