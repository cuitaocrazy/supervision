
//BaseInfo的详细页面
import React, { useState } from 'react';
import { IonPage,IonModal,IonCard,IonRadioGroup,IonRadio, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker,IonCol,IonRow } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext,useEffect } from 'react'
import {AppContext,setEduOrgDetail} from '../../../appState';

import {EduOrg, Lesson} from '../../../types/types'
import { PickerColumn } from "@ionic/core";



export const BaseInfoDetail: React.FC = () => {
  const modifyURL = 'http://localhost:3003/baseInfo/modify'
  const queryURL = 'http://localhost:3003/baseInfo/query'
  const { state, dispatch } = useContext(AppContext);
  const refreshbaseInfo = useCallback((eduOrg:EduOrg) => {
    dispatch(setEduOrgDetail(eduOrg));
  },[dispatch]);

  const onCreate =()=>{

  }


  const demoEduOrg=  {   
    eduId:'1',
    eduName:'第一学院',
    eduAddress:'第一学院地址',
    eduLegalPerson:'第一学院法人',
    eduLegalPhone:'第一学院法人电话',
    eduContact:'第一学院联系人',
    eduContactPhone:'第一学院联系人电话',
    eduIsPublic:true,
    eduLicense:'111',
    eduStatus:'正常',
    eduAnnualInspection:'年审文件',
    eduAnnualInspectionDate:'2020-01-01',
    eduAnnualInspectionTime:'00:00:00',
    eduSupervisedAccount:'监管账户',
    eduNormalAccount:'普通账户',
    eduSupervisedMerNo:'商户号',
    eduCreateDate:'2020-01-01',
    eduCreateTime:'00:00:00',
    eduUpdateDate:'2020-01-01',
    eduUpdateTime:'00:00:00',
    eduRating:5,
    eduLoginName:'edu1',
    supervisorOrgId:'1',  
  };
  useEffect(()=>{
    //todo fetch
    
    refreshbaseInfo(demoEduOrg)
    setBaseInfoState(demoEduOrg)
  },[])

  const [baseInfoState, setBaseInfoState] = useState(state.eduOrg.eduOrgDetail);
  const [isPickOpen, setPickOpen] = useState(false);
  const setBack = useCallback(() => {
    
    dispatch(setEduOrgDetail(undefined));
  },[]);
  const onBack = ()=>() => {
    setBack()
  }
  const onModify = async (e: React.FormEvent)=>() => {
    e.preventDefault();
    //todo fetch
    // fetch(modifyURL, {
    //   method: 'PUT',
    //   body: JSON.stringify(baseInfoState),
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8',
    //   },
    // }).then(res => res.json())
    // .then((json) => {
    //   alert(json.result)
    // })
  }
  console.log(baseInfoState)
  if(baseInfoState == null){
    return <></>
  }


  return (
    <IonPage>
            <IonCard>
      <IonCardHeader>
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
      <form onSubmit={onCreate}>
        <IonRow>
          <IonCol>
          <IonLabel position="floating">教育机构名称</IonLabel>
                <IonInput name="eduName" value={baseInfoState.eduName} onIonChange={e => setBaseInfoState({...baseInfoState, eduName: e.detail.value!})}></IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">教育机构地址</IonLabel>
                <IonInput name="eduName" value={baseInfoState.eduAddress} onIonChange={e => setBaseInfoState({...baseInfoState, eduAddress: e.detail.value!})} ></IonInput>
          </IonCol>
        </IonRow>


        <IonRow>
          <IonCol>
                <IonLabel position="floating">法人</IonLabel>
                <IonInput name="eduLegalPerson" value={baseInfoState.eduLegalPerson} onIonChange={e => setBaseInfoState({...baseInfoState, eduLegalPerson: e.detail.value!})} ></IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">法人联系方式</IonLabel>
                <IonInput name="eduLegalPhone" value={baseInfoState.eduLegalPhone}  onIonChange={e => setBaseInfoState({...baseInfoState, eduLegalPhone: e.detail.value!})} > </IonInput>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">联系人</IonLabel>
                <IonInput name="eduContact" value={baseInfoState.eduContact} onIonChange={e => setBaseInfoState({...baseInfoState, eduContact: e.detail.value!})} ></IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">联系人电话</IonLabel>
                <IonInput name="eduContactPhone" value={baseInfoState.eduContactPhone}  onIonChange={e => setBaseInfoState({...baseInfoState, eduContactPhone: e.detail.value!})} > </IonInput>
        </IonCol>
        </IonRow>

        <IonRow>
          
          <IonCol>
          <IonLabel position="floating" >是否公立</IonLabel>
                <IonRadioGroup onIonChange={e => setBaseInfoState({...baseInfoState, eduIsPublic: e.detail.value!})}>
                    <IonItem>
                      <IonLabel hidden={true}>公立</IonLabel>
                      <IonRadio value={true} />
                    </IonItem>
                    <IonItem>
                      <IonLabel hidden={true}>非公立</IonLabel>
                      <IonRadio value={false} />
                    </IonItem>
                  </IonRadioGroup>  
          </IonCol>
          <IonCol>
          <IonLabel position="floating">许可证状态</IonLabel>
                <IonRadioGroup onIonChange={e => setBaseInfoState({...baseInfoState, eduStatus: e.detail.value!})}>
                      <IonItem>
                      <IonLabel hidden={true}>有效</IonLabel>
                      <IonRadio value={"valid"} />
                    </IonItem>
                    <IonItem>
                      <IonLabel hidden={true}>无效</IonLabel>
                      <IonRadio value={"invalid"} />
                    </IonItem>
                    <IonItem>
                      <IonLabel hidden={true}>待审核</IonLabel>
                      <IonRadio value={"pending"} />
                    </IonItem>
                    <IonItem>
                      <IonLabel hidden={true}>拒绝</IonLabel>
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
          <IonRadioGroup onIonChange={e => setBaseInfoState({...baseInfoState, eduAnnualInspection: e.detail.value!})}>
                      <IonItem>
                      <IonLabel hidden={true}>合格</IonLabel>
                      <IonRadio value={"qualified"} />
                    </IonItem>
                    <IonItem>
                      <IonLabel hidden={true}>不合格</IonLabel>
                      <IonRadio value={"unqualified"} />
                    </IonItem>
                    <IonItem>
                      <IonLabel hidden={true}>待审核</IonLabel>
                      <IonRadio value={"pending"} />
                    </IonItem>
                    <IonItem>
                      <IonLabel hidden={true}>拒绝</IonLabel>
                      <IonRadio value={"reject"} />
                    </IonItem>
                  </IonRadioGroup>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">年检日期</IonLabel>
                <IonInput name="eduAnnualInspectionDate" value={baseInfoState.eduAnnualInspectionDate} readonly></IonInput>
         </IonCol>
          <IonCol>
          <IonLabel position="floating">年检时间</IonLabel>
          <IonInput name="eduAnnualInspectionTime" value={baseInfoState.eduAnnualInspectionTime} readonly></IonInput>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">监管账户</IonLabel>
                <IonInput name="eduSupervisedAccount" value={baseInfoState.eduSupervisedAccount} onIonChange={e => setBaseInfoState({...baseInfoState, eduSupervisedAccount: e.detail.value!})}></IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">普通账户</IonLabel>
          <IonInput name="normalAccount" value={baseInfoState.normalAccount} onIonChange={e => setBaseInfoState({...baseInfoState, normalAccount: e.detail.value!})}></IonInput>
        </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
                <IonLabel position="floating">监管商户号</IonLabel>
                <IonInput name="Public" value={baseInfoState.eduSupervisedMerNo} onIonChange={e => setBaseInfoState({...baseInfoState, eduSupervisedMerNo: e.detail.value!})}                    ></IonInput>   
          </IonCol>
          <IonCol>
                <IonLabel position="floating">监管机构名</IonLabel>
                <IonInput name="Public" value={baseInfoState.supervisorOrgId} readonly ></IonInput>   
          </IonCol>
          
          <IonCol>
          <IonLabel position="floating">登录名</IonLabel>
                <IonInput name="eduAnnualInspectionTime" value={baseInfoState.eduLoginName} readonly > </IonInput>
        </IonCol>
        </IonRow>
        <IonRow>

          <IonCol>
          <IonLabel position="floating">创建日期</IonLabel>
                <IonInput name="eduAnnualInspectionTime" value={baseInfoState.eduCreateDate} readonly > </IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">创建时间</IonLabel>
                <IonInput name="eduAnnualInspectionTime" value={baseInfoState.eduCreateTime} readonly > </IonInput>
          </IonCol>
        </IonRow>  
        <IonRow>

          <IonCol>
          <IonLabel position="floating">修改日期</IonLabel>
                <IonInput name="eduAnnualInspectionTime" value={baseInfoState.eduUpdateDate} readonly > </IonInput>
          </IonCol>
          <IonCol>
          <IonLabel position="floating">修改时间</IonLabel>
                <IonInput name="eduAnnualInspectionTime" value={baseInfoState.eduUpdateTime} readonly > </IonInput>
          </IonCol>
        </IonRow>  
        <IonRow>          
          <IonCol>
          <IonLabel position="floating">登录名</IonLabel>
                <IonInput name="eduAnnualInspectionTime" value={baseInfoState.eduLoginName} readonly > </IonInput>
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
  );
};

export default BaseInfoDetail
