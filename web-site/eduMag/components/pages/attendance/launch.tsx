//手工退课
import React, { useState } from "react";
import { useEffect, useCallback, useContext } from "react";
import { IonPage, IonModal, IonRow, IonCol, IonLabel } from "@ionic/react";
import { AppContext, setAttendenceLanuchList } from "../../../appState";
import { Lesson } from "../../../types/types";
import moment from "moment";

const queryURL = "http://localhost:3003/edu/lesson/find";

const ContractNegoQuery: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({ lessonName: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState({} as any);
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
    setIsModalOpen(true);

    // doSetDetail(item)
  };

  const onManual = () => {
    //todo fetch
    console.log("提交");
  };

  // const doSetDetail = useCallback((lesson: Lesson) => {
  //   dispatch({...setAttendenceLanuchDetail(lesson),...{backPage:'/tabs/contractNego/query'}});
  // },[dispatch]);
  useEffect(() => {
    fetch(paramStr, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { result, records } = json;
        if (result) refreshList(records);
      });
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
        if (result) refreshList(records);
      });
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
                setIsModalOpen(true);
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
        <IonModal
          isOpen={isModalOpen}
          onDidDismiss={async () => {
            setIsModalOpen(false);
          }}
        >
          <form onSubmit={onManual}>
            <legend className="mt-2 font-bold text-center">
              课程签到发起确认
            </legend>
            <hr className="mt-2 mb-2" />
            <div className="flex justify-center mt-6 mb-4 leading-7">
              <label className="flex justify-end p-1 w-36">
                <p className="text-center">课程ID:</p>
              </label>
              <label className="w-64 p-1 text-gray-600 bg-gray-100 rounded-md justify-self-start focus:outline focus:border-0">
                <p className="text-center">{detail.lessonId}</p>
              </label>
            </div>
            <div className="flex justify-center mb-4 leading-7">
              <label className="flex justify-end p-1 w-36">
                <p className="text-center">课程名称:</p>
              </label>
              <label className="w-64 p-1 text-gray-600 bg-gray-100 rounded-md justify-self-start focus:outline focus:border-0">
                <p className="text-center">{detail.lessonName}</p>
              </label>
            </div>
            <div className="flex justify-center mb-4 leading-7">
              <label className="flex justify-end p-1 w-36">
                <p className="text-center">上课日期:</p>
              </label>
              <input
                type="date"
                defaultValue={moment().format("YYYY-MM-DD")}
                onChange={(e) => setDetail({ ...detail, date: e.target.value })}
                className="w-64 p-1 text-gray-600 bg-gray-100 rounded-md justify-self-start focus:outline focus:border-0"
              ></input>
            </div>
            <div className="flex justify-center mb-4 leading-7">
              <label className="flex justify-end p-1 w-36">
                <p className="text-center">上课时间:</p>
              </label>
              <input
                type="time"
                defaultValue={moment().format("HH:mm")}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDetail({ ...detail, time: e.target.value });
                }}
                className="w-64 p-1 text-gray-600 bg-gray-100 rounded-md justify-self-start focus:outline focus:border-0"
              ></input>
            </div>
            <div className="flex justify-center mb-4 leading-7">
              <label className="flex justify-end p-1 w-36">
                <p className="text-center">本次课时:</p>
              </label>
              <input
                type="number"
                className="w-64 p-1 text-gray-600 bg-gray-100 rounded-md justify-self-start focus:outline focus:border-0"
                value={detail.times}
                onChange={(e) =>
                  setDetail({ ...detail, times: e.nativeEvent.target?.value })
                }
                placeholder="请输入本次课时"
              />
            </div>
            <div className="flex items-center justify-center gap-4 mt-20">
              <input
                onClick={() => setIsModalOpen(false)}
                value="取消"
                type="button"
                className="flex px-6 py-2 border rounded-md"
              />
              <input
                value="确定"
                type="button"
                className="px-4 py-2 text-white border rounded-md bg-primary-600"
              />
            </div>
          </form>
        </IonModal>
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
                  <ListEntry lesson={list} key={i} />
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default ContractNegoQuery;
