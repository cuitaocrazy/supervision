import { useEffect, useCallback, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  AppContext,
  setAttendanceList,
  setAttendanceDetail,
} from "../../../appState";
import { Attendance } from "../../../types/types";
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
} from "@ionic/react";
import Quit from "components/components/Quit";
import Paging from "../../paging";
import { eduAttendanceFindURL } from "const/consts";

const queryURL = eduAttendanceFindURL;

const AttendanceQuery: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(101); //todo
  const [queryInfo, setQueryInfo] = useState({
    consumerName: "",
    lessonName: "",
    consumerStuName: "",
    attendanceType: "",
    attendanceStatus: "",
  });
  const onPageChange = (records: any, total: number, newPage: number) => {
    console.log(records);
    console.log(total);
    console.log(newPage);
    setPage(newPage);
    setTotal(total);
    refreshLessonList(records);
  };

  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach(
      (key) => (result = result + key + "=" + params[key] + "&")
    );
    return url + result;
  };
  const paramStr = getParamStr(
    {
      consumerName: queryInfo.consumerName,
      lessonName: queryInfo.lessonName,
      consumerStuName: queryInfo.consumerStuName,
    },
    queryURL
  );
  const refreshList = useCallback(
    (attendance: Attendance[]) => {
      dispatch(setAttendanceList(attendance));
    },
    [dispatch]
  );
  const onDetail = (item: Attendance) => () => {
    doSetDetail(item);
  };

  const doSetDetail = useCallback(
    (attendance: any) => {
      dispatch({
        ...setAttendanceDetail(attendance),
        ...{ backPage: "/tabs/attendance/query" },
      });
    },
    [dispatch]
  );
  // useEffect(() => {
  //   fetch(paramStr, {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json;charset=UTF-8',
  //     },
  //   }).then(res => res.json())
  //   .then((json) => {
  //   const {attendanceList} = json

  //   refreshList(demoattendanceList.filter((attendance:Attendance)=>attendance.consumerName.indexOf(queryInfo.consumerName)>-1).filter((attendance:Attendance)=>attendance.lessonName.indexOf(queryInfo.lessonName)>-1).filter((attendance:Attendance)=>attendance.consumerStuName.indexOf(queryInfo.consumerStuName)>-1))
  //   return
  //   })
  //   console.log(demoattendanceList);
  //   refreshList(demoattendanceList);
  // }, []);

  useEffect(() => {
    fetch(paramStr, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { result, records, total } = json;

        if (result) {
          setTotal(total);
          refreshLessonList(records);
        }
        return;
      });
    return;
  }, []);

  const refreshLessonList = useCallback(
    (attendance: Attendance[]) => {
      dispatch(setAttendanceList(attendance));
    },
    [dispatch]
  );
  // const onQuery = () => {
  //   refreshList(
  //     demoattendanceList
  //       .filter(
  //         (attendance: Attendance) =>
  //           attendance.consumerName.indexOf(queryInfo.consumerName) > -1
  //       )
  //       .filter(
  //         (attendance: Attendance) =>
  //           attendance.lessonName.indexOf(queryInfo.lessonName) > -1
  //       )
  //   );
  // };
  const onQuery = () => {
    fetch(paramStr, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { result, records, total } = json;
        if (result) {
          setTotal(total);
          refreshLessonList(records);
        }
        return;
      });
  };

  const getAttendanceType = (typeEnglish: any) => {
    if (typeEnglish === "manual") {
      return "手工";
    }
    if (typeEnglish === "auto") {
      return "超时自动打卡";
    }
    return typeEnglish;
  };

  const getAttendanceState = (stateEnglish: any) => {
    if (stateEnglish === "conforming") {
      return "待客户确认";
    }
    if (stateEnglish === "valid") {
      return "考勤有效";
    }
    if (stateEnglish === "negotiating") {
      return "双方协商中";
    }
    if (stateEnglish === "invalid") {
      return "无效状态（包括请假）";
    }
    if (stateEnglish === "final") {
      return "划拨完成";
    }
    return stateEnglish;
  };

  const ListEntry = ({ attendance }: { attendance: Attendance }) => (
    <tr className="grid items-center grid-cols-9 gap-10 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100">
      <td className="flex items-center justify-center leading-10">
        {attendance.lessonName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {attendance.consumerName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {attendance.consumerStuName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {getAttendanceType(attendance.attendanceType)}
      </td>
      <td className="flex items-center justify-center leading-10">
        {attendance.attendanceLessonQuantity}
      </td>
      <td className="flex items-center justify-center leading-10">
        {attendance.attendanceDate}
      </td>
      <td className="flex items-center justify-center leading-10">
        {attendance.attendanceTime}
      </td>
      <td className="flex items-center justify-center leading-10">
        {getAttendanceState(attendance.attendanceStatus)}
      </td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button
            className="p-1 rounded-md text-primary-600"
            onClick={onDetail(attendance)}
          >
            查看详情
          </button>
        </div>
      </td>
    </tr>
  );

  if (state.attendance.attendanceDetail) {
    return <Redirect to="/tabs/attendance/detail" />;
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
            <span className="pr-1 text-gray-600">课程考勤</span>/
            <span className="pl-1 text-primary-500">考勤明细</span>
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
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  客户姓名：
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入客户姓名"
                  onChange={(e) =>
                    setQueryInfo({
                      ...queryInfo,
                      ...{ consumerName: e.target.value },
                    })
                  }
                />
              </IonCol>
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  学生姓名：
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入学生姓名"
                  onChange={(e) =>
                    setQueryInfo({
                      ...queryInfo,
                      ...{ consumerStuName: e.target.value },
                    })
                  }
                />
              </IonCol>
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  考勤类型：
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入考勤类型"
                  onChange={(e) =>
                    setQueryInfo({
                      ...queryInfo,
                      ...{ attendanceType: e.target.value },
                    })
                  }
                />
              </IonCol>
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  考勤状态：
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入考勤状态"
                  onChange={(e) =>
                    setQueryInfo({
                      ...queryInfo,
                      ...{ attendanceStatus: e.target.value },
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
              </IonCol>
            </IonRow>
          </div>
        </div>

        {/* 考勤明细列表 */}
        <div className="absolute w-full mt-10">
          <table className="w-11/12">
            <thead>
              <tr className="grid items-center h-10 grid-cols-9 gap-10 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">课程名称</th>
                <th className="flex items-center justify-center">客户姓名</th>
                <th className="flex items-center justify-center">学生姓名</th>
                <th className="flex items-center justify-center">考勤类型</th>
                <th className="flex items-center justify-center">考勤课时</th>
                <th className="flex items-center justify-center">签到日期</th>
                <th className="flex items-center justify-center">签到时间</th>
                <th className="flex items-center justify-center">考勤状态</th>
                <th className="flex items-center justify-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {state.attendance?.attendanceList.map(
                (list: Attendance, i: any) => (
                  <ListEntry attendance={list} key={i} />
                )
              )}
            </tbody>
            <tr>
              <td colSpan={5}>
                {" "}
                <Paging
                  url={paramStr}
                  page={page}
                  pagesize={20}
                  total={total}
                  onPageChange={onPageChange}
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default AttendanceQuery;
