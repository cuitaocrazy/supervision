
//BaseInfo的详细页面
import React, { useState } from 'react';
import { IonPage,IonModal,IonCard,IonRadioGroup,IonRadio, IonCardHeader, IonInput,IonCardSubtitle, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
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
        <tbody >
        <tr >
          <td>
          <label  className='myLabel'>教育机构名称:</label></td><td>
          <IonInput className="normalInput" id="eduName" name="eduName" value={baseInfoState.eduName} onIonChange={(e) =>{console.log(e.detail.value); setBaseInfoState({...baseInfoState, eduName: e.detail.value})}}></IonInput>
                {/* <input  className="readOnlyInput" name="eduName" value={baseInfoState.eduName} onIonChange={e => setBaseInfoState({...baseInfoState, eduName: e})}></IonInput> */}
          </td>
          <td >
          <label  className='myLabel'>教育机构地址:</label></td><td>
                {/* <input  name="eduName" value={baseInfoState.eduAddress} onIonChange={e => setBaseInfoState({...baseInfoState, eduAddress: e.detail.value})} ></IonInput> */}
                <IonInput className="normalInput" name="eduName" value={baseInfoState.eduAddress} onIonChange={e => setBaseInfoState({...baseInfoState, eduAddress: e.detail.value})} ></IonInput>
          </td>
        </tr>


         <tr>
          <td>
                <label className='myLabel'  >法人：</label></td><td>
                <IonInput className="normalInput" name="eduLegalPerson" value={baseInfoState.eduLegalPerson} onIonChange={e => setBaseInfoState({...baseInfoState, eduLegalPerson: e.detail.value})} ></IonInput>
         
          </td>
          <td>
           <label className='myLabel'  >法人联系方式：</label></td><td>
                <IonInput className="normalInput" name="eduLegalPhone" value={baseInfoState.eduLegalPhone}  onIonChange={e => setBaseInfoState({...baseInfoState, eduLegalPhone: e.detail.value})} ></IonInput>
                {/* <IonInput className="normalInput" name="eduLegalPhone" value={baseInfoState.eduLegalPhone}  onIonChange={e => setBaseInfoState({...baseInfoState, eduLegalPhone: e.detail.value})} ></IonInput> */}
        </td>
        </tr>

        <tr>
          <td>
                <label className='myLabel'  >联系人:</label></td><td>
                <IonInput name="eduContact"  className="normalInput" value={baseInfoState.eduContact} onIonChange={e => setBaseInfoState({...baseInfoState, eduContact: e.detail.value})} ></IonInput>
          </td>
          <td>
          <label className='myLabel'  >联系人电话:</label></td><td>
                <IonInput name="eduContactPhone"  className="normalInput" value={baseInfoState.eduContactPhone}  onIonChange={e => setBaseInfoState({...baseInfoState, eduContactPhone: e.detail.value})} ></IonInput>
        </td>
        </tr>

        <tr>
          
          <td>
          <label className='myLabel'   >是否公立:</label></td><td>
          <input type="radio" name='eduStatus' onSelect={()=>{setBaseInfoState({...baseInfoState,eduIsPublic:true})}}></input>
          <label className='radioLabel'  >公立</label>
          <input type="radio" name='eduStatus' onSelect={()=>{setBaseInfoState({...baseInfoState,eduIsPublic:false})}} ></input>
          <label className='radioLabel'  >非公立</label>
                {/* <IonRadioGroup onIonChange={e => setBaseInfoState({...baseInfoState, eduIsPublic: e.detail.value})}>
                    <IonItem>
                      <label >公立</label>
                      <IonRadio value={true} />
                    </IonItem>
                    <IonItem>
                      <label >非公立</label>
                      <IonRadio value={false} />
                    </IonItem>
                  </IonRadioGroup>   */}
          </td>
          <td>
          <label className='myLabel'  >许可证状态:</label></td><td>
          <input type="radio" name='eduStatus' onSelect={()=>{setBaseInfoState({...baseInfoState,eduStatus:'valid'})}}></input>
          <label className='radioLabel'  >有效</label>
          <input type="radio" name='eduStatus' onSelect={()=>{setBaseInfoState({...baseInfoState,eduStatus:'invalid'})}} ></input>
          <label className='radioLabel'  >不合格</label>
          <input type="radio" name='eduStatus' onSelect={()=>{setBaseInfoState({...baseInfoState,eduStatus:'pending'})}} ></input>
          <label className='radioLabel'  >待审核</label>
          <input type="radio" name='eduStatus' onSelect={()=>{setBaseInfoState({...baseInfoState,eduStatus:'reject'})}} ></input>
          <label className='radioLabel'  >拒绝</label>

                {/* <IonRadioGroup onIonChange={e => setBaseInfoState({...baseInfoState, eduStatus: e.detail.value})}>
                      <IonItem>
                      <label >有效</label>
                      <IonRadio value={"valid"} />
                    </IonItem>
                    <IonItem>
                      <label >无效</label>
                      <IonRadio value={"invalid"} />
                    </IonItem>
                    <IonItem>
                      <label >待审核</label>
                      <IonRadio value={"pending"} />
                    </IonItem>
                    <IonItem>
                      <label >拒绝</label>
                      <IonRadio value={"reject"} />
                    </IonItem>
                  </IonRadioGroup> */}
        </td>
        </tr>
        <tr>
          <td>
                <label className='myLabel'  >许可证文件:</label></td><td>
                <input name="Public" type='file' ></input>   
          </td>
          <td>
          <label className='myLabel'  >年检状态:</label></td><td>
          <input type="radio" name='eduAnnualInspection' onSelect={()=>{setBaseInfoState({...baseInfoState,eduAnnualInspection:'qualified'})}}></input>
          <label className='radioLabel'  >合格</label>
          <input type="radio" name='eduAnnualInspection' onSelect={()=>{setBaseInfoState({...baseInfoState,eduAnnualInspection:'unqualified'})}} ></input>
          <label className='radioLabel'  >不合格</label>
          <input type="radio" name='eduAnnualInspection' onSelect={()=>{setBaseInfoState({...baseInfoState,eduAnnualInspection:'pending'})}} ></input>
          <label className='radioLabel'  >待审核</label>
          <input type="radio" name='eduAnnualInspection' onSelect={()=>{setBaseInfoState({...baseInfoState,eduAnnualInspection:'reject'})}} ></input>
          <label className='radioLabel'  >拒绝</label>
          {/* <IonRadioGroup onIonChange={e => setBaseInfoState({...baseInfoState, eduAnnualInspection: e.detail.value})}>
                      <IonItem>
                      <label hidden={true}>合格</label>
                      <IonRadio value={"qualified"} />
                    </IonItem>
                    <IonItem>
                      <label hidden={true}>不合格</label>
                      <IonRadio value={"unqualified"} />
                    </IonItem>
                    <IonItem>
                      <label hidden={true}>待审核</label>
                      <IonRadio value={"pending"} />
                    </IonItem>
                    <IonItem>
                      <label hidden={true}>拒绝</label>
                      <IonRadio value={"reject"} />
                    </IonItem>
                  </IonRadioGroup> */}
        </td>
        </tr>
        <tr>
          <td>
                <label className='myLabel'  >年检日期:</label></td><td>
                <input  className="readonlyInput" name="eduAnnualInspectionDate" value={baseInfoState.eduAnnualInspectionDate} readOnly></input>
         </td>
          <td>
          <label className='myLabel' >年检时间:</label></td><td>
          <input  className="readonlyInput" name="eduAnnualInspectionTime" value={baseInfoState.eduAnnualInspectionTime} readOnly></input>
        </td>
        </tr>
        <tr>
          <td>
                <label className='myLabel'  >监管账户:</label></td><td>
                <IonInput  className="normalInput" name="eduSupervisedAccount" value={baseInfoState.eduSupervisedAccount} onIonChange={e => setBaseInfoState({...baseInfoState, eduSupervisedAccount: e.detail.value})}></IonInput>
          </td>
          <td>
          <label className='myLabel'  >普通账户:</label></td><td>
          <IonInput  className="normalInput" name="normalAccount" value={baseInfoState.normalAccount} onIonChange={e => setBaseInfoState({...baseInfoState, normalAccount: e.detail.value})}></IonInput>
        </td>
        </tr>
        <tr>
          <td>
                <label className='myLabel'  >监管商户号:</label></td><td>
                <IonInput  className="normalInput " name="Public" value={baseInfoState.eduSupervisedMerNo} onIonChange={e => setBaseInfoState({...baseInfoState, eduSupervisedMerNo: e.detail.value})}                    ></IonInput>   
          </td>
          <td>
                <label className='myLabel'  >监管机构名:</label></td><td>
                <input className="readonlyInput" name="Public" value={baseInfoState.supervisorOrgId} readOnly ></input>   
          </td>
        </tr>
        <tr>

          <td>
          <label className='myLabel'  >创建日期:</label></td><td>
                <input  className="readonlyInput" name="eduAnnualInspectionTime" value={baseInfoState.eduCreateDate} readOnly ></input>
          </td>
          <td>
          <label className='myLabel'  >创建时间:</label></td><td>
                <input  className="readonlyInput" name="eduAnnualInspectionTime" value={baseInfoState.eduCreateTime} readOnly ></input>
          </td>
        </tr>  
        <tr>

          <td>
          <label className='myLabel'  >修改日期:</label></td><td>
                <input  className="readonlyInput" name="eduAnnualInspectionTime" value={baseInfoState.eduUpdateDate} readOnly ></input>
          </td>
          <td>
          <label className='myLabel'  >修改时间:</label></td><td>
                <input  className="readonlyInput" name="eduAnnualInspectionTime" value={baseInfoState.eduUpdateTime} readOnly ></input>
          </td>
        </tr>  
        <tr>          
          <td>
          <label className='myLabel'  >登录名:</label></td><td>
                <input  className="readonlyInput" name="eduAnnualInspectionTime" value={baseInfoState.eduLoginName} readOnly ></input>
          </td>
        </tr>
            </tbody>
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
