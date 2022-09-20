import React,{Fragment,useState} from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { motion } from "framer-motion";
// import { useRouter } from 'next/router'
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { AppContext } from "../../appState";
import { useContext } from "react";
import { State } from "ionicons/dist/types/stencil-public-runtime";
import { Dialog, Transition } from '@headlessui/react';
import { useHistory } from "react-router-dom";

// 订单课程信息card
const ConOrderLessCard = () => {
  const { state } = useContext(AppContext);
  return (
    <div className="pt-1 pb-2 mt-3 mb-3 bg-white rounded-lg shadow-md">
      <div className="mt-2 rounded-lg">
        <div className="py-2 pl-3 font-medium">
          {state.lessonDetail.edu.eduName}
        </div>
        <div className="grid h-24 grid-cols-12 mx-2 rounded-lg">
          <img
            className="w-20 h-20 col-span-4 mt-2 ml-1 mr-2 rounded-xl"
            src="https://s3.bmp.ovh/imgs/2022/08/30/28f95385d82b4f7c.jpg"
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
        {/* 培训信息 */}
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
        </div>
      </div>
    </div>
  );
};

// 确认订单页面
const ConOrder = () => {
  const { state } = useContext(AppContext);
  console.log(state)
  const history = useHistory();
  // const [disAgree, setAgree] = useState(IsOrNotAgree[0].unavailable)
  const [disAgree, setAgree] = useState(false)
    // 是否同意合同dialog页面状态
    let [isOpen, setIsOpen] = useState(false);
    function closeModal() {
      setIsOpen(false);
    }
    function openModal() {
      setIsOpen(true);
    }
  return (
    <IonPage>
      <IonHeader>
        <Navbar title="确认订单" />
      </IonHeader>
      <IonContent>
        <div className="mb-3 bg-white pb-14 scroll-auto">
          <div className="h-full mx-3 bg-white">
            <div className="pt-3 ml-1 text-base font-bold text-gray-800">
              请选择学生
            </div>
            <div className="grid items-center grid-cols-2 py-3 pl-2 text-base bg-white rounded-lg shadow-md">
              <div className="items-center justify-center font-medium text-gray-700 ">
                {/* {state.stuName ? state.stuName : "可新增或修改学生信息"} */}
                {state.stuName ? state.stuName : state.loginUser.username}
              </div>
              <Link to="/stuInfoList" className="pt-3 mr-2 cursor-pointer justify-self-end">
                <a >
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
            </div>

            <ConOrderLessCard />

            {/* <div className='flex justify-between gap-4 p-3 mt-2 border rounded-md'>
                    <div  className='w-24 p-5 border border-orange-300 rounded-md glow-secondary-400'>
                      <div className='font-semibold text-orange-400'>张小云</div>
                      <div className='pt-1 text-xs text-center text-gray-500'>12周岁</div>
                    </div>
                    <div className='w-24 p-5 border'>
                      <div className='font-semibold text-gray-400'>张文岱</div>
                      <div className='pt-1 text-xs text-center text-gray-500'>8周岁</div>
                    </div>
                    <div className='w-24 p-5 border'>
                    <svg className="w-8 h-8 mt-1 ml-3 text-secondary-300"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
                    </div>
                  </div> */}
          </div>
        </div>

        {/* 底部菜单 */}
        <div className="fixed bottom-0 flex flex-col w-full h-24 pl-5 mt-6 bg-white border-t justify-items-stretch">
          <div className="flex items-center justify-center pt-4">
            <input type="radio" className="mr-2 " onClick={()=>setAgree(!disAgree)}  />
            <Link to="/contentsOfContracts" className="text-gray-500">同意本教育机构的合同</Link>
          </div>
          <div className="flex">
            <div className="self-center justify-around text-xs text-gray-500">
              合计：
            </div>
            <div className="self-center mr-4 text-2xl font-black text-red-500 grow justify-self-end">
              ¥{state.lessonDetail.lessonTotalPrice}
            </div>
           
              <button className="self-center h-10 px-6 mt-1 mr-2 text-sm font-medium text-white justify-self-end bg-primary-500 rounded-3xl"
              onClick={()=>{
                if(disAgree){history.push("/eCNYPay")}
                else 
                openModal()
                
                
              }}>
                立即支付
              </button>
          
          </div>
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
                          onClick={()=>{
                            closeModal();
                            history.push("/conOrder")

                          }}
                        />
                        <Link to="/eCNYPay">
                        <input 
                          value="同意"
                          type="button"
                          className="px-6 py-2 text-white border rounded-md bg-primary-600"
                          onClick={()=>{
                            closeModal();
                            history.push("/eCNYPay")

                          }}
                          
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
