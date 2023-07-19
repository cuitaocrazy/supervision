import React, { Fragment, useEffect } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { motion } from "framer-motion";
// import { useRouter } from 'next/router'
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { AppContext } from "../../appState";
import { useContext, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { useHistory } from "react-router-dom";
import Search from '../Search'
import { searchLessonURL } from '../../const/const'
import { Lesson } from '../../types/types'

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
      </div>
    </div>
  );
};

// 确认订单页面
const ConOrder = () => {
  const { state } = useContext(AppContext);
  // 是否同意合同状态
  const IsOrNotAgree = [
    { id: 1, name: '否', unavailable: false },
    { id: 2, name: '是', unavailable: true },
  ]
  const history = useHistory();
  // const [disAgree, setAgree] = useState(IsOrNotAgree[0].unavailable)
  const [disAgree, setAgree] = useState(false)
  console.log("disAgree" + disAgree)
  // 是否同意合同dialog页面状态
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  console.log(state);
  const [lessonList, setLessonList] = useState([] as Lesson[])
  const onQuery = () => {
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
  useEffect(onQuery, [])

  const [queryStr, setQueryStr] = useState('')
  const [page, setPage] = useState(0)
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  const paramStr = getParamStr(
    {
      queryStr: queryStr,
      page: page,
      size: 10
    },
    searchLessonURL
  );


  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent className="flex items-center justify-center justify-items-center scroll-auto">
        {/* <div className="fixed left-0 right-0 w-3/4 pb-2 mx-auto mt-1 bg-white ">
        <div className="flex items-center justify-around gap-10 pt-3 text-xs justify-items-stretch">
          <div className="flex flex-col justify-start">
            <div className="text-xl tracking-widest text-gray-900">
              资金监管平台
            </div>
            <div className="text-sm tracking-widest text-gray-400">我的课堂</div>
          </div>
          <div className="flex flex-row items-center w-96">
          </div>
          <div className="flex flex-row justify-end ">
          </div>
        </div>
      </div> */}
        <Search username={state.loginUser.username} setQueryStr={setQueryStr} onQuery={onQuery} />
        <div className="flex w-3/4 mx-auto mt-24 text-sm text-gray-400 py-2 px-2 bg-gray-100">
          <div className="flex items-center ">
            <span className="pr-2">确认订单</span>
            <span className="pr-2">/</span>
            <span className="pr-2">人员选择</span>
          </div>
        </div>

        <div className="flex w-3/4 gap-4 py-3 mx-auto mt-2 rounded-md">
          <div className="flex flex-row items-center justify-center p-5 border rounded-md shadow-lg w-52">
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
            className="flex flex-row items-center p-5 border rounded-md shadow-lg w-52"
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
            <span>添加/修改人员</span>
          </Link>
        </div>
        <ConOrderLessCard />

        {/* 底部菜单 */}
        <div className="flex  pt-4 w-3/4 mx-auto ">
          <input type="radio" className="mr-2 mt-1" onClick={() => setAgree(!disAgree)} />
          <Link to="/contract" className="text-gray-500 hover:text-primary-600 ">同意本教育机构的合同</Link>
        </div>
        <div className="flex w-3/4 mx-auto  bg-white border-t h-14 mt-4">
          <div className="self-center justify-around text-xs text-gray-500">
            合计：
          </div>
          <div className="self-center mr-4 text-2xl font-black text-red-500 grow justify-self-end">
            ¥{state.lessonDetail.lessonTotalPrice}
          </div>

          <button className="self-center h-10 px-6 mt-2 mr-2 text-sm font-medium text-white justify-self-end bg-primary-500 rounded-3xl"
            onClick={() => {
              if (disAgree) { history.push("/eCNYPay") }
              else openModal()

            }}
          >
            立即支付
          </button>

        </div>

        {/* 是否同意签订合同模态框  */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-center text-gray-900"
                    >
                      是否同意合同
                      <hr className="mt-2 mb-4" />
                    </Dialog.Title>
                    <form
                      // onSubmit={setAgree(Number(disAgree)+1)}
                      className="flex flex-col items-center rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="flex justify-end p-1 w-52">是否同意本教育机构的合同?</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 justify-items-center">
                        <input
                          value="不同意"
                          type="button"
                          className="px-6 py-2 border rounded-md "
                          onClick={closeModal}
                        />
                        <Link to="/eCNYPay">
                          <input
                            value="同意"
                            type="button"
                            className="px-6 py-2 text-white border rounded-md bg-primary-600"
                            onClick={closeModal}
                          />
                        </Link>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </IonContent>
    </IonPage>
  );
};

export default ConOrder;
