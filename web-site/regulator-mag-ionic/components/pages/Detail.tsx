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
    return <Redirect to="/tabs/query" />
  }
  const {SubscribeID,USVOrderNo,SubscribeDurationDays,TranAmt,USVOrgID,USVItemName,USVItemID,SubscribeStartDate} = state.detail


  
  return (
    <IonPage>
      <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>详细信息</IonCardSubtitle>
        <IonCardTitle>合约ID:{SubscribeID}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
      <table className='mt-4'>
        <tr className='text-white '>
          <td>
              合约ID:{SubscribeID}
            </td>
        </tr>
        <tr className='text-white '>
          <td>
              教育机构订单ID:{USVOrderNo}
            </td>
        </tr>
        <tr>
          <td>
              项目ID:{USVItemID}
            </td>
        </tr>
        <tr>
          <td>
              项目名称:{USVItemName}
            </td>
        </tr>

        <tr>
          <td>
              订单金额（分）:{TranAmt}
            </td>
        </tr>
        <tr>
          <td>
              教育机构ID:{USVOrgID}
            </td>
        </tr>
        <tr>
          <td>
              开始时间:{SubscribeStartDate}
            </td>
        </tr>
        <tr>
          <td>
              订单有效天数:{SubscribeDurationDays}
            </td>
        </tr>
     </table>
        <IonItem>
          <IonButton onClick={onBack()} fill="solid">返回</IonButton>
        </IonItem>
        {/* <Link to="/tabs/query"> 返回 </Link> */}
      </IonCardContent>
    </IonCard>
    </IonPage>
  );
};

export default CardExamples
