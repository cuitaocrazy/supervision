//机构管理的查询页面
import { useEffect, useCallback, useContext, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext, setEduOrgList, setEduOrgDetail, setEduOrgEdit } from '../../../appState';
import { EduOrg } from '../../../types/types';
import { modalController } from '@ionic/core';
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonModal,
  IonContent,
  IonInput,
  IonRadioGroup,
  IonRadio,
  IonRouterLink,
} from '@ionic/react';
import { Dialog, Transition } from '@headlessui/react';
import EduIsPublic from '../../EduIsPublic';

const findURL = 'http://localhost:3003/edb/eduOrg/find';
const delURL = 'http://localhost:3003/eduOrg/del';
const modifyURL = 'http://localhost:3003/eduOrg/modifyURL';
const applyURL = 'http://localhost:3003/eduOrg/apply';
const createURL = 'http://localhost:3003/eduOrg/create';

// 课程查询页面
const OrgMagQuery: React.FC = () => {
  // 课程新增dialog页面状态
  let [isCreateOpen, setIsCreateOpen] = useState(false);
  function closeCreateModal() {
    setIsCreateOpen(false);
  }
  function openCreateModal() {
    setIsCreateOpen(true);
  }
  // 加入黑名单dialog页面状态
  let [isBlackeOpen, setIsBlackOpen] = useState(false);
  function closeBlackModal() {
    setIsBlackOpen(false);
  }
  function openBlackModal() {
    setIsBlackOpen(true);
  }

  const onCancel = (item: EduOrg) => () => {
    fetch(delURL, {
      method: 'PUT',
      body: JSON.stringify({
        eduId: item.eduId,
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

  const onQuery = () => {
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const { result, records } = json; //todo
        refreshList(records);
      });
  };

  const onApply = (item: EduOrg) => () => {
    fetch(modifyURL, {
      method: 'PUT',
      body: JSON.stringify({
        eduId: item.eduId,
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

  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({ eduName: '' });
  const [eduOrgState, setEduOrgState] = useState({} as EduOrg);
  const onCreate = async (e: React.FormEvent) => () => {
    e.preventDefault();
    fetch(createURL, {
      method: 'PUT',
      body: JSON.stringify(eduOrgState),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        alert(json.result);
      });
  };
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => {
      if (params[key]) result = result + key + '=' + params[key] + '&';
    });
    return url + result;
  };
  const paramStr = getParamStr(
    {
      eduName: queryInfo.eduName,
    },
    findURL
  );

  const refreshList = useCallback(
    (eduOrgs: EduOrg[]) => {
      dispatch(setEduOrgList(eduOrgs));
    },
    [dispatch]
  );

  const onDetail = (item: EduOrg) => () => {
    doSetDetail(item);
  };

  const doSetDetail = useCallback(
    (eduOrg: EduOrg) => {
      dispatch({ ...setEduOrgDetail(eduOrg), ...{ backPage: '/tabs/orgMag/query' } });
    },
    [dispatch]
  );

  const onEdit = (item: EduOrg) => () => {
    doSetEdit(item);
  };

  const doSetEdit = useCallback(
    (eduOrg: EduOrg) => {
      dispatch({ ...setEduOrgEdit(eduOrg), ...{ backPage: '/tabs/orgMag/query' } });
    },
    [dispatch]
  );
  useEffect(onQuery, []);

  const ListEntry = ({ eduOrg, key, ...props }: { eduOrg: EduOrg; key: any }) => (
    <tr
      key={key}
      className="grid items-center grid-cols-4 gap-10 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 "
    >
      <td className="flex items-center justify-center leading-10">{eduOrg.eduId}</td>
      <td className="flex items-center justify-center leading-10">{eduOrg.eduName}</td>
      <td className="flex items-center justify-center leading-10">{eduOrg.eduStatus}</td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button className="p-1 text-primary-600" onClick={onDetail(eduOrg)}>
            详情
          </button>
          <button className="p-1 text-cyan-600" onClick={onCancel(eduOrg)}>
            删除
          </button>
          <button className="p-1 text-red-600" onClick={onEdit(eduOrg)}>
            编辑
          </button>
          <button className="p-1 text-fuchsia-600" onClick={openBlackModal}>
            加入黑名单
          </button>
        </div>
      </td>
    </tr>
  );
  if (state.eduOrg.eduOrgDetail) {
    return <Redirect to="/tabs/orgMag/detail" />;
  }
  if (state.eduOrg.eduOrgEdit) {
    return <Redirect to="/tabs/orgMag/edit" />;
  }

  return (
    <IonPage className="bg-gray-100 ">
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
            <span className="pr-1 text-gray-600">教育机构管理</span>/
            <span className="pl-1 text-primary-500">教育机构管理</span>
          </div>
        </div>
        <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
          <div className="text-base font-bold">快速查询</div>
          <hr className="mt-2 mb-4" />
          <div className="flex">
            <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  教育机构名称：
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入教育机构名称"
                  onChange={e => setQueryInfo({ ...queryInfo, ...{ eduName: e.target.value } })}
                />
              </IonCol>
              <IonCol className="flex ml-8">
                <button
                  className="w-24 h-12 mr-6 text-white border-2 rounded-md shadow-md bg-primary-600 focus:bg-primary-700"
                  onClick={() => onQuery()}
                >
                  查询
                </button>
                <button
                  className="w-24 h-12 rounded-md shadow-md bg-gray-50 text-primary-600 focus:bg-gray-200"
                  onClick={openCreateModal}
                >
                  新增
                </button>
              </IonCol>
            </IonRow>
          </div>
        </div>

        {/* 新增教育机构模态框 */}
        <Transition appear show={isCreateOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeCreateModal}>
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
                      新增教育机构
                      <hr className="mt-2 mb-4" />
                    </Dialog.Title>
                    <form
                      onSubmit={onCreate}
                      className="flex flex-col items-center rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 w-36">教育机构名称:</div>
                          <input
                            className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                            name="eduName"
                            value={eduOrgState.eduName}
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                eduName: e.nativeEvent.target?.value,
                              })
                            }
                            readOnly
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">教育机构地址:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduAddress"
                            type="text"
                            value={eduOrgState.eduAddress}
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                eduAddress: e.nativeEvent.target?.value,
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      {/* <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">教育机构法人:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonTotalTimes"
                            type="text"
                            value={eduOrgState.eduLegalPerson}
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                eduLegalPerson: e.nativeEvent.target?.value,
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">法人联系方式:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonTotalPrice"
                            value={eduOrgState.eduLegalPhone}
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                eduLegalPhone: e.nativeEvent.target?.value,
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">教育机构联系人:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduContact"
                            type="text"
                            value={eduOrgState.eduContact}
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                eduContact: e.nativeEvent.target?.value,
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">教育机构联系方式:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduContactPhone"
                            type="text"
                            value={eduOrgState.eduContactPhone}
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                eduContactPhone: e.nativeEvent.target?.value,
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">是否公立:</span>
                          <EduIsPublic />
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">教育机构:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduLicense"
                            type="text"
                            value={eduOrgState.eduLicense}
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                eduLicense: e.nativeEvent.target?.value,
                              })
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">监管账户:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduSupervisedAccount"
                            type="text"
                            value={eduOrgState.eduSupervisedAccount}
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                eduSupervisedAccount: e.nativeEvent.target?.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">普通账户:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduSupervisedAccount"
                            type="text"
                            value={eduOrgState.eduSupervisedAccount}
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                eduSupervisedAccount: e.nativeEvent.target?.value,
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">支付商户号:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduSupervisedMerNo"
                            type="text"
                            value={eduOrgState.eduSupervisedMerNo}
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                eduSupervisedMerNo: e.nativeEvent.target?.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">登录名称:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduLoginName"
                            type="text"
                            value={eduOrgState.eduLoginName}
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                eduLoginName: e.nativeEvent.target?.value,
                              })
                            }
                          />
                        </div>
                      </div> */}
                      <div className="flex items-center gap-4 mt-2 justify-items-center">
                        <input
                          value="返回"
                          type="button"
                          className="px-6 py-2 border rounded-md "
                          onClick={closeCreateModal}
                        />
                        <input
                          value="提交"
                          type="button"
                          className="px-6 py-2 text-white border rounded-md bg-primary-600"
                          onClick={closeCreateModal}
                        />
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* 加入黑名单 */}
        <Transition appear show={isBlackeOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeBlackModal}>
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
                      加入黑名单
                      <hr className="mt-2 mb-4" />
                    </Dialog.Title>
                    <form
                      onSubmit={onCreate}
                      className="flex flex-col items-center rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 w-36">教育机构名称:</div>
                          <input
                            className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                            name="eduName"
                            value={eduOrgState.eduName}
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                eduName: e.nativeEvent.target?.value,
                              })
                            }
                            readOnly
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">教育机构法人:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonTotalTimes"
                            type="text"
                            value={eduOrgState.eduLegalPerson}
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                eduLegalPerson: e.nativeEvent.target?.value,
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">加入黑名单原因:</span>
                          <textarea
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduAddress"
                            // onChange={e => setEduOrgState({...eduOrgState, eduAddress: e.nativeEvent.target?.value})}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-2 justify-items-center">
                        <input
                          value="返回"
                          type="button"
                          className="px-6 py-2 border rounded-md "
                          onClick={closeBlackModal}
                        />
                        <input
                          value="提交"
                          type="button"
                          className="px-6 py-2 text-white border rounded-md bg-primary-600"
                          onClick={closeBlackModal}
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
              <tr className="grid items-center h-10 grid-cols-4 gap-10 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">教育机构ID</th>
                <th className="flex items-center justify-center">名称</th>
                <th className="flex items-center justify-center">状态</th>
                <th className="flex items-center justify-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {state.eduOrg.eduOrgList.map((list: EduOrg, i: any) => (
                <ListEntry eduOrg={list} key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default OrgMagQuery;
