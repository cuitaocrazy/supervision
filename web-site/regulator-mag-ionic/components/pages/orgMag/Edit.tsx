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
            <span className="pr-1 text-gray-600 ">教育机构管理</span>/
            <span className="pr-1 text-gray-600 ">教育机构管理</span>/
            <span className="pl-1 text-primary-500">机构编辑</span>
          </div>
        </div>
        <IonCardContent>
        <form onSubmit={onModify}>
            {/* 编辑内容 */}
            <div className="font-bold text-gray-800">机构编辑</div>
            <hr className="mt-2 mb-4" />
            <div className="grid grid-cols-2 justify-items-center ">
              <div className="flex items-center mb-4 leading-10 justify-items-center">
                <div className="flex justify-end w-32 mr-2">教育机构ID:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduId"
                  value={eduOrgState.eduId}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">教育机构名称:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduName"
                  value={eduOrgState.eduName} 
                  onChange={e => setEduOrgState({...eduOrgState, eduName: e.nativeEvent.target?.value})}
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">教育机构城市:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduAddress"
                  value={eduOrgState.eduAddress}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">
                  教育机构地址:
                </div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduAddress"
                  value={eduOrgState.eduAddress} 
                  onChange={e => setEduOrgState({...eduOrgState, eduAddress: e.nativeEvent.target?.value})}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">教育机构法人:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduLegalPerson"
                  value={eduOrgState.eduLegalPerson} 
                  onChange={e => setEduOrgState({...eduOrgState, eduLegalPerson: e.nativeEvent.target?.value})}
                  readOnly
                />
              </div>

              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">法人联系方式:</div>
                <input className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduLegalPhone"
                  value={eduOrgState.eduLegalPhone}  
                  onChange={e => setEduOrgState({...eduOrgState, eduLegalPhone: e.nativeEvent.target?.value})}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">是否公办:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="Public" 
                  onChange={e => setEduOrgState({...eduOrgState, eduIsPublic: e.nativeEvent.target?.value})}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">许可证文件:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="Public"
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">年检状态:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduAnnualInspection" 
                  value={eduOrgState.eduAnnualInspection}
                  onChange={e => setEduOrgState({...eduOrgState, eduAnnualInspection: e.nativeEvent.target?.value})}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">年检日期:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="Public" 
                  value={eduOrgState.eduAnnualInspectionDate} 
                  onChange={e => setEduOrgState({...eduOrgState, eduAnnualInspectionDate: e.nativeEvent.target?.value})}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">年检时间:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduAnnualInspectionTime" 
                  value={eduOrgState.eduAnnualInspectionTime}
                  onChange={e => setEduOrgState({...eduOrgState, eduAnnualInspectionTime: e.nativeEvent.target?.value})}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2"> 监管账户:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduSupervisedAccount" 
                  value={eduOrgState.eduSupervisedAccount}
                  onChange={e => setEduOrgState({...eduOrgState, eduSupervisedAccount: e.nativeEvent.target?.value})}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">普通账户:</div>
                <input
                  className="w-64 h-10 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="normalAccount" 
                  value={eduOrgState.normalAccount}
                  onChange={e => setEduOrgState({...eduOrgState, normalAccount: e.nativeEvent.target?.value})}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">登录名:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduAnnualInspectionTime" 
                  value={eduOrgState.eduLoginName}
                  onChange={e => setEduOrgState({...eduOrgState, eduLoginName: e.nativeEvent.target?.value})}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">监管商户号:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduSupervisedMerNo" 
                  value={eduOrgState.eduSupervisedMerNo}
                  onChange={e => setEduOrgState({...eduOrgState, eduSupervisedMerNo: e.nativeEvent.target?.value})}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">监管机构名:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="Public" 
                  value={eduOrgState.supervisorOrgId}
                  onChange={e => setEduOrgState({...eduOrgState, supervisorOrgId: e.nativeEvent.target?.value})}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">是否为黑名单:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduAnnualInspectionTime" 
                  value={'否'} 
                  readOnly
                />
              </div>
            </div>
          </form>
          <div className="flex justify-center">
            <input
              value="返回"
              type="button"
              onClick={onBack()}
              className="flex w-20 px-6 py-2 font-bold text-white rounded-md bg-primary-600 focus:bg-primary-700"
            />
          </div>
        </IonCardContent>
      {/* <IonCardHeader>
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
      </IonCardContent> */}
      </IonCard>
      </IonPage>
      )
    };

    export default EduOrgEdit