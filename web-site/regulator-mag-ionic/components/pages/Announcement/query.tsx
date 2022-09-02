import React, { useState, Fragment, useEffect, useCallback, useContext, useRef } from 'react';
import { IonPage, IonRow, IonCol, useIonToast } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import {
  AppContext,
  setAnnouncementList,
  setAnnouncementDetail,
  setAnnouncementEdit,
} from '../../../appState';
import { Announcement } from '../../../types/types';
import { PickerColumn } from '@ionic/core';
import { Dialog, Transition } from '@headlessui/react';
import RichText from '../../RichText';
import { EditorState, convertToRaw } from 'draft-js';
import Quit from '../../Quit';
import Paging from '../../paging';
import {
  edbAnnouncementFindURL,
  edbAnnouncementCreateURL,
  edbAnnouncementDelURL,
  edbAnnouncementStatusURL,
} from 'const/const';
import localforage from 'localforage';

const queryURL = edbAnnouncementFindURL;
const delURL = edbAnnouncementDelURL;
const createUrl = edbAnnouncementCreateURL;
const offOn = edbAnnouncementStatusURL;

const AnnouncementQuery: React.FC = () => {
  const [present, dismiss] = useIonToast();
  // 新增模态框的状态
  let [isCreateOpen, setIsCreateOpen] = useState(false);
  function closeCreateModal() {
    setIsCreateOpen(false);
  }
  function openCreateModal() {
    setIsCreateOpen(true);
  }

  // 删除模态框的状态
  let [isDeleteOpen, setIsDeleteOpen] = useState(false);
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  function openDeleteModal() {
    setIsDeleteOpen(true);
  }

  let [isOffOpen, setIsOffOpen] = useState(false);
  const [off, setOff] = useState({} as Announcement);
  //撤回
  function closeOffModal() {
    setIsOffOpen(false);
  }
  function openOffModal() {
    setIsOffOpen(true);
  }
  const onOff = (status: string) => (e: React.FormEvent) => {
    e.preventDefault();
    fetch(offOn, {
      method: 'POST',
      body: JSON.stringify({ announcementId: off.announcementId, announcementStatus: status }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const { result } = json;
        if (result) {
          present({
            message: '公告回撤成功',
            position: 'top',
            duration: 3000,
          });
          onQuery();
        } else
          present({
            buttons: [{ text: '关闭', handler: () => dismiss() }],
            message: '课程回撤失败',
            position: 'top',
          });
        closeOffModal();
      });
  };

  const { state, dispatch } = useContext(AppContext);
  const editor = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [createAnnouncement, setCreateAnnouncement] = useState({} as Announcement);
  const [delAnnouncement, setDelAnnouncement] = useState({} as Announcement);
  const [loginName, setLoginName] = useState('');

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const onPageChange = (records: any, total: number, newPage: number) => {
    setPage(newPage);
    refreshList(records);
  };
  const [queryInfo, setQueryInfo] = useState({ announcementTitle: '' });
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  const paramStr = getParamStr(
    {
      announcementTitle: queryInfo.announcementTitle,
    },
    queryURL
  );

  const refreshList = useCallback(
    (announList: Announcement[]) => {
      dispatch(setAnnouncementList(announList));
    },
    [dispatch]
  );
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
  useEffect(() => {
    localforage.getItem('loginName').then(value => {
      setLoginName(value as string);
    });
    onQuery();
  }, []);
  const onDetail = (item: Announcement) => () => {
    doSetDetail(item);
  };
  const onEdit = (item: Announcement) => () => {
    doSetEdit(item);
  };

  const onCancel = (e: any) => {
    e.preventDefault();
    fetch(delURL, {
      method: 'delete',
      body: JSON.stringify({
        announcementId: delAnnouncement.announcementId,
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const { result } = json;
        if (result) {
          present({
            message: '政策公告删除成功',
            position: 'top',
            duration: 3000,
          });
          onQuery();
        } else
          present({
            buttons: [{ text: '关闭', handler: () => dismiss() }],
            message: '政策公告删除失败',
            position: 'top',
          });
        closeDeleteModal();
      });
  };

  const doSetDetail = useCallback(
    (item: Announcement | undefined) => {
      dispatch({ ...setAnnouncementDetail(item), ...{ backPage: '/tabs/announcement/query' } });
    },
    [dispatch]
  );

  const doSetEdit = useCallback(
    (item: Announcement | undefined) => {
      dispatch({ ...setAnnouncementEdit(item), ...{ backPage: '/tabs/announcement/query' } });
    },
    [dispatch]
  );

  const onCreate = (e: any) => {
    e.preventDefault();
    // createAnnouncement.announcementContent = '政策公告呢'
    createAnnouncement.announcementAnnouncer = loginName;
    fetch(createUrl, {
      method: 'POST',
      body: JSON.stringify(createAnnouncement),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const { result } = json;
        if (result) {
          present({
            message: '政策公告添加成功',
            position: 'top',
            duration: 3000,
          });
          onQuery();
        } else
          present({
            buttons: [{ text: '关闭', handler: () => dismiss() }],
            message: '政策公告添加失败',
            position: 'top',
          });
        closeCreateModal();
      });
  };

  const ListEntry = ({ announcement, ...props }: { announcement: Announcement }) => (
    <tr className="grid items-center grid-cols-4 gap-10 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 ">
      <td className="flex items-center justify-center leading-10">
        {announcement.announcementTitle}
      </td>
      <td className="flex items-center justify-center leading-10">
        {announcement.announcementContent}
      </td>
      <td className="flex items-center justify-center leading-10">
        {announcement.announcementDate}
      </td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button className="p-1 text-primary-600" onClick={onDetail(announcement)}>
            详情
          </button>

          {announcement.announcementStatus === 'off' ? (
            <button className="p-1 text-cyan-600" onClick={onEdit(announcement)}>
              编辑
            </button>
          ) : (
            <></>
          )}
          {announcement.announcementStatus === 'on' ? (
            <button
              className="p-1 text-fuchsia-600"
              onClick={() => {
                setOff(announcement);
                openOffModal();
              }}
            >
              撤回
            </button>
          ) : (
            <button
              className="p-1 text-red-600"
              onClick={() => {
                setDelAnnouncement(announcement);
                openDeleteModal();
              }}
            >
              删除
            </button>
          )}
        </div>
      </td>
    </tr>
  );
  if (state.announcement.announcementDetail) {
    return <Redirect to="/tabs/announcement/detail" />;
  }
  if (state.announcement.announcementEdit) {
    return <Redirect to="/tabs/announcement/edit" />;
  }
  if (
    state.announcement.announcementDetail == null ||
    state.announcement.announcementDetail == undefined
  ) {
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
              <span className="pr-1 text-gray-600">教育机构管理</span>/
              <span className="pl-1 text-primary-500">政策公告</span>
            </div>
          </div>
          <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
            <div className="text-base font-bold">快速查询</div>
            <hr className="mt-2 mb-4" />
            <div className="flex">
              <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
                <IonCol className="flex ml-8 text-gray-800">
                  <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                    发布标题:
                  </div>
                  <input
                    type="text"
                    className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                    placeholder="请输入发布标题"
                    onChange={e =>
                      setQueryInfo({ ...queryInfo, ...{ announcementTitle: e.target.value } })
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
                  <button
                    className="w-24 h-12 bg-gray-100 rounded-md shadow-md text-primary-600 focus:bg-gray-200"
                    onClick={openCreateModal}
                  >
                    新增
                  </button>
                </IonCol>
              </IonRow>
            </div>
          </div>

          {/* 新增政策模态框 */}
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
                        政策公告新增
                        <hr className="mt-2 mb-4" />
                      </Dialog.Title>
                      <form
                        onSubmit={onCreate}
                        className="flex flex-col items-center rounded-lg justify-items-center"
                      >
                        <div className="flex items-center mb-4 justify-items-center">
                          <div className="flex leading-7 justify-items-center">
                            <div className="flex justify-end p-1 w-36">发布日期:</div>
                            <input
                              className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                              type="date"
                              name="announcementDate"
                              onChange={e =>
                                setCreateAnnouncement({
                                  ...createAnnouncement,
                                  announcementDate: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="flex items-center mb-4 justify-items-center">
                          <div className="flex justify-items-center">
                            <span className="flex justify-end p-1 mr-1 w-36">
                              <span className="px-1 text-red-600">*</span>
                              政策标题:
                            </span>
                            <input
                              className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                              type="text"
                              spellCheck={false}
                              onChange={e =>
                                setCreateAnnouncement({
                                  ...createAnnouncement,
                                  ...{ announcementTitle: e.target?.value },
                                })
                              }
                              required
                            ></input>
                          </div>
                        </div>
                        <div className="flex items-center mb-4 justify-items-center">
                          <div className="flex justify-items-center">
                            <span className="flex justify-end p-1 mr-1 w-36">政策内容:</span>
                            <div className="w-64 p-1 text-gray-600 justify-self-start focus:outline-none focus:glow-primary-600">
                              {/* todo <RichText
                                ref={editor}
                                editorState={editorState}
                                onChange={(editorState: any) => {
                                  setEditorState(editorState);
                                }}
                              /> */}
                              <textarea
                                className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                                onChange={e =>
                                  setCreateAnnouncement({
                                    ...createAnnouncement,
                                    announcementContent: e.target?.value,
                                  })
                                }
                              />
                            </div>
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

          {/* 删除公告模态框 */}
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
                        政策公告删除
                        <hr className="mt-2 mb-4" />
                      </Dialog.Title>
                      <form
                        onSubmit={onCancel}
                        className="flex flex-col items-center rounded-lg justify-items-center"
                      >
                        <div className="flex items-center mb-4 justify-items-center">
                          <div className="flex leading-7 justify-items-center">
                            <div className="flex justify-end p-1 ">确定要删除该政策公告？</div>
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
          {/* 撤回公告模态框 */}
          <Transition appear show={isOffOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeOffModal}>
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
                        政策公告回撤
                        <hr className="mt-2 mb-4" />
                      </Dialog.Title>
                      <form
                        onSubmit={onOff('off')}
                        className="flex flex-col items-center rounded-lg justify-items-center"
                      >
                        <div className="flex items-center mb-4 justify-items-center">
                          <div className="flex leading-7 justify-items-center">
                            <div className="flex justify-end p-1 ">确定要回撤该政策公告？</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 justify-items-center">
                          <input
                            value="取消"
                            type="button"
                            className="px-6 py-2 border rounded-md "
                            onClick={closeOffModal}
                          />
                          <input
                            value="回撤"
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
                <tr className="grid items-center h-10 grid-cols-5 gap-2 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                  <th className="flex items-center justify-center">政策标题</th>
                  <th className="flex items-center justify-center">政策内容</th>
                  <th className="flex items-center justify-center">发布日期</th>
                  <th className="flex items-center justify-center">操作</th>
                </tr>
              </thead>
              <tbody>
                {state.announcement.announcementList.map((list: Announcement, i: any) => (
                  <ListEntry announcement={list} key={i} />
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
  } else {
    return <Redirect to="/tabs/announcement/detail" />;
  }
};
export default AnnouncementQuery;
