
//BaseInfo的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard,IonRadioGroup,IonRadio, IonCardHeader, IonCardSubtitle,IonLabel,IonInput, IonCardContent,IonItem,IonButton,IonList,IonDatetime,IonPicker,IonCol,IonRow } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback,useContext,useEffect } from 'react'
import {AppContext,setEduOrgDetail} from '../../appState';


import { PickerColumn } from "@ionic/core";

export const SupervisorAccount: React.FC = () => {
//   const queryURL = 'http://localhost:3003/baseInfo/query'
    const [supversingAccountAmt, setSupversingAccountAmt] = useState('******');


    const onQuery = () => {
        //todo fetch
        setSupversingAccountAmt('1000')
    }
  
  return (
    <IonPage>
            <IonCard>
      <IonCardHeader>
        <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
            教育机构监管账户余额：{supversingAccountAmt}元 <a onClick={onQuery}>点击查看</a>
      </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default SupervisorAccount
