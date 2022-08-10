//EduOrg的创建页面
import React, { useState } from 'react';
import {
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonLabel,
  IonInput,
  IonCardContent,
  IonItem,
  IonButton,
  IonList,
  useIonToast
} from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { AppContext, setUserInfoDetail } from '../../../appState';
import { PickerColumn } from '@ionic/core';
import { EduOrg } from '../../../types/types';
import { IonRadio, IonRadioGroup } from '@ionic/react';

export const EduOrgCreate: React.FC = () => {
  const [present, dismiss] = useIonToast();
  const createURL = 'http://localhost:3003/eduOrg/create';
  const { state, dispatch } = useContext(AppContext);
  const [eduOrgState, setEduOrgState] = useState({} as EduOrg);
  const setBack = useCallback(() => {
    dispatch(setUserInfoDetail(undefined));
  }, []);
  const onBack = () => () => {
    setBack();
  };
  const onCreate = async (e: React.FormEvent) => () => {
    e.preventDefault();
    fetch(createURL, {
      method: 'PUT',
      body: JSON.stringify(eduOrgState),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const { result, msg } = json;
        if (result) 
        {
          present('发起签到成功', 3000);
          onQuery();
        } else 
        present({
          buttons: [{ text: '关闭', handler: () => dismiss() }],
          message: '发起签到失败，失败原因：'+msg,
          onDidDismiss: () => console.log('dismissed'),
          onWillDismiss: () => console.log('will dismiss'),
        })
        alert(json.result);
      });
  };

  const lessonTypePickerColumn = {
    name: 'lessonTypePickerColumn',
    options: [
      { text: '公立', value: '0' },
      { text: '非公立', value: '1' },
    ],
  } as PickerColumn;

  return (
    <IonPage>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <form onSubmit={onCreate}>
            <IonList>
              <IonItem>
                <IonLabel position="floating">教育机构名称</IonLabel>
                <IonInput
                  name="eduName"
                  value={eduOrgState.eduName}
                  onIonChange={e => setEduOrgState({ ...eduOrgState, eduName: e.detail.value! })}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构地址</IonLabel>
                <IonInput
                  name="eduAddress"
                  value={eduOrgState.eduAddress}
                  onIonChange={e => setEduOrgState({ ...eduOrgState, eduAddress: e.detail.value! })}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构法人</IonLabel>
                <IonInput
                  name="eduLegalPerson"
                  value={eduOrgState.eduLegalPerson}
                  onIonChange={e =>
                    setEduOrgState({ ...eduOrgState, eduLegalPerson: e.detail.value! })
                  }
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构法人联系方式</IonLabel>
                <IonInput
                  name="eduLegalPhone"
                  value={eduOrgState.eduLegalPhone}
                  onIonChange={e =>
                    setEduOrgState({ ...eduOrgState, eduLegalPhone: e.detail.value! })
                  }
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构联系人</IonLabel>
                <IonInput
                  name="eduContact"
                  value={eduOrgState.eduContact}
                  onIonChange={e => setEduOrgState({ ...eduOrgState, eduContact: e.detail.value! })}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构法人联系方式</IonLabel>
                <IonInput
                  name="eduContactPhone"
                  value={eduOrgState.eduContactPhone}
                  onIonChange={e =>
                    setEduOrgState({ ...eduOrgState, eduContactPhone: e.detail.value! })
                  }
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">是否公立</IonLabel>
                <IonRadioGroup
                  onIonChange={e =>
                    setEduOrgState({ ...eduOrgState, eduIsPublic: e.detail.value! })
                  }
                >
                  <IonItem>
                    <IonLabel>公立</IonLabel>
                    <IonRadio value={true} />
                  </IonItem>
                  <IonItem>
                    <IonLabel>非公立</IonLabel>
                    <IonRadio value={false} />
                  </IonItem>
                </IonRadioGroup>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">教育机构</IonLabel>
                <IonInput
                  name="eduLicense"
                  value={eduOrgState.eduLicense}
                  onIonChange={e => setEduOrgState({ ...eduOrgState, eduLicense: e.detail.value! })}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">监管账户</IonLabel>
                <IonInput
                  name="eduSupervisedAccount"
                  value={eduOrgState.eduSupervisedAccount}
                  onIonChange={e =>
                    setEduOrgState({ ...eduOrgState, eduSupervisedAccount: e.detail.value! })
                  }
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">普通账户</IonLabel>
                <IonInput
                  name="eduSupervisedAccount"
                  value={eduOrgState.eduSupervisedAccount}
                  onIonChange={e =>
                    setEduOrgState({ ...eduOrgState, eduSupervisedAccount: e.detail.value! })
                  }
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">普通账户</IonLabel>
                <IonInput
                  name="eduSupervisedAccount"
                  value={eduOrgState.eduSupervisedAccount}
                  onIonChange={e =>
                    setEduOrgState({ ...eduOrgState, eduSupervisedAccount: e.detail.value! })
                  }
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">支付商户号</IonLabel>
                <IonInput
                  name="eduSupervisedMerNo"
                  value={eduOrgState.eduSupervisedMerNo}
                  onIonChange={e =>
                    setEduOrgState({ ...eduOrgState, eduSupervisedMerNo: e.detail.value! })
                  }
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">登录名称</IonLabel>
                <IonInput
                  name="eduLoginName"
                  value={eduOrgState.eduLoginName}
                  onIonChange={e =>
                    setEduOrgState({ ...eduOrgState, eduLoginName: e.detail.value! })
                  }
                ></IonInput>
              </IonItem>
            </IonList>

            <IonItem className="">
              <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">
                返回
              </IonButton>
            </IonItem>
          </form>
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default EduOrgCreate;
