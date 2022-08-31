//Contract的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardContent } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { AppContext, setContractDetail } from '../../../appState';
import Quit from '../../Quit';

export const ContractDetail: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const [contractState, setContractState] = useState(state.contract.contractDetail);

  const setBack = useCallback(() => {
    dispatch(setContractDetail(undefined));
  }, []);
  const onBack = () => () => {
    setBack();
  };
  if (state.contract.contractDetail === undefined) {
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
            <span className="pr-1 text-gray-600 ">合同管理</span>/
            <span className="pl-1 text-primary-500">合同详情</span>
          </div>
        </div>
        <IonCardContent>
          {/* 详情 */}
          <div className="font-bold text-gray-800">合同详情</div>
          <hr className="mt-2 mb-4" />
          <div className="grid grid-cols-2 justify-items-center ">
            <div className="flex items-center mb-4 leading-10 justify-items-center">
              <div className="flex justify-end w-32 mr-2">合同ID:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="contractId"
                type="text"
                value={contractState.contractId}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">合同日期:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="contractDate"
                type="text"
                value={contractState.contractDate}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">合同时间:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="contractTime"
                type="text"
                value={contractState.contractTime}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">更新原因:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="contractUpdateReason"
                type="text"
                value={contractState.contractUpdateReason}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">教育机构ID:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="eduId"
                type="text"
                value={contractState.eduId}
                spellCheck={false}
                readOnly
              />
            </div>

            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">教育机构名称:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="eduName"
                type="text"
                value={contractState.eduName}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课程类型:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonType"
                type="text"
                value={contractState.lessonType}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课程名称:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonName"
                type="text"
                value={contractState.lessonName}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课程介绍:</div>
              <textarea
                className="w-64 h-24 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonIntroduce"
                value={contractState.lessonIntroduce}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课程大纲:</div>
              <a className="w-64 px-2" href="/contract/outline">
                请查看课程大纲
              </a>
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">教师名称:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="teacherName"
                type="text"
                value={contractState.teacherName}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课程开始日期: </div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonStartDate"
                type="text"
                value={contractState.lessonStartDate}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课程开始时间:</div>
              <input
                className="w-64 h-10 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonStartTime"
                type="text"
                value={contractState.lessonStartTime}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课程结束日期:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonEndDate"
                type="text"
                value={contractState.lessonEndDate}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课程结束时间:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonEndTime"
                type="text"
                value={contractState.lessonEndTime}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">总价格:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonTotalPrice"
                type="text"
                value={contractState.lessonTotalPrice}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">总课时:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonTotalQuantity"
                type="text"
                value={contractState.lessonTotalQuantity}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">课时单价:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="lessonPerPrice"
                type="text"
                value={contractState.lessonPerPrice}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">客户姓名:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="consumerName"
                type="text"
                value={contractState.consumerName}
                readOnly
              />
            </div>
            <div className="flex mb-4 leading-10">
              <div className="flex justify-end w-32 mr-2">交易系统订单号:</div>
              <input
                className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                name="orderNo"
                type="text"
                value={contractState.orderNo}
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
    //   <IonCard>
    //   <IonCardHeader>
    //     <IonCardSubtitle className="mx-8 text-3xl text-gray-600">详细信息</IonCardSubtitle>
    //   </IonCardHeader>
    //   <IonCardContent>
    //   <IonList>
    //   <IonLabel position="stacked" color="primary">合同ID</IonLabel>
    //   <IonInput name="contractId" type="text" value={contractState.contractId} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">合同日期</IonLabel>
    //   <IonInput name="contractDate" type="text" value={contractState.contractDate} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">合同时间</IonLabel>
    //   <IonInput name="contractTime" type="text" value={contractState.contractTime} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">更新原因</IonLabel>
    //   <IonInput name="contractUpdateReason" type="text" value={contractState.contractUpdateReason} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">教育机构ID</IonLabel>
    //   <IonInput name="eduId" type="text" value={contractState.eduId} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">教育机构名称</IonLabel>
    //   <IonInput name="eduName" type="text" value={contractState.eduName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">课程类型</IonLabel>
    //   <IonInput name="lessonType" type="text" value={contractState.lessonType} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">课程名称</IonLabel>
    //   <IonInput name="lessonName" type="text" value={contractState.lessonName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">课程介绍</IonLabel>
    //   <IonInput name="lessonIntroduce" type="text" value={contractState.lessonIntroduce} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">课程大纲</IonLabel>
    //   <Link  to={'/contract/outline'}></Link>
    //   <IonLabel position="stacked" color="primary">教师姓名</IonLabel>
    //   <IonInput name="teacherName" type="text" value={contractState.teacherName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">课程开始日期</IonLabel>
    //   <IonInput name="lessonStartDate" type="text" value={contractState.lessonStartDate} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">课程开始时间</IonLabel>
    //   <IonInput name="lessonStartTime" type="text" value={contractState.lessonStartTime} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">课程结束日期</IonLabel>
    //   <IonInput name="lessonEndDate" type="text" value={contractState.lessonEndDate} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">课程结束时间</IonLabel>
    //   <IonInput name="lessonEndTime" type="text" value={contractState.lessonEndTime} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">总价格</IonLabel>
    //   <IonInput name="lessonTotalPrice" type="text" value={contractState.lessonTotalPrice} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">总课时</IonLabel>
    //   <IonInput name="lessonTotalQuantity" type="text" value={contractState.lessonTotalQuantity} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">课时单价</IonLabel>
    //   <IonInput name="lessonPerPrice" type="text" value={contractState.lessonPerPrice} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">客户姓名</IonLabel>
    //   <IonInput name="consumerName" type="text" value={contractState.consumerName} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   <IonLabel position="stacked" color="primary">交易系统订单号</IonLabel>
    //   <IonInput name="orderNo" type="text" value={contractState.orderNo} spellCheck={false} autocapitalize="off" readonly required>      </IonInput>
    //   </IonList>
    //   <IonItem className="">
    //       <IonButton className="m-5 text-base " onClick={onBack()} fill="solid">返回</IonButton>
    //     </IonItem>
    //   </IonCardContent>
    // </IonCard>
  );
};
