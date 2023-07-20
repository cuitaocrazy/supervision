//complaint管理的详细页面
import React from 'react';
import { IonPage, IonCard, IonCardContent } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { AppContext, setComplaintDetail } from '../../../appState';
import Quit from '../../Quit';
import { Complaint } from '@/types/types';

export const ComplaintDetail: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const setBack = useCallback(() => {
    dispatch(setComplaintDetail(undefined));
  }, []);
  const onBack = () => () => {
    setBack();
  };
  const complaintDetail: Complaint = state.complaint.complaintDetail
  if (complaintDetail === undefined) {
    return <Redirect to={state.backPage} />;
  }

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
            <span className="pr-1 text-gray-600">业务管理</span>/
            <span className="pr-1 text-gray-600">投诉管理</span>/
            <span className="pl-1 pr-1 text-primary-500">投诉详情信息</span>
          </div>
        </div>
        <IonCardContent>
          {/* 详情 */}
          <div className="font-bold text-gray-800">投诉详情</div>
          <hr className="mt-2 mb-4" />
          <div className="grid grid-cols-2 justify-items-center ">
            <div className="flex items-center mb-4 leading-10 justify-items-center">
              <div className="flex justify-end w-32 mr-2">教育机构名称:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                type="text"
                value={complaintDetail.eduName}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">投诉日期:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                type="text"
                value={complaintDetail.complaintDate}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">教育机构联系人:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                type="text"
                value={complaintDetail.eduContact}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">教育机构联系人电话:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                type="text"
                value={complaintDetail.eduContactPhone}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">客户姓名:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                type="text"
                value={complaintDetail.consumerName}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">客户电话:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                type="text"
                value={complaintDetail.consumerPhone}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">投诉标题:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                type="text"
                value={complaintDetail.complaintTitle}
                readOnly
              />
            </div>

            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">投诉内容:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                type="text"
                value={complaintDetail.complaintContent}
                readOnly
              />
            </div>
          </div>

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
  );
};

export default ComplaintDetail;
