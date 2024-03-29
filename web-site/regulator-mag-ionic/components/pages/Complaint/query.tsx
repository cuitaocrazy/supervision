import { useEffect, useCallback, useContext, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext, setComplaintList, setComplaintDetail } from '../../../appState';
import { Complaint } from '../../../types/types';
import { IonPage, IonRow, IonCol, useIonToast } from '@ionic/react';
import { Dialog, Transition } from '@headlessui/react';
import Quit from '../../Quit';
import { edbComplainFindURL } from 'const/const'
const createURL = 'http://localhost:3003/complaint/detail';

const ComplaintQuery: React.FC = () => {
  const [present, dismiss] = useIonToast();
  // 去处理dialog页面状态
  let [isDealOpen, setIsDealOpen] = useState(false);
  function closeDealModal() {
    setIsDealOpen(false);
  }
  function openDealModal() {
    setIsDealOpen(true);
  }

  const { state, dispatch } = useContext(AppContext);
  const [complaintState, setComplaintState] = useState({} as Complaint);
  const onCreate = async (e: React.FormEvent) => () => {
    e.preventDefault();
    fetch(createURL, {
      method: 'PUT',
      body: JSON.stringify(complaintState),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const result = { true: Boolean };
        if (result) {
          present({
            message: '投诉处理提交成功',
            position: 'top',
            duration: 3000,
          });
          onQuery();
        } else
          present({
            buttons: [{ text: '关闭', handler: () => dismiss() }],
            message: '投诉处理提交失败',
            position: 'top',
          });
      });
  };
  type QueryInfo = Partial<Pick<Complaint, 'complaintTitle'>>
  const [queryInfo, setQueryInfo] = useState<QueryInfo>();

  const onDetail = (item: Complaint) => () => {
    doSetDetail(item);
  };

  const doSetDetail = useCallback(
    (item: Complaint | undefined) => {
      dispatch({ ...setComplaintDetail(item), ...{ backPage: '/tabs/complaint/query' } });
    },
    [dispatch]
  );
  const getParamStr = (params: QueryInfo | undefined, url: string) => {
    if (!params) return url;
    let result = '?';
    Object.entries(params).forEach(([key, value]) => result = `${result}${key}=${value}&`)
    return url + result;
  };
  const paramStr = getParamStr(
    queryInfo,
    edbComplainFindURL
  );
  const refreshList = useCallback(
    (eduOrgs: Complaint[]) => {
      dispatch(setComplaintList(eduOrgs));
    },
    [dispatch]
  );

  useEffect(() => {
    onQuery()
  }, []);

  const onQuery = () => {
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
      .then(({ result, page: { objs, pageNumber } }) => {
        refreshList(objs);
      })
  };

  const ListEntry = ({ complaint, ...props }: { complaint: Complaint }) => (
    <tr className="grid items-center grid-cols-7 gap-2 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 ">
      <td className="flex items-center justify-center leading-10">{complaint.complaintTitle}</td>
      <td className="flex items-center justify-center leading-10">{complaint.complaintType}</td>
      <td className="flex items-center justify-center leading-10">{complaint.complaintContent}</td>
      <td className="flex items-center justify-center leading-10">{complaint.complaintDate}</td>
      <td className="flex items-center justify-center leading-10">{complaint.complaintGrade}</td>
      <td className="flex items-center justify-center leading-10">{complaint.complaintStatus}</td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button className="p-1 text-primary-600" onClick={onDetail(complaint)}>
            详情
          </button>
          <button
            className="p-1 text-cyan-600"
            onClick={() => {
              setComplaintState(complaint);
              openDealModal();
            }}
          >
            去处理
          </button>
        </div>
      </td>
    </tr>
  );
  if (state.complaint.complaintDetail == null || state.complaint.complaintDetail == undefined) {
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
              <span className="pr-1 text-gray-600">业务管理</span>/
              <span className="pl-1 text-primary-500">投诉管理</span>
            </div>
          </div>
          <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
            <div className="text-base font-bold">快速查询</div>
            <hr className="mt-2 mb-4" />
            <div className="flex">
              <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
                <IonCol className="flex ml-8 text-gray-800">
                  <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                    投诉标题:
                  </div>
                  <input
                    type="text"
                    className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                    placeholder="请输入标题"
                    onChange={e =>
                      setQueryInfo(pre => ({ ...pre, complaintTitle: e.target.value }))
                    }
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
          {/* 去处理 */}
          <Transition appear show={isDealOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeDealModal}>
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
                        去处理
                        <hr className="mt-2 mb-4" />
                      </Dialog.Title>
                      <form
                        onSubmit={onCreate}
                        className="flex flex-col items-center rounded-lg justify-items-center"
                      >
                        <div className="flex items-center mb-4 justify-items-center">
                          <div className="flex leading-7 justify-items-center">
                            <div className="flex justify-end p-1 w-36">投诉标题:</div>
                            <input
                              className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                              name="eduName"
                              value={complaintState.complaintTitle}
                              onChange={e =>
                                setComplaintState({
                                  ...complaintState,
                                  complaintTitle: e.target?.value,
                                })
                              }
                              readOnly
                            ></input>
                          </div>
                        </div>
                        <div className="flex items-center mb-4 justify-items-center">
                          <div className="flex justify-items-center">
                            <span className="flex justify-end p-1 mr-1 w-36">投诉内容:</span>
                            <input
                              className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                              name="lessonTotalTimes"
                              type="text"
                              value={complaintState.complaintContent}
                              onChange={e =>
                                setComplaintState({
                                  ...complaintState,
                                  complaintContent: e.target?.value,
                                })
                              }
                              required
                            ></input>
                          </div>
                        </div>
                        <div className="flex items-center mb-4 justify-items-center">
                          <div className="flex justify-items-center">
                            <span className="flex justify-end p-1 mr-1 w-36">处理结果:</span>
                            <textarea
                              className="w-64 h-32 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                              name="eduAddress"
                              onChange={e =>
                                setComplaintState({
                                  ...complaintState,
                                  complaintDescResu: e.target?.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-2 justify-items-center">
                          <input
                            value="返回"
                            type="button"
                            className="px-6 py-2 border rounded-md "
                            onClick={closeDealModal}
                          />
                          <input
                            value="提交"
                            type="button"
                            className="px-6 py-2 text-white border rounded-md bg-primary-600"
                            onClick={closeDealModal}
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
                  <th className="flex items-center justify-center">投诉标题</th>
                  <th className="flex items-center justify-center">投诉类型</th>
                  <th className="flex items-center justify-center">投诉内容</th>
                  <th className="flex items-center justify-center">投诉日期</th>
                  <th className="flex items-center justify-center">紧急状态</th>
                  <th className="flex items-center justify-center">投诉状态</th>
                  <th className="flex items-center justify-center">操作</th>
                </tr>
              </thead>
              <tbody>
                {state.complaint.complaintList.map((list: Complaint, i: any) => (
                  <ListEntry complaint={list} key={i} />
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
  } else {
    return <Redirect to="/tabs/Complaint/detail" />;
  }
};
export default ComplaintQuery;
