//手工退课
import React, { useState, Fragment } from "react";
import { useEffect, useCallback, useContext } from "react";
import { IonPage, useIonToast } from "@ionic/react";
import { Redirect } from "react-router-dom";
import {
  AppContext,
  setContractNegoList,
  setContractNegoDetail,
} from "../../../appState";
import { ContractNego } from "../../../types/types";
import { PickerColumn } from "@ionic/core";
import { Dialog, Transition } from "@headlessui/react";
import Quit from "components/components/Quit";

//TODO 未实现
const queryURL = "";
const refundLessonURL = "";

const democontractNegoList: ContractNego[] = [
  {
    negoId: "1",
    contractId: "1",
    negoCreateDate: "2020-01-01",
    negoCreateTime: "00:00:00",
    negoIntent: "1111",
    negoCreator: "1",
    negoStatus: "vaild",
    negoUpdateDate: "2020-01-01",
    negoUpdateTime: "00:00:00",
    negoRefundAmt: "111",
    negoCompensationAmt: "1",
    negoConsumerAgree: "222",
    negoConsumerAgreeDate: "2020-01-01",
    negoConsumerAgreeTime: "00:00:00",
    negoEduAgree: "111",
    negoEduAgreeDate: "2020-01-01",
    negoEduAgreeTime: "00:00:00",
    negoFinishTimes: "10",
    contract: {
      contractId: "1",
      consumerPhone: "12345",
      contractDate: "2020-01-01",
      contractTime: "00:00:00",
      contractStatus: "vaild",
      contractUpdateDate: "2020-01-01",
      contractUpdateTime: "2020-01-01",
      contractUpdateReason: "",
      eduId: "1",
      eduName: "教育机构1",
      lessonId: "1",
      lessonName: "课程1",
      lessonType: "类型1",
      lessonIntroduce: "介绍1",
      lessonOutline: "大纲1",
      lessonStartDate: "2020-01-01",
      lessonEndDate: "2020-01-01",
      lessonStartTime: "00:00:00",
      lessonEndTime: "00:00:00",
      lessonAttendanceType: "类型1",
      lessonTotalQuantity: "11",
      lessonTotalPrice: "121",
      lessonPerPrice: "11",
      teacherId: "1",
      teacherName: "教师1",
      consumerId: "1",
      consumerName: "消费者1",
      consumerStuName: "学生1",
      orderNo: "123123123",
      lessonTotalTimes: "10",
    },
  },
];

