import { IonPage, IonHeader, IonContent } from "@ionic/react";
import Navbar from "components/Navbar";
import MyLessonInfoDetailTabs from "../MyLessonInfoDetailTabs";
import LessonImage from "../LessonImage";
import { Lesson } from "../../types/types";
import MyLessonDetailBottomMenu from "../MyLessonDetailBottomMenu";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation<{ backPage: string }>();
  console.log("MyLessonDetail");
  console.log(location);
  let backPage = undefined;
  if (location.state && location.state.backPage) {
    backPage = location.state.backPage;
  }
  return (
    <IonPage>
      <IonHeader>
      <div className="fixed left-0 right-0 w-3/4 pb-2 mx-auto bg-white pt-4">
          <div className="flex items-center justify-around gap-10 pt-3 text-xs justify-items-stretch">
            <Link to="/" className="flex flex-col justify-start" >
              <div className="text-xl tracking-widest text-gray-900">
                资金监管平台
              </div>
              <div className="text-sm tracking-widest text-gray-400">
                我的课堂
              </div>
            </Link>
          </div>
        </div>
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
