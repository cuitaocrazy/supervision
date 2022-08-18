//Lesson的查询页面
import {
  useEffect,
  useCallback,
  useContext,
  useState,
  useRef,
  Fragment,
} from "react";
import { Redirect } from "react-router-dom";
import {
  AppContext,
  setLessonList,
  setLessonDetail,
  setLessonEdit,
} from "../../../appState";
import { Lesson } from "../../../types/types";
import {
  IonPage,
  IonRow,
  IonCol,
  PickerColumn,
  IonButton,
  useIonToast,
} from "@ionic/react";
import moment from "moment";
import RichText from "components/components/RichText";
import { EditorState } from "draft-js";
import { Dialog, Transition } from "@headlessui/react";
import Paging from '../../paging';
import Quit from "components/components/Quit";

// const findAll = "http://localhost:3003/edu/lesson/findAll";
const find = "http://localhost:3003/edu/lesson/find";
const createUrl = "http://localhost:3003/edu/lesson/create"
const offUrl = "http://localhost:3003/edu/lesson/create"

// 课程查询页面
const LessonQuery: React.FC = () => {
  const [present, dismiss] = useIonToast();
  //  结果状态
  const resultState="000"
  // 展示操作结果
  // const resultFun=()=>{
  //   if(resultState=="000"){
  //     present({
  //       message: '课程添加成功',
  //       position:'top',
  //       duration:3000
  //     })
  //     onQuery();
  //   }
  //   else{
  //     present({
  //       buttons: [{ text: '关闭', handler: () => dismiss() }],
  //       message: '课程添加失败，失败原因：......',
  //       position:'top',
  //     })
  //   }
  //   closeModal()
  // }
  const onPageChange = (records:any,total:number,newPage:number)=>{
    console.log(records)
    console.log(total)
    console.log(newPage)
    setPage(newPage)
    setTotal(total)
    refreshLessonList(records)
  }

  // 添加课程dialog状态
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }


  // 下架课程dialog状态
  let [isOffOpen, setIsOffOpen] = useState(false);
  function closeOffModal() {
    setIsOffOpen(false);
  }
  function openOffModal() {
    setIsOffOpen(true);
  }

   // 课程添加成功Toast
   const [showLeaveToast, setShowLeaveToast] = useState(false);
   const addLessonSuccessInfo=()=>{
    setShowLeaveToast(true)
   }
   

  const [page,setPage] = useState(0)
  const [total,setTotal]= useState(101)//todo
  const [createLesson, setCreateLesson] = useState({} as Lesson);
  var myDay=new Date()
  const [offLesson, setOffLesson] = useState({ lessonStartDate: moment().format("YYYYMMDD"), lessonEndDate: moment().format("YYYYMMDD")} as unknown as Lesson);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = useRef(null);

  // function focusEditor() {
  //   editor.current.focus();

  // }

  const onCreate = (e:any) => {
    e.preventDefault()
    console.log(createLesson)
      fetch(createUrl, {
      method: 'POST',
      body:JSON.stringify(createLesson),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      if(json.result){
        present({
          message: '课程添加成功',
          position:'top',
          duration:3000
        })
        onQuery();
      }
      else{
        present({
          buttons: [{ text: '关闭', handler: () => dismiss() }],
          message: '课程添加失败，失败原因：......',
          position:'top',
        })
      }
      closeModal()
      addLessonSuccessInfo()
    })
  };

  const onOff = (e:any) =>{
    e.preventDefault();
    fetch(offUrl, {
      method: 'POST',
      body:JSON.stringify(offLesson),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
  }).then(res => res.json())
  .then((json) => {
    if(resultState=="000"){
      present({
        message: '课程下架成功',
        position:'top',
        duration:3000
      })
      onQuery();
    }
    else{
      present({
        buttons: [{ text: '关闭', handler: () => dismiss() }],
        message: '课程下架失败，失败原因：......',
        position:'top',
      })
    }
    closeOffModal()
  })
}

  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({
    lessonName: "",
    lessonStatus: null,
  });
  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach((key) => {
      if (params[key]) result = result + key + "=" + params[key] + "&";
    });
    return url + result;
  };
  const paramStr = getParamStr(
    {
      lessonName: queryInfo.lessonName,
    },
    find
  );

  const lessonTypePickerColumn = {
    name: "lessonTypePickerColumn",
    options: [
      { text: "语文", value: "0" },
      { text: "数学", value: "1" },
    ],
  } as PickerColumn;

  const refreshLessonList = useCallback(
    (lessons: Lesson[]) => {
      dispatch(setLessonList(lessons));
    },
    [dispatch]
  );

  const onDetail = (item: Lesson) => () => {
    doSetDetail(item);
  };

  const onEdit = (item: Lesson) => () => {
    doSetEdit(item);
  };

  const doSetEdit = useCallback(
    (lessons: Lesson | undefined) => {
      dispatch({
        ...setLessonEdit(lessons),
        ...{ backPage: "/tabs/lesson/query" },
      });
    },
    [dispatch]
  );

  const doSetDetail = useCallback(
    (lessons: Lesson | undefined) => {
      dispatch({
        ...setLessonDetail(lessons),
        ...{ backPage: "/tabs/lesson/query" },
      });
    },
    [dispatch]
  );
  useEffect(() => {
    fetch(find, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { result, records,total } = json;

        if (result) {
          setTotal(total)
          refreshLessonList(records);
        }
        return;
      });
    return;
  }, []);

  const onQuery = () => {
    fetch(paramStr, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { result, records,total } = json;
        if (result) {
          setTotal(total)
          refreshLessonList(records)
        };
        return;
      });
  };

  const getStatus = (statusEnglish: any) => {
    if (statusEnglish === "pending") {
      return "待审核";
    }
    if (statusEnglish === "reject") {
      return "审核未通过";
    }
    if (statusEnglish === "on") {
      return "上架";
    }
    if (statusEnglish === "off") {
      return "下架";
    }
    return statusEnglish;
  };

  

  const ListEntry = ({
    lesson,
    key,
    ...props
  }: {
    lesson: Lesson;
    key: any;
  }) => (
    <tr
      key={key}
      className="grid items-center grid-cols-8 gap-10 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100"
    >
      <td className="flex items-center justify-center leading-10">
        {lesson.lessonName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {lesson.lessonTotalPrice}
      </td>
      <td className="flex items-center justify-center leading-10">
        {Number(lesson.lessonTotalPrice) / 100}
      </td>
      <td className="flex items-center justify-center leading-10">
        {lesson.lessonType}
      </td>
      <td className="flex items-center justify-center leading-10">
        {lesson.lessonStartDate}
      </td>
      <td className="flex items-center justify-center leading-10">
        {lesson.lessonEndDate}
      </td>
      <td className="flex items-center justify-center leading-10">
        {getStatus(lesson.lessonStatus)}
      </td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button
            className="p-1 rounded-md text-primary-600"
            onClick={onDetail(lesson)}
          >
            查看详情
          </button>
          {lesson.lessonStatus === "on" ? (
            <button
              className="p-1 text-red-500 rounded-md"
              onClick={() => {
                setOffLesson(lesson);
                // setIsCancelModalOpen(true);
                openOffModal();
              }}
            >
              下架
            </button>
          ) : (
            <></>
          )}
          {lesson.lessonStatus === "pending" ? (
            <button
              className="p-1 rounded-md text-sky-600"
              onClick={onEdit(lesson)}
            >
              编辑
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
  if (state.lesson.lessonEdit) {
    return <Redirect to="/tabs/lesson/edit" />;
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
            <span className="pr-1 text-gray-600">课程管理</span>/
            <span className="pl-1 text-primary-500">课程列表</span>
          </div>
        </div>
        <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
          <div className="text-base font-bold">快速查询</div>
          <hr className="mt-2 mb-4" />
          <div className="flex">
            <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  课程名称：
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入课程名称"
                  onChange={(e) =>
                    setQueryInfo({
                      ...queryInfo,
                      ...{ lessonName: e.target.value },
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
                <button
                  className="w-24 h-12 rounded-md shadow-md bg-gray-50 text-primary-600 focus:bg-gray-200"
                  // onClick={() => {
                  //   setCreateModalOpen(true);
                  // }}
                  onClick={openModal}
                >
                  新增
                </button>
              </IonCol>
            </IonRow>
          </div>
        </div>

        {/* 新增课程模态框 */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                      课程新增
                      <hr className="mt-2 mb-4" />
                    </Dialog.Title>
                    <form
                      onSubmit={onCreate}
                      className="flex flex-col items-center rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 w-36">
                            教育机构名称:
                          </div>
                          <input
                            className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                            name="eduId"
                            type="text"
                            value={state.loginUser.orgName}
                            spellCheck={false}
                            readOnly
                          ></input>
                        </div>
                      </div>

                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            课程名称:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonName"
                            type="text"
                            value={createLesson.lessonName}
                            spellCheck={false}
                            onChange={(e) =>
                              setCreateLesson({
                                ...createLesson,
                                ...{ lessonName: e.nativeEvent.target?.value },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            总课时:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonTotalTimes"
                            type="number"
                            value={createLesson.lessonTotalTimes}
                            spellCheck={false}
                            onChange={(e) =>
                              setCreateLesson({
                                ...createLesson,
                                ...{
                                  lessonTotalTimes: e.nativeEvent.target?.value,
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
                            总价格(元):
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonTotalPrice"
                            type="number"
                            value={createLesson.lessonTotalPrice}
                            spellCheck={false}
                            onChange={(e) =>
                              setCreateLesson({
                                ...createLesson,
                                ...{
                                  lessonTotalPrice: e.nativeEvent.target?.value,
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
                            课程单价:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonPerPrice"
                            type="number"
                            value={createLesson.lessonPerPrice}
                            spellCheck={false}
                            onChange={(e) =>
                              setCreateLesson({
                                ...createLesson,
                                ...{
                                  lessonPerPrice: e.nativeEvent.target?.value,
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
                            课程类型:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonType"
                            type="text"
                            value={createLesson.lessonType}
                            spellCheck={false}
                            onChange={(e) =>
                              setCreateLesson({
                                ...createLesson,
                                ...{ lessonType: e.nativeEvent.target?.value },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            课程开始日期:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            type="date"
                            defaultValue={moment().format("YYYY-MM-DD")}
                            onChange={(e) =>
                              setCreateLesson({
                                ...createLesson,
                                lessonStartDate: e.target.value,
                              })
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            课程结束日期:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            type="date"
                            defaultValue={moment().format("YYYY-MM-DD")}
                            onChange={(e) =>
                              setCreateLesson({
                                ...createLesson,
                                lessonEndDate: e.target.value,
                              })
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            课程描述:
                          </span>
                          <textarea
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonIntroduce"
                            value={createLesson.lessonIntroduce}
                            spellCheck={false}
                            onChange={(e) =>
                              setCreateLesson({
                                ...createLesson,
                                ...{
                                  lessonIntroduce: e.nativeEvent.target?.value,
                                },
                              })
                            }
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            教师姓名:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="teacherId"
                            type="text"
                            value={createLesson.teacherId}
                            spellCheck={false}
                            onChange={(e) =>
                              setCreateLesson({
                                ...createLesson,
                                ...{ teacherId: e.nativeEvent.target?.value },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            课程大纲:
                          </span>
                          <div className="w-64 p-1 text-gray-600 justify-self-start focus:outline-none focus:glow-primary-600">
                            <RichText
                              ref={editor}
                              editorState={editorState}
                              onChange={(editorState: any) => {
                                console.log(editorState);
                                setEditorState(editorState);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 justify-items-center">
                        <input
                          value="取消"
                          type="button"
                          className="px-6 py-2 border rounded-md "
                          onClick={closeModal}
                        />
                        <input
                          value="确定"
                          type="submit"
                          className="px-6 py-2 text-white border rounded-md bg-primary-600"
                           // onClick={()=>{addLessonSuccessInfo();closeModal()}}
                           
                          // onClick={() => {resultFun()}}  

                        />
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
            {/* <IonToast
              isOpen={showLeaveToast}
              onDidDismiss={() => setShowLeaveToast(false)}
              message="课程添加成功."
              duration={100000}
              position="top"
            /> */}
            
          </Dialog>
        </Transition>

        {/* 下架课程模态框 */}
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
                          <div className="flex justify-end p-1 w-36">
                            课程名称:
                          </div>
                          <input
                            className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                            name="eduId"
                            type="text"
                            value={offLesson.lessonName}
                            spellCheck={false}
                            readOnly
                          ></input>
                        </div>
                      </div>

                      {/* <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            总价（元）:
                          </span>
                          <input
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="lessonName"
                            type="text"
                            value={createLesson.lessonName}
                            spellCheck={false}
                            onChange={(e) =>
                              setCreateLesson({
                                ...createLesson,
                                ...{ lessonName: e.nativeEvent.target?.value },
                              })
                            }
                            required
                          ></input>
                        </div>
                      </div> */}
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            下架原因:
                          </span>
                          <textarea
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="offLesson"
                            value={offLesson.lessonUpdateReason}
                            spellCheck={false}
                            onChange={(e) =>
                              setOffLesson({
                                ...offLesson,
                                ...{
                                  lessonUpdateReason: e.nativeEvent.target?.value,
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

        {/* 课程列表 */}
        <div className="absolute w-full mt-10">
          <table className="w-11/12">
            <thead>
              <tr className="grid items-center h-10 grid-cols-8 gap-10 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">课程名称</th>
                <th className="flex items-center justify-center">总价格(元)</th>
                <th className="flex items-center justify-center">
                  总课时（个）
                </th>
                <th className="flex items-center justify-center">课程类型</th>
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
                <td colSpan={5}> <Paging url={paramStr} page={page} pagesize={20} total={total} onPageChange={onPageChange}/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default LessonQuery;
