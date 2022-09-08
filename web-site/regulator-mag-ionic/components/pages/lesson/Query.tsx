//Lesson的查询页面
import { useEffect, useCallback, useContext, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext, setLessonList, setLessonDetail, setLessonAudit } from '../../../appState';
import { Lesson } from '../../../types/types';
import { IonPage, IonList, IonLabel, IonItem, IonRow, IonCol, useIonToast } from '@ionic/react';
import { Dialog, Transition } from '@headlessui/react';
import Paging from '../../paging';
import Quit from '../../Quit';
import { edbEduLessonFindURL, edbLessonOffURL } from 'const/const';
import { getLessonStatusForList } from 'const/dicData';
const findURL = edbEduLessonFindURL;
const offURL = edbLessonOffURL;
// 课程查询页面
const LessonQuery: React.FC = () => {
  const [present, dismiss] = useIonToast();
  // 课程下架dialog页面状态
  let [isOffOpen, setIsOffOpen] = useState(false);
  const [offLesson, setOffLesson] = useState({} as Lesson);

  function closeOffModal() {
    setIsOffOpen(false);
  }
  function openOffModal() {
    setIsOffOpen(true);
  }
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const onPageChange = (records: any, total: number, newPage: number) => {
    console.log(records);
    console.log(total);
    console.log(newPage);
    setPage(newPage);
    refreshLessonList(records);
  };
  const { state, dispatch } = useContext(AppContext);
  const [lessonState, setLessonState] = useState(state.lesson.lessonList);
  const onOff = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(offURL, {
      method: 'POST',
      body: JSON.stringify({
        lessonId: offLesson.lessonId,
        lessonUpdateReason: offLesson.lessonUpdateReason,
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
            message: '课程下架成功',
            position: 'top',
            duration: 3000,
          });
          onQuery();
        } else
          present({
            buttons: [{ text: '关闭', handler: () => dismiss() }],
            message: '课程下架失败',
            position: 'top',
          });
        closeOffModal();
      });
  };

  const [queryInfo, setQueryInfo] = useState({ eduName: '', lessonStatus: null });
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
      lessonStatus: queryInfo.lessonStatus,
    },
    findURL
  );

  const refreshLessonList = useCallback(
    (lessons: Lesson[]) => {
      dispatch(setLessonList(lessons));
    },
    [dispatch]
  );

  const onDetail = (item: Lesson) => () => {
    doSetDetail(item);
  };

  const doSetDetail = useCallback(
    (lesson: Lesson) => {
      dispatch({ ...setLessonDetail(lesson), ...{ backPage: '/tabs/lesson/query' } });
    },
    [dispatch]
  );

  const onAudit = (item: Lesson) => () => {
    doSetAudit(item);
  };

  const doSetAudit = useCallback(
    (lesson: Lesson) => {
      dispatch({ ...setLessonAudit(lesson), ...{ backPage: '/tabs/lesson/query' } });
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
          refreshLessonList(records);
        }
      });
  };
  useEffect(onQuery, []);
  const ListEntry = ({ lesson, ...props }: { lesson: Lesson }) => (
    <tr className="grid items-center grid-cols-8 gap-2 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 ">
      <td className="flex items-center justify-center leading-10">{lesson.eduName}</td>
      <td className="flex items-center justify-center leading-10">{lesson.lessonName}</td>
      <td className="flex items-center justify-center leading-10">
        {/* {lesson.lessonTotalPrice / lesson.lessonPerPrice} */}
        {lesson.lessonTotalQuantity}
      </td>
      <td className="flex items-center justify-center leading-10">
        {lesson.lessonTotalPrice / 100}
      </td>
      <td className="flex items-center justify-center leading-10">{lesson.lessonStartDate}</td>
      <td className="flex items-center justify-center leading-10">{lesson.lessonEndDate}</td>
      <td className="flex items-center justify-center leading-10">
        {getLessonStatusForList(lesson.lessonStatus)}
      </td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button className="p-1 text-primary-600" onClick={onDetail(lesson)}>
            详情
          </button>
          {lesson.lessonStatus === 'on' ? (
            <button
              className="p-1 text-fuchsia-600"
              onClick={() => {
                setOffLesson(lesson);
                openOffModal();
              }}
            >
              下架
            </button>
          ) : (
            <></>
          )}
          {lesson.lessonStatus === 'pending' ? (
            <button className="p-1 text-cyan-600" onClick={onAudit(lesson)}>
              审核
            </button>
          ) : (
            <></>
          )}
        </div>
      </td>
    </tr>
  );
  if (state.lesson.lessonDetail) {
    return <Redirect to="/tabs/lesson/detail" />;
  }

  if (state.lesson.lessonAudit) {
    return <Redirect to="/tabs/lesson/audit" />;
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
            <span className="pr-1 text-gray-600">教育机构管理</span>/
            <span className="pl-1 text-primary-500">课程管理</span>
          </div>
        </div>
        <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
          <div className="text-base font-bold">快速查询</div>
          <hr className="mt-2 mb-4" />
          <div className="flex">
            <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  课程状态:
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入教育机构名称"
                  onChange={e => setQueryInfo({ ...queryInfo, ...{ eduName: e.target.value } })}
                />
              </IonCol>
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  教育机构名称:
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
              </IonCol>
            </IonRow>
          </div>
        </div>
        {/* 下架课程模态框  */}
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
                      课程下架
                      <hr className="mt-2 mb-4" />
                    </Dialog.Title>
                    <form
                      onSubmit={onOff}
                      className="flex flex-col items-center rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 w-36">教育机构名称:</div>
                          <input
                            className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                            type="text"
                            value={offLesson.eduName}
                            spellCheck={false}
                            readOnly
                          ></input>
                        </div>
                      </div>

                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">课程名称:</span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonName"
                            type="text"
                            value={offLesson.lessonName}
                            spellCheck={false}
                            readOnly
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            <span className="px-1 text-red-600">*</span>
                            下架原因:
                          </span>
                          <textarea
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonUpdateReason"
                            spellCheck={false}
                            onChange={e =>
                              setOffLesson({
                                ...offLesson,
                                ...{
                                  lessonUpdateReason: e.target?.value,
                                  lessonTotalTimes: e.target?.value,
                                },
                              })
                            }
                            required
                          ></textarea>
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
                          value="下架"
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
              <tr className="grid items-center h-10 grid-cols-8 gap-2 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">教育机构名称</th>
                <th className="flex items-center justify-center">课程名称</th>
                <th className="flex items-center justify-center">总课时(个)</th>
                <th className="flex items-center justify-center">总价格（元）</th>
                <th className="flex items-center justify-center">开课日期</th>
                <th className="flex items-center justify-center">结束日期</th>
                <th className="flex items-center justify-center">课程状态</th>
                <th className="flex items-center justify-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {state.lesson.lessonList.map((list: Lesson, i: any) => (
                <ListEntry lesson={list} key={i} />
              ))}
              <tr>
                <td colSpan={5}>
                  {' '}
                  <Paging
                    url={paramStr}
                    page={page}
                    pagesize={20}
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
export default LessonQuery;
