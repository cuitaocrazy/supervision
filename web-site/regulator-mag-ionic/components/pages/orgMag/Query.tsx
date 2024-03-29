//机构管理的查询页面
import { useEffect, useCallback, useContext, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext, setEduOrgList, setEduOrgDetail, setEduOrgEdit } from '../../../appState';
import { EduOrg } from '../../../types/types';
import { IonPage, IonRow, IonCol, useIonToast } from '@ionic/react';
import { Dialog, Transition } from '@headlessui/react';
import EduIsPublic from '../../EduIsPublic';
import Paging from '../../paging';
import Quit from '../../Quit';
import {
  edbEduOrgApplyURL,
  edbEduOrgCreateURL,
  edbEduOrgDelURL,
  edbEduOrgFindURL,
} from 'const/const';

const findURL = edbEduOrgFindURL;
const delURL = edbEduOrgDelURL;
const applyURL = edbEduOrgApplyURL;
const createURL = edbEduOrgCreateURL;

// 课程查询页面
const OrgMagQuery: React.FC = () => {
  const [present, dismiss] = useIonToast();
  // 教育机构新增dialog页面状态
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

  // 删除教育机构模态框的状态
  let [isDeleteOpen, setIsDeleteOpen] = useState(false);
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  function openDeleteModal() {
    setIsDeleteOpen(true);
  }
  /**
   * 确定删除
   * author wqy
   */
  const onCancel = (e: any) => {
    e.preventDefault();

    fetch(delURL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eduId: cancelEduOrg.eduId }),
    })
      .then(res => res.json())
      .then(json => {
        const { result } = json;
        if (result) {
          present({
            message: '删除成功',
            duration: 3000,
            position: 'top',
          });
          onQuery();
        } else
          present({
            buttons: [{ text: '关闭', handler: () => dismiss() }],
            message: '删除失败',
            onDidDismiss: () => console.log('dismissed'),
            onWillDismiss: () => console.log('will dismiss'),
          });
        closeDeleteModal();
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
        const { result, records, total } = json;
        if (result) {
          setTotal(total);
          refreshList(records);
        }
      });
  };

  const onApply = (e: any) => {
    e.preventDefault();

    fetch(applyURL, {
      method: 'post',
      body: JSON.stringify({
        eduId: detail.eduId,
        blackEduCreateReason: backReasonInfo.blackEduCreateReason,
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const { result, msg } = json;
        if (result) {
          present({
            message: '加入黑名单成功',
            position: 'top',
            duration: 3000,
          });
        } else
          present({
            buttons: [{ text: '关闭', handler: () => dismiss() }],
            message: '加入黑名单失败，失败原因：',
            position: 'top',
          });
        closeBlackModal();
      });
  };

  const { state, dispatch } = useContext(AppContext);
  console.log(state);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0); //todo
  const onPageChange = (records: any, total: number, newPage: number) => {
    console.log(records);
    console.log(total);
    console.log(newPage);
    setPage(newPage);
    refreshList(records);
  };
  const [queryInfo, setQueryInfo] = useState({ eduName: '' });
  const [eduOrgState, setEduOrgState] = useState({} as EduOrg);
  const [cancelEduOrg, setCancelEduOrg] = useState({} as EduOrg);
  const [detail, setDetail] = useState({} as EduOrg);
  const [backReasonInfo, setBackReasonState] = useState({ blackEduCreateReason: '' });
  /**
   * 新增弹窗 确定事件
   * @param e
   */
  const onCreate = (e: any) => {
    e.preventDefault();
    console.log(eduOrgState);
    // eduOrgState.eduIsPublic=? TODO 设置公立下拉选择值
    fetch(createURL, {
      method: 'POST',
      body: JSON.stringify(eduOrgState),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const { result, msg } = json;
        console.log('添加结果:' + json);
        if (result) {
          present({
            message: msg, //'机构添加成功',
            position: 'top',
            duration: 3000,
          });
          onQuery();
        } else
          present({
            buttons: [{ text: '关闭', handler: () => dismiss() }],
            message: '机构添加失败，失败原因：' + msg,
            position: 'top',
          });
        closeCreateModal();
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

  /**
   *
   * @param status 教育机构状态
   * @returns
   */
  function getStatus(status: any) {
    //'valid：有效（默认值）；<br />invalid：无效；<br />pending：待审核；<br />reject：拒绝。',
    switch (status) {
      case 'valid':
        return '有效';
      case 'invalid':
        return '无效';
      case 'pending':
        return '待审核';
      case 'reject':
        return '拒绝';
    }
  }
  /**
   *
   * @param isPublic 是否公立
   */

  function getpublicStr(isPublic: number) {
    return isPublic ? '是' : '否';
  }
  const ListEntry = ({ eduOrg, ...props }: { eduOrg: EduOrg }) => (
    <tr className="grid items-center grid-cols-4 gap-10 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 ">
      {/* <td className="flex items-center justify-center leading-10">{eduOrg.eduId}</td>  */}
      <td className="flex items-center justify-center leading-10">{eduOrg.eduName}</td>
      <td className="flex items-center justify-center leading-10">
        {getpublicStr(eduOrg.eduIsPublic! || 0)}
      </td>
      <td className="flex items-center justify-center leading-10">{getStatus(eduOrg.eduStatus)}</td>

      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button className="p-1 text-primary-600" onClick={onDetail(eduOrg)}>
            详情
          </button>
          <button
            className="p-1 text-cyan-600"
            onClick={() => {
              setCancelEduOrg(eduOrg);
              openDeleteModal();
            }}
          >
            删除
          </button>
          <button className="p-1 text-red-600" onClick={onEdit(eduOrg)}>
            编辑
          </button>
          <button
            className="p-1 text-fuchsia-600"
            onClick={() => {
              setDetail(eduOrg);
              openBlackModal();
            }}
          >
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
                      id="handle-form"
                      onSubmit={onCreate}
                      className="flex flex-col items-center rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 w-36">
                            <span className="px-1 text-red-600">*</span>
                            监管机构名称:
                          </div>
                          <input
                            className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                            name="supervisorOrgName"
                            value="北京市教育局"
                            readOnly
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 w-36">
                            <span className="px-1 text-red-600">*</span>
                            教育机构名称:
                          </div>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none"
                            name="eduName"
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                ...{ eduName: e.target?.value },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <div className="flex justify-end p-1 mr-1 w-36">
                            <span className="px-1 text-red-600">*</span>
                            教育机构地址:
                          </div>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduAddress"
                            type="text"
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                ...{ eduAddress: e.target?.value },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">教育机构法人:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduLegalPerson"
                            type="text"
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                ...{ eduLegalPerson: e.target?.value },
                              })
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">法人联系方式:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduLegalPhone"
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                ...{ eduLegalPhone: e.target?.value },
                              })
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <div className="flex justify-end p-1 mr-1 w-36">
                            <span className="px-1 text-red-600">*</span>
                            教育机构联系人:
                          </div>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduContact"
                            type="text"
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                ...{ eduContact: e.target?.value },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <div className="flex justify-end p-1 mr-1 w-36">
                            <span className="px-1 text-red-600">*</span>
                            教育机构联系方式:
                          </div>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduContactPhone"
                            type="text"
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                ...{ eduContactPhone: e.target?.value },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">是否公立:</span>
                          <EduIsPublic
                            isPublic={eduOrgState.eduIsPublic}
                            setIsPublic={v => {
                              setEduOrgState({
                                ...eduOrgState,
                                ...{ eduIsPublic: v },
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">许可文件:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduLicense"
                            type="text"
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                ...{ eduLicense: e.target?.value },
                              })
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <div className="flex justify-end p-1 mr-1 w-36">
                            <span className="px-1 text-red-600">*</span>
                            监管账户:
                          </div>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduSupervisedAccount"
                            type="text"
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                ...{ eduSupervisedAccount: e.target?.value },
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <div className="flex justify-end p-1 mr-1 w-36">
                            <span className="px-1 text-red-600">*</span>
                            普通账户:
                          </div>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduNormalAccount"
                            type="text"
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                ...{ eduNormalAccount: e.target?.value },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">监管商户号:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduSupervisedMerNo"
                            type="text"
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                ...{ eduSupervisedMerNo: e.target?.value },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <div className="flex justify-end p-1 mr-1 w-36">
                            <span className="px-1 text-red-600">*</span>
                            登录名称:
                          </div>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduLoginName"
                            type="text"
                            onChange={e =>
                              setEduOrgState({
                                ...eduOrgState,
                                ...{ eduLoginName: e.target?.value },
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 justify-items-center">
                        <input
                          value="取消"
                          type="button"
                          className="px-6 py-2 border rounded-md "
                          onClick={closeCreateModal}
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
                      onSubmit={onApply}
                      className="flex flex-col items-center rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 w-36">教育机构名称:</div>
                          <input
                            className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                            name="eduName"
                            value={detail.eduName}
                            readOnly
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">教育机构法人:</span>
                          <input
                            className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                            name="eduLegalPerson"
                            type="text"
                            value={detail.eduLegalPerson}
                            readOnly
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            {' '}
                            <span className="px-1 text-red-600">*</span>
                            加入黑名单原因:
                          </span>
                          <textarea
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="blackEduCreateReason"
                            onChange={e =>
                              setBackReasonState({
                                ...backReasonInfo,
                                blackEduCreateReason: e.target?.value,
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
                          onClick={closeBlackModal}
                        />
                        <input
                          value="提交"
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

        {/* 删除教育机构模态框 */}
        <Transition appear show={isDeleteOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
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
                      教育机构删除
                      <hr className="mt-2 mb-4" />
                    </Dialog.Title>
                    <form
                      onSubmit={onCancel}
                      className="flex flex-col items-center rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 ">确定要删除该教育机构？</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 justify-items-center">
                        <input
                          value="取消"
                          type="button"
                          className="px-6 py-2 border rounded-md "
                          onClick={closeDeleteModal}
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
              <tr className="grid items-center h-10 grid-cols-4 gap-10 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">名称</th>
                <th className="flex items-center justify-center">公立</th>
                <th className="flex items-center justify-center">状态</th>
                <th className="flex items-center justify-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {state.eduOrg.eduOrgList.map((list: EduOrg, i: any) => (
                <ListEntry eduOrg={list} key={i} />
              ))}
              <tr>
                <td colSpan={5}>
                  {' '}
                  <Paging
                    url={paramStr}
                    page={page}
                    pagesize={10}
                    total={total}
                    onPageChange={onPageChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default OrgMagQuery;
