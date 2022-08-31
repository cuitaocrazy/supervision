import React, { useState,FC } from "react";
import {
  IonPage,
  IonCard,
  IonRadioGroup,
  IonRadio,
  IonCardHeader,
  IonCardSubtitle,
  IonLabel,
  IonInput,
  IonCardContent,
  IonItem,
  IonButton,
  IonList,
  IonDatetime,
  IonPicker,
  IonCol,
  IonRow,
} from "@ionic/react";
import { Redirect } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { AppContext, setEduOrgDetail } from "../../appState";
import { PickerColumn } from "@ionic/core";
import Quit from "components/components/Quit";
import { eduTransactionSumURL } from "const/consts";
import localforage from "localforage";


const TranSumQuery = () => {
  const [supversingAccountAmt, setSupversingAccountAmt] = useState("******");
  const [buyCardNumber, setBuyCardNumber] = useState("0");
  const [buyCardAmt, setBuyCardAmt] = useState("0");
  const [refundNumber, setRefundNumber] = useState("0");
  const [refundAmt, setRefundAmt] = useState("0");
  const [transferNumber, setTranferNumber] = useState("0");
  const [transferAmt, setTranferAmt] = useState("0");
  const [loginName, setLoginName] = useState("");
  const [contractValid, setContractValid] = useState("0");
  const [contractFinish, setContractFinish] = useState("0");
  const onQuery = () => {
    //todo fetch
    fetch(paramStr, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const {
          result,
          buyCardNumber,
          buyCardAmt,
          refundNumber,
          refundAmt,
          transferNumber,
          transferAmt,
          contractValid,
          contractFinish,
        } = json;
        if (result) {
          setBuyCardNumber(buyCardNumber);
          setBuyCardAmt(buyCardAmt);
          setRefundNumber(refundNumber);
          setRefundAmt(refundAmt);
          setTranferNumber(transferNumber);
          setTranferAmt(transferAmt);
          setContractFinish(contractFinish);
          setContractValid(contractValid);
        }
      });
  };
  useEffect(() => {
    localforage.getItem("loginName").then((value) => {
      setLoginName(value as string);
    });
    onQuery();
  }, []);

  const findURL = eduTransactionSumURL;
  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach((key) => {
      if (params[key]) result = result + key + "=" + params[key] + "&";
    });
    return url + result;
  };

  //todo 从localStoge中取值
  const paramStr = getParamStr(
    {
      loginName: loginName,
    },
    findURL
  );
  const onClick = () => {
    //todo fetch
    setSupversingAccountAmt("1000");
  };

  // const onQuery = () => {
  //   state.contract?.contractList?.map(() => {
  //     console.log("holy shit");
  //   });
  //   fetch(paramStr, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json;charset=UTF-8",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       const { result, records, total } = json;
  //       if (result) {
  //         setTotal(total);
  //         refreshList(records);
  //       }
  //     });
  // };
  
 

  return (
    <IonPage className="bg-gray-100">
      <Quit />
      <div className="relative w-full h-screen mx-6 overflow-auto">
        <div className="flex pt-2 my-2 text-gray-800">
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
            <span className="pr-1 text-gray-600">报表</span>/
            <span className="pl-1 text-primary-500">月交易汇总查询</span>
          </div>
        </div>
        <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
          <div className="text-base font-bold">快速查询</div>
          <hr className="mt-2 mb-4" />
          <div className="flex">
            <IonRow className="flex justify-between ">
              <IonCol className="flex ml-8">
                <IonLabel className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  年月
                </IonLabel>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入交易年月"
                  
                />
              </IonCol>
              <IonCol className="flex ml-8">
                <button
                  className="w-24 h-12 mr-6 text-white border-2 rounded-md shadow-md bg-primary-600 focus:bg-primary-700"
                >
                  查询
                </button>
              </IonCol>
            </IonRow>
          </div>
        </div>
        <div className="absolute w-full mt-10">
          <table className="w-11/12">
            <thead>
              <tr className="grid items-end w-full h-10 grid-cols-6 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center flex-1 leading-10 justify-items-end ">
                  购课数量
                </th>
                <th className="flex items-center justify-center flex-1 leading-10 ">
                  购课金额
                </th>
                <th className="flex items-center justify-center flex-1 leading-10 ">
                  退课数量
                </th>
                <th className="flex items-center justify-center flex-1 leading-10 ">
                  退课金额
                </th>
                <th className="flex items-center justify-center flex-1 leading-10 ">
                  划拨次数
                </th>
                <th className="flex items-center justify-center flex-1 leading-10 ">
                  划拨金额
                </th>
              </tr>
            </thead>
            <tbody>
            <tr className="flex items-center justify-center text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100">
      <td className="flex items-center justify-center flex-1 leading-10 ">
      {buyCardNumber}
      </td>
      <td className="flex items-center justify-center flex-1 leading-10">
      {buyCardAmt}
      </td>
      <td className="flex items-center justify-center flex-1 leading-10">
      {refundNumber}
      </td>
      <td className="flex items-center justify-center flex-1 leading-10 ">
      {refundAmt}
      </td>

      <td className="flex items-center justify-center flex-1 leading-10 ">
      {transferNumber}
      </td>
      <td className="flex items-center justify-center flex-1 leading-10 ">
      {transferAmt}
      </td>
    </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default TranSumQuery;



// import { useEffect,useCallback,useContext,useState } from 'react'
// import { Redirect } from 'react-router-dom';
// import {AppContext,setDetail,setUSV,setSum,setSumQuery} from '../../appState';
// import {TranSum} from '../../types/types'
// import {
//   IonPage,
//   IonList,
//   IonLabel,
//   IonItem,
//   IonRow,
//   IonCol,
//   IonDatetime,
//   IonPicker,
//   IonButton,
//   IonPickerColumn,
//   IonSelect,
//   IonSelectOption
// } from '@ionic/react';
// import { PickerColumn } from "@ionic/core";

// const queryURL = 'http://localhost:3003/querySum'
// const demoOrderList:TranSum[] = [
//   {"USVOrgID":"Edu1MSP","TranSumAmt":100000,"TranCount":10},
// ]
// const demoUSVList = [
//   {USVOrgID:'Edu1MSP',name:'灵纳教育'},
//   {USVOrgID:'Edu2MSP',name:'测试机构'}
// ]

// // 交易汇总页面(教育资金监管机构汇总)
// const TranSumQuery:React.FC =()=>{
//   const { state, dispatch } = useContext(AppContext);
//   const [queryInfo, setQueryInfo] = useState({SubscribeStartDateStart:'',SubscribeStartDateEnd:'',USVOrgID:'',isOpen:false,USVOrgName:''});
//   // useEffect(() => { 
//   //   refreshSumList(demoOrderList.filter(order=>order.USVOrgID===queryInfo.USVOrgID||queryInfo.USVOrgID===''))
//   //   refreshUSVList(demoUSVList)
//   //   return 
//   // },[queryInfo.USVOrgID, queryInfo.SubscribeStartDateStart, queryInfo.SubscribeStartDateEnd])
//   const getParamStr = (params:any,url:string) =>{
//     let result = '?'
//     Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
//     return url+result
//   }
//   const paramStr = getParamStr({
//     SubscribeStartDateStart:queryInfo.SubscribeStartDateStart,
//     SubscribeStartDateEnd:queryInfo.SubscribeStartDateEnd,
//     USVOrgID:queryInfo.USVOrgID
//   },queryURL)
//   console.log(paramStr)
//   useEffect(() => { 
//     fetch(paramStr, {
//       method: 'GET',

//       headers: {
//         'Content-type': 'application/json;charset=UTF-8',
//       },
//     }).then(res => res.json())
//     .then((json) => {
//     const {sumList,USVList} = json
//     console.log(sumList)
//     refreshSumList(sumList.filter((order: { USVOrgID: string; })=>order.USVOrgID===queryInfo.USVOrgID||queryInfo.USVOrgID===''))
//     refreshUSVList(USVList)
//     return 
//     })
//   },[queryInfo.USVOrgID, queryInfo.SubscribeStartDateStart,queryInfo.SubscribeStartDateEnd])
//   // const usvPickerColumn = {
//   //   name: "USVOrg",
//   //   options: state.USVList.map((usv: { name: any; USVOrgID: any; })=>{ return {'text': usv.name, 'value': usv.USVOrgID} })
//   // } as PickerColumn;
//   const refreshSumList = useCallback((tranSums:TranSum[]) => {
//     dispatch(setSum(tranSums));
//   },[dispatch]);
//   const refreshUSVList = useCallback((USVList:{USVOrgID:string,name:string}[]) => {
//     dispatch(setUSV(USVList));
//   },[dispatch]);

//   const usvPickerColumn = {
//     name: "USVOrg",
//     options: state.USVList.map((usv: { name: any; USVOrgID: any; })=>{ return {'text': usv.name, 'value': usv.USVOrgID} })
//   } as PickerColumn;
  
//   const ListEntry = ({ sumInfo,key, ...props } : {sumInfo:TranSum,key:any}) => (
//     <div className=''>
//       <IonItem key={key} >
//       <IonLabel>
//         <p className='text-center'>{sumInfo.USVOrgID}</p>
//       </IonLabel>
//       <IonLabel>
//         <p  className='text-center'>{sumInfo.TranCount}</p>
//       </IonLabel>
//       <IonLabel>
//         <p  className='text-center'>{sumInfo.TranSumAmt}</p>
//       </IonLabel>
//     </IonItem>
//     </div>
//     );
//         return <IonPage>
//                     <div className='relative'>
//                     <div className='flex'>
//                       <IonRow className='flex justify-between gap-10'>
//                         <IonCol className='flex ml-8'>
//                           <IonLabel className='flex h-12 p-2 font-bold text-right text-primary-600 w-36'>交易日期开始：</IonLabel>
//                           <IonDatetime className="flex w-56 h-12 pt-2.5  font-bold text-center text-primary-600 bg-white rounded-md" value={queryInfo.SubscribeStartDateStart} name='SubscribeStartDateStart' displayFormat='YYYYMMDD' onIonChange={e=>{setQueryInfo({...queryInfo,...{SubscribeStartDate:e.detail.value!}})}}></IonDatetime>
//                         </IonCol>
//                           {/* <IonCol className='flex ml-8'>
//                             <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>交易日期结束：</IonLabel>
//                             <IonDatetime className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md" value={queryInfo.SubscribeStartDateEnd} name='SubscribeStartDateEnd' displayFormat='YYYYMMDD' onIonChange={e=>{setQueryInfo({...queryInfo,...{SubscribeStartDate:e.detail.value!}})}}></IonDatetime>
//                           </IonCol> */}
//                           <IonCol className="flex ml-8">
//                           <IonLabel className='flex h-12 p-2 font-bold text-right text-primary-600 2xl:w-28 xl:w-28 lg:w-28 md:w-36 sm:w-36 '>教育机构：&nbsp;&nbsp;</IonLabel>
//                           <IonLabel className='flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md' onClick={()=>setQueryInfo({...queryInfo,...{isOpen:!queryInfo.isOpen}})}>{queryInfo.USVOrgName}</IonLabel>
//                           <IonPicker
//                               isOpen={queryInfo.isOpen}
//                               columns={[usvPickerColumn]}
//                               buttons={[
//                                 {
//                                   text: "取消",
//                                   role: "cancel",
//                                   handler: value => {
//                                     // setQueryInfo({...queryInfo,...{isOpen:!queryInfo.isOpen}})
//                                   }
//                                 },
//                                 {
//                                   text: "确认",
//                                   handler: value => { 
//                                     setQueryInfo({...queryInfo,...{USVOrgID:value.USVOrg.value,USVOrgName:value.USVOrg.text,isOpen:!queryInfo.isOpen}})
//                                   }
//                                 }
//                               ]}
//                             ></IonPicker>
//                         </IonCol>
//                           <IonCol className="flex justify-center ml-8">
//                             <button className="w-24 p-2 text-white rounded-md bg-secondary-500 hover:bg-secondary-700 focus:outline-none">查询</button>
//                           </IonCol>
//                         </IonRow>
//                         </div>
//                       <div>
//                         <IonList className="absolute w-full mt-10">
//                           <IonItem key='title'>
//                             <IonLabel> 
//                               <div className='font-black text-center'>教育机构名称</div>
//                             </IonLabel>
//                             <IonLabel>
//                               <div className='font-black text-center'>交易笔数</div>
//                             </IonLabel>
//                             <IonLabel>
//                               <div className='font-black text-center'>交易金额</div>
//                             </IonLabel>
//                         </IonItem>
//                             {/* {state.sumList.map((list:TranSum, i: any) => (
//                             <ListEntry sumInfo={list} key={i} />
//                           ))} */}
//                         </IonList>
//                     </div>  
//                     </div>           
//               </IonPage>
// }
// export default TranSumQuery