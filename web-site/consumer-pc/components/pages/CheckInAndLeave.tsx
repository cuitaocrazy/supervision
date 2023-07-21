import React, { useContext, useEffect, useState,Fragment } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToast,
  IonButton,
  useIonToast,
} from "@ionic/react";
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar";
import { AppContext } from "../../appState";
import moment from "moment";
import { checkInURL, leaveURL } from "../../const/const";
import { Dialog, Transition } from '@headlessui/react';

import Search from '../Search'
import {searchLessonURL} from'../../const/const';
import { Lesson } from '../../types/types'

// 签到和请假页面
const CheckInAndLeave = () => {
  const { state } = useContext(AppContext);
  const [queryStr, setQueryStr] = useState('')
  const [date, setDate] = useState(moment().format("YYYY年MM月DD日"));
  const [time, setTime] = useState(moment().format("HH:mm:ss"));
  const [back, setBack] = useState(null as unknown);
  const [isLeave,setIsLeave]=useState(false)
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

  // 课程签到Toast
  const [showCheckInToast, setShowCheckInToast] = useState(false);
  // 课程请假Toast
  const [showLeaveToast, setShowLeaveToast] = useState(false);
  // 课程请假dialog页面状态
  let [isLeaveOpen, setIsLeaveOpen] = useState(false);
  function closeLeaveModal() {
    setIsLeaveOpen(false);
  }
  function openLeaveModal() {
    setIsLeaveOpen(true);
  }
  if (back) {
    return <Redirect to={back as string}></Redirect>;
  }

  const CheckIn=()=>{
    setShowCheckInToast(true)
    CheckInFun()
  }
  // 签到结果提示
  const CheckInFun = () => {
    
    fetch(checkInURL, {
      method: "POST",
      body: JSON.stringify({
        date: date,
        time: time,
        contractId: state.contractDetail.contractId,
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setBack("/MyCheckInList");
      });
  };

  setTimeout(() => {
    setDate(moment().format("YYYY年MM月DD日"));
    setTime(moment().format("HH:mm:ss"));
  }, 1000);

  // 请假结果提示
  
  console.log(state)
  const LeaveFun = () => {   
    // function LeaveFun() {
    //   setIsLeave(true);
    // }
      fetch(leaveURL, {
        method: "POST",
        body: JSON.stringify({
          date: date,
          time: time,
          contractId: state.contractDetail.contractId,
        }),
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setBack("/MyCheckInList");
        });
      // setBack('/MyCheckInList')
      setShowLeaveToast(true)
    
  };

  return (
    <IonPage>
      <IonHeader>
       <Search setQueryStr={setQueryStr} onQuery={onQuery} />
      </IonHeader>
      <IonContent>
       <div className="mx-32">
       <div className="py-3 text-sm text-center shadow-md text-secondary-400 mt-24 rounded-lg">
          <div className="inline">{date}</div>
          <div className="inline pl-2">{time}</div>
        </div>
        <div className="pt-6 pb-6 mt-2 mb-4 text-center rounded-lg shadow-md">
          <div className="grid grid-cols-1 justify-items-center">
            <button
              className="text-base font-bold text-white rounded-full w-28 h-28 bg-primary-600"
              onClick={() => {
                CheckIn();
              }}
              // onClick={() => setShowCheckInToast(true)}
            >
              <div className="pt-4">课程签到</div>
              <div className="pt-1">{time}</div>
            </button>
            <IonToast
              isOpen={showCheckInToast}
              onDidDismiss={() => setShowCheckInToast(false)}
              message="课程签到成功."
              duration={300}
              position="middle"
            />
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <div className="inline">
              【{state.contractDetail.lessonName}】第
            </div>
            <div className="inline">
              {state.contractDetail.lessonAccumulationQuantity + 1}
            </div>
            <div className="inline">课即将开课，请您尽快签到！</div>
          </div>
        </div>
        <div className="flex mt-4">
          <input
            className="w-80 mx-auto mt-20  py-2 font-bold tracking-widest text-white shadow-md shadow-remind-400 bg-remind-400 rounded-3xl"
            type="button"
            value="请假"
            // onClick={() => LeaveFun()}
            // onClick={() => setShowLeaveToast(true)}
            onClick={()=>{openLeaveModal()}}
          />
        </div>
        
        <Transition appear show={isLeaveOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeLeaveModal}>
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
                      请假
                      <hr className="mt-2 mb-4" />
                    </Dialog.Title>
                    <form
                      // onSubmit={onCreate}
                      className="flex flex-col items-center mt-8 rounded-lg justify-items-center"
                    >
                      <div className="flex items-center mb-4 justify-items-center">
                        <div className="flex leading-7 justify-items-center">
                          <div className="p-1 text-gray-600 w-72 justify-self-start focus:outline-none">
                            您确定要给学生<span className="font-bold">{state.contractDetail.consumerName}</span>请<span className="font-bold">{state.contractDetail.lessonName}</span>假吗？ </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 justify-items-center">
                        <input
                          value="取消"
                          type="button"
                          className="px-6 py-2 border rounded-md "
                          onClick={closeLeaveModal}
                        />
                        <input
                          value="请假"
                          type="button"
                          className="px-6 py-2 text-white border rounded-md bg-primary-600"
                          onClick={LeaveFun}
                        />
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
                <IonToast
              isOpen={showLeaveToast}
              onDidDismiss={() => setShowLeaveToast(false)}
              message="课程请假成功."
              duration={300}
              position="middle"
            />
              </div>
            </div>
          </Dialog>
        </Transition>
       </div>
      </IonContent>
    </IonPage>
  );
};

export default CheckInAndLeave;
