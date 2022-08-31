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

// const demoOrderList: Contract[] = [
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-123456',
//     USVOrderNo: '123456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-223456',
//     USVOrderNo: '223456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-323456',
//     USVOrderNo: '323456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-423456',
//     USVOrderNo: '423456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-523456',
//     USVOrderNo: '523456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-523456',
//     USVOrderNo: '523456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-523456',
//     USVOrderNo: '523456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-523456',
//     USVOrderNo: '523456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-523456',
//     USVOrderNo: '523456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-523456',
//     USVOrderNo: '523456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-523456',
//     USVOrderNo: '523456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-523456',
//     USVOrderNo: '523456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-523456',
//     USVOrderNo: '523456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-523456',
//     USVOrderNo: '523456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-523456',
//     USVOrderNo: '523456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-523456',
//     USVOrderNo: '523456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
//   {
//     SubscribeID: 'Edu1MSP-BankMSP-EdbMSP-523456',
//     USVOrderNo: '523456',
//     SubscribeDurationDays: 365,
//     TranAmt: 100,
//     USVOrgID: 'Edu1MSP',
//     USVItemID: '1',
//     USVItemName: '系统架构师2020年下半年班',
//     USVItemDesc: '系统架构师2021年下半年及2022年上半年有效的培训课程',
//     BankID: 'BankMSP',
//     BankTranID: '0000001',
//     BankTranDate: '20210929',
//     BankTranTime: '100130',
//     PayerRemark: '用于准备xx考试',
//     PayerStub: '付款凭证',
//     SVOrgID: 'EdbMSP',
//     SubscribeStartDate: '20211030',
//   },
// ];

// const demoUSVList = [
//   { USVOrgID: 'Edu1MSP', name: '灵纳教育' },
//   { USVOrgID: 'Edu2MSP', name: '测试机构' },
// ];

// // 交易流水查询页面(银行端)
// const BankQuery: React.FC = () => {
//   const { state, dispatch } = useContext(AppContext);
//   const [queryInfo, setQueryInfo] = useState({
//     SubscribeStartDate: '',
//     USVOrgID: '',
//     isOpen: false,
//     USVOrgName: '',
//   });
//   useEffect(() => {
//     refreshOrderList(
//       demoOrderList.filter(
//         order => order.USVOrgID === queryInfo.USVOrgID || queryInfo.USVOrgID === ''
//       )
//     );
//     refreshUSVList(demoUSVList);
//     return;
//   }, [queryInfo.USVOrgID, queryInfo.SubscribeStartDate]);
//   const usvPickerColumn = {
//     name: 'USVOrg',
//     options: state.USVList.map((usv: { name: any; USVOrgID: any }) => {
//       return { text: usv.name, value: usv.USVOrgID };
//     }),
//   } as PickerColumn;
//   const doSetDetail = useCallback(
//     order => {
//       dispatch({ ...setDetail(order), ...{ backPage: '/tabs/bankQuery' } });
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
//   const onDetail = (item: Contract) => () => {
//     doSetDetail(item);
//   };
//   const ListEntry = ({ orderInfo, key, ...props }: { orderInfo: Contract; key: any }) => (
//     <div className="">
//       <IonItem key={key}>
//         <IonLabel>
//           <p className="text-center">{orderInfo.USVOrgID}</p>
//         </IonLabel>
//         <IonLabel>
//           <p className="text-center">{orderInfo.USVItemName}</p>
//         </IonLabel>
//         <IonLabel>
//           <p className="text-center">{orderInfo.BankTranDate}</p>
//         </IonLabel>
//         <IonLabel>
//           <p className="text-center">{orderInfo.TranAmt}</p>
//         </IonLabel>
//         <IonLabel>
//           <div className="flex justify-center gap-2">
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
//         <div className="flex mb-20">
//           <IonRow className="flex justify-between gap-10">
//             <IonCol className="flex ml-8">
//               <IonLabel className="flex h-12 p-2 font-bold text-center text-primary-600 w-28">
//                 交易日期：
//               </IonLabel>
//               <IonDatetime
//                 className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md"
//                 value={queryInfo.SubscribeStartDate}
//                 name="TranDate"
//                 displayFormat="YYYYMMDD"
//                 onIonChange={e => {
//                   setQueryInfo({ ...queryInfo, ...{ SubscribeStartDate: e.detail.value! } });
//                 }}
//               ></IonDatetime>
//             </IonCol>
//             <IonCol className="flex ml-8">
//               <IonLabel className="flex h-12 p-2 font-bold text-center text-primary-600 w-28">
//                 教育机构：
//               </IonLabel>
//               <IonLabel
//                 className="flex w-56 h-12 pt-2.5 pl-20 font-bold text-center text-primary-600 bg-white rounded-md"
//                 onClick={() => setQueryInfo({ ...queryInfo, ...{ isOpen: !queryInfo.isOpen } })}
//               >
//                 {queryInfo.USVOrgName}
//               </IonLabel>
//               <IonPicker
//                 isOpen={queryInfo.isOpen}
//                 columns={[usvPickerColumn]}
//                 buttons={[
//                   {
//                     text: '取消',
//                     role: 'cancel',
//                     handler: value => {
//                       // setQueryInfo({...queryInfo,...{isOpen:!queryInfo.isOpen}})
//                     },
//                   },
//                   {
//                     text: '确认',
//                     handler: value => {
//                       setQueryInfo({
//                         ...queryInfo,
//                         ...{
//                           USVOrgID: value.USVOrg.value,
//                           USVOrgName: value.USVOrg.text,
//                           isOpen: !queryInfo.isOpen,
//                         },
//                       });
//                     },
//                   },
//                 ]}
//               ></IonPicker>
//             </IonCol>
//             <IonCol className="flex justify-center">
//               <button className="w-24 p-2 text-white rounded-md bg-secondary-500 hover:bg-secondary-700 focus:outline-none">
//                 查询
//               </button>
//             </IonCol>
//           </IonRow>
//         </div>
//         <div>
//           <IonList>
//             <IonItem key="title">
//               <IonLabel>
//                 <div className="font-black text-center">教育机构名称ID</div>
//               </IonLabel>
//               <IonLabel>
//                 <div className="font-black text-center">教育机构名称</div>
//               </IonLabel>
//               <IonLabel>
//                 <div className="font-black text-center">项目名称</div>
//               </IonLabel>
//               <IonLabel>
//                 <div className="font-black text-center">支付渠道交易日期</div>
//               </IonLabel>
//               <IonLabel>
//                 <div className="font-black text-center">交易金额（单位分）</div>
//               </IonLabel>
//               <IonLabel>
//                 <div className="font-black text-center">操作</div>
//               </IonLabel>
//             </IonItem>
//             {state.orderList.map((list: Contract, i: any) => (
//               <ListEntry orderInfo={list} key={i} />
//             ))}
//           </IonList>
//         </div>
//       </IonPage>
//     );
//   } else {
//     return <Redirect to="/tabs/detail" />;
//   }
// };
const BankQuery: React.FC = () => {
  return <IonPage>交易流水查询页面(银行端) 未完成</IonPage>;
};
export default BankQuery;
