import React from 'react';
import { IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,IonItem,IonButton } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext } from 'react'
import {AppContext,setDetail} from '../../appState';


export const CardExamples: React.FC = () => {

  const { state, dispatch } = useContext(AppContext);
  const setBack = useCallback(() => {
    dispatch(setDetail(undefined));
  },[]);
  const onBack = ()=>() => {
    setBack()
  }
  if(state.detail===undefined){
    return <Redirect to={state.backPage} />
  }
  const {SubscribeID,USVOrderNo,SubscribeDurationDays,TranAmt,USVOrgID,USVItemName,USVItemID,SubscribeStartDate} = state.detail

  const onModify = ()=>() => {
    setBack()
  }
  
  return (
    <IonPage>
      <IonCard>
      <IonCardHeader>
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
        {/* <IonCardTitle className="mx-8 text-2xl text-gray-600">合约ID:{SubscribeID}</IonCardTitle> */}
      </IonCardHeader>
      <IonCardContent>
      <form noValidate onSubmit={onModify}>
        
      {/* <table className='mx-8 mt-4'>
        <tr>
          <td className='flex gap-2 leading-6'>
              <div className='font-bold text-gray-600'>合约ID:</div>
              <div className='text-gray-500'>{SubscribeID}</div>
            </td>
        </tr>
        <tr>
          <td className='flex gap-2 leading-6'>
              <div className='font-bold text-gray-600'>教育机构订单ID:</div>
              <div className='text-gray-500'>{USVOrderNo}</div>
            </td>
        </tr>
        <tr>
          <td className='flex gap-2 leading-6'>
              <div className='font-bold text-gray-600'>项目ID:</div>
              <div className='text-gray-500'>{USVItemID}</div>
            </td>
        </tr>
        <tr>
          <td className='flex gap-2 leading-6'>
            <div className='font-bold text-gray-600'>项目名称:</div>
            <div className='text-gray-500'>{USVItemName}</div>
            </td>
        </tr>

        <tr>
          <td className='flex gap-2 leading-6'>
            <div className='font-bold text-gray-600'>订单金额（分）:</div>
            <div className='text-gray-500'>{TranAmt}</div>
            </td>
        </tr>
        <tr>
          <td className='flex gap-2 leading-6'>
            <div className='font-bold text-gray-600'>教育机构ID:</div>
            <div className='text-gray-500'>{USVOrgID}</div>
            </td>
        </tr>
        <tr>
          <td className='flex gap-2 leading-6'>
            <div className='font-bold text-gray-600'>开始时间:</div>
            <div className='text-gray-500'>{SubscribeStartDate}</div>
            </td>
        </tr>
        <tr>
          <td className='flex gap-2 leading-6'>
            <div className='font-bold text-gray-600'>订单有效天数:</div>
            <div className='text-gray-500'>{SubscribeDurationDays}</div>
            </td>
        </tr>
     </table> */}
     </form>
        <IonItem className="">
          <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
        </IonItem>
        {/* <Link to="/tabs/query"> 返回 </Link> */}
      </IonCardContent>
    </IonCard>
    </IonPage>
  );
};

export default CardExamples
