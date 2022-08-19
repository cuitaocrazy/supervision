//transfer管理的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonItem, IonButton, IonDatetime, IonPicker } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback, useContext } from 'react'
import { AppContext, setTransferDetail } from '../../../appState';
import Quit from "components/components/Quit";

export const TransferDetail: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const setBack = useCallback(() => {
    dispatch(setTransferDetail(undefined));
  }, []);
  const onBack = () => () => {
    setBack()
  }
  if (state.transfer?.transferDetail === undefined) {
    return <Redirect to={state.backPage} />
  }

  return (
    <IonPage className='bg-gray-100'>
      <div className='h-screen overflow-auto'>
        <Quit />
        {/* 导航 */}
        <div className='flex px-2 pt-2 mx-2 my-2 text-gray-800'>
          <div className='mr-2 text-gray-600'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <span className='pr-1 text-gray-600 '>课程管理</span>/<span className='pl-1 text-primary-500'>课程划拨详情</span>
          </div>
        </div>
        <IonCardContent className="m-4 bg-white rounded-lg">
          <form>
            {/* 详情 */}
            <div className='font-bold text-gray-800'>课程划拨详情</div>
            <hr className='mt-2 mb-4' />
            <div className='grid grid-cols-2 justify-items-center '>
              <div className='flex items-center mb-4 leading-10 justify-items-center'>
                <div className='flex justify-end w-32 mr-2'>教育机构名称:</div>
                <input className='w-64 px-2 rounded-md bg-primary-100 focus:outline-none' value={state.transfer.transferDetail.eduName} readOnly required />
              </div>
              <div className='flex mb-4 leading-10'>
                <div className='flex justify-end w-32 mr-2'>课程名称:</div>
                <input className='w-64 px-2 rounded-md bg-primary-100 focus:outline-none' value={state.transfer.transferDetail.lessonName} readOnly required />
              </div>
              <div className='flex mb-4 leading-10'>
                <div className='flex justify-end w-32 mr-2'>客户姓名:</div>
                <input className='w-64 px-2 rounded-md bg-primary-100 focus:outline-none' value={state.transfer.transferDetail.consumerName} readOnly required />
              </div>
              <div className='flex mb-4 leading-10'>
                <div className='flex justify-end w-32 mr-2'>划拨原因:</div>
                <input className='w-64 px-2 rounded-md bg-primary-100 focus:outline-none' value={state.transfer.transferDetail.reason} readOnly required />
              </div>
              <div className='flex mb-4 leading-10'>
                <div className='flex justify-end w-32 mr-2'>考勤日期:</div>
                <input className='w-64 px-2 rounded-md bg-primary-100 focus:outline-none' value={state.transfer.transferDetail.attendanceDate} readOnly required />
              </div>

              <div className='flex mb-4 leading-10'>
                <div className='flex justify-end w-32 mr-2'>考勤时间:</div>
                <input className='w-64 px-2 rounded-md bg-primary-100 focus:outline-none' value={state.transfer.transferDetail.attendanceTime} readOnly required />
              </div>
              <div className='flex mb-4 leading-10'>
                <div className='flex justify-end w-32 mr-2'>划拨金额:</div>
                <input className='w-64 px-2 rounded-md bg-primary-100 focus:outline-none' value={Number(state.transfer.transferDetail.transferAmt)/100} readOnly required />
              </div>
              <div className='flex mb-4 leading-10'>
                <div className='flex justify-end w-32 mr-2'>划拨结果:</div>
                <input className='w-64 px-2 rounded-md bg-primary-100 focus:outline-none' value={state.transfer.transferDetail.transferResult} readOnly required />
              </div>
          </div>
          </form>
          <div className='flex justify-center'>
            <input value="返回" type="button" onClick={onBack()}
              className='flex w-20 px-6 py-2 font-bold text-white rounded-md bg-primary-600 focus:bg-primary-700' />
          </div>
        </IonCardContent>
      </div>
    </IonPage>
  )
};

export default TransferDetail