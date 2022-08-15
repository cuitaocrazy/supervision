import { useState, Fragment } from 'react';
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonModal,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonInput,
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonContent,
} from '@ionic/react';
import { Dialog, Transition } from '@headlessui/react';
import { Redirect,Link } from "react-router-dom";
import {useRouter} from 'next/router'

const Quit: React.FC = () => {
  const router = useRouter();
    // 退出dialog页面状态
    let [isQuitOpen, setIsQuitOpen] = useState(false);
    function closeQuitModal() {
      setIsQuitOpen(false);
    }
    function openQuitModal() {
      setIsQuitOpen(true);
    }

    const returnLogin=()=>{
      <Link to="/login" />
    }
    return (
      <>
          <IonHeader >
            <IonToolbar className="flex pr-10 bg-white">
              <div className="flex justify-end gap-1 text-base font-bold leading-7 text-red-400">
                <button className='flex gap-1' onClick={openQuitModal}>
                <div className='flex items-center'>
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="10152"
                    width="25"
                    height="25"
                  >
                    <path
                      d="M512 929.959184c-199.053061 0-361.012245-161.959184-361.012245-361.012245 0-130.612245 71.053061-251.297959 184.946939-315.559184 9.926531-5.746939 22.987755-2.089796 28.212245 7.836735 5.746939 9.926531 2.089796 22.987755-7.836735 28.212245-100.832653 56.42449-163.526531 163.526531-163.526531 278.987755 0 176.065306 143.15102 319.216327 319.216327 319.216326s319.216327-143.15102 319.216327-319.216326c0-115.461224-62.693878-222.563265-163.526531-278.987755-9.926531-5.746939-13.583673-18.285714-7.836735-28.212245 5.746939-9.926531 18.285714-13.583673 28.212245-7.836735 113.893878 63.738776 184.946939 184.946939 184.946939 315.036735 0 199.57551-161.959184 361.534694-361.012245 361.534694z"
                      fill="#E5404F"
                      p-id="10153"
                    ></path>
                    <path
                      d="M512 135.836735c-26.122449 0-47.020408 20.897959-47.020408 47.020408v229.877551c0 26.122449 20.897959 47.020408 47.020408 47.020408s47.020408-20.897959 47.020408-47.020408V182.857143c0-26.122449-20.897959-47.020408-47.020408-47.020408z"
                      fill="#E5404F"
                      p-id="10154"
                    ></path>
                  </svg>
                </div>
                <div className="flex items-center" >退出</div>
                </button>
              </div>
              {/* 退出登录dialog */}
            <Transition appear show={isQuitOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeQuitModal}>
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
                        </Dialog.Title>
                        <form
                          // onSubmit={returnLogin}
                          className="flex flex-col items-center rounded-lg justify-items-center"
                        >
                          <div className="flex items-center mb-4 justify-items-center">
                            <div className="flex leading-7 justify-items-center">
                              <div className="flex justify-end p-1">你确定要退出登录吗？</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2 justify-items-center">
                            <input
                              value="取消"
                              type="button"
                              className="px-6 py-2 border rounded-md "
                              onClick={closeQuitModal}
                            />
                            <input
                              value="确定"
                              type="button"
                              className="px-6 py-2 text-white border rounded-md bg-primary-600"
                              // onClick={
                              //   returnLogin
                              // }
                              onClick={()=>{router.push("login")}}
                            />
                          </div>
                        </form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
            </IonToolbar>
          </IonHeader>
      </>
    );
                  }

export default Quit;
