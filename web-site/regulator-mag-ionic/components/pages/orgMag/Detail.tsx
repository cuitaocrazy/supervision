//eduOrg管理的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonRadioGroup, IonRadio, IonRow, IonCol, IonCardHeader, IonCardSubtitle, IonLabel, IonInput, IonCardContent, IonItem, IonButton, IonList, IonDatetime, IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback, useContext } from 'react'
import { AppContext, setEduOrgDetail } from '../../../appState';
import { EduOrg } from '../../../types/types'
import { PickerColumn } from "@ionic/core";

export const EduOrgDetail: React.FC = () => {
  const modifyURL = 'http://localhost:3003/eduOrg/modifyURL'
  const { state, dispatch } = useContext(AppContext);

  const [eduOrgState, setEduOrgState] = useState(state.eduOrg.eduOrgDetail);
  const [isPickOpen, setPickOpen] = useState(false);
  const setBack = useCallback(() => {
    dispatch(setEduOrgDetail(undefined));
  }, []); `                                                       `
  const onBack = () => () => {
    setBack()
  }
  if (state.eduOrg.eduOrgDetail === undefined) {
    return <Redirect to={state.backPage} />
  }

  const onModify = async (e: React.FormEvent) => () => {
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
      <IonCard className='h-screen mx-6 overflow-auto'>

        {/* <IonCardHeader>
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
      </IonCardContent> */}

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
            <span className="pl-1 text-primary-500">机构详情</span>
          </div>
        </div>
        <IonCardContent>
          <form onSubmit={onModify}>
            {/* 详情 */}
            <div className="font-bold text-gray-800">机构详情</div>
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
                  readOnly
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
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">教育机构法人:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduLegalPerson"
                  value={eduOrgState.eduLegalPerson}
                  readOnly
                />
              </div>

              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">法人联系方式:</div>
                <input className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduLegalPhone"
                  value={eduOrgState.eduLegalPhone}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">是否公办:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="Public" 
                  value={eduOrgState.eduIsPublic} 
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
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">年检日期:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="Public" 
                  value={eduOrgState.eduAnnualInspectionDate}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">年检时间:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduAnnualInspectionTime" 
                  value={eduOrgState.eduAnnualInspectionTime}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2"> 监管账户:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduSupervisedAccount" 
                  value={eduOrgState.eduSupervisedAccount}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">普通账户:</div>
                <input
                  className="w-64 h-10 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="normalAccount" 
                  value={eduOrgState.normalAccount}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">登录名:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduAnnualInspectionTime" 
                  value={eduOrgState.eduLoginName}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">监管商户号:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduSupervisedMerNo" 
                  value={eduOrgState.eduSupervisedMerNo}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">监管机构名:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="Public" 
                  value={eduOrgState.supervisorOrgId}
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
      </IonCard>
    </IonPage>
  )
};

export default EduOrgDetail