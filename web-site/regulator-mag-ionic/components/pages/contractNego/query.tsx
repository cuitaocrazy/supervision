//手工退课
import React, { useEffect, useCallback, useContext, useState, Fragment } from 'react';
import { IonPage, IonCol, IonRow, useIonToast } from '@ionic/react';
import { AppContext, setContractNegoList, setContractNegoDetail } from '../../../appState';
import { ContractNego } from '../../../types/types';
import { Dialog, Transition } from '@headlessui/react';
import Quit from '../../Quit';

const queryURL = 'http://localhost:3003/contractNego/query';
const createURL = 'http://localhost:3003/contractNego/query';
const democontractNegoList: ContractNego[] = [];
// const democontractNegoList: ContractNego[] = [
//   {
//     negoId: '1',
//     contractId: '1',
//     negoCreateDate: '2020-01-01',
//     negoCreateTime: '00:00:00',
//     negoIntent: '1111',
//     negoCreator: '1',
//     negoStatus: 'vaild',
//     negoUpdateDate: '2020-01-01',
//     negoUpdateTime: '00:00:00',
//     negoRefundAmt: '111',
//     negoCompensationAmt: '1',
//     negoConsumerAgree: '222',
//     negoConsumerAgreeDate: '2020-01-01',
//     negoConsumerAgreeTime: '00:00:00',
//     negoEduAgree: '111',
//     negoEduAgreeDate: '2020-01-01',
//     negoEduAgreeTime: '00:00:00',
//     contract: {
//       contractId: '1',
//       contractDate: '2020-01-01',
//       contractTime: '00:00:00',
//       contractStatus: 'vaild',
//       contractUpdateDate: '2020-01-01',
//       contractUpdateTime: '2020-01-01',
//       contractUpdateReason: '',
//       eduId: '1',
//       eduName: '教育机构1',
//       lessonId: '1',
//       lessonName: '课程1',
//       lessonType: '类型1',
//       lessonIntroduce: '介绍1',
//       lessonOutline: '大纲1',
//       lessonStartDate: '2020-01-01',
//       lessonEndDate: '2020-01-01',
//       lessonStartTime: '00:00:00',
//       lessonEndTime: '00:00:00',
//       lessonAttendanceType: '类型1',
//       lessonTotalQuantity: '11',
//       lessonTotalPrice: '121',
//       lessonPerPrice: '11',
//       teacherId: '1',
//       teacherName: '教师1',
//       consumerId: '1',
//       consumerName: '消费者1',
//       consumerStuName: '学生1',
//       orderNo: '123123123',
//     },
//   },
// ];

const ContractNegoQuery: React.FC = () => {
  const [present, dismiss] = useIonToast();
  // 手动退课-确认模态框的状态
  const [isConformOpen, setIsConformOpen] = useState(false);
  function closeConformModal() {
    setIsConformOpen(false);
  }
  function OpenConformModal() {
    setIsConformOpen(true);
  }

  const { state, dispatch } = useContext(AppContext);
  const [contractNegoState, setContractNegoState] = useState({} as ContractNego);
  const onCreate = async (e: React.FormEvent) => () => {
    e.preventDefault();
    fetch(createURL, {
      method: 'PUT',
      body: JSON.stringify(contractNegoState),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const result = json;
        console.log(result + 'result');
        if (result) {
          present({
            message: '手工退课成功',
            position: 'top',
            duration: 3000,
          });
        } else
          present({
            buttons: [{ text: '关闭', handler: () => dismiss() }],
            message: '手工退课失败',
            position: 'top',
          });
      });
  };
  const [queryInfo, setQueryInfo] = useState({ contractId: '', orderId: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState({} as ContractNego);
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
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
    setIsModalOpen(true);

    // doSetDetail(item)
  };

  const onManual = () => {
    console.log('提交');
  };

  // const doSetDetail = useCallback(contractNego => {
  //   dispatch({...setContractNegoDetail(contractNego),...{backPage:'/tabs/contractNego/query'}});
  // },[dispatch]);
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
        (contractNego: ContractNego) => contractNego.contractId.indexOf(queryInfo.contractId) > -1
      )
    );
  };

  const ListEntry = ({ contractNego, ...props }: { contractNego: ContractNego }) => (
    <tr className="grid items-center grid-cols-6 gap-2 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 ">
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.eduName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.lessonName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.consumerName}
      </td>
      <td className="flex items-center justify-center leading-10">{contractNego.negoRefundAmt}</td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.lessonTotalPrice}
      </td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button
            className="p-1 text-primary-600"
            // onClick={onDetail(contractNego)}
            onClick={() => {
              setContractNegoState(contractNego);
              OpenConformModal();
            }}
          >
            手工退课
          </button>
        </div>
      </td>
    </tr>
  );

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
            <span className="pr-1 text-gray-600">资金管理</span>/
            <span className="pl-1 text-primary-500">手工退课</span>
          </div>
        </div>
        <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
          <div className="text-base font-bold">快速查询</div>
          <hr className="mt-2 mb-4" />
          <div className="flex">
            <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  合同ID:
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入合同ID"
                  onChange={e => setQueryInfo({ ...queryInfo, ...{ teacherName: e.target.value } })}
                />
              </IonCol>
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  交易系统订单号:
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入交易系统订单号"
                  onChange={e => setQueryInfo({ ...queryInfo, ...{ teacherName: e.target.value } })}
                />
              </IonCol>
              <IonCol className="flex ml-8">
                <button
                  className="w-24 h-12 mr-6 text-white border-2 rounded-md shadow-md bg-primary-600 focus:bg-primary-700"
                  onClick={() => onQuery()}
                >
                  查询
                </button>
              </IonCol>
            </IonRow>
          </div>
        </div>

        {/* 手动退课-确认模态框 */}
        <Transition appear show={isConformOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeConformModal}>
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
                      手动退课
                      <hr className="mt-2 mb-4" />
                    </Dialog.Title>
                    <form
                      onSubmit={onCreate}
                      className="flex flex-col items-center rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 mr-1 w-36">教育机构名称:</div>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="supervisorLoginName"
                            type="text"
                            value={contractNegoState?.contract?.eduName}
                            spellCheck={false}
                            onChange={e =>
                              setContractNegoState({
                                ...contractNegoState,
                                ...{ eduName: e.target?.value },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>

                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">课程名称:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="supervisorUsername"
                            type="text"
                            value={contractNegoState?.contract?.lessonName}
                            spellCheck={false}
                            onChange={e =>
                              setContractNegoState({
                                ...contractNegoState,
                                ...{ lessonName: e.target?.value },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">退课金额（元）:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="supervisorPhone"
                            type="text"
                            value={contractNegoState?.negoRefundAmt}
                            spellCheck={false}
                            onChange={e =>
                              setContractNegoState({
                                ...contractNegoState,
                                ...{ negoRefundAmt: e.target?.value },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">补偿金额（元）:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="supervisorPhone"
                            type="text"
                            value={contractNegoState?.negoCompensationAmt}
                            spellCheck={false}
                            onChange={e =>
                              setContractNegoState({
                                ...contractNegoState,
                                ...{ negoCompensationAmt: e.target?.value },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 justify-items-center">
                        <input
                          value="取消"
                          type="button"
                          className="px-6 py-2 border rounded-md "
                          onClick={closeConformModal}
                        />
                        <input
                          value="确定"
                          type="submit"
                          className="px-6 py-2 text-white border rounded-md bg-primary-600"
                        />
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* 列表 */}
        <div className="absolute w-full mt-10">
          <table className="w-11/12">
            <thead>
              <tr className="grid items-center h-10 grid-cols-6 gap-2 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">教育机构名称</th>
                <th className="flex items-center justify-center">课程名称</th>
                <th className="flex items-center justify-center">客户姓名</th>
                <th className="flex items-center justify-center">退课金额（元）</th>
                <th className="flex items-center justify-center">补偿金额（元）</th>
                <th className="flex items-center justify-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {state.contractNego.contractNegoList.map((list: ContractNego, i: any) => (
                <ListEntry contractNego={list} key={i} />
              ))}
              <tr>
                {/* <td colSpan={5}> <Paging url={paramStr} page={page} pagesize={20} total={total} onPageChange={onPageChange}/></td> */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default ContractNegoQuery;
