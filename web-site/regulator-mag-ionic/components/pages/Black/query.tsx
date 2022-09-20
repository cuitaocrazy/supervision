import { useEffect, useCallback, useContext, useState, useRef, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext, setBlackList, setBlackDetail } from '../../../appState';
import { Black } from '../../../types/types';
import { IonPage, IonRow, IonCol, useIonToast } from '@ionic/react';
import { Dialog, Transition } from '@headlessui/react';
import Paging from '../../paging';
import Quit from '../../Quit';
import { edbSupervisorBackEduFindURL, edbSupervisorBackEduRemoveURL } from 'const/const';

const queryURL = edbSupervisorBackEduFindURL;
const delURL = edbSupervisorBackEduRemoveURL;
// 黑名单查询页面
const BlackEduOrgQuery: React.FC = () => {
  const [present, dismiss] = useIonToast();

  const [deleteState, setDeleteState] = useState({} as Black);
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({ eduName: '' });
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(101); //todo
  const onPageChange = (records: any, total: number, newPage: number) => {
    console.log(records);
    console.log(total);
    console.log(newPage);
    setPage(newPage);
    refreshList(records);
  };
  const refreshList = useCallback(
    (item: Black[]) => {
      dispatch(setBlackList(item));
    },
    [dispatch]
  );

  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  const paramStr = getParamStr(
    {
      eduName: queryInfo.eduName,
    },
    queryURL
  );

  const onDetail = (item: Black) => () => {
    doSetDetail(item);
  };

  const doSetDetail = useCallback(
    (item: Black) => {
      dispatch({ ...setBlackDetail(item), ...{ backPage: '/tabs/black/query' } });
    },
    [dispatch]
  );
  useEffect(() => {
    onQuery();
  }, []);
  //查询
  const onQuery = () => {
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        const { result, records, total } = json;
        if (result) {
          setTotal(total);
          refreshList(records);
        }
        return;
      });
  };
  // 删除黑名单模态框的状态
  let [isDeleteOpen, setIsDeleteOpen] = useState(false);
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  function openDeleteModal() {
    setIsDeleteOpen(true);
  }
  //删除
  const onCancel = (e: any) => {
    e.preventDefault();
    fetch(delURL, {
      method: 'delete',
      body: JSON.stringify({
        eduId: deleteState.eduId,
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const { result } = json;
        console.log(result + 'result');
        if (result) {
          present({
            message: '教育机构黑名单删除成功',
            position: 'top',
            duration: 3000,
          });
          onQuery();
        } else
          present({
            buttons: [{ text: '关闭', handler: () => dismiss() }],
            message: '教育机构黑名单删除失败',
            position: 'top',
          });
        closeDeleteModal();
      });
  };
  const ListEntry = ({ item, ...props }: { item: Black }) => (
    <tr className="grid items-center grid-cols-3 gap-10 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 ">
      <td className="flex items-center justify-center leading-10">{item.eduName}</td>
      <td className="flex items-center justify-center leading-10">{item.blackEduCreateReason}</td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button className="p-1 text-primary-600" onClick={onDetail(item)}>
            详情
          </button>
          <button
            className="p-1 text-red-600"
            onClick={() => {
              setDeleteState(item);
              openDeleteModal();
            }}
          >
            删除
          </button>
        </div>
      </td>
    </tr>
  );
  if (state.black.blackDetail) {
    return <Redirect to="/tabs/black/detail" />;
  }

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
            <span className="pr-1 text-gray-600">系统管理</span>/
            <span className="pl-1 text-primary-500">黑名单管理</span>
          </div>
        </div>
        <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
          <div className="text-base font-bold">快速查询</div>
          <hr className="mt-2 mb-4" />
          <div className="flex">
            <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  机构名称:
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入机构名称"
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
              </IonCol>
            </IonRow>
          </div>
        </div>
        {/* 删除课程模态框 */}
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
                      用户删除
                      <hr className="mt-2 mb-4" />
                    </Dialog.Title>
                    <form
                      onSubmit={onCancel}
                      className="flex flex-col items-center rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 ">
                            确定要删除该黑名单教育机构吗？
                          </div>
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
              <tr className="grid items-center h-10 grid-cols-3 gap-2 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">机构名称</th>
                <th className="flex items-center justify-center">加入原因</th>
                <th className="flex items-center justify-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {state.black.blackList.map((list: Black, i: any) => (
                <ListEntry item={list} key={i} />
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
export default BlackEduOrgQuery;
