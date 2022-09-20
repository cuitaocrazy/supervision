//BaseInfo的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardContent, useIonToast } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback, useContext, useEffect } from 'react';
import { AppContext, setEduOrgDetail } from '../../appState';
import Quit from '../Quit';

import { PickerColumn } from '@ionic/core';

export const BaseInfoDetail: React.FC = () => {
  const [present, dismiss] = useIonToast();
  const modifyURL = 'http://localhost:3003/baseInfo/modify';
  const queryURL = 'http://localhost:3003/baseInfo/query';
  const { state, dispatch } = useContext(AppContext);
  const [pwd, setPwd] = useState({ pwd: '', newPwd: '', newPwd2: '' });
  //   const setBack = useCallback(() => {
  //     dispatch(setUserInfoDetail(undefined));
  //   },[]);
  //   const onBack = ()=>() => {
  //     setBack()
  //   }
  // const onModify = async (e: React.FormEvent) => () => {
  const onModify = () => {
    // e.preventDefault();
    //todo fetch
    // fetch(modifyURL, {
    //   method: 'PUT',
    //   body: JSON.stringify(baseInfoState),
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8',
    //   },
    // }).then(res => res.json())
    // .then((json) => {
    //   alert(json.result)
    // })
    const result = { true: Boolean };
    const msg = { 网络异常: String };
    if (result) {
      present({
        message: '密码修改成功',
        duration: 3000,
        position: 'top',
      });
    } else
      present({
        buttons: [{ text: '关闭', handler: () => dismiss() }],
        message: '密码修改失败,，失败原因：' + msg,
        position: 'top',
      });
  };

  return (
    <IonPage className="bg-gray-100">
      <Quit />
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
            <span className="pr-1 text-gray-600">系统管理</span>/
            <span className="pl-1 pr-1 text-primary-500">修改密码</span>
          </div>
        </div>
        <IonCardContent>
          {/* 修改密码 */}
          <div className="font-bold text-gray-800">修改密码</div>
          <hr className="mt-2 mb-4" />
          <form className="grid mt-20 justify-items-center" onSubmit={onModify}>
            <div className="flex items-center mb-4 leading-10 justify-items-center">
              <div className="flex justify-end w-32 mr-2">原密码:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="pwd"
                type="password"
                value={pwd.pwd}
                onChange={e => setPwd({ ...pwd, pwd: e.target?.value })}
                placeholder="请输入原密码"
                required
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">新密码:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="newPwd"
                type="password"
                value={pwd.newPwd}
                placeholder="请输入新密码"
                onChange={e => setPwd({ ...pwd, newPwd: e.target?.value })}
                required
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">确认密码:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="newPwd2"
                type="password"
                value={pwd.newPwd2}
                placeholder="请再次输入新密码"
                onChange={e => setPwd({ ...pwd, newPwd2: e.target?.value })}
                required
              />
            </div>
            <div className="flex justify-center mt-10">
              <input
                value="确认"
                type="submit"
                className="flex w-20 px-6 py-2 font-bold text-white rounded-md bg-primary-600 focus:bg-primary-700"
              />
            </div>
          </form>
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default BaseInfoDetail;
