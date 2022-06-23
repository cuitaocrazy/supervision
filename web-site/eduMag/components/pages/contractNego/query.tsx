//手工退课
import React, { useState } from 'react';
import { useEffect,useCallback,useContext
 } from 'react'
import { IonPage, IonModal,IonRow,IonCol,IonCard,IonRadioGroup,IonRadio, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker } from '@ionic/react';
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
    negoFinishTimes:'10',
    contract:{
      contractId:'1',
      consumerPhone:'12345',
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
      orderNo:'123123123',
      lessonTotalTimes:'10',

    }  
  },
  
]

const ContractNegoQuery:React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({contractId:'',orderId:''})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail,setDetail]= useState({} as ContractNego);
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
  setDetail(item);
  setIsModalOpen(true);
  
  // doSetDetail(item)
}

const onManual =()=>{
  //todo fetch
  console.log('提交')
}



const doSetDetail = useCallback((contractNego: ContractNego) => {
  dispatch({...setContractNegoDetail(contractNego),...{backPage:'/tabs/contractNego/query'}});
},[dispatch]);
useEffect(() => { 
  // fetch(paramStr, {
  //   method: 'GET',
  //   headers: {
  //     'Content-type': 'application/json;charset=UTF-8',
  //   },
  // }).then(res => res.json())
  // .then((json) => {
  // const {contractNegoList} = json 
  
  // refreshList(democontractNegoList.filter((contractNego:ContractNego)=>contractNego.contractId.indexOf(queryInfo.contractId)>-1))
  // return 
  // })
  refreshList(democontractNegoList)
},[]);

const onQuery = () => {
    // fetch(paramStr, {
  //   method: 'GET',
  //   headers: {
  //     'Content-type': 'application/json;charset=UTF-8',
  //   },
  // }).then(res => res.json())
  // .then((json) => {
  // const {contractNegoList} = json 
  
  // refreshList(democontractNegoList.filter((contractNego:ContractNego)=>contractNego.contractId.indexOf(queryInfo.contractId)>-1))
  // return 
  // })
  refreshList(democontractNegoList.filter((contractNego:ContractNego)=>contractNego.contractId.indexOf(queryInfo.contractId)>-1))
}

const ListEntry = ({ contractNego,key, ...props } : {contractNego:ContractNego,key:any}) => (
  <IonItem key={key} >

    <IonLabel>
      <p  className='text-center'>{contractNego.contract.lessonName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{contractNego.contract.lessonTotalTimes}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{contractNego.contract.lessonTotalPrice}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{contractNego.contract.consumerName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{contractNego.contract.consumerPhone}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{contractNego.contract.consumerStuName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{Number(contractNego.negoRefundAmt)/100}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{Number(contractNego.negoCompensationAmt)/100}</p>
    </IonLabel>
    <IonLabel>
       <div className='flex gap-2'>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={()=>{setDetail(contractNego);setIsModalOpen(true)}}>去审批</button>
       </div>
    </IonLabel>
  </IonItem>
  );
  
    return   <IonPage >
                <div className='relative'>
                <div className='flex'>
                  <IonRow className='flex justify-between '>
                        <IonCol className='flex ml-8'>
                          <IonLabel className='flex h-12 p-2 font-bold text-center w-28'>合同ID:</IonLabel>
                          <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{contractId:e.target.value}})} />
                        </IonCol>     
                        <IonCol className='flex ml-8'>
                            <button onClick={()=>{onQuery()}}>查询</button>
                          </IonCol>  
                  </IonRow>
                </div>
                <IonModal isOpen={isModalOpen}>
                        < IonCardContent>
                          <form onSubmit={onManual}>
                          <IonItem>
                              <IonLabel >课程名称：{detail.contract?.lessonName}</IonLabel>
                          </IonItem>
                          <IonItem>
                              <IonLabel >总课时：{detail.contract?.lessonTotalTimes}</IonLabel>
                          </IonItem>
                          <IonItem>
                              <IonLabel >已签到课时:{detail.negoFinishTimes}</IonLabel>
                          </IonItem>
                          <IonItem>
                              <IonLabel >客户姓名:{detail.contract?.consumerName}</IonLabel>
                          </IonItem>
                          <IonItem>
                              <IonLabel >联系电话:{detail.contract?.consumerPhone}</IonLabel>
                          </IonItem>
                          <IonItem>
                              <IonLabel >学生姓名:{detail.contract?.consumerStuName}</IonLabel>
                          </IonItem>
                          <IonItem>
                              <IonLabel >退款金额：</IonLabel><IonInput name="lessonIntroduce" type="text" value={Number(detail.negoRefundAmt)/100} spellCheck={false} autocapitalize="off" onIonChange={e => setContractNegoDetail({...detail,...{negoRefundAmt:String(100*Number(e.detail.value!))}})} required></IonInput>
                          </IonItem>
                          <IonItem>
                              <IonLabel >退款金额：</IonLabel><IonInput name="lessonIntroduce" type="text" value={Number(detail.negoRefundAmt)/100} spellCheck={false} autocapitalize="off" onIonChange={e => setContractNegoDetail({...detail,...{negoRefundAmt:String(100*Number(e.detail.value!))}})} required></IonInput>
                          </IonItem>
                            <div className='mt-2 mb-2 flex space-x-2 '>
                            <span  className="flex-1 ">
                              <button className='submutButton flex items-center justify-center flex-none  focus:outline-none hover:bg-primary-700 ' type='submit' >确认</button>
                            </span >
                            <span className="flex-1 ">
                              <button  className='cancelButton' onClick={ ()=>setIsModalOpen(false)}>取消</button>
                            </span>
                            </div>
                          </form>    
                                  {/* <IonRow>
                                    <IonCol>
                                        <label>退款金额：</label>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput name="lessonIntroduce" type="text" value={Number(detail.negoRefundAmt)/100} spellCheck={false} autocapitalize="off" onIonChange={e => setContractNegoDetail({...detail,...{negoRefundAmt:String(100*Number(e.detail.value!))}})} required></IonInput>
                                    </IonCol>
                                  </IonRow>
                                  <IonRow>
                                    <IonCol>
                                      <label>补偿金额：</label>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput name="lessonIntroduce" type="text" value={Number(detail.negoRefundAmt)/100} spellCheck={false} autocapitalize="off" onIonChange={e => setContractNegoDetail({...detail,...{negoRefundAmt:String(100*Number(e.detail.value!))}})} required></IonInput>
                                    </IonCol>
                                  </IonRow> */}
                                  {/* <IonRow>
                                    <IonCol>
                                      <IonLabel>
                                        <button type='submit'>确认</button>
                                      </IonLabel> 
                                    </IonCol>
                                    <IonCol>
                                      <IonLabel>
                                        <button onClick={()=>{setIsModalOpen(false)}}>取消</button>
                                      </IonLabel> 
                                    </IonCol>
                                  </IonRow>
                          </form> */}
                        </IonCardContent>
                    </IonModal> 
              <div className='absolute w-full mt-10'>
                <IonList>
                  <IonItem key='title'>
                    <IonLabel>
                      <div className='font-black text-center'>课程名称</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>总课时</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>已签到课时</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>客户姓名</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>联系方式</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>学生姓名</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>退款金额</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>补偿金额</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>退订理由</div>
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
export default ContractNegoQuery;

