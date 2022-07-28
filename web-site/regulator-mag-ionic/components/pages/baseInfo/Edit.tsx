//BaseInfo的编辑页面
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
  IonDatetime,
  IonPicker,
} from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { AppContext, setUserInfoEdit } from '../../../appState';

import { Lesson } from '../../../types/types';
import { PickerColumn } from '@ionic/core';

export const BaseInfoEdit: React.FC = () => {
  const modifyURL = 'http://localhost:3003/lesson/modify';
  const { state, dispatch } = useContext(AppContext);

  const [baseInfoState, setBaseInfoState] = useState(state.userInfo.userInfoEdit);
  const [isPickOpen, setPickOpen] = useState(false);
  const setBack = useCallback(() => {
    dispatch(setUserInfoEdit(undefined));
  }, []);
  const onBack = () => () => {
    setBack();
  };
  if (state.userInfo.userInfoEdit === undefined) {
    return <Redirect to={state.backPage} />;
  }

  const onModify = async (e: React.FormEvent) => () => {
    e.preventDefault();
    fetch(modifyURL, {
      method: 'PUT',
      body: JSON.stringify(baseInfoState),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        alert(json.result);
      });
  };

  return (
    <IonPage>
    <IonCard className="h-screen mx-6 overflow-auto">
      {/* 导航 */}
      <div className="flex px-2 pt-2 mx-2 my-2 text-gray-800">
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
          <span className="pr-1 text-gray-600 ">基础信息维护</span>/
          <span className="pr-1 text-gray-600 ">用户管理</span>/
          <span className="pl-1 text-primary-500">用户编辑</span>
        </div>
      </div>
      <IonCardContent>
        <form onSubmit={onModify}>
          {/* 编辑内容 */}
          <div className="font-bold text-gray-800">用户编辑</div>
          <hr className="mt-2 mb-4" />
          <div className="grid grid-cols-2 justify-items-center ">
            <div className="flex items-center mb-4 leading-10 justify-items-center">
              <div className="flex justify-end w-32 mr-2">登录名:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="eduId"
                value={baseInfoState.supervisorLoginName}
                  onChange={e =>
                    setBaseInfoState({ ...baseInfoState, supervisorLoginName: e.nativeEvent.target?.value })
                  }
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">用户名:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="eduName"
                value={baseInfoState.supervisorUsername}
                  onChange={e =>
                    setBaseInfoState({ ...baseInfoState, supervisorUsername: e.nativeEvent.target?.value })
                  }
                required
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">联系方式:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="eduName"
                value={baseInfoState.supervisorPhone}
                  onChange={e =>
                    setBaseInfoState({ ...baseInfoState, supervisorPhone: e.nativeEvent.target?.value })
                  }
                required
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">所属机构:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="eduAddress"
                value={baseInfoState.supervisorOrgName}
                  onChange={e =>
                    setBaseInfoState({ ...baseInfoState, supervisorOrgName: e.nativeEvent.target?.value })
                  }
                required
              />
            </div>
          </div>
        </form>
        <div className="flex justify-center">
          <input
            value="返回"
            type="button"
            onClick={onBack()}
            className="flex w-20 px-6 py-2 font-bold text-white rounded-md bg-primary-600 focus:bg-primary-700"
          />
        </div>
      </IonCardContent>
    </IonCard>
  </IonPage>
    // <IonPage>
    //   <IonCard>
    //     <IonCardHeader>
    //       <IonCardSubtitle className="mx-8 text-3xl text-gray-600">用户编辑</IonCardSubtitle>
    //     </IonCardHeader>
    //     <IonCardContent>
    //       <form onSubmit={onModify}>
    //         <IonList>
    //           <IonLabel position="stacked" color="primary">
    //             登录名称
    //           </IonLabel>
    //           <IonInput
    //             name="supervisorLoginName"
    //             type="text"
    //             value={baseInfoState.supervisorLoginName}
    //               onChange={e =>
    //                 setBaseInfoState({ ...baseInfoState, supervisorLoginName: e.nativeEvent.target?.value })
    //               }
    //             spellCheck={false}
    //             autocapitalize="off"
    //             required
    //           ></IonInput>
    //           <IonLabel position="stacked" color="primary">
    //             用户名称
    //           </IonLabel>
    //           <IonInput
    //             name="supervisorUsername"
    //             type="text"
    //             value={baseInfoState.supervisorUsername}
    //             spellCheck={false}
    //             autocapitalize="off"
    //             onChange={e =>
    //               setBaseInfoState({ ...baseInfoState, supervisorUsername: e.nativeEvent.target?.value })
    //             }
    //             required
    //           >
    //             {' '}
    //           </IonInput>
    //           <IonLabel position="stacked" color="primary">
    //             用户电话
    //           </IonLabel>
    //           <IonInput
    //             name="supervisorPhone"
    //             type="text"
    //             value={baseInfoState.supervisorPhone}
    //             spellCheck={false}
    //             autocapitalize="off"
    //             onChange={e =>
    //               setBaseInfoState({ ...baseInfoState, supervisorPhone: e.nativeEvent.target?.value })
    //             }
    //             required
    //           ></IonInput>
    //         </IonList>
    //         <IonItem className="">
    //           <IonButton type="submit" expand="block">
    //             确认
    //           </IonButton>
    //           <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">
    //             返回
    //           </IonButton>
    //         </IonItem>
    //       </form>
    //     </IonCardContent>
    //   </IonCard>
    // </IonPage>
  );
};

export default BaseInfoEdit;