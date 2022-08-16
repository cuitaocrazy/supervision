import { useEffect, useCallback, useContext, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext, setTransferManualList } from '../../../appState';
import { Transfer } from '../../../types/types';
import {
  IonPage,
  useIonToast
} from '@ionic/react';
import { Dialog, Transition } from '@headlessui/react';

const queryURL = 'http://localhost:3003/attendannce/query';
const handleTransfer = 'http://localhost:3003/attendannce/handleTransfer';
const createURL = 'http://localhost:3003/tranferManual/query';

const demotransferList: Transfer[] = [
  {
    transferId: '1',
    attendanceId: '1',
    attendanceDate: '2020-01-01',
    attendanceTime: '00:00:00',
    eduId: '1',
    eduName: '教育机构1',
    lessonId: '1',
    lessonName: '课程1',
    consumerId: '1',
    consumerName: '消费者1',
    consumerStuName: '学生1',
    tranLsId: '1',
    supversingAccount: '1111111111',
    normalAccount: '22222222222',
    transferAmt: 100,
    transferResult: 'success',
    reason: '',
  },
  {
    transferId: '2',
    attendanceId: '1',
    attendanceDate: '2020-01-01',
    attendanceTime: '00:00:00',
    eduId: '1',
    eduName: '教育机构1',
    lessonId: '1',
    lessonName: '课程1',
    consumerId: '1',
    consumerName: '消费者1',
    consumerStuName: '学生1',
    tranLsId: '2',
    supversingAccount: '1111111111',
    normalAccount: '22222222222',
    transferAmt: 100,
    transferResult: 'success',
    reason: '',
  },
];

const TransferManualQuery: React.FC = () => {
  const [present, dismiss] = useIonToast();
  // 手动划拨-确认模态框的状态
  const [isConformOpen, setIsConformOpen] = useState(false);
  function closeConformModal() {
    setIsConformOpen(false);
  }
  function OpenConformModal() {
    setIsConformOpen(true);
  }
  const { state, dispatch } = useContext(AppContext);
  const [tranFerManualState, setTranFerManualState] = useState({} as Transfer);
  // const [tranFerManualState, setTranFerManualState] = useState(state.transferManual.transferManualConform);
  const onCreate = async (e: React.FormEvent) => () => {
    e.preventDefault();
    fetch(createURL, {
      method: 'PUT',
      body: JSON.stringify(tranFerManualState),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const result=json
        console.log(result+"result")
        if (result) 
        {
          present({
            message: '手动划拨成功',
            position:'top',
            duration:3000
          })
        } else 
        present({
          buttons: [{ text: '关闭', handler: () => dismiss() }],
          message: '手动划拨失败',
          position:'top',
        })
      });
  };
  const [queryInfo, setQueryInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState({} as Transfer);
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  const paramStr = getParamStr(
    {
      // consumerName:queryInfo.consumerName,
      // lessonName:queryInfo.lessonName,
      // consumerStuName:queryInfo.consumerStuName,
    },
    queryURL
  );
  const refreshList = useCallback(
    (eduOrgs: Transfer[]) => {
      dispatch(setTransferManualList(eduOrgs));
    },
    [dispatch]
  );
  const onTransfer = (item: Transfer) => () => {
    setDetail(item);
    setIsModalOpen(true);
    // doHandle(item)
  };

  const doHandle = async (item: Transfer) => () => {
    fetch(handleTransfer, {
      method: 'POST',
      body: JSON.stringify({
        transferId: item.transferId,
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        alert(json.result);
      });
  };

  const onManual = () => {
    doHandle(detail);
  };
  useEffect(() => {
    // fetch(paramStr, {
    //   method: 'GET',
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8',
    //   },
    // }).then(res => res.json())
    // .then((json) => {
    // const {transferList} = json

    // return })
    refreshList(demotransferList);
  }, []);

  const ListEntry = ({ transfer, ...props }: { transfer: Transfer }) => (
    <tr className="grid items-center grid-cols-7 gap-2 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 ">
      <td className="flex items-center justify-center leading-10">{transfer.eduName}</td>
      <td className="flex items-center justify-center leading-10">{transfer.lessonName}</td>
      <td className="flex items-center justify-center leading-10">{transfer.consumerName}</td>
      <td className="flex items-center justify-center leading-10">{transfer.attendanceDate}</td>
      <td className="flex items-center justify-center leading-10">{transfer.attendanceTime}</td>
      <td className="flex items-center justify-center leading-10">{transfer.transferAmt}</td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button
            className="p-1 text-primary-600"
            // onClick={onTransfer(transfer)}
            onClick={() => {
              setTranFerManualState(transfer);
              OpenConformModal()
            }}
          >
            手动划拨
          </button>
        </div>
      </td>
    </tr>
  );
  console.log(state);
  return (
    <IonPage className="bg-gray-100">
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
            <span className="pl-1 text-primary-500">手动划拨</span>
          </div>
        </div>
        {/* 手动划拨-确认模态框 */}
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
                      手动划拨
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
                            value={tranFerManualState?.eduName}
                            spellCheck={false}
                            onChange={e =>
                              setTranFerManualState({
                                ...tranFerManualState,
                                ...{ eduName: e.nativeEvent.target?.value },
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
                            value={tranFerManualState?.lessonName}
                            spellCheck={false}
                            onChange={e =>
                              setTranFerManualState({
                                ...tranFerManualState,
                                ...{ lessonName: e.nativeEvent.target?.value },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">划拨金额（元）:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="supervisorPhone"
                            type="text"
                            value={tranFerManualState?.transferAmt}
                            spellCheck={false}
                            onChange={e =>
                              setTranFerManualState({
                                ...tranFerManualState,
                                ...{ transferAmt: e.nativeEvent.target?.value },
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
              <tr className="grid items-center h-10 grid-cols-7 gap-2 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">教育机构名称</th>
                <th className="flex items-center justify-center">课程名称</th>
                <th className="flex items-center justify-center">客户姓名</th>
                <th className="flex items-center justify-center">签到日期</th>
                <th className="flex items-center justify-center">签到时间</th>
                <th className="flex items-center justify-center">划拨金额（元）</th>
                <th className="flex items-center justify-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {state.transferManual.transferManualList.map((list: Transfer, i: any) => (
                <ListEntry transfer={list} key={i} />
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
export default TransferManualQuery;
