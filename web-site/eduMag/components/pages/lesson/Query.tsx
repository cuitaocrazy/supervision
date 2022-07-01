//Lesson的查询页面
import { useEffect, useCallback, useContext, useState, useRef } from "react";
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
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonModal,
  IonCardHeader,
  IonCardTitle,
  IonCard,
  IonCardContent,
  IonPicker,
  IonDatetime,
  PickerColumn,
  IonHeader,
  IonContent,
} from "@ionic/react";
import moment from "moment";

import RichText from "components/components/RichText";
import { EditorState } from "draft-js";

const queryURL = "http://localhost:3003/lesson/query";
const delURL = "http://localhost:3003/lesson/del";
const modifyURL = "http://localhost:3003/lesson/modifyURL";
const attendURL = "http://localhost:3003/lesson/attend";
const findAll = "http://localhost:3003/edu/lesson/findAll";
const find = "http://localhost:3003/edu/lesson/find";
const demoLessonList: Lesson[] = [
  {
    lessonId: "2",
    lessonName: "第二课",
    lessonPerPrice: "12",
    lessonTotalTimes: "10",
    lessonTotalPrice: "120",
    lessonIntroduce: "第二课程介绍",
    lessonType: "第二课程类型",
    lessonOutline: "第二课程大纲",
    lessonStartDate: "2020-01-01",
    lessonStartTime: "00:00:00",
    lessonEndDate: "2021-01-01",
    lessonEndTime: "00:00:00",
    lessonStatus: "pending",
    lessonCreateDate: "2020-01-01",
    lessonCreateTime: "00:00:00",
    lessonUpdateDate: "2020-01-01",
    lessonUpdateTime: "00:00:00",
    lessonUpdateReason: "第二课程更新原因",
    eduId: "1",
    edu: {
      eduId: "1",
      eduName: "第一学院",
      eduLoginName: "第一学院登录名",
      supervisorOrgId: "1",
    },
    teacherId: "1",
    teacher: {
      teacherId: "1",
      teacherName: "第一老师",
    },
  },
  {
    lessonId: "2",
    lessonName: "第3课",
    lessonTotalTimes: "10",
    lessonPerPrice: "12",
    lessonTotalPrice: "120",
    lessonIntroduce: "第3课程介绍",
    lessonType: "第3课程类型",
    lessonOutline: "第3课程大纲",
    lessonStartDate: "2020-01-01",
    lessonStartTime: "00:00:00",
    lessonEndDate: "2021-01-01",
    lessonEndTime: "00:00:00",
    lessonStatus: "on",
    lessonCreateDate: "2020-01-01",
    lessonCreateTime: "00:00:00",
    lessonUpdateDate: "2020-01-01",
    lessonUpdateTime: "00:00:00",
    lessonUpdateReason: "第3课程更新原因",
    eduId: "1",
    edu: {
      eduId: "1",
      eduName: "第一学院",
      eduLoginName: "第一学院登录名",
      supervisorOrgId: "1",
    },
    teacherId: "2",
    teacher: {
      teacherId: "2",
      teacherName: "第2老师",
    },
  },
];

// 课程查询页面
const LessonQuery: React.FC = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [createLesson, setCreateLesson] = useState({} as Lesson);
  const [cancelLesson, setCancelLesson] = useState({} as Lesson);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPickOpen, setPickOpen] = useState(false);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = useRef(null);

  // function focusEditor() {
  //   editor.current.focus();

  // }

  const onCancel = async (e: React.FormEvent) => {
    //todo fetch
    // fetch(delURL, {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     "lessonId":item.lessonId,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8',
    //   },
    // }).then(res => res.json())
    // .then((json) => {
    //   alert(json.result)
    // })
  };

  const onCreate = () => {
    //todo fetch
  };

  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({
    lessonName: "",
    lessonStatus: null,
  });
  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach(
      (key) => (result = result + key + "=" + params[key] + "&")
    );
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
    fetch(findAll, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { result, records } = json;
        if (result) refreshLessonList(records);
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
        const { result, records } = json;
        if (result) refreshLessonList(records);
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
      className="grid items-center grid-cols-8 gap-10 text-gray-600 border justify-items-center even:bg-primary-100 odd:bg-white "
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
                setCancelLesson(lesson);
                setIsCancelModalOpen(true);
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
      <div className="relative w-full mx-6">
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
            {/* 课程新增 */}
            <IonModal
              style={{ "--max-height": 10000, height: 1000 }}
              isOpen={isCreateModalOpen}
              onDidDismiss={async () => {
                setCreateModalOpen(false);
              }}
              className="h-screen"
            >
              {/* <IonCard>
                <IonCardContent > */}
              <form
                onSubmit={onCreate}
                className="flex flex-col items-center rounded-lg justify-items-center"
              >
                <legend className="mt-2 font-bold text-center">课程新增</legend>
                <hr className="mt-2 mb-2" />
                <div className="flex items-center mb-1 justify-items-center">
                  <div className="flex leading-7 justify-items-center">
                    <div className="flex justify-end p-1 w-36">
                      教育机构名称:
                    </div>
                    <input
                      className="w-64 p-1 text-gray-600 bg-gray-100 rounded-md justify-self-start focus:outline focus:border-0"
                      name="eduId"
                      type="text"
                      value={state.loginUser.orgName}
                      spellCheck={false}
                      readOnly
                    ></input>
                  </div>
                </div>

                <div className="flex items-center mb-1 justify-items-center">
                  <div className="flex justify-items-center">
                    <span className="flex justify-end p-1 mr-1 w-36">
                      课程名称:
                    </span>
                    <input
                      className="w-64 p-1 text-gray-600 bg-gray-100 rounded-md justify-self-start focus:outline focus:border-0"
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
                <div className="flex items-center mb-1 justify-items-center">
                  <div className="flex justify-items-center">
                    <span className="flex justify-end p-1 mr-1 w-36">
                      总课时:
                    </span>
                    <input
                      className="w-64 p-1 text-gray-600 bg-gray-100 rounded-md justify-self-start focus:outline focus:border-0"
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
                <div className="flex items-center mb-1 justify-items-center">
                  <div className="flex justify-items-center">
                    <span className="flex justify-end p-1 mr-1 w-36">
                      总价格(元):
                    </span>
                    <input
                      className="w-64 p-1 text-gray-600 bg-gray-100 rounded-md justify-self-start focus:outline focus:border-0"
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
                <div className="flex items-center mb-1 justify-items-center">
                  <div className="flex justify-items-center">
                    <span className="flex justify-end p-1 mr-1 w-36">
                      课程单价:
                    </span>
                    <input
                      className="w-64 p-1 text-gray-600 bg-gray-100 rounded-md justify-self-start focus:outline focus:border-0"
                      name="lessonPerPrice"
                      type="number"
                      value={createLesson.lessonPerPrice}
                      spellCheck={false}
                      onChange={(e) =>
                        setCreateLesson({
                          ...createLesson,
                          ...{ lessonPerPrice: e.nativeEvent.target?.value },
                        })
                      }
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex items-center mb-1 justify-items-center">
                  <div className="flex justify-items-center">
                    <span className="flex justify-end p-1 mr-1 w-36">
                      课程类型:
                    </span>
                    <input
                      className="w-64 p-1 text-gray-600 bg-gray-100 rounded-md justify-self-start focus:outline focus:border-0"
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
                    {/* <IonPicker
                      isOpen={isPickOpen}
                      columns={[lessonTypePickerColumn]}
                      buttons={[
                        {
                          text: "取消",
                          role: "cancel",
                          handler: value => {
                            setPickOpen(false);
                          }
                        },
                        {
                          text: "确认",
                          handler: value => {
                            setPickOpen(false);
                            setCreateLesson({ ...createLesson, ...{ lessonType: value.lessonTypePickerColumn.value } })
                          }
                        }
                      ]}
                    ></IonPicker> */}
                  </div>
                </div>
                <div className="flex items-center mb-1 justify-items-center">
                  <div className="flex justify-items-center">
                    <span className="flex justify-end p-1 mr-1 w-36">
                      课程开始日期:
                    </span>
                    <input
                      className="w-64"
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
                <div className="flex items-center mb-1 justify-items-center">
                  <div className="flex justify-items-center">
                    <span className="flex justify-end p-1 mr-1 w-36">
                      课程结束日期:
                    </span>
                    <input
                      className="w-64"
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
                <div className="flex items-center mb-1 justify-items-center">
                  <div className="flex justify-items-center">
                    <span className="flex justify-end p-1 mr-1 w-36">
                      课程描述:
                    </span>
                    <input
                      className="w-64 p-1 text-gray-600 bg-gray-100 rounded-md justify-self-start focus:outline focus:border-0"
                      name="lessonIntroduce"
                      type="text"
                      value={createLesson.lessonIntroduce}
                      spellCheck={false}
                      onChange={(e) =>
                        setCreateLesson({
                          ...createLesson,
                          ...{ lessonIntroduce: e.nativeEvent.target?.value },
                        })
                      }
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex items-center mb-1 justify-items-center">
                  <div className="flex justify-items-center">
                    <span className="flex justify-end p-1 mr-1 w-36">
                      教师:
                    </span>
                    <input
                      className="w-64 p-1 text-gray-600 bg-gray-100 rounded-md justify-self-start focus:outline focus:border-0"
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
                <div className="flex items-center mb-1 justify-items-center">
                  <div className="flex justify-items-center">
                    <span className="flex justify-end p-1 mr-1 w-36">
                      课程大纲:
                    </span>
                    <RichText
                      ref={editor}
                      editorState={editorState}
                      onChange={(editorState: any) => {
                        console.log(editorState);
                        setEditorState(editorState);
                      }}
                      className=""
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-items-center">
                  <input
                    value="取消"
                    type="button"
                    className="px-6 py-2 border rounded-md "
                  />
                  <input
                    value="确定"
                    type="button"
                    className="px-4 py-2 text-white border rounded-md bg-primary-600"
                  />
                </div>

                {/* <IonLabel position="stacked" >教育机构名称:</IonLabel>
                    <input className="readonlyInput" name="eduId" type="text" value={state.loginUser.orgName} spellCheck={false} readOnly required>
                    </input><br />

                    <IonLabel position="stacked" >课程名称</IonLabel>
                    <input className="normalInput" name="lessonName" type="text" value={createLesson.lessonName} spellCheck={false} onChange={e => setCreateLesson({ ...createLesson, ...{ lessonName: e.nativeEvent.target?.value } })} required>
                    </input><br />
                    <IonLabel position="stacked" >总课时</IonLabel>
                    <input className="normalInput" name="lessonTotalTimes" type="number" value={createLesson.lessonTotalTimes} spellCheck={false} onChange={e => setCreateLesson({ ...createLesson, ...{ lessonTotalTimes: e.nativeEvent.target?.value } })} required>
                    </input><br />
                    <IonLabel position="stacked" >总价格(元)</IonLabel>
                    <input className="normalInput" name="lessonTotalPrice" type="number" value={createLesson.lessonTotalPrice} spellCheck={false} onChange={e => setCreateLesson({ ...createLesson, ...{ lessonTotalPrice: e.nativeEvent.target?.value } })} required>
                    </input><br />

                    <IonLabel position="stacked" >课程单价</IonLabel>
                    <input className="normalInput" name="lessonPerPrice" type="number" value={createLesson.lessonPerPrice} spellCheck={false} onChange={e => setCreateLesson({ ...createLesson, ...{ lessonPerPrice: e.nativeEvent.target?.value } })} required>
                    </input><br />

                    <IonLabel position="stacked" >课程类型</IonLabel>
                    <IonPicker
                      isOpen={isPickOpen}
                      columns={[lessonTypePickerColumn]}
                      buttons={[
                        {
                          text: "取消",
                          role: "cancel",
                          handler: value => {
                            setPickOpen(false);
                          }
                        },
                        {
                          text: "确认",
                          handler: value => {
                            setPickOpen(false);
                            setCreateLesson({ ...createLesson, ...{ lessonType: value.lessonTypePickerColumn.value } })
                          }
                        }
                      ]}
                    ></IonPicker>
                    <IonLabel position="stacked" >课程开始日期</IonLabel>
                    <input type="date" defaultValue={moment().format('YYYY-MM-DD')} onChange={e => setCreateLesson({ ...createLesson, lessonStartDate: e.target.value })}></input><br />
                    <IonLabel position="stacked" >课程结束日期</IonLabel>
                    <input type="date" defaultValue={moment().format('YYYY-MM-DD')} onChange={e => setCreateLesson({ ...createLesson, lessonEndDate: e.target.value })}></input><br />
                    <IonLabel position="stacked" >课程描述</IonLabel>
                    <input className="normalInput" name="lessonIntroduce" type="text" value={createLesson.lessonIntroduce} spellCheck={false} onChange={e => setCreateLesson({ ...createLesson, ...{ lessonIntroduce: e.nativeEvent.target?.value } })} required>
                    </input><br />
                    <IonLabel position="stacked" >课程大纲:</IonLabel>
                    <RichText
                      ref={editor}
                      editorState={editorState}
                      onChange={(editorState: any) => { console.log(editorState); setEditorState(editorState) }}
                    />
                    <IonLabel position="stacked" >教师ID</IonLabel>
                    <input name="teacherId" type="text" value={createLesson.teacherId} spellCheck={false} onChange={e => setCreateLesson({ ...createLesson, ...{ teacherId: e.nativeEvent.target?.value } })} required>
                    </input><br />
                    <div className='flex mt-2 mb-2 space-x-2 '>
                      <span className="flex-1 ">
                        <button className='flex items-center justify-center flex-none submutButton focus:outline-none hover:bg-primary-700 ' type='submit' >确认</button>

                      </span >
                      <span className="flex-1 ">
                        <button className='cancelButton' onClick={() => setCreateModalOpen(false)}>取消</button>
                      </span>
                    </div> */}
              </form>

              {/* </IonCardContent>

              </IonCard> */}

              {/* 课程下架 */}
            </IonModal>
            <IonModal
              isOpen={isCancelModalOpen}
              onDidDismiss={async () => {
                setIsCancelModalOpen(false);
              }}
            >
              <form
                onSubmit={onCreate}
                className="flex flex-col items-center rounded-lg justify-items-center"
              >
                <legend className="mt-2 font-bold text-center">课程下架</legend>
                <hr className="mt-2 mb-2" />
                <div className="flex items-center mb-4 justify-items-center">
                  <div className="flex leading-7 justify-items-center">
                    <div className="flex justify-end p-1 w-36">课程名称:</div>
                    <input
                      className="px-2 py-1 text-gray-600 bg-gray-100 rounded-md w-80 justify-self-start focus:outline focus:border-0"
                      name="eduId"
                      type="text"
                      value={cancelLesson.edu ? cancelLesson.edu.eduName : ""}
                      spellCheck={false}
                      readOnly
                      required
                    ></input>
                  </div>
                </div>

                <div className="flex items-center mb-4 justify-items-center">
                  <div className="flex justify-items-center">
                    <span className="flex justify-end p-1 mr-1 w-36">
                      总价（元）:
                    </span>
                    <input
                      className="px-2 py-1 text-gray-600 bg-gray-100 rounded-md w-80 justify-self-start focus:outline focus:border-0"
                      name="eduId"
                      type="text"
                      value={Number(cancelLesson.lessonTotalPrice) / 100}
                      spellCheck={false}
                      readOnly
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex items-center mb-4 justify-items-center">
                  <div className="flex justify-items-center">
                    <span className="flex justify-end p-1 mr-1 w-36">
                      下架原因:
                    </span>
                    <input
                      className="px-2 py-1 text-gray-600 bg-gray-100 rounded-md h-60 w-80 justify-self-start focus:outline focus:border-0"
                      name="eduId"
                      type="text"
                      value={cancelLesson.lessonUpdateReason}
                      spellCheck={false}
                      onChange={(e) =>
                        setCancelLesson({
                          ...cancelLesson,
                          ...{
                            lessonUpdateReason: e.nativeEvent.target?.value,
                          },
                        })
                      }
                      required
                    ></input>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-20 justify-items-center">
                  <input
                    value="取消"
                    type="button"
                    className="px-6 py-2 border rounded-md "
                  />
                  <input
                    value="下架"
                    type="button"
                    className="px-6 py-2 text-white border rounded-md bg-primary-600"
                  />
                </div>
              </form>
              {/* <IonCard>
                <IonCardHeader>
                  <IonCardTitle>课程下架</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <form onSubmit={onCancel}>
                    <IonLabel position="stacked" >课程名称:</IonLabel>
                    <input name="eduId" type="text" value={cancelLesson.edu ? cancelLesson.edu.eduName : ''} spellCheck={false} readOnly required>
                    </input><br />
                    <IonLabel position="stacked" >总价（元）:</IonLabel>
                    <input name="eduId" type="text" value={Number(cancelLesson.lessonTotalPrice) / 100} spellCheck={false} readOnly required>
                    </input><br />
                    <IonLabel position="stacked" >下架原因:</IonLabel>
                    <input name="eduId" type="text" value={cancelLesson.lessonUpdateReason} spellCheck={false} onIonChange={e => setCancelLesson({ ...cancelLesson, ...{ lessonUpdateReason: e.detail.value! } })} required>
                    </input><br />
                    <button type='submit'>下架</button>
                    <button onClick={() => { }}>取消</button>
                  </form>
                </IonCardContent>
              </IonCard> */}
            </IonModal>
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
                  onClick={() => {
                    setCreateModalOpen(true);
                  }}
                >
                  新增
                </button>
              </IonCol>
            </IonRow>
          </div>
        </div>
        <div className="absolute w-full mt-10">
          <table className="w-11/12">
            <thead>
              <tr className="grid items-center h-10 grid-cols-8 gap-10 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">课程名称</th>
                <th className="flex items-center justify-center">
                  总课时（个）
                </th>
                <th className="flex items-center justify-center">总价格(元)</th>
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
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default LessonQuery;
