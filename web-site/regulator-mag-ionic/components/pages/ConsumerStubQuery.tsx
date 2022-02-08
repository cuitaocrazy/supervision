
import { useEffect,useCallback,useContext,useState } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext,setOrder,setDetail,setUSV} from '../../appState';
import {Order} from '../../types/types'
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonDatetime,
  IonPicker,
  IonButton,
  IonPickerColumn,
  IonSelect,
  IonSelectOption
  // PickerController 
  
} from '@ionic/react';

import { PickerColumn } from "@ionic/core";


const cancelURL = 'http://localhost:3003/cancel'
const completeURL = 'http://localhost:3003/complete'
const queryURL = 'http://localhost:3003/query'
const demoOrderList:Order[] = [
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-123456","USVOrderNo":"123456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-223456","USVOrderNo":"223456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-323456","USVOrderNo":"323456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-423456","USVOrderNo":"423456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-523456","USVOrderNo":"523456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-523456","USVOrderNo":"523456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-523456","USVOrderNo":"523456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-523456","USVOrderNo":"523456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-523456","USVOrderNo":"523456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-523456","USVOrderNo":"523456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-523456","USVOrderNo":"523456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-523456","USVOrderNo":"523456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-523456","USVOrderNo":"523456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-523456","USVOrderNo":"523456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-523456","USVOrderNo":"523456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-523456","USVOrderNo":"523456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-523456","USVOrderNo":"523456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
]

const demoUSVList = [
  {USVOrgID:'Edu1MSP',name:'灵纳教育'},
  {USVOrgID:'Edu2MSP',name:'测试机构'}
]

const tranList = [
  {USVOrgID:'Edu1MSP',name:'灵纳教育'},
  {USVOrgID:'Edu2MSP',name:'测试机构'}
]

// 清算流水交易查询页面(教育资金监管机构)
const ConsumerStubQuery:React.FC =()=>{

  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({SubscribeStartDate:'',USVOrgID:'',isOpen:false,USVOrgName:''});

  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
    SubscribeStartDate:queryInfo.SubscribeStartDate,
    USVOrgID:queryInfo.USVOrgID
  },queryURL)
  
  useEffect(() => { 
    fetch(paramStr, {
      method: 'GET',
    }).then(res => res.json())
    .then((json) => {
    const {orderList,USVList} = json
    refreshOrderList(orderList.filter((order: { USVOrgID: string; })=>order.USVOrgID===queryInfo.USVOrgID||queryInfo.USVOrgID===''))
    refreshUSVList(USVList)
    return 
    })
  },[queryInfo.USVOrgID, queryInfo.SubscribeStartDate])

  const usvPickerColumn = {
    name: "USVOrg",
    options: state.USVList.map((usv: { name: any; USVOrgID: any; })=>{ return {'text': usv.name, 'value': usv.USVOrgID} })
  } as PickerColumn;

  const doSetDetail = useCallback(order => {
    dispatch(setDetail(order));
  },[dispatch]);

  const refreshOrderList = useCallback((orders:Order[]) => {
    dispatch(setOrder(orders));
  },[dispatch]);
  const refreshUSVList = useCallback((USVList:{USVOrgID:string,name:string}[]) => {
    dispatch(setUSV(USVList));
  },[dispatch]);

  const onCancel = (item:Order)=>() => {
    fetch(cancelURL, {
      method: 'PUT',
      body: JSON.stringify({
        "SubscribeID":item.SubscribeID,
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      alert(json.result)
    })
  }

  const onComplete = (item:Order)=>() => {
    fetch(completeURL, {
      method: 'GET',
      body: JSON.stringify({
        "SubscribeID":item.SubscribeID,

      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      alert(json.result)
    })
  }

  const onDetail = (item:Order)=>() => {
    doSetDetail(item)
  }

  // const Test = ({ test }) => (
  //    <h2>{JSON.stringify(test)}</h2>
  // )

  

  const ListEntry = ({ orderInfo,key, ...props } : {orderInfo:Order,key:any}) => (
    <div className=''>
      <IonItem key={key} >
      <IonLabel>
        <p className='text-center'>{orderInfo.USVOrgID}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{orderInfo.USVItemName}</p>
      </IonLabel>
      {/* <IonLabel>
        <p  className='text-center'>{orderInfo.USVOrderNo}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{orderInfo.BankTranID}</p>
      </IonLabel> */}
      <IonLabel>
        <p  className='text-center'>{orderInfo.BankTranDate}</p>
      </IonLabel>
      {/* <IonLabel>
        <p  className='text-center'>{orderInfo.BankTranTime}</p>
      </IonLabel> */}
      <IonLabel>
        <p  className='text-center'>{orderInfo.TranAmt}</p>
      </IonLabel>
      <IonLabel>
         <div className='flex justify-center gap-2'>
            <button className='p-1 text-white rounded-md bg-secondary-500 hover:bg-secondary-700' onClick={onCancel(orderInfo)}>撤销</button> 
            <button className='p-1 text-white rounded-md bg-secondary-500 hover:bg-secondary-700' onClick={onComplete(orderInfo)}>完成</button>
            <button className='p-1 text-white rounded-md bg-secondary-500 hover:bg-secondary-700' onClick={onDetail(orderInfo)}>详情</button>
         </div>
      </IonLabel>
    </IonItem>
    </div>
    );
    
    if(state.detail==null||state.detail==undefined){
          return   <IonPage>
                     <div className='relative'>
                      <div className='flex'>
                      <IonRow className='flex justify-between gap-10'>
                        <IonCol className='flex ml-8'>
                          <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>订单存根：</IonLabel>
                          <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md"  />
                        </IonCol>
                        
                        <IonCol className="flex justify-center">
                          <button className="w-24 p-2 text-white rounded-md bg-secondary-500 hover:bg-secondary-700 focus:outline-none">查询</button>
                        </IonCol>
                      </IonRow>
                      </div>
                    <div className='absolute w-full mt-10'>
                      <IonList >
                        <IonItem key='title'>
                          <IonLabel> 
                            <div className='font-black text-center'>教育机构名称</div>
                          </IonLabel>
                          <IonLabel>
                            <div className='font-black text-center'>项目名称</div>
                          </IonLabel>
                          {/* <IonLabel>
                            <div className='font-black text-center'>教育机构订单号</div>
                          </IonLabel>
                          <IonLabel>
                            <div className='font-black text-center'>支付渠道交易流水号</div>
                          </IonLabel> */}
                          <IonLabel>
                            <div className='font-black text-center'>支付渠道交易日期</div>
                          </IonLabel>
                          {/* <IonLabel>
                            <div className='font-black text-center'>支付渠道交易时间</div>
                          </IonLabel> */}
                          <IonLabel>
                            <div className='font-black text-center'>交易金额（单位分）</div>
                          </IonLabel>
                          <IonLabel>
                            <div className='font-black text-center'>操作</div>
                          </IonLabel>
                      </IonItem>
                          {state.orderList.map((list:Order, i: any) => (
                          <ListEntry orderInfo={list} key={i} />
                        ))}
                      </IonList>
                  </div>
                  </div>             
            </IonPage>
         }
         else{
           return <Redirect to="/tabs/detail" />
         }

}
export default ConsumerStubQuery