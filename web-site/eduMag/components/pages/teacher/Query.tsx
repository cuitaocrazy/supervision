//教师的查询页面
import { useEffect, useCallback, useContext, useState, useRef,Fragment } from "react";
import { Redirect } from "react-router-dom";
import {
  AppContext,
  setTeacherList,
  setTeacherDetail,
  setTeacherEdit,
} from "../../../appState";
import { Teacher } from "../../../types/types";
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonModal,
  IonButton,
  IonCardHeader,
  IonCardTitle,
  IonCard,
  IonCardContent,
  IonInput,
} from "@ionic/react";
import { Dialog, Transition } from "@headlessui/react";
import Paging from '../../paging'
import Quit from "components/components/Quit";

const queryURL = "http://localhost:3003/edu/teacher/find";

const createURL = "http://localhost:3003/edu/teacher/create";
const cancelURL = "http://localhost:3003/edu/teacher/del";

const TeacherQuery: React.FC = () => {

  let [isCreateOpen, setIsCreateOpen] = useState(false);
  function closeCreateModal() {
    setIsCreateOpen(false);
  }
  function openCreateModal() {
    setIsCreateOpen(true);
  }

  let [isDeleteOpen, setIsDeleteOpen] = useState(false);
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  function openDelateModal() {
    setIsDeleteOpen(true);
  }
  const createModal = useRef<HTMLIonModalElement>(null);
  const cancelModal = useRef<HTMLIonModalElement>(null);

  const [createTeacher, setCreateTeacher] = useState({} as Teacher);
  const [cancelTeacher, setCancelTeacher] = useState({} as Teacher);
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({ teacherName: "" });
  const [page,setPage] = useState(0)
  const [total,setTotal]= useState(101)
  const onPageChange = (records:any,total:number,newPage:number)=>{
    setPage(newPage)
    setTotal(total)
    refreshList(records)    
  }
  
  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach(
      (key) => (result = result + key + "=" + params[key] + "&")
    );
    return url + result;
  };
  const paramStr = getParamStr(
    {
      teacherName: queryInfo.teacherName,
    },
    queryURL
  );
  const refreshList = useCallback(
    (eduOrgs: Teacher[]) => {
      dispatch(setTeacherList(eduOrgs));
    },
    [dispatch]
  );
  const onDetail = (item: Teacher) => () => {
    doSetDetail(item);
  };

  const onEdit = (item: Teacher) => () => {
    doSetEdit(item);
  };
  const doSetEdit = useCallback(
    (teacher: Teacher) => {
      dispatch({
        ...setTeacherEdit(teacher),
        ...{ backPage: "/tabs/teacher/query" },
      });
    },
    [dispatch]
  );

  const onCancel = (e) => {
    e.preventDefault()
    fetch(cancelURL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
      body:JSON.stringify({teacherId:cancelTeacher.teacherId})
    }).then(res => res.json())
    .then((json) => {
      const { result, records,total } = json;
      closeDeleteModal();
      onQuery()
    }
      );
  };

  const doSetDetail = useCallback(
    (teacher: Teacher) => {
      dispatch({
        ...setTeacherDetail(teacher),
        ...{ backPage: "/tabs/teacher/query" },
      });
    },
    [dispatch]
  );


  const onQuery = () => {
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      const { result, records,total } = json;
      if (result) {
        setTotal(total)
        refreshList(records)};
    });

  };

  useEffect(onQuery, []);

  const onCreate = (e:any) => {
    e.preventDefault()
    console.log(createTeacher);
    fetch(createURL, {
      method: 'POST',
      body:JSON.stringify(createTeacher),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      closeCreateModal()
      onQuery()
    })
    // setCreateModalOpen(false)
  };

  const ListEntry = ({
    teacher,
    key,
    ...props
  }: {
    teacher: Teacher;
    key: any;
  }) => (
    <tr
      key={key}
      className="grid items-center grid-cols-6 gap-10 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100"
    >
      <td className="flex items-center justify-center leading-10">
      {teacher.teacherName}
      </td>
      <td className="flex items-center justify-center leading-10">
      {teacher.teacherIdentityNo}
      </td>
      <td className="flex items-center justify-center leading-10">
      {teacher.teacherField}
      </td>
      <td className="flex items-center justify-center leading-10">
      {teacher.teacherIntroduce}
      </td>
      <td className="flex items-center justify-center leading-10">
      {teacher.teacherCreatedDate}
      </td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button
            className="p-1 rounded-md text-primary-600"
            onClick={onDetail(teacher)}
          >
            详情
          </button>
          <button
            className="p-1 rounded-md text-cyan-600"
            onClick={onEdit(teacher)}
          >
            编辑
          </button>
          <button
            className="p-1 text-red-600 rounded-md"
            // onClick={() => {
            //              setCancelTeacher(teacher);
            //              openDelateModal;
            //           }}
            onClick={()=>{setCancelTeacher(teacher);openDelateModal()}}
          >
            删除
          </button>
        </div>
      </td>
    </tr>
  );

  if (state.teacher.teacherEdit) {
    return <Redirect to="/tabs/teacher/edit" />;
  }
  if (state.teacher.teacherDetail) {
    return <Redirect to="/tabs/teacher/detail" />;
  }
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
              <span className="pr-1 text-gray-600">教师管理</span>/
              <span className="pl-1 text-primary-500">教师列表</span>
            </div>
          </div>
          {/* 查询条件 */}
          <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
            <div className="text-base font-bold">快速查询</div>
            <hr className="mt-2 mb-4" />
            <div className="flex">
              <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
                <IonCol className="flex ml-8 text-gray-800">
                  <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                    教师姓名：
                  </div>
                  <input
                    type="text"
                    className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                    placeholder="请输入教师姓名"
                    onChange={(e) =>
                      setQueryInfo({
                        ...queryInfo,
                        ...{ teacherName: e.target.value },
                      })
                    }
                  />
                </IonCol>
                <IonCol className="flex ml-8">
                  <button
                    className="w-24 h-12 mr-6 text-white border-2 rounded-md shadow-md bg-primary-600 focus:bg-primary-700"
                    onClick={() => {
                      onQuery();
                    }}
                  >
                    查询
                  </button>
                  <button className="w-24 h-12 rounded-md shadow-md bg-gray-50 text-primary-600 focus:bg-gray-200"
                  onClick={openCreateModal}>
                    新增
                  </button>
                </IonCol>
              </IonRow>
            </div>
          </div>

           {/* 新增课程模态框 */}
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
                      教师新增
                      <hr className="mt-2 mb-4" />
                    </Dialog.Title>
                    <form
                      onSubmit={onCreate}
                      className="flex flex-col items-center rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 w-36">
                            教师姓名:
                          </div>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="createTeacher"
                            type="text"
                            onChange={e => setCreateTeacher({...createTeacher,...{teacherName:e.nativeEvent.target?.value}})}
                            spellCheck={false}
                            required
                          ></input>
                        </div>
                      </div>

                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            教师身份证:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="teacherIdentityNo"
                            type="text"
                            spellCheck={false}
                            onChange={e => setCreateTeacher({...createTeacher,...{teacherIdentityNo:e.nativeEvent.target?.value}})}
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            专业领域:
                          </span>
                          <textarea
                            className="w-64 h-32 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="teacherField"
                            spellCheck={false}
                            onChange={e => setCreateTeacher({...createTeacher,...{teacherField:e.nativeEvent.target?.value}})}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            从业经验(年):
                          </span>
                          <input
                            type='number'
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="teacherExperience"
                            spellCheck={false}
                            onChange={e => setCreateTeacher({...createTeacher,...{teacherExperience:e.nativeEvent.target?.value}})}
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            教师简介:
                          </span>
                          <textarea
                            className="w-64 h-32 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="teacherIntroduce"
                            spellCheck={false}
                            onChange={(e) =>
                              setCreateTeacher({
                                ...createTeacher,
                                ...{
                                  teacherIntroduce: e.nativeEvent.target?.value,
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
                      教师删除确认
                      <hr className="mt-2 mb-4" />
                    </Dialog.Title>
                    <form
                      onSubmit={onCancel}
                      className="flex flex-col items-center rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 w-36">
                            教师姓名:
                          </div>
                          <input
                            className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                            name="eduId"
                            type="text"
                            value={cancelTeacher.teacherName}
                            spellCheck={false}
                            readOnly
                          ></input>
                        </div>
                      </div>

                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            教师身份证:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none"
                            name="lessonName"
                            type="text"
                            value={cancelTeacher.teacherIdentityNo}
                            spellCheck={false}
                            readOnly
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            专业领域:
                          </span>
                          <textarea
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none"
                            name="lessonTotalTimes"
                            spellCheck={false}
                            value={cancelTeacher.teacherField}
                            readOnly
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            从业经验:
                          </span>
                          <textarea
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none"
                            name="teacherExperience"
                            value={cancelTeacher.teacherExperience}
                            spellCheck={false}
                            readOnly
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            教师简介:
                          </span>
                          <textarea
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none"
                            name="teacherIntroduce"
                            value={cancelTeacher.teacherIntroduce}
                            spellCheck={false}
                            readOnly
                          ></textarea>
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

        {/* 教师管理列表 */}
        <div className="absolute w-full mt-10">
          <table className="w-11/12">
            <thead>
              <tr className="grid items-center h-10 grid-cols-6 gap-10 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">教师姓名</th>
                <th className="flex items-center justify-center">教师身份证号码</th>
                <th className="flex items-center justify-center">专业领域</th>
                <th className="flex items-center justify-center">从业经历</th>
                <th className="flex items-center justify-center">日期</th>
                <th className="flex items-center justify-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {state.teacher.teacherList.map((list: Teacher, i: any) => (
                <ListEntry teacher={list} key={i} />
              ))}
              <tr>
                <td colSpan={6}> <Paging url={paramStr} page={page} pagesize={20} total={total} onPageChange={onPageChange}/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default TeacherQuery;