const ContractNegoQuery: React.FC = () => {
  const [present, dismiss] = useIonToast();
  let [isRefundOpen, setIsRefundOpen] = useState(false);
  function closeRefundModal() {
    setIsRefundOpen(false);
  }
  function openRefundModal() {
    setIsRefundOpen(true);
  }
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({ contractId: "", orderId: "" });
  const [detail, setDetail] = useState({} as ContractNego);
  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach(
      (key) => (result = result + key + "=" + params[key] + "&")
    );
    return url + result;
  };
  const paramStr = getParamStr(
    {
      contractId: queryInfo.contractId,
      orderId: queryInfo.orderId,
    },
    queryURL
  );
  const refreshList = useCallback(
    (eduOrgs: ContractNego[]) => {
      dispatch(setContractNegoList(eduOrgs));
    },
    [dispatch]
  );
  const onDetail = (item: ContractNego) => () => {
    setDetail(item);

    // doSetDetail(item)
  };

  const onCreate = () => {
    //todo fetch
  };
  // 退课处理
  const onManual = () => {
    //todo fetch
    // const reqBody = JSON.stringify({
    //   ...detail
    // });
    // fetch(refundLessonURL, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json;charset=UTF-8",
    //   },
    //   body: reqBody,
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     const { result, msg } = json;
    //     console.log(result);
    const result = { true: Boolean };
    if (result) {
      present({
        message: "课程退订审批通过操作成功",
        position: "top",
        duration: 3000,
      });
      onQuery();
    } else
      present({
        buttons: [{ text: "关闭", handler: () => dismiss() }],
        message: "课程退订审批通过操作失败，失败原因：" + msg,
        position: "top",
      });
    closeRefundModal;
    // });
  };

  const doSetDetail = useCallback(
    (contractNego: ContractNego) => {
      dispatch({
        ...setContractNegoDetail(contractNego),
        ...{ backPage: "/tabs/contractNego/query" },
      });
    },
    [dispatch]
  );
  useEffect(() => {
    // fetch(paramStr, {
    //   method: 'GET',
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8',
    //   },
    // }).then(res => res.json())
    // .then((json) => {
    // const {contractNegoList} = json

    // refreshList(democontractNegoList.filter((contractNego:ContractNego)=>contractNego.contractId.indexOf(queryInfo.contractId)>-1))
    // return
    // })
    refreshList(democontractNegoList);
  }, []);

  const onQuery = () => {
    // fetch(paramStr, {
    //   method: 'GET',
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8',
    //   },
    // }).then(res => res.json())
    // .then((json) => {
    // const {contractNegoList} = json

    // refreshList(democontractNegoList.filter((contractNego:ContractNego)=>contractNego.contractId.indexOf(queryInfo.contractId)>-1))
    // return
    // })
    refreshList(
      democontractNegoList.filter(
        (contractNego: ContractNego) =>
          contractNego.contractId.indexOf(queryInfo.contractId) > -1
      )
    );
  };

  const ListEntry = ({ contractNego }: { contractNego: ContractNego }) => (
    <tr className="grid items-center grid-cols-10 gap-10 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100">
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.lessonName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.lessonTotalTimes}
      </td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.lessonTotalPrice}
      </td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.consumerName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.consumerPhone}
      </td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.consumerStuName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {Number(contractNego.negoRefundAmt) / 100}
      </td>
      <td className="flex items-center justify-center leading-10">
        {Number(contractNego.negoCompensationAmt) / 100}
      </td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.contractUpdateReason}
      </td>

      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button
            className="p-1 rounded-md text-primary-600"
            onClick={openRefundModal}
          >
            退课处理
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <IonPage className="bg-gray-100">
      <Quit />
      <div className="relative w-full h-screen mx-6 overflow-auto">
        {/* 导航 */}
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
            <span className="pr-1 text-gray-600">课程管理</span>/
            <span className="pl-1 text-primary-500">课程退订审批</span>
          </div>
        </div>

        {/* 课程退订审批模态框 */}
        <Transition appear show={isRefundOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeRefundModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-center text-gray-900"
                    >
                      课程退订审批
                      <hr className="mt-2 mb-4" />
                    </Dialog.Title>
                    <form
                      onSubmit={onCreate}
                      className="flex flex-col items-center rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 w-36">
                            课程名称:
                          </div>
                          <input
                            className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                            name="eduId"
                            type="text"
                            value={detail.contract?.lessonName}
                            spellCheck={false}
                            readOnly
                          ></input>
                        </div>
                      </div>

                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            总课时
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonName"
                            type="text"
                            value={detail.contract?.lessonTotalTimes}
                            spellCheck={false}
                            readOnly
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            已签到课时:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonTotalTimes"
                            value={detail.negoFinishTimes}
                            spellCheck={false}
                            readOnly
                          ></input>
                        </div>
                      </div>

                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            客户姓名:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonTotalTimes"
                            value={detail.contract?.consumerName}
                            spellCheck={false}
                            readOnly
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            联系电话:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonTotalTimes"
                            value={detail.contract?.consumerPhone}
                            spellCheck={false}
                            readOnly
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            学生姓名:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonTotalTimes"
                            value={detail.contract?.consumerStuName}
                            spellCheck={false}
                            readOnly
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            退款金额:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonTotalTimes"
                            value={Number(detail.negoRefundAmt) / 100}
                            spellCheck={false}
                            onChange={(e) =>
                              setContractNegoDetail({
                                ...detail,
                                ...{
                                  negoRefundAmt: String(
                                    100 * Number(e.detail.value!)
                                  ),
                                },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            补偿金额:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonTotalTimes"
                            value={Number(detail.negoRefundAmt) / 100}
                            spellCheck={false}
                            onChange={(e) =>
                              setContractNegoDetail({
                                ...detail,
                                ...{
                                  negoCompensationAmt: String(
                                    100 * Number(e.detail.value!)
                                  ),
                                },
                              })
                            }
                          ></input>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-2 justify-items-center">
                        <input
                          value="取消"
                          type="button"
                          className="px-6 py-2 border rounded-md "
                          onClick={closeRefundModal}
                        />
                        <input
                          value="确认"
                          type="button"
                          className="px-6 py-2 text-white border rounded-md bg-primary-600"
                          onClick={onManual}
                        />
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* 课程退订审批列表 */}
        <div className="absolute w-full mt-10">
          <table className="w-11/12">
            <thead>
              <tr className="grid items-center h-10 grid-cols-10 gap-10 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">课程名称</th>
                <th className="flex items-center justify-center">
                  总课时（个）
                </th>
                <th className="flex items-center justify-center">已签到课时</th>
                <th className="flex items-center justify-center">客户姓名</th>
                <th className="flex items-center justify-center">联系方式</th>
                <th className="flex items-center justify-center">学生姓名</th>
                <th className="flex items-center justify-center">
                  退款金额（元）
                </th>
                <th className="flex items-center justify-center">
                  补偿金额（元）
                </th>
                <th className="flex items-center justify-center">退订理由</th>
                <th className="flex items-center justify-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {state.contractNego.contractNegoList.map(
                (list: ContractNego, i: any) => (
                  <ListEntry contractNego={list} key={i} />
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default ContractNegoQuery;
