import React from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { motion } from "framer-motion";
// import { useRouter } from 'next/router'
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { AppContext } from "../../appState";
import { useContext } from "react";
import { State } from "ionicons/dist/types/stencil-public-runtime";

// 订单课程信息card
const ConOrderLessCard = () => {
  const { state } = useContext(AppContext);
  return (
    <div className="w-3/4 pt-1 pb-2 mx-auto mt-3 mb-3 bg-white rounded-lg shadow-md">
      <div className="mt-2 rounded-lg">
        <div>
          <table className="flex flex-col justify-items-stretch">
            <thead className="">
              <tr className="grid items-center h-10 grid-cols-3 font-bold text-gray-700 bg-gray-100 rounded-t-lg justify-items-stretch">
                <th>课程名称</th>
                <th>课时数</th>
                <th>价格（元）</th>
              </tr>
            </thead>
            <tbody>
              <tr className="grid items-center grid-cols-3 text-gray-600 bg-white h-28 justify-items-center">
                <td className="flex flex-row">
                  <img
                    className="h-20 col-span-4 mr-2 w-28 rounded-xl"
                    src="https://s3.bmp.ovh/imgs/2022/09/07/7745c096bcbd3af9.jpg"
                  ></img>
                  <div className="flex flex-col ml-2">
                  <span>{state.lessonDetail.edu.eduName}</span>
                  <span>{state.lessonDetail.lessonName}</span>
                  <span>{state.lessonDetail.lessonIntroduce}</span>
                  </div>
                </td>
                <td>{state.lessonDetail.lessonTotalQuantity}</td>
                <td>{state.lessonDetail.lessonTotalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className="py-2 pl-3 font-medium">
          {state.lessonDetail.edu.eduName}
        </div>
        <div className="grid h-24 grid-cols-12 mx-2 rounded-lg">
          <img
            className="w-20 h-20 col-span-4 mt-2 ml-1 mr-2 rounded-xl"
            src="http://placekitten.com/g/200/300"
          ></img>
          <div className="flex flex-col col-span-8 mt-5 mr-3 justify-items-start">
            <div className="overflow-hidden text-sm font-medium tracking-wide text-ellipsis">
              {state.lessonDetail.lessonName}
            </div>
            <div className="h-8 mt-2 overflow-hidden text-xs text-gray-500 text-ellipsis">
              {state.lessonDetail.lessonIntroduce}
            </div>
          </div>
        </div>

        <div className="mx-3 text-sm leading-6">
          <div className="flex items-center mb-1">
            <div className="mr-2 text-center text-gray-500">培训课时:</div>
            <div className="font-medium text-center text-gray-800">
              {state.lessonDetail.lessonTotalQuantity}课时
            </div>
          </div>

          <div className="flex items-center mb-1">
            <div className="mr-2 text-center text-gray-500">开始日期:</div>
            <div className="font-medium text-center text-gray-800">
              {state.lessonDetail.lessonStartDate}
            </div>
          </div>
          <div className="flex items-center mb-1">
            <div className="mr-2 text-center text-gray-500">培训地址:</div>
            <div className="font-medium text-center text-gray-800">
              {state.lessonDetail.edu.eduAddress}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

// 确认订单页面
const ConOrder = () => {
  const { state } = useContext(AppContext);
  console.log(state);
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent className="flex items-center justify-center justify-items-center scroll-auto">
      <div className="fixed left-0 right-0 w-3/4 pb-2 mx-auto mt-1 bg-white ">
        <div className="flex items-center justify-around gap-10 pt-3 text-xs justify-items-stretch">
          <div className="flex flex-col justify-start">
            <div className="text-xl tracking-widest text-gray-900">
              资金监管平台
            </div>
            <div className="text-sm tracking-widest text-gray-400">我的课堂</div>
          </div>
          <div className="flex flex-row items-center w-96">
            {/* <input
              type="text"
              className="flex items-center justify-center h-10 pl-2 ml-3 text-sm text-gray-300 border border-gray-400 shadow-lg rounded-l-3xl grow focus:outline-none focus:glow-primary-600"
              placeholder="请输入机构名称/课程名称/教师姓名关键词"
              x-model="search"
              onChange={(e) => setQueryStr(e.target.value)}
            />
            <button
              type="submit"
              className="flex items-center justify-center flex-none w-20 h-10 mr-3 bg-primary-600 rounded-r-3xl focus:outline-none hover:bg-primary-700 "
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
              </svg>
              <span className="pr-2 ml-1 text-sm text-white">搜索</span>
            </button> */}
          </div>
          <div className="flex flex-row justify-end ">
            {/* <button  className="h-10 px-2 mt-5 mr-3 text-base text-gray-800 rounded-md "
            onClick={openModal}>
              登录
            </button>
            <button  className="h-10 px-2 mt-5 text-base text-gray-800 rounded-md ">
              注册
            </button> */}
          </div>
        </div>
      </div>
        <div className="flex w-3/4 mx-auto mt-20 text-sm text-gray-400 py-2 px-2 bg-gray-100">
          <div className="flex items-center ">
            <span className="pr-2">确认订单</span>
            <span className="pr-2">/</span>
            <span className="pr-2">人员选择</span>
          </div>
        </div>
        {/* <div className="flex w-3/4 mx-auto text-sm text-gray-400 mt-28 bg-gray-100 py-2 px-2">
        <div className="flex items-center ">
          <span className="pr-2">首页</span> <span className="pr-2">/</span><span className="pr-2">搜索结果</span><span className="pr-2">/</span><span>课程详情</span>
        </div>
      </div> */}
        {/* <div className="mb-3 bg-white pb-14 scroll-auto"> */}
        <div className="flex w-3/4 gap-4 py-3 mx-auto mt-2 rounded-md">
          <div className="flex flex-row items-center justify-center p-5 border rounded-md shadow-lg w-44">
            <input type="checkbox" className="mr-4 border-2" defaultChecked />
            <div className="font-semibold text-gray-600">
              {state.stuName ? state.stuName : state.loginUser.username}
            </div>
            <div className="pt-1 text-xs text-center text-gray-500">
              {state.stuAge}
            </div>
          </div>
          <Link
            to="/stuInfoList"
            className="flex flex-row items-center p-5 border rounded-md shadow-lg w-44"
          >
            <svg
              className="w-8 h-8 mt-1 ml-3 mr-4 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <span>添加人员</span>
          </Link>
        </div>

        {/* <div className="pt-3 ml-1 text-base font-bold text-gray-800">
              请选择学生
            </div>
            <div className="grid items-center grid-cols-2 py-3 pl-2 text-base bg-white rounded-lg shadow-md">
              <div className="items-center justify-center font-medium text-gray-700 ">
                {state.stuName ? state.stuName : state.loginUser.username}
              </div>
              <Link
                to="/stuInfoList"
                className="pt-3 mr-2 cursor-pointer justify-self-end"
              >
                <a>
                  <svg
                    className="w-5 h-5 text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </a>
              </Link>
            </div> */}

        <ConOrderLessCard />

        {/* 底部菜单 */}
        <div className="flex  pt-4 w-3/4 mx-auto ">
            <input type="radio" className="mr-2 mt-1" />
            <Link to="/contract" className="text-gray-500 hover:text-primary-600 ">同意本教育机构的合同</Link>
          </div>
        <div className="flex w-3/4 mx-auto  bg-white border-t h-14 mt-4">
          <div className="self-center justify-around text-xs text-gray-500">
            合计：
          </div>
          <div className="self-center mr-4 text-2xl font-black text-red-500 grow justify-self-end">
            ¥{state.lessonDetail.lessonTotalPrice}
          </div>
          <Link to="/eCNYPay">
            <button className="self-center h-10 px-6 mt-2 mr-2 text-sm font-medium text-white justify-self-end bg-primary-500 rounded-3xl">
              立即支付
            </button>
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ConOrder;
