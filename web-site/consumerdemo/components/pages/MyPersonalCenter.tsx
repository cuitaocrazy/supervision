import React from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import Navbar from "components/Navbar";
import { Redirect } from "react-router-dom";

// 个人中心页面
const MyPersonalCenter = () => {
  const setFun = () => {
    return <Redirect to="./setting" />;
  };
  return (
    <IonPage>
      <IonHeader>
        <div className="flex flex-row justify-between h-24 pt-2 text-sm font-medium text-white bg-primary-600">
          <div className="flex">
            <div className="mt-4 ml-5 ">
              <img
                className="rounded-full cursor-pointer w-14 h-14 "
                src="http://placekitten.com/g/200/300"
                alt=""
              />
            </div>
            <div className="mt-6 ml-4">
              <p>江山多姿</p>
              <p className="pt-1">18610206133</p>
            </div>
          </div>
          <a
            className="flex items-center justify-center pr-4"
            // onClick={setFun}
            href="./setting"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </IonHeader>
      <IonContent>
        <div className="text-xs bg-primary-600">
          <div className="w-full h-4 bg-white rounded-t-full"></div>
          <div className="bg-white ">
            <div className="grid grid-cols-3 mx-2 justify-items-center">
              <a
                className="flex flex-col items-center w-24 h-24 mt-4 bg-red-100 rounded-md shadow-md justify-items-center shadow-red-200"
                href="./myNoticeInfoList"
              >
                {/* <motion.div key="2" className={'reactive ' } animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div> */}
                <p className="mt-4">
                  <svg
                    className="w-10 h-10 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </p>
                <p className="text-gray-500">公告信息</p>
              </a>

              <a
                className="flex flex-col items-center w-24 h-24 mt-4 bg-green-100 rounded-md shadow-md justify-items-center shadow-green-200"
                href="./myPersonalInfo"
              >
                {/* <motion.div key="2" className={'reactive ' } animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div> */}
                <p className="mt-4">
                  <svg
                    className="w-10 h-10 text-green-600"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <circle cx="12" cy="7" r="4" />{" "}
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                </p>
                <p className="text-gray-500">个人信息</p>
              </a>

              <a
                className="flex flex-col items-center w-24 h-24 mt-4 bg-purple-100 rounded-md shadow-md justify-items-center shadow-purple-200"
                href="./myCompList"
              >
                {/* <motion.div key="2" className={'reactive ' } animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div> */}
                <p className="mt-4">
                  <svg
                    className="w-8 h-8 text-purple-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <rect x="3" y="5" width="18" height="14" rx="3" />{" "}
                    <line x1="3" y1="10" x2="21" y2="10" />{" "}
                    <line x1="7" y1="15" x2="7.01" y2="15" />{" "}
                    <line x1="11" y1="15" x2="13" y2="15" />
                  </svg>
                </p>
                <p className="text-gray-500">我的投诉</p>
              </a>

              <a
                className="flex flex-col items-center w-24 h-24 mt-4 bg-orange-100 rounded-md shadow-md justify-items-center shadow-orange-200"
                href="./myLessonEvalList"
              >
                {/* <motion.div key="2" className={'reactive ' } animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div> */}
                <p className="mt-4">
                  <svg
                    className="w-10 h-10 text-orange-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />{" "}
                    <rect x="9" y="3" width="6" height="4" rx="2" />{" "}
                    <line x1="9" y1="12" x2="9.01" y2="12" />{" "}
                    <line x1="13" y1="12" x2="15" y2="12" />{" "}
                    <line x1="9" y1="16" x2="9.01" y2="16" />{" "}
                    <line x1="13" y1="16" x2="15" y2="16" />
                  </svg>
                </p>
                <p className="text-gray-500">我的评价</p>
              </a>

              <a
                className="flex flex-col items-center w-24 h-24 mt-4 bg-red-100 rounded-md shadow-md justify-items-center shadow-red-200"
                href="./myLessonList"
              >
                {/* <motion.div key="2" className={'reactive ' } animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div> */}
                <p className="mt-4">
                  <svg
                    className="w-10 h-10 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </p>
                <p className="text-gray-500">课程列表</p>
              </a>

              <a
                className="flex flex-col items-center w-24 h-24 mt-4 rounded-md shadow-md bg-cyan-100 justify-items-center shadow-cyan-200"
                href="./editPwd"
              >
                {/* <motion.div key="2" className={'reactive ' } animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div> */}
                <p className="mt-4">
                  <svg
                    className="w-10 h-10 text-cyan-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <circle cx="8" cy="15" r="4" />{" "}
                    <line x1="10.85" y1="12.15" x2="19" y2="4" />{" "}
                    <line x1="18" y1="5" x2="20" y2="7" />{" "}
                    <line x1="15" y1="8" x2="17" y2="10" />
                  </svg>
                </p>
                <p className="text-gray-500">修改密码</p>
              </a>

              <a
                className="flex flex-col items-center w-24 h-24 mt-4 bg-green-100 rounded-md shadow-md justify-items-center shadow-green-200"
                href="./myBatchCheckIn"
              >
                {/* <motion.div key="2" className={'reactive ' } animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div> */}
                <p className="mt-4 ">
                  <svg
                    className="w-10 h-10 text-green-400 "
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />{" "}
                    <rect x="9" y="3" width="6" height="4" rx="2" />{" "}
                    <line x1="9" y1="12" x2="9.01" y2="12" />{" "}
                    <line x1="13" y1="12" x2="15" y2="12" />{" "}
                    <line x1="9" y1="16" x2="9.01" y2="16" />{" "}
                    <line x1="13" y1="16" x2="15" y2="16" />
                  </svg>
                </p>
                <p className="text-gray-500">批量签到</p>
              </a>

              <a
                className="flex flex-col items-center w-24 h-24 mt-4 bg-purple-100 rounded-md shadow-md justify-items-center shadow-purple-200"
                href="./myAutoCheckIn"
              >
                {/* <motion.div key="2" className={'reactive ' } animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div> */}
                <p className="mt-4">
                  <svg
                    className="w-10 h-10 text-purple-400"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                    <line x1="16" y1="5" x2="19" y2="8" />
                  </svg>
                </p>
                <p className="text-gray-500">自动签到</p>
              </a>

              <a
                className="flex flex-col items-center w-24 h-24 mt-4 bg-orange-100 rounded-md shadow-md justify-items-center shadow-orange-200"
                href="./myAllCheckInList"
              >
                {/* <motion.div key="2" className={'reactive ' } animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div> */}
                <p className="mt-4">
                  <svg
                    className="w-10 h-10 text-orange-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />{" "}
                    <rect x="9" y="3" width="6" height="4" rx="2" />{" "}
                    <line x1="9" y1="12" x2="9.01" y2="12" />{" "}
                    <line x1="13" y1="12" x2="15" y2="12" />{" "}
                    <line x1="9" y1="16" x2="9.01" y2="16" />{" "}
                    <line x1="13" y1="16" x2="15" y2="16" />
                  </svg>
                </p>
                <p className="text-gray-500">签到记录</p>
              </a>

              <a
                className="flex flex-col items-center w-24 h-24 mt-4 rounded-md shadow-md bg-cyan-100 justify-items-center shadow-cyan-200"
                href="./myDiscussList"
              >
                <p className="mt-4">
                  <svg
                    className="w-10 h-10 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </p>
                <p className="text-gray-500">协商列表</p>
              </a>
              <a
                className="flex flex-col items-center w-24 h-24 mt-4 bg-red-100 rounded-md shadow-md justify-items-center shadow-red-200"
                href="./cardList"
              >
                <p className="mt-4">
                  <svg
                    className="w-10 h-10 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </p>
                <p className="text-gray-500">卡包</p>
              </a>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MyPersonalCenter;
