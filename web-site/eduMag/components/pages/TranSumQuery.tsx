
import { useEffect,useCallback,useContext,useState } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext} from '../../appState';
// import {TranSum} from '../../types/types'
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
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import { PickerColumn } from "@ionic/core";

const queryURL = 'http://localhost:3003/querySum'
const demoOrderList:TranSum[] = [
  {"USVOrgID":"Edu1MSP","TranSumAmt":100000,"TranCount":10},
]
const demoUSVList = [
  {USVOrgID:'Edu1MSP',name:'灵纳教育'},
  {USVOrgID:'Edu2MSP',name:'测试机构'}
]

// 交易汇总页面(教育资金监管机构汇总)
const TranSumQuery:React.FC =()=>{
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({SubscribeStartDateStart:'',SubscribeStartDateEnd:'',USVOrgID:'',isOpen:false,USVOrgName:''});
  // useEffect(() => { 
  //   refreshSumList(demoOrderList.filter(order=>order.USVOrgID===queryInfo.USVOrgID||queryInfo.USVOrgID===''))
  //   refreshUSVList(demoUSVList)
  //   return 
  // },[queryInfo.USVOrgID, queryInfo.SubscribeStartDateStart, queryInfo.SubscribeStartDateEnd])
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
    SubscribeStartDateStart:queryInfo.SubscribeStartDateStart,
    SubscribeStartDateEnd:queryInfo.SubscribeStartDateEnd,
    USVOrgID:queryInfo.USVOrgID
  },queryURL)
  console.log(paramStr)
  useEffect(() => { 
    fetch(paramStr, {
      method: 'GET',

      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
    const {sumList,USVList} = json
    console.log(sumList)
    refreshSumList(sumList.filter((order: { USVOrgID: string; })=>order.USVOrgID===queryInfo.USVOrgID||queryInfo.USVOrgID===''))
    refreshUSVList(USVList)
    return 
    })
  },[queryInfo.USVOrgID, queryInfo.SubscribeStartDateStart,queryInfo.SubscribeStartDateEnd])
  // const usvPickerColumn = {
  //   name: "USVOrg",
  //   options: state.USVList.map((usv: { name: any; USVOrgID: any; })=>{ return {'text': usv.name, 'value': usv.USVOrgID} })
  // } as PickerColumn;
  const refreshSumList = useCallback((tranSums:TranSum[]) => {
    dispatch(setSum(tranSums));
  },[dispatch]);
  const refreshUSVList = useCallback((USVList:{USVOrgID:string,name:string}[]) => {
    dispatch(setUSV(USVList));
  },[dispatch]);

  const usvPickerColumn = {
    name: "USVOrg",
    options: state.USVList.map((usv: { name: any; USVOrgID: any; })=>{ return {'text': usv.name, 'value': usv.USVOrgID} })
  } as PickerColumn;
  
  const ListEntry = ({ sumInfo,key, ...props } : {sumInfo:TranSum,key:any}) => (
    <div className=''>
      <IonItem key={key} >
      <IonLabel>
        <p className='text-center'>{sumInfo.USVOrgID}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{sumInfo.TranCount}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{sumInfo.TranSumAmt}</p>
      </IonLabel>
    </IonItem>
    </div>
    );
        return <IonPage>
                    <div className='relative'>
                    <div className='flex'>
                      <IonRow className='flex justify-between gap-10'>
                        <IonCol className='flex ml-8'>
                          <IonLabel className='flex h-12 p-2 font-bold text-right text-primary-600 w-36'>交易日期开始：</IonLabel>
                          <IonDatetime className="flex w-56 h-12 pt-2.5  font-bold text-center text-primary-600 bg-white rounded-md" value={queryInfo.SubscribeStartDateStart} name='SubscribeStartDateStart' displayFormat='YYYYMMDD' onIonChange={e=>{setQueryInfo({...queryInfo,...{SubscribeStartDate:e.detail.value!}})}}></IonDatetime>
                        </IonCol>
                          {/* <IonCol className='flex ml-8'>
                            <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>交易日期结束：</IonLabel>
                            <IonDatetime className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md" value={queryInfo.SubscribeStartDateEnd} name='SubscribeStartDateEnd' displayFormat='YYYYMMDD' onIonChange={e=>{setQueryInfo({...queryInfo,...{SubscribeStartDate:e.detail.value!}})}}></IonDatetime>
                          </IonCol> */}
                          <IonCol className="flex ml-8">
                          <IonLabel className='flex h-12 p-2 font-bold text-right text-primary-600 2xl:w-28 xl:w-28 lg:w-28 md:w-36 sm:w-36 '>教育机构：&nbsp;&nbsp;</IonLabel>
                          <IonLabel className='flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md' onClick={()=>setQueryInfo({...queryInfo,...{isOpen:!queryInfo.isOpen}})}>{queryInfo.USVOrgName}</IonLabel>
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
                          <IonCol className="flex justify-center ml-8">
                            <button className="w-24 p-2 text-white rounded-md bg-secondary-500 hover:bg-secondary-700 focus:outline-none">查询</button>
                          </IonCol>
                        </IonRow>
                        </div>
                      <div>
                        <IonList className="absolute w-full mt-10">
                          <IonItem key='title'>
                            <IonLabel> 
                              <div className='font-black text-center'>教育机构名称</div>
                            </IonLabel>
                            <IonLabel>
                              <div className='font-black text-center'>交易笔数</div>
                            </IonLabel>
                            <IonLabel>
                              <div className='font-black text-center'>交易金额</div>
                            </IonLabel>
                        </IonItem>
                            {/* {state.sumList.map((list:TranSum, i: any) => (
                            <ListEntry sumInfo={list} key={i} />
                          ))} */}
                        </IonList>
                    </div>  
                    </div>           
              </IonPage>
}
export default TranSumQuery