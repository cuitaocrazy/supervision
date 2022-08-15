
//BaseInfo的详细页面
import React, { useState } from 'react';
import { IonPage,IonModal,IonCard,IonRadioGroup,IonRadio, IonCardHeader, IonInput,IonCardSubtitle, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext,useEffect } from 'react'
import {AppContext,setEduOrgDetail} from '../../../appState';
import {EduOrg, Lesson} from '../../../types/types'
import { PickerColumn } from "@ionic/core";
import Quit from "components/components/Quit";

export const BaseInfoDetail: React.FC = () => {
  const modifyURL = 'http://localhost:3003/baseInfo/modify'
  const queryURL = 'http://localhost:3003/baseInfo/query'
  const { state, dispatch } = useContext(AppContext);
  const refreshbaseInfo = useCallback((eduOrg:EduOrg) => {
    dispatch(setEduOrgDetail(eduOrg));
  },[dispatch]);

  const onCreate =(item:any)=>{
    console.log(baseInfoState)
    console.log(baseInfoState)
  }

  //onIonChange={(e) =>{console.log(document.getElementById('eduName')?.getAttribute('value')); setBaseInfoState({...baseInfoState, eduName: e.detail.value})}}


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
  const onBack = () => {
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

  if(baseInfoState == null){
    return <></>
  }


  return (
    <IonPage className="bg-gray-100">
      <div className='h-screen overflow-auto'>
        <Quit />
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
            <span className="pr-1 text-gray-600 ">基础信息维护</span>/
            <span className="pl-1 text-primary-500">教育机构用户详情</span>
          </div>
        </div>
        <IonCardContent className="m-4 bg-white rounded-lg">
            {/* 详情 */}
            <div className="font-bold text-gray-800">教育机构用户详情</div>
            <hr className="mt-2 mb-4" />
            <div className="grid grid-cols-2 justify-items-center ">
              <div className="flex items-center mb-4 leading-10 justify-items-center">
                <div className="flex justify-end w-32 mr-2">教育机构名称:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduName}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">教育机构地址:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduAddress}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">法人:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduLegalPerson}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">
                  法人电话:
                </div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduLegalPhone}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">联系人:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduContact}
                  readOnly
                />
              </div>

              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">联系人电话:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduContactPhone}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">是否公办:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduIsPublic}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">许可证文件:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduLicense}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">年检状态:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduAnnualInspection}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">年检日期:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduAnnualInspectionDate}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">年检时间:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduAnnualInspectionTime}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">监管账户:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.supervisorAccount}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">普通账户:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduNormalAccount}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">监管商户号:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduSupervisedMerNo}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">监管机构名称:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.supervisorOrgId}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">创建日期:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduCreateDate}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">创建时间:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduCreateTime}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">更新日期:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduUpdateDate}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">更新时间:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduUpdateTime}
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">登录名称:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  value={baseInfoState.eduLoginName}
                  readOnly
                />
              </div>
            </div>
          {/* <div className="flex justify-center">
            <input
              value="返回"
              type="button"
              onClick={
                onBack
              }
              className="flex w-20 px-6 py-2 font-bold text-white rounded-md bg-primary-600 focus:bg-primary-700"
            />
          </div> */}
        </IonCardContent>
      </div>
    </IonPage>
  );
};

export default BaseInfoDetail
