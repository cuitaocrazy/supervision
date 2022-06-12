
import { useEffect,useCallback,useContext,useState } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext,setEduOrgList,setEduOrgDetail,setEduOrgEdit} from '../../../appState';
import {EduOrg} from '../../../types/types'
import { modalController } from '@ionic/core';
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonModal,
  IonContent,
  IonInput,
  IonRadioGroup,
  IonRadio,
  IonRouterLink
} from '@ionic/react';

const OrgSumPage:React.FC =()=>{
  const [orgSum,setOrgSum] = useState(0);
  useEffect(()=>{
    setOrgSum(1000)
  }
  ,[])
  return <IonPage>
    <IonCard>
      已有机构数量：{orgSum}
    </IonCard>
  </IonPage>
}
export default OrgSumPage
