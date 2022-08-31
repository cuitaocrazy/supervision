import { useEffect, useCallback, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../../appState';
import { Contract } from '../../types/types';
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonDatetime,
  IonPicker,
} from '@ionic/react';

import { PickerColumn } from '@ionic/core';

// const cancelURL = 'http://localhost:3003/cancel';
// const completeURL = 'http://localhost:3003/complete';
// const queryURL = 'http://localhost:3003/checkWork/query';

// // 清算流水交易查询页面(教育资金监管机构)
// const Query: React.FC = () => {
//   const { state, dispatch } = useContext(AppContext);
//   const [queryInfo, setQueryInfo] = useState({
//     USVOrgID: '',
//     isOpen: false,
//     USVOrgName: '',
//     PayerStub: '',
//   });

//   const getParamStr = (params: any, url: string) => {
//     let result = '?';
//     Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
//     return url + result;
//   };
//   const paramStr = getParamStr(
//     {
//       PayerStub: queryInfo.PayerStub,
//       USVOrgID: queryInfo.USVOrgID,
//     },
//     queryURL
//   );

//   useEffect(() => {
//     fetch(paramStr, {
//       method: 'GET',
//     })
//       .then(res => res.json())
//       .then(json => {
//         const { orderList, USVList } = json;
//         refreshOrderList(
//           orderList
//             .filter(
//               (order: { USVOrgID: string; PayerStub: string }) =>
//                 order.USVOrgID === queryInfo.USVOrgID || queryInfo.USVOrgID === ''
//             )
//             .filter(
//               (order: { PayerStub: string }) =>
//                 order.PayerStub === queryInfo.PayerStub || queryInfo.PayerStub === ''
//             )
//         );
//         refreshUSVList(USVList);
//         return;
//       });
//   }, [queryInfo.USVOrgID, queryInfo.PayerStub]);

//   const usvPickerColumn = {
//     name: 'USVOrg',
//     options: state.USVList.map((usv: { name: any; USVOrgID: any }) => {
//       return { text: usv.name, value: usv.USVOrgID };
//     }),
//   } as PickerColumn;

//   const doSetDetail = useCallback(
//     order => {
//       dispatch({ ...setDetail(order), ...{ backPage: '/tabs/query' } });
//     },
//     [dispatch]
//   );

//   const refreshOrderList = useCallback(
//     (orders: Contract[]) => {
//       dispatch(setOrder(orders));
//     },
//     [dispatch]
//   );
//   const refreshUSVList = useCallback(
//     (USVList: { USVOrgID: string; name: string }[]) => {
//       dispatch(setUSV(USVList));
//     },
//     [dispatch]
//   );

//   const onCancel = (item: Contract) => () => {
//     fetch(cancelURL, {
//       method: 'PUT',
//       body: JSON.stringify({
//         SubscribeID: item.SubscribeID,
//       }),
//       headers: {
//         'Content-type': 'application/json;charset=UTF-8',
//       },
//     })
//       .then(res => res.json())
//       .then(json => {
//         alert(json.result);
//       });
//   };

//   const onComplete = (item: Contract) => () => {
//     fetch(completeURL, {
//       method: 'GET',
//       body: JSON.stringify({
//         SubscribeID: item.SubscribeID,
//       }),
//       headers: {
//         'Content-type': 'application/json;charset=UTF-8',
//       },
//     })
//       .then(res => res.json())
//       .then(json => {
//         alert(json.result);
//       });
//   };

//   const onDetail = (item: Contract) => () => {
//     doSetDetail(item);
//   };

//   // const Test = ({ test }) => (
//   //    <h2>{JSON.stringify(test)}</h2>
//   // )

//   const ListEntry = ({ orderInfo, key, ...props }: { orderInfo: Contract; key: any }) => (
//     <div className="">
//       <IonItem key={key}>
//         <IonLabel>
//           <p className="text-center">{orderInfo.USVOrgID}</p>
//         </IonLabel>
//         <IonLabel>
//           <p className="text-center">{orderInfo.USVItemName}</p>
//         </IonLabel>
//         {/* <IonLabel>
//         <p  className='text-center'>{orderInfo.USVOrderNo}</p>
//       </IonLabel>
//       <IonLabel>
//         <p  className='text-center'>{orderInfo.BankTranID}</p>
//       </IonLabel> */}
//         <IonLabel>
//           <p className="text-center">{orderInfo.BankTranDate}</p>
//         </IonLabel>
//         {/* <IonLabel>
//         <p  className='text-center'>{orderInfo.BankTranTime}</p>
//       </IonLabel> */}
//         <IonLabel>
//           <p className="text-center">{orderInfo.TranAmt}</p>
//         </IonLabel>
//         <IonLabel>
//           <div className="flex justify-center gap-2">
//             <button
//               className="p-1 text-white rounded-md bg-secondary-500 hover:bg-secondary-700"
//               onClick={onCancel(orderInfo)}
//             >
//               撤销
//             </button>
//             <button
//               className="p-1 text-white rounded-md bg-secondary-500 hover:bg-secondary-700"
//               onClick={onComplete(orderInfo)}
//             >
//               完成
//             </button>
//             <button
//               className="p-1 text-white rounded-md bg-secondary-500 hover:bg-secondary-700"
//               onClick={onDetail(orderInfo)}
//             >
//               详情
//             </button>
//           </div>
//         </IonLabel>
//       </IonItem>
//     </div>
//   );

