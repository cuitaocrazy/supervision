import { IonPage, IonHeader, IonContent } from "@ionic/react";
import Navbar from "components/Navbar";
import MyLessonInfoDetailTabs from "../MyLessonInfoDetailTabs";
import LessonImage from "../LessonImage";
import { ContractNego, Lesson } from "../../types/types";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../appState";
import { searchContractNegoURL } from "../../const/const";

let lesson: Lesson = {
  lessonImgs: "https://s3.bmp.ovh/imgs/2022/08/30/28f95385d82b4f7c.jpg",
};
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
const RefundLessonDetail = () => {
  const { state } = useContext(AppContext);
  const [contractNego, setContractNego] = useState({} as ContractNego);
  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach((key) => {
      if (params[key] !== "") result = result + key + "=" + params[key] + "&";
    });
    return url + result;
  };
  const paramStr = getParamStr(
    {
      contractId: state.contractDetail.contractId,
    },
    searchContractNegoURL
  );
  useEffect(() => {
    fetch(paramStr, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setContractNego(json.result);
      });
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <Navbar title="课程详情" />
        <div className="absolute top-0 right-0 max-w-sm ">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center   px-3 py-2 text-base font-medium text-white hover:text-opacity-100 `}
                >
                  <span>
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
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </span>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 max-w-sm mt-1 transform -translate-x-1/2 w-44 sm:px-0 lg:max-w-3xl">
                    <div className="w-32 overflow-hidden rounded-lg shadow-lg">
                      <div className="p-1 bg-gray-900 opacity-75">
                        <Link
                          to="/refoundLesson"
                          className="flow-root py-2 transition duration-150 ease-in-out rounded-md focus:bg-gray-500"
                        >
                          <span className="flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              退订课程
                            </span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </IonHeader>
      <IonContent>
        <div className="relative mb-3 bg-white pb-14 scroll-auto">
          <LessonImage lessonImage={lesson.lessonImgs} />
          <MyLessonInfoDetailTabs />
          <div className="px-3 pt-3 pb-4 mx-3 mt-2 text-xs rounded-lg shadow-md">
            <div className="flex leading-6">
              <div className="pr-3 text-gray-500">退款完成状态：</div>
              <div className="text-gray-700">
                {contractNego.negoStatus === "complete" ? "完成" : "未完成"}
              </div>
            </div>
            <div className="px-3 pt-3 pb-4 mx-3 mt-2 text-xs rounded-lg shadow-md">
              <div className="pr-3 text-gray-500">退款金额</div>
              <div className="text-gray-700">{contractNego.negoRefundAmt}</div>
            </div>
            <div className="px-3 pt-3 pb-4 mx-3 mt-2 text-xs rounded-lg shadow-md">
              <div className="pr-3 text-gray-500">补偿金额</div>
              <div className="text-gray-700">
                {contractNego.negoCompensationAmt}
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RefundLessonDetail;
