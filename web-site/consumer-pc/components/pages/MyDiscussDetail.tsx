import { IonPage, IonHeader, IonContent } from "@ionic/react";
import Navbar from "components/Navbar";
import MyLessonInfoDetailTabs from "../MyLessonInfoDetailTabs";
import LessonImage from "../LessonImage";
import { LessonDiscussInfo } from "../../types/types";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';

let discuss: LessonDiscussInfo = { lessonImages: "http://placekitten.com/g/200/300" };
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

// 我的课程协商详情页面
const MyDiscussDetail = () => {
  return (
    <IonPage>
      <IonHeader>
        <Navbar title="课程协商详情"/>
      </IonHeader>
      <IonContent>
        <div className="relative mb-3 bg-white pb-14 scroll-auto">
          {/* 课程图片 */}
          <LessonImage lessonImage={discuss.lessonImages} />
          <div className='px-4 py-2 mx-2 my-2 text-sm rounded-md shadow-md'>
          <p>
            <span className='pr-4 leading-7 text-gray-500'>课程名称</span>
            <span className='text-gray-800'>小画室绘画</span>
          </p>
          <p>
            <span className='pr-4 leading-7 text-gray-500'>上课日期</span>
            <span className='text-gray-800' >2022年05月15日</span>
          </p>
          <p>
            <span className='pr-4 leading-7 text-gray-500'>上课时间</span>
            <span className='text-gray-800' >9:00-11:30</span>
          </p>
          <p>
            <span className='pr-4 leading-7 text-gray-500'>课程内容</span>
            <span className='text-gray-800'>水果篮子</span>
          </p>
          <div className='flex '>
            <span className='pr-4 leading-7 text-gray-500'>考勤状态</span>
            <span className='text-gray-800'>签到</span>
          </div>
          <p>
            <span className='pr-4 leading-7 text-gray-500'>协商标题</span>
            <span className='text-gray-800'>课程协商不合理</span>
          </p>
          <div>
            <span className='pr-2 leading-7 text-gray-500'>协商内容</span>
            <span className='text-gray-800'>这是修改原因这是修改原因这是修改原因这是修改原因这是修改原因这是修改原因这是修改原因这是修改原因</span>
          </div>
          <p>
            <span className='pr-4 leading-7 text-gray-500'>协商申请日期</span>
            <span className='text-gray-800' >2022年05月15日</span>
          </p>
          <p>
            <span className='pr-4 leading-7 text-gray-500'>协商申请时间</span>
            <span className='text-gray-800' >9:00-11:30</span>
          </p>
        </div>
        <Link to='myDiscussList'>
        <div className='flex mt-10 text-sm'>
          <input value="返回" type="button"
            className='w-full py-2 mx-10 font-bold text-white shadow-md rounded-3xl bg-primary-600 shadow-primary-600 focus:outline-none'
            />
        </div>
        </Link>
          
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MyDiscussDetail;