//   if (state.detail == null || state.detail == undefined) {
//     return (
//       <IonPage>
//         <div className="relative">
//           <div className="flex">
//             <IonRow className="flex justify-between gap-10">
//               <IonCol className="flex ml-8">
//                 <IonLabel className="flex h-12 p-2 font-bold text-center text-primary-600 w-28 ">
//                   交易日期：
//                 </IonLabel>
//                 <IonDatetime
//                   className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md"
//                   value={queryInfo.SubscribeStartDate}
//                   name="TranDate"
//                   displayFormat="YYYYMMDD"
//                   onIonChange={e => {
//                     setQueryInfo({ ...queryInfo, ...{ SubscribeStartDate: e.detail.value! } });
//                   }}
//                 ></IonDatetime>
//               </IonCol>
//               <IonCol className="flex ml-8">
//                 <IonLabel className="flex h-12 p-2 font-bold text-center text-primary-600 w-28">
//                   付款方存根：
//                 </IonLabel>
//                 <IonLabel className="flex w-56 h-12 pt-2.5 pl-20 font-bold text-center text-primary-600 bg-white rounded-md">
//                   {queryInfo.PayerStub}
//                 </IonLabel>
//               </IonCol>
//               <IonCol className="flex ml-8">
//                 <IonLabel className="flex h-12 p-2 font-bold text-center text-primary-600 w-28">
//                   教育机构：
//                 </IonLabel>
//                 <IonLabel
//                   className="flex w-56 h-12 pt-2.5 pl-20 font-bold text-center text-primary-600 bg-white rounded-md"
//                   onClick={() => setQueryInfo({ ...queryInfo, ...{ isOpen: !queryInfo.isOpen } })}
//                 >
//                   {queryInfo.USVOrgName}
//                 </IonLabel>
//                 <IonPicker
//                   isOpen={queryInfo.isOpen}
//                   columns={[usvPickerColumn]}
//                   buttons={[
//                     {
//                       text: '取消',
//                       role: 'cancel',
//                       handler: value => {
//                         // setQueryInfo({...queryInfo,...{isOpen:!queryInfo.isOpen}})
//                       },
//                     },
//                     {
//                       text: '确认',
//                       handler: value => {
//                         setQueryInfo({
//                           ...queryInfo,
//                           ...{
//                             USVOrgID: value.USVOrg.value,
//                             USVOrgName: value.USVOrg.text,
//                             isOpen: !queryInfo.isOpen,
//                           },
//                         });
//                       },
//                     },
//                   ]}
//                 ></IonPicker>
//               </IonCol>
//               {/* <IonCol className="flex justify-center ml-8">
//                           <button className="w-24 p-2 text-white rounded-md bg-secondary-500 hover:bg-secondary-700 focus:outline-none">查询</button>
//                         </IonCol> */}
//             </IonRow>
//           </div>
//           <div className="absolute w-full mt-10">
//             <IonList>
//               <IonItem key="title">
//                 <IonLabel>
//                   <div className="font-black text-center">教育机构名称ID</div>
//                 </IonLabel>
//                 <IonLabel>
//                   <div className="font-black text-center">教育机构名称</div>
//                 </IonLabel>
//                 <IonLabel>
//                   <div className="font-black text-center">项目名称</div>
//                 </IonLabel>
//                 {/* <IonLabel>
//                             <div className='font-black text-center'>教育机构订单号</div>
//                           </IonLabel>
//                           <IonLabel>
//                             <div className='font-black text-center'>支付渠道交易流水号</div>
//                           </IonLabel> */}
//                 <IonLabel>
//                   <div className="font-black text-center">支付渠道交易日期</div>
//                 </IonLabel>
//                 {/* <IonLabel>
//                             <div className='font-black text-center'>支付渠道交易时间</div>
//                           </IonLabel> */}
//                 <IonLabel>
//                   <div className="font-black text-center">交易金额（单位分）</div>
//                 </IonLabel>
//                 <IonLabel>
//                   <div className="font-black text-center">操作</div>
//                 </IonLabel>
//               </IonItem>
//               {state.orderList.map((list: Contract, i: any) => (
//                 <ListEntry orderInfo={list} key={i} />
//               ))}
//             </IonList>
//           </div>
//         </div>
//       </IonPage>
//     );
//   } else {
//     return <Redirect to="/tabs/detail" />;
//   }
// };

const Query: React.FC = () => {
  return <IonPage>清算流水交易查询页面(教育资金监管机构) 未完成</IonPage>;
};

export default Query;
