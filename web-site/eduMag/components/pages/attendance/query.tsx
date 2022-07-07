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

const queryURL = "http://localhost:3003/attendannce/query";

const demoattendanceList: Attendance[] = [
  {
    attendanceID: "1",
    attendanceDate: "2020-01-01",
    attendanceTime: "00:00:00",
    attendanceType: "vaild",
    attendanceLessonQuantity: "111",
    eduId: "1",
    eduName: "教育机构1",
    lessonId: "1",
    lessonName: "课程1",
    consumerId: "1",
    consumerName: "消费者1",
    consumerStuName: "学生1",
    attendanceStatus: "vaild",
    updateDate: "2020-01-01",
    updateTime: "2020-01-01",
    updateReason: "aaaa",
    attendanceLessonQuantity: "1",
  },
  {
    attendanceID: "2",
    attendanceDate: "2020-01-01",
    attendanceTime: "00:00:00",
    attendanceType: "vaild",
    attendanceLessonQuantity: "111",
    eduId: "1",
    eduName: "教育机构1",
    lessonId: "1",
    lessonName: "课程1",
    consumerId: "1",
    consumerName: "消费者1",
    consumerStuName: "学生2",
    attendanceStatus: "vaild",
    updateDate: "2020-01-01",
    updateTime: "2020-01-01",
    updateReason: "aaaa",
    attendanceLessonQuantity: "1",
  },
];

