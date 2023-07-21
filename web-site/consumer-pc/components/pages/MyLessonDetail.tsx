import { IonPage, IonHeader, IonContent } from "@ionic/react";
import MyLessonInfoDetailTabs from "../MyLessonInfoDetailTabs";
import LessonImage from "../LessonImage";
import { Lesson } from "../../types/types";
import MyLessonDetailBottomMenu from "../MyLessonDetailBottomMenu";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Search from '../Search'
import {searchLessonURL} from'../../const/const';


let lesson: Lesson = { lessonImgs: "https://s3.bmp.ovh/imgs/2022/08/22/281ec3695ed000e6.png" };
const solutions = [
  {
    name: "Insights",
    description: "Measure actions your users take",
    href: "##",
    icon: IconOne,
  },
];
function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

// 我的课程详情页面
const MyLessonDetail = () => {
  const [queryStr, setQueryStr] = useState('')
  const location = useLocation<{ backPage: string }>();
  const [page,setPage] = useState(0)
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  const paramStr = getParamStr(
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
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      setLessonList(json.result)
    })
  }
  // console.log("MyLessonDetail");
  // console.log(location);
  let backPage = undefined;
  if (location.state && location.state.backPage) {
    backPage = location.state.backPage;
  }
  return (
    <IonPage>
      <IonHeader>
        <Search setQueryStr={setQueryStr} onQuery={onQuery} />
      </IonHeader>
      <IonContent>
        <div className="relative mb-3 bg-white pb-14 scroll-auto mt-24">
          <LessonImage lessonImage={lesson.lessonImgs} />
          <MyLessonInfoDetailTabs />
        </div>
        <MyLessonDetailBottomMenu />
      </IonContent>
    </IonPage>
  );
};

export default MyLessonDetail;
