import { useEffect, useCallback, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  AppContext,
  setDiscussList,
  setDiscussDetail,
  setDiscussAudit,
} from "../../../appState";
import { LessonDiscussInfo } from "../../../types/types";
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
} from "@ionic/react";
import Quit from "components/components/Quit";

const queryURL = "http://localhost:3003/discuss/query";

const demoDiscussList: LessonDiscussInfo[] = [
  {
    lessonImages: "1111",
    lessonName: "数学课",
    lessonQuantity: "2",
    lessonDate: "20210101",
    lessonTime: "090909",
    discussTitle: "本次课程已请假",
    attendanceState: "上课",
    discussContent: "本次课程因孩子生病未上课，APP却显示已上课",
    discussDate: "20220909",
    discussTime: "090909",
    consumerName: "张小白",
    consumerPhone: "18610909098",
    stuName: "小红",
    teacherName: "李老师",
    discussStatus: "pending",
    discussReason: "经与家长沟通，审核不通过",
  },
  {
    lessonImages: "2222",
    lessonName: "数学课",
    lessonQuantity: "2",
    lessonDate: "20210101",
    lessonTime: "090909",
    discussTitle: "本次课程已请假",
    attendanceState: "上课",
    discussContent: "本次课程因孩子生病未上课，APP却显示已上课",
    discussDate: "20220909",
    discussTime: "090909",
    consumerName: "张小白",
    consumerPhone: "18610909098",
    stuName: "小红",
    teacherName: "李老师",
    discussStatus: "pending",
    discussReason: "经与家长沟通，审核不通过",
  },
];

const DiscussQuery: React.FC = () => {
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
    (discuss: LessonDiscussInfo[]) => {
      dispatch(setDiscussList(discuss));
    },
    [dispatch]
  );
  const onDetail = (item: LessonDiscussInfo) => () => {
    doSetDetail(item);
  };

  const doSetDetail = useCallback(
    (discuss: any) => {
      dispatch({
        ...setDiscussDetail(discuss),
        ...{ backPage: "/tabs/discussQuery" },
      });
    },
    [dispatch]
  );

  const onAudit = (item: LessonDiscussInfo) => () => {
    doSetAudit(item);
  };

  const doSetAudit = useCallback(
    (discuss: any) => {
      dispatch({
        ...setDiscussAudit(discuss),
        ...{ backPage: "/tabs/discussQuery" },
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
    console.log(demoDiscussList);
    refreshList(demoDiscussList);
  }, []);

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

  const onQuery = () => {
    // refreshList(
    //   demoDiscussList
    //     .filter(
    //       (discuss: LessonDiscussInfo) =>
    //         discuss.lessonName.indexOf(queryInfo.lessonName) > -1
    //     )
    // );
  };
  const ListEntry = ({
    discuss,
    ...props
  }: {
    discuss: LessonDiscussInfo;
    key: any;
  }) => (
    <tr className="grid items-center grid-cols-10 gap-2 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100">
      <td className="flex items-center justify-center leading-10">
        {discuss.lessonName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {discuss.lessonQuantity}
      </td>
      <td className="flex items-center justify-center leading-10">
        {discuss.attendanceState}
      </td>
      <td className="flex items-center justify-center leading-10">
        {discuss.lessonDate}
      </td>
      <td className="flex items-center justify-center leading-10">
        {discuss.lessonTime}
      </td>
      <td className="flex items-center justify-center leading-10">
        {discuss.discussTitle}
      </td>
      <td className="flex items-center justify-center leading-10">
        {discuss.consumerName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {discuss.consumerPhone}
      </td>
      <td className="flex items-center justify-center leading-10">
        {discuss.stuName}
      </td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button
            className="p-1 rounded-md text-primary-600"
            onClick={onDetail(discuss)}
          >
            查看详情
          </button>
          <button className="p-1 text-cyan-600" 
            onClick={onAudit(discuss)}>
              审核
            </button>
          {/* {discuss.discussStatus === "pending" ? (
            <button className="p-1 text-cyan-600" 
            onClick={onAudit(discuss)}>
              审核
            </button>
          ) : (
            <></>
          )} */}
        </div>
      </td>
    </tr>
  );

  if (state.discuss.discussDetail) {
    return <Redirect to="/tabs/discuss/detail" />;
  }

  if (state.discuss.discussAudit) {
    return <Redirect to="/tabs/discuss/audit" />;
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
            <span className="pr-1 text-gray-600">课程协商管理</span>/
            <span className="pl-1 text-primary-500">协商列表</span>
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
              </IonCol>
            </IonRow>
          </div>
        </div>

        {/* 课程协商明细列表 */}
        <div className="absolute w-full mt-10">
          <table className="w-11/12">
            <thead>
              <tr className="grid items-center h-10 grid-cols-10 gap-2 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">课程名称</th>
                <th className="flex items-center justify-center">本次课时</th>
                <th className="flex items-center justify-center">课时状态</th>
                <th className="flex items-center justify-center">上课日期</th>
                <th className="flex items-center justify-center">上课时间</th>
                <th className="flex items-center justify-center">协商标题</th>
                <th className="flex items-center justify-center">客户姓名</th>
                <th className="flex items-center justify-center">联系方式</th>
                <th className="flex items-center justify-center">学生姓名</th>
                <th className="flex items-center justify-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {state.discuss?.discussList.map(
                (list: LessonDiscussInfo, i: any) => (
                  <ListEntry discuss={list} key={i} />
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default DiscussQuery;