const AttendanceQuery: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({
    consumerName: "",
    lessonName: "",
    consumerStuName: "",
    attendanceType: "",
    attendanceStatus: "",
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
  useEffect(() => {
    // fetch(paramStr, {
    //   method: 'GET',
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8',
    //   },
    // }).then(res => res.json())
    // .then((json) => {
    // const {attendanceList} = json

    // refreshList(demoattendanceList.filter((attendance:Attendance)=>attendance.consumerName.indexOf(queryInfo.consumerName)>-1).filter((attendance:Attendance)=>attendance.lessonName.indexOf(queryInfo.lessonName)>-1).filter((attendance:Attendance)=>attendance.consumerStuName.indexOf(queryInfo.consumerStuName)>-1))
    // return
    // })
    console.log(demoattendanceList);
    refreshList(demoattendanceList);
  }, []);
  const onQuery = () => {
    refreshList(
      demoattendanceList
        .filter(
          (attendance: Attendance) =>
            attendance.consumerName.indexOf(queryInfo.consumerName) > -1
        )
        .filter(
          (attendance: Attendance) =>
            attendance.lessonName.indexOf(queryInfo.lessonName) > -1
        )
    );
  };
  const ListEntry = ({
    attendance,
    key,
    ...props
  }: {
    attendance: Attendance;
    key: any;
  }) => (
    <IonItem key={key}>
      <IonLabel>
        <p className="text-center">{attendance.lessonName}</p>
      </IonLabel>
      <IonLabel>
        <p className="text-center">{attendance.consumerName}</p>
      </IonLabel>
      <IonLabel>
        <p className="text-center">{attendance.consumerStuName}</p>
      </IonLabel>
      <IonLabel>
        <p className="text-center">{attendance.attendanceType}</p>
      </IonLabel>
      <IonLabel>
        <p className="text-center">{attendance.attendanceTime}</p>
      </IonLabel>
      <IonLabel>
        <p className="text-center">{attendance.attendanceTime}</p>
      </IonLabel>
      <IonLabel>
        <p className="text-center">{attendance.attendanceLessonQuantity}</p>
      </IonLabel>
      <IonLabel>
        <p className="text-center">{attendance.attendanceDate}</p>
      </IonLabel>
      <IonLabel>
        <p className="text-center">{attendance.attendanceTime}</p>
      </IonLabel>
      <IonLabel>
        <p className="text-center">{attendance.attendanceStatus}</p>
      </IonLabel>
      <IonLabel>
        <div className="flex gap-2">
          <button
            className="p-1 text-white bg-blue-500 rounded-md"
            onClick={onDetail(attendance)}
          >
            查看详情
          </button>
        </div>
      </IonLabel>
    </IonItem>
  );

  if (state.attendance.attendanceDetail) {
    return <Redirect to="/tabs/attendance/detail" />;
  }
  return (
    <IonPage>
      <div className="relative">
        <div className="flex">
          <IonRow className="flex justify-between ">
            <IonCol className="flex ml-8">
              <IonLabel className="flex h-12 p-2 font-bold text-center text-primary-600 w-28">
                课程名称：
              </IonLabel>
              <input
                type="text"
                className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500"
                onChange={(e) =>
                  setQueryInfo({
                    ...queryInfo,
                    ...{ lessonName: e.target.value },
                  })
                }
              />
            </IonCol>
            <IonCol className="flex ml-8">
              <IonLabel className="flex h-12 p-2 font-bold text-center text-primary-600 w-28">
                客户姓名：
              </IonLabel>
              <input
                type="text"
                className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500"
                onChange={(e) =>
                  setQueryInfo({
                    ...queryInfo,
                    ...{ consumerName: e.target.value },
                  })
                }
              />
            </IonCol>
          </IonRow>
          <IonRow className="flex justify-between ">
            <IonCol className="flex ml-8">
              <IonLabel className="flex h-12 p-2 font-bold text-center text-primary-600 w-28">
                学生姓名：
              </IonLabel>
              <input
                type="text"
                className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500"
                onChange={(e) =>
                  setQueryInfo({
                    ...queryInfo,
                    ...{ consumerStuName: e.target.value },
                  })
                }
              />
            </IonCol>
            <IonCol className="flex ml-8">
              <IonLabel className="flex h-12 p-2 font-bold text-center text-primary-600 w-28">
                考勤类型：
              </IonLabel>
              <input
                type="text"
                className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500"
                onChange={(e) =>
                  setQueryInfo({
                    ...queryInfo,
                    ...{ attendanceType: e.target.value },
                  })
                }
              />
            </IonCol>
          </IonRow>
          <IonRow className="flex justify-between ">
            <IonCol className="flex ml-8">
              <IonLabel className="flex h-12 p-2 font-bold text-center text-primary-600 w-28">
                考勤状态：
              </IonLabel>
              <input
                type="text"
                className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500"
                onChange={(e) =>
                  setQueryInfo({
                    ...queryInfo,
                    ...{ attendanceStatus: e.target.value },
                  })
                }
              />
            </IonCol>
          </IonRow>
          <IonRow className="flex justify-between ">
            <IonCol className="flex ml-8" aria-colspan={2}>
              <button onClick={() => onQuery()}>查询</button>
            </IonCol>
          </IonRow>
        </div>
        <div className="absolute w-full mt-10">
          <IonList>
            <IonItem key="title">
              <IonLabel>
                <div className="font-black text-center">课程名称</div>
              </IonLabel>
              <IonLabel>
                <div className="font-black text-center">客户姓名</div>
              </IonLabel>
              <IonLabel>
                <div className="font-black text-center">学生姓名</div>
              </IonLabel>
              <IonLabel>
                <div className="font-black text-center">考勤类型</div>
              </IonLabel>
              <IonLabel>
                <div className="font-black text-center">考勤课时</div>
              </IonLabel>
              <IonLabel>
                <div className="font-black text-center">签到时间</div>
              </IonLabel>
              <IonLabel>
                <div className="font-black text-center">考勤状态</div>
              </IonLabel>
              <IonLabel>
                <div className="font-black text-center">操作</div>
              </IonLabel>
            </IonItem>
            <div className="">
              {state.attendance?.attendanceList.map(
                (list: Attendance, i: any) => (
                  <ListEntry attendance={list} key={i} />
                )
              )}
            </div>
          </IonList>
        </div>
      </div>
    </IonPage>
  );
};
export default AttendanceQuery;
