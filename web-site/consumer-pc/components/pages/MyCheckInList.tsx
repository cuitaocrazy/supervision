import React, { useEffect, useContext, useState } from "react";
import { IonPage, IonContent, IonHeader } from "@ionic/react";
// import Calendar from '../Calendar'
import CheckInResultListCard from "components/CheckInResultListCard";
import Navbar from "components/Navbar";
import { AppContext } from "../../appState";
import { searchAttendanceURL } from "../../const/const";
import Calendar from "react-calendar";
import { Attendance } from "@/types/types";
import { compassSharp } from "ionicons/icons";
import "react-calendar/dist/Calendar.css";
import Search from '../Search'
import {searchLessonURL} from'../../const/const';
import { Lesson } from '../../types/types'

// 一门课程的签到结果列表页面----
const MyCheckInList = () => {
  const [queryStr, setQueryStr] = useState('')
  const { state, dispatch } = useContext(AppContext);
  const [attendanceList, setAttendanceList] = useState([] as Attendance[]);
  const [date, setDate] = useState(new Date());
  const [selectMonth, setSelectMonth] = useState(
    String(new Date().getFullYear()) + String(new Date().getMonth() + 1)
  );
  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach((key) => {
      if (params[key] !== "") result = result + key + "=" + params[key] + "&";
    });
    return url + result;
  };
  const [page,setPage] = useState(0)
  const getParamStrSearch = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  const paramStrSearch = getParamStrSearch(
    {
      queryStr: queryStr,
      page:page,
      size:10
    },
    searchLessonURL
  );
  useEffect(()=>{
    onQuery()
  },[])
    // 课程列表数据
    const [lessonList, setLessonList] = useState([] as Lesson[])
  const onQuery = ()=>{
    fetch(paramStrSearch, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      setLessonList(json.result)
    })
  }

  // lessonId,consumerId,lessonQuantity
  console.log(state)
  const paramStr = getParamStr(
    {
      consumerId: state.loginUser.userId,
      lessonId: state.contractDetail?.lessonId,
    },
    searchAttendanceURL
  );

  useEffect(() => {
    fetch(paramStr, {
      method: "GET",
      // body: JSON.stringify({

      // }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setAttendanceList(json.result);
      });
  }, []
  );

  useEffect(() => {
  fetch(paramStrSearch, {
    method: "GET",
    // body: JSON.stringify({

    // }),
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      setLessonList(json.result);
    });
}, []
  );

  const checkDateEqueal = (stringDate: string, date: Date) => {
    if (
      Number(stringDate.substring(0, 4)) === date.getFullYear() &&
      Number(stringDate.substring(4, 6)) === date.getMonth() + 1 &&
      Number(stringDate.substring(6, 8)) === date.getDate()
    ) {
      return true;
    }
    return false;
  };

  const getAttendString = (date: Date) => {
    for (let i = 0; i < attendanceList.length; i++) {
      if (checkDateEqueal(attendanceList[i].attendanceDate, date)) {
        if (attendanceList[i].attendanceStatus === "manual") {
          return "手动签到";
        } else if (attendanceList[i].attendanceStatus === "leave") {
          return "请假";
        } else if (attendanceList[i].attendanceStatus === "conforming") {
          return "待确认";
        } else if (attendanceList[i].attendanceStatus === "conforming") {
          return "待确认";
        } else if (attendanceList[i].attendanceStatus === "valid") {
          return "已签到";
        } else if (attendanceList[i].attendanceStatus === "invalid") {
          return "请假";
        } else {
          return attendanceList[i].attendanceStatus;
        }
      }
    }
    return "";
  };

  return (
    <IonPage>
      <IonHeader>
      <Search setQueryStr={setQueryStr} onQuery={onQuery} />
      <div className="flex w-3/4 mx-auto text-sm text-gray-400 mt-24 bg-gray-100 py-2 px-2">
          <div className="flex items-center ">
            <span className="pr-2">首页</span> <span className="pr-2">/</span><span className="pr-2">我的课程</span><span className="pr-2">/</span><span className="pr-2">课程列表</span><span className="pr-2">/</span><span className="pr-2">签到列表</span>
          </div>
    </div>
      </IonHeader>
      <IonContent>
        <div className="mt-24 ">
          <Calendar
            className=" px-2 w-3/4 mx-auto py-2 mt-2 border-0 rounded-lg shadow-md"
            onClickDay={()=>alert()}
            onActiveStartDateChange={(item) => setDate(item.value)}
            tileContent={({ date, view }) => {
              if (view === "month") {
                return (
                  <p className="text-xs text-white bg-green-600 rounded-md">
                    {getAttendString(date)}
                  </p>
                );
              }
              return null;
              // return view === 'year' && date.getDay()=== 0 ? <p>aaaa</p>: null
            }}
          />
          {attendanceList
            .filter(
              (item) =>
                date&&
                Number(item.attendanceDate.substring(0, 6)) ===
                date.getFullYear() * 100 + date.getMonth() + 1
            )
            .map((item) => {
              return (
                <CheckInResultListCard
                  key={item.attendanceID}
                  attendance={item}
                />
              );
            })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MyCheckInList;
