
import React, { useState } from 'react';
import { useEffect,useCallback,useContext
 } from 'react'
import { IonPage, IonRow,IonCol,IonCard,IonRadioGroup,IonRadio, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import {AppContext,setContractList,setContractDetail} from '../../../appState';
import {Contract} from '../../../types/types'
import { PickerColumn } from "@ionic/core";

const queryURL = 'http://localhost:3003/contract/query'

const demoContractList:Contract[] = [
  {
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
    
  },
  {
    contractId:'2',
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
},
]

const ContractQuery:React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({eduName:'',lessonName:'',consumerName:''})
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
    eduName:queryInfo.eduName,
    consumerName:queryInfo.consumerName,
    lessonName:queryInfo.lessonName
 },queryURL)
 const refreshList = useCallback((eduOrgs:Contract[]) => {
  dispatch(setContractList(eduOrgs));
},[dispatch]);
const onDetail = (item:Contract)=>() => {
  doSetDetail(item)
}
const onQuery = ()=>{
  fetch(paramStr, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
  }).then(res => res.json())
  .then((json) => {
  const {ContractList} = json 
  
  refreshList(demoContractList.filter((contract:Contract)=>contract.eduName.indexOf(queryInfo.eduName)>-1).filter((contract:Contract)=>contract.consumerName.indexOf(queryInfo.consumerName)>-1).filter((contract:Contract)=>contract.lessonName.indexOf(queryInfo.lessonName)>-1))
  })
}



const doSetDetail = useCallback(contract => {
  dispatch({...setContractDetail(contract),...{backPage:'/tabs/contract/query'}});
},[dispatch]);
useEffect(() => { 
  // fetch(paramStr, {
  //   method: 'GET',
  //   headers: {
  //     'Content-type': 'application/json;charset=UTF-8',
  //   },
  // }).then(res => res.json())
  // .then((json) => {
  // const {ContractList} = json 
  
  // refreshList(demoContractList.filter((contract:Contract)=>contract.eduName.indexOf(queryInfo.eduName)>-1))
  // return 
  // })
  refreshList(demoContractList)
},[]);
const ListEntry = ({ contract,key, ...props } : {contract:Contract,key:any}) => (
  <IonItem key={key} >
    <IonLabel>
      <p  className='text-center'>{contract.eduId}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{contract.lessonName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{contract.consumerName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{contract.lessonTotalPrice}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{contract.orderNo}</p>
    </IonLabel>
    <IonLabel>
       <div className='flex gap-2'>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(contract)}>详情</button>
       </div>
    </IonLabel>
  </IonItem>
  );

  if(state.contract.contractDetail){
    return <Redirect to="/tabs/contract/detail" />
  }
  if(state.contract.contractDetail==null||state.contract.contractDetail==undefined){
    return   <IonPage >
                <div className='relative'>
                <div className='flex'>
                <IonRow className='flex justify-between '>
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>教育机构名称：</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{eduName:e.target.value}})} />
                      </IonCol>   
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>课程名称：</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{lessonName:e.target.value}})} />
                      </IonCol>   
                </IonRow>
                <IonRow className='flex justify-between '>
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>客户姓名</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{consumerName:e.target.value}})} />
                      </IonCol>   
                      <IonCol className='flex ml-8'> 
                        <button onClick={()=>onQuery()} >查询</button>
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
                      <div className='font-black text-center'>总价格</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>交易系统单号</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>操作</div>
                    </IonLabel>
                </IonItem>
                    <div className=''>
                    {state.contract.contractList.map((list:Contract, i: any) => (
                    <ListEntry contract={list} key={i} />
                  ))}
                    </div>
                </IonList>
            </div> 
            </div>            
      </IonPage>
   }
   else{
     return <Redirect to="/tabs/contractList/detail" />
   }  
}
export default ContractQuery;

