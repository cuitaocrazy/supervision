import React, { useEffect, useCallback, useContext, useState } from "react";
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

// 一门课程的签到结果列表页面
const MyCheckInList = () => {
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

  // lessonId,consumerId,lessonQuantity
  const paramStr = getParamStr(
    {
      consumerId: state.loginUser.userId,
      lessonId: state.contractDetail.lessonId,
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
  }, []);

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
        } else if (attendanceList[i].attendanceStatus === "vaild") {
          return "已签到";
        } else if (attendanceList[i].attendanceStatus === "invaild") {
          return "请假";
        } else {
          return attendanceList[i].attendanceStatus;
        }
      }
    }
    return "";
  };

<<<<<<< HEAD
  return (
    <IonPage>
      <IonHeader>
        <Navbar title="签到列表" />
      </IonHeader>
      <IonContent>
        <div className="">
          <Calendar
            className="w-full px-2 py-2 mt-2 border-0 rounded-lg shadow-md"
            onClickDay={()=>alert()}
            onActiveStartDateChange={(item) => setDate(item.value)}
            tileContent={({ date, view }) => {
              if (view === "month") {
                return (
                  <p className="text-white bg-green-600 rounded-md">
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
=======
  return <IonPage>
    <IonHeader>
      <Navbar title="签到列表" />
    </IonHeader>
    <IonContent>
      <div className=''>
        <Calendar className="w-full px-2 py-2 mt-2 border-0 rounded-lg shadow-md"
          onActiveStartDateChange={(item)=>setDate(item.activeStartDate)}   tileContent={({ date, view }) => {
            if(view==='month'){
              return <p className='text-white bg-green-600 rounded-md'>{getAttendString(date)}</p>
            }
            return null
            // return view === 'year' && date.getDay()=== 0 ? <p>aaaa</p>: null
          }
>>>>>>> 4f14de0084c2d884745eee1bee8c7407a21b157f

export default MyCheckInList;
