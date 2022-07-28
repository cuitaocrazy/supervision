
//BaseInfo的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonRadioGroup, IonRadio, IonCardHeader, IonCardSubtitle, IonLabel, IonInput, IonCardContent, IonItem, IonButton, IonList, IonDatetime, IonPicker, IonCol, IonRow } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback, useContext, useEffect } from 'react'
import { AppContext, setEduOrgDetail } from '../../appState';
import { PickerColumn } from "@ionic/core";
import Quit from "components/components/Quit";

export const SupervisorAccount: React.FC = () => {
  //   const queryURL = 'http://localhost:3003/baseInfo/query'
  const [supversingAccountAmt, setSupversingAccountAmt] = useState('******');


  const onQuery = () => {
    //todo fetch
    setSupversingAccountAmt('1000')
  }

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
            <span className="pr-1 text-gray-600">监管账户余额</span>
          </div>
        </div>
        <div className="w-11/12 h-screen px-4 py-2 mt-4 bg-white rounded-lg">
          <span className='font-bold'>
          监管账户余额
          </span>
        <hr className="mt-2 mb-4" />
        <div className='flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center w-screen h-96'>
            <img className="rounded-lg cursor-pointer" src='http://placekitten.com/g/200/300' alt="" />
          </div>
          <div className="mt-6">
            <span className='font-bold'>教育机构监管账户余额：</span>
            <span className='text-lg text-orange-600 font-blod'>{supversingAccountAmt}</span>
            <span className='pl-1 font-bold'>元</span> 
            <a className='pl-2 text-sm text-blue-600' onClick={onQuery}>点击查看</a>
          </div>
        </div>
        </div>
      </div>

    </IonPage>
  );
};

export default SupervisorAccount
