
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
  IonPickerColumn
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
]

const demoUSVList = [
  {USVOrgID:'Edu1MSP',name:'灵纳教育'},
  {USVOrgID:'Edu2MSP',name:'测试机构'}
]

// 清算流水交易查询页面
const Query:React.FC =()=>{

  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({SubscribeStartDate:'',USVOrgID:'',isOpen:false,USVOrgName:''});
  useEffect(() => { 
    refreshOrderList(demoOrderList.filter(order=>order.USVOrgID===queryInfo.USVOrgID||queryInfo.USVOrgID===''))
    refreshUSVList(demoUSVList)
    return 
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

  const onDetail = (item:Order)=>() => {
    doSetDetail(item)
  }

  // const Test = ({ test }) => (
  //    <h2>{JSON.stringify(test)}</h2>
  // )

  

  const ListEntry = ({ orderInfo,key, ...props } : {orderInfo:Order,key:any}) => (
    <IonItem key={key}>
      <IonLabel>
        <p>{orderInfo.USVOrgID}</p>
      </IonLabel>
      <IonLabel>
        <p>{orderInfo.USVItemName}</p>
      </IonLabel>
      <IonLabel>
        <p>{orderInfo.USVOrderNo}</p>
      </IonLabel>
      <IonLabel>
        <p>{orderInfo.BankTranID}</p>
      </IonLabel>
      <IonLabel>
        <p>{orderInfo.BankTranDate}</p>
      </IonLabel>
      <IonLabel>
        <p>{orderInfo.BankTranTime}</p>
      </IonLabel>
      <IonLabel>
        <p>{orderInfo.TranAmt}</p>
      </IonLabel>
      <IonLabel>
        <button onClick={onCancel(orderInfo)}>撤销  </button> 
         <button onClick={onComplete(orderInfo)}>完成  </button>
         <button onClick={onDetail(orderInfo)}>详情  </button>
      </IonLabel>
    </IonItem>
    );
    
    if(state.detail==null||state.detail==undefined){
          return   <IonPage>
                    {/* <form> */}
                      <IonRow>
                        <IonCol>
                        <div className='mb-4'>
                          <label className='pr-4 font-bold'>交易日期:</label>
                          <IonItem>
                            <IonDatetime value={queryInfo.SubscribeStartDate} name='TranDate' displayFormat='YYYYMMDD' onIonChange={e=>{setQueryInfo({...queryInfo,...{SubscribeStartDate:e.detail.value!}})}}></IonDatetime>
                          </IonItem>
                        </div>
                        </IonCol>
                        <IonCol>
                          <IonButton onClick={()=>setQueryInfo({...queryInfo,...{isOpen:!queryInfo.isOpen}})}>
                              选择教育机构
                          </IonButton>
                          <label className='pt-2 pr-4 font-bold'>{queryInfo.USVOrgName}</label>
                          <IonPicker
                              isOpen={queryInfo.isOpen}
                              columns={[usvPickerColumn]}
                              buttons={[
                                {
                                  text: "取消",
                                  role: "cancel",
                                  handler: value => {
                                    // setQueryInfo({...queryInfo,...{isOpen:!queryInfo.isOpen}})
                                  }
                                },
                                {
                                  text: "确认",
                                  handler: value => { 
                                    setQueryInfo({...queryInfo,...{USVOrgID:value.USVOrg.value,USVOrgName:value.USVOrg.text,isOpen:!queryInfo.isOpen}})
                                  }
                                }
                              ]}
                            ></IonPicker>
                        </IonCol>
                      </IonRow>
                    <div>
                      <IonList>
                          <IonItem key='title'>
                        <IonLabel>
                          <h2>教育机构名称</h2>
                        </IonLabel>
                        <IonLabel>
                          <h2>项目名称</h2>
                        </IonLabel>
                        <IonLabel>
                          <h2>教育机构订单号</h2>
                        </IonLabel>
                        <IonLabel>
                          <h2>支付渠道交易流水号</h2>
                        </IonLabel>
                        <IonLabel>
                          <h2>支付渠道交易日期</h2>
                        </IonLabel>
                        <IonLabel>
                          <h2>支付渠道交易时间</h2>
                        </IonLabel>
                        <IonLabel>
                          <h2>交易金额（单位分）</h2>
                        </IonLabel>
                        <IonLabel>
                          <h2>操作</h2>
                        </IonLabel>
                      </IonItem>
                        {/* <Test test={state}></Test> */}
                          {state.orderList.map((list:Order, i: any) => (
                          <ListEntry orderInfo={list} key={i} />
                        ))}
                      </IonList>
                  </div>             
            </IonPage>
         }
         else{
           return <Redirect to="/tabs/detail" />
         }

}
export default Query