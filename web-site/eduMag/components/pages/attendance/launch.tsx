//手工退课
import React, { useState, Fragment } from "react";
import { useEffect, useCallback, useContext } from "react";
import { IonPage, IonModal, IonRow, IonCol, IonLabel } from "@ionic/react";
import { AppContext, setAttendenceLanuchList } from "../../../appState";
import { Attendance, Lesson } from "../../../types/types";
import moment from "moment";
import { Dialog, Transition } from "@headlessui/react";
import Paging from '../../paging';

const queryURL = "http://localhost:3003/edu/lesson/find";
const attendanceApplyURL = "http://localhost:3003/edu/attendance/apply";

const ContractNegoQuery: React.FC = () => {
  let [isAttendanceOpen, setIsAttendanceOpen] = useState(false);

  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({ lessonName: "" });
  const [detail, setDetail] = useState({} as Lesson);
  const [attendance, setAttendance] = useState({
    lessonId: "",
    attendanceLessonQuantity: 1,
    attendanceDate: "",
    attendanceTime: "",
  } as Attendance);
  const [page,setPage] = useState(0)
  const [total,setTotal]= useState(101)//todo



  const onPageChange = (records:any,total:number,newPage:number)=>{
    setPage(newPage)
    setTotal(total)
    refreshList(records)    
  }


  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach((key) => {
      if (params[key] !== "") result = result + key + "=" + params[key] + "&";
    });
    return url + result;
  };
  const paramStr = getParamStr(
    {
      lessonName: queryInfo.lessonName,
    },
    queryURL
  );
  const refreshList = useCallback(
    (lessons: Lesson[]) => {
      dispatch(setAttendenceLanuchList(lessons));
    },
    [dispatch]
  );
  const onDetail = (item: Lesson) => () => {
    setDetail(item);
    setIsAttendanceOpen(true);
  };

  const onManual = () => {
    const reqBody = JSON.stringify({
      ...attendance,
      attendanceDate: attendance.attendanceDate.replaceAll("-", ""),
      attendanceTime: attendance.attendanceTime.replaceAll(":", "") + "00",
    });
    fetch(attendanceApplyURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: reqBody,
    })
      .then((res) => res.json())
      .then((json) => {
        const { result, msg } = json;
        if (result) {
          alert("发起签到成功");
          setIsAttendanceOpen(false);
          onQuery();
        } else alert("发起签到失败, 原因: " + msg);
      });
    console.log("提交");
  };

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
          refreshList(records)};
      });
  };
  useEffect(onQuery, []);
  const ListEntry = ({
    lesson,
    myKey,
    ...props
  }: {
    lesson: Lesson;
    myKey: any;
  }) => (
    <tr
      key={myKey}
      className="grid items-center grid-cols-4 gap-10 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 "
    >
      <td className="flex items-center justify-center leading-10">
        {lesson.lessonId}
      </td>
      <td className="flex items-center justify-center leading-10">
        {lesson.lessonName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {lesson.lessonAccumulationQuantity}
      </td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          {lesson.lessonStatus === "on" ? (
            <button
              className="p-1 text-primary-600"
              onClick={() => {
                setDetail(lesson);
                setAttendance({
                  ...attendance,
                  ...lesson,
                  attendanceDate: moment().format("YYYY-MM-DD"),
                  attendanceTime: moment().format("HH:mm"),
                });
                setIsAttendanceOpen(true);
              }}
            >
              发起签到
            </button>
          ) : (
            <></>
          )}
        </div>
      </td>
    </tr>
  );

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
            <span className="pr-1 text-gray-600">课程管理</span>/
            <span className="pl-1 text-primary-500">课程签到发起</span>
          </div>
        </div>
        <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
          <div className="text-base font-bold">快速查询</div>
          <hr className="mt-2 mb-4" />
          <div className="flex">
            <IonRow className="flex justify-between ">
              <IonCol className="flex ml-8">
                <IonLabel className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  课程名称
                </IonLabel>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  onChange={(e) =>
                    setQueryInfo({
                      ...queryInfo,
                      ...{ lessonName: e.target.value },
                    })
                  }
                  placeholder="请输入课程名称"
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
              </IonCol>
            </IonRow>
          </div>
        </div>
        <Transition appear show={isAttendanceOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsAttendanceOpen(false)}
          >
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
                      课程签到发起
                      <hr className="mt-2 mb-4" />
                    </Dialog.Title>
                    <form
                      onSubmit={onManual}
                      className="flex flex-col items-center rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 w-36">
                            课程ID:
                          </div>
                          <input
                            className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                            name="eduId"
                            type="text"
                            value={attendance.lessonId}
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
                            className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                            name="lessonName"
                            type="text"
                            value={attendance.lessonName}
                            readOnly
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            上课日期:
                          </span>
                          <input
                            type="date"
                            value={attendance.attendanceDate}
                            onChange={(e) =>
                              setAttendance({
                                ...attendance,
                                attendanceDate: e.target.value,
                              })
                            }
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none"
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            上课时间:
                          </span>
                          <input
                            type="time"
                            value={attendance.attendanceTime}
                            onChange={(e) => {
                              setAttendance({
                                ...attendance,
                                attendanceTime: e.target.value,
                              });
                            }}
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none"
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex justify-items-center">
                          <span className="flex justify-end p-1 mr-1 w-36">
                            本次课时:
                          </span>
                          <input
                            type="number"
                            className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            value={attendance.attendanceLessonQuantity}
                            onChange={(e) =>
                              setAttendance({
                                ...attendance,
                                attendanceLessonQuantity: parseInt(
                                  e.target.value
                                ),
                              })
                            }
                            placeholder="请输入本次课时"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 justify-items-center">
                        <input
                          value="取消"
                          type="button"
                          className="px-6 py-2 border rounded-md "
                          onClick={() => setIsAttendanceOpen(false)}
                        />
                        <input
                          value="确定"
                          type="button"
                          className="px-6 py-2 text-white border rounded-md bg-primary-600"
                          onClick={onManual}
                        />
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <div className="absolute w-full mt-10">
          <table className="w-11/12 ">
            <thead>
              <tr className="grid items-center h-10 grid-cols-4 gap-10 font-bold text-gray-700 bg-white rounded-lg w-fulls justify-items-center">
                <th className="flex items-center justify-center">课程ID</th>
                <th className="flex items-center justify-center">课程名称</th>
                <th className="flex items-center justify-center">已上课时</th>
                <th className="flex items-center justify-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {state.attendenceLanuch?.attendenceLanuchList?.map(
                (list: Lesson, i: any) => (
                  <ListEntry lesson={list} key={i} myKey={i} />
                )
              )}
              <tr>
                <td colSpan={4}> <Paging url={paramStr} page={page} pagesize={20} total={total} onPageChange={onPageChange}/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default ContractNegoQuery;
