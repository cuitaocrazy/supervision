//手工退课
import React, { useState } from 'react';
import { useEffect,useCallback,useContext
 } from 'react'
import { IonPage, IonRow,IonCol,IonCard,IonRadioGroup,IonRadio, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import {AppContext,setContractNegoList,setContractNegoDetail} from '../../../appState';
import {ContractNego} from '../../../types/types'
import { PickerColumn } from "@ionic/core";

const queryURL = 'http://localhost:3003/contractNego/query'

const democontractNegoList:ContractNego[] = [
  {
    negoId:'1',
    contractId:'1',
    negoCreateDate:'2020-01-01',
    negoCreateTime:'00:00:00',
    negoIntent:'1111',
    negoCreator:'1',
    negoStatus:'vaild',
    negoUpdateDate:'2020-01-01',
    negoUpdateTime:'00:00:00',
    negoRefundAmt:'111',
    negoCompensationAmt:'1',
    negoConsumerAgree:'222',
    negoConsumerAgreeDate:'2020-01-01',
    negoConsumerAgreeTime:'00:00:00',
    negoEduAgree:'111',
    negoEduAgreeDate:'2020-01-01',
    negoEduAgreeTime:'00:00:00',
    contract:{
      contractId:'1',
      contractDate:'2020-01-01',
      contractTime:'00:00:00',
      contractStatus:'vaild',
      contractUpdateDate:'2020-01-01',
      contractUpdateTime:'2020-01-01',
      contractUpdateReason:'',
      eduId:'1',
      eduName:'教育机构1',
      lessonId:'1',
      lessonName:'课程1',
      lessonType:'类型1',
      lessonIntroduce:'介绍1',
      lessonOutline:'大纲1',
      lessonStartDate:'2020-01-01',
      lessonEndDate:'2020-01-01',
      lessonStartTime:'00:00:00',
      lessonEndTime:'00:00:00',
      lessonAttendanceType:'类型1',
      lessonTotalQuantity:'11',
      lessonTotalPrice:'121',
      lessonPerPrice:'11',
      teacherId:'1',
      teacherName:'教师1',
      consumerId:'1',
      consumerName:'消费者1',
      consumerStuName:'学生1',
      orderNo:'123123123'
    }  
  },
  
]

const ContractNegoQuery:React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({contractId:'',orderId:''})
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
    contractId:queryInfo.contractId,
    orderId:queryInfo.orderId,
 },queryURL)
 const refreshList = useCallback((eduOrgs:ContractNego[]) => {
  dispatch(setContractNegoList(eduOrgs));
},[dispatch]);
const onDetail = (item:ContractNego)=>() => {
  doSetDetail(item)
}



const doSetDetail = useCallback(contractNego => {
  dispatch({...setContractNegoDetail(contractNego),...{backPage:'/tabs/contractNego/query'}});
},[dispatch]);
useEffect(() => { 
  fetch(paramStr, {
    method: 'GET',
  /* `teacher` is a property of `Lesson` */
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
  }).then(res => res.json())
  .then((json) => {
  const {contractNegoList} = json //todo
  
  refreshList(democontractNegoList.filter((contractNego:ContractNego)=>contractNego.contractId.indexOf(queryInfo.contractId)>-1))
  return 
  })
},[queryInfo.contractId,queryInfo.orderId, paramStr, refreshList]);
const ListEntry = ({ contractNego,key, ...props } : {contractNego:ContractNego,key:any}) => (
  <IonItem key={key} >
    <IonLabel>
      <p  className='text-center'>{contractNego.contract.eduName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{contractNego.contract.lessonName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{contractNego.contract.consumerName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{contractNego.negoRefundAmt}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{contractNego.contract.lessonTotalPrice}</p>
    </IonLabel>
    <IonLabel>
       <div className='flex gap-2'>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(contractNego)}>手工退课</button>
       </div>
    </IonLabel>
  </IonItem>
  );
  if(state.contractNego.contractNegoDetail==null||state.contractNego.contractNegoDetail==undefined){
    return   <IonPage >
                <div className='relative'>
                <div className='flex'>
                <IonRow className='flex justify-between '>
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>教育机构名称查询：</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{eduName:e.target.value}})} />
                      </IonCol>   
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>课程名称查询：</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{lessonName:e.target.value}})} />
                      </IonCol>   
                </IonRow>
                </div>
              <div className='absolute w-full mt-10'>
                <IonList>
                  <IonItem key='title'>
                    <IonLabel> 
                      <div className='font-black text-center'>教育机构名称</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>课程名称</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>客户姓名</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>退款金额</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>总价格</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>操作</div>
                    </IonLabel>
                </IonItem>
                    <div className=''>
                    {state.contractNego.contractNegoList.map((list:ContractNego, i: any) => (
                    <ListEntry contractNego={list} key={i} />
                  ))}
                    </div>
                </IonList>
            </div> 
            </div>            
      </IonPage>
   }
   else{
     return <Redirect to="/tabs/contractNegoList/detail" />
   }  
}
export default ContractNegoQuery;

