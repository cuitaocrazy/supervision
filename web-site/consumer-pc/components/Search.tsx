import { Fragment, forwardRef, useCallback, useContext, useImperativeHandle, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { loginURL } from "../const/const";
import { AppContext, setloginUser } from "../appState";

interface searchProps {
  setQueryStr: Function;
  onQuery: Function;
  username?: string;
}
/* 搜索框 */
const Search = forwardRef<{ openLoginModal: () => void }, searchProps>((props, ref) => {
  const { setQueryStr, onQuery } = props;
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onQuery();
  };

  type FormPwd = {
    username: string;
    password: string;
  };
  const useFormPwd = useForm<FormPwd>();
  const registerPwd = useFormPwd.register;
  const handleSubmitPwd = useFormPwd.handleSubmit;
  // const [LoginDialogIsOrNotOpen,setLoginDialogIsOrNotOpen]=useState(undefined as boolean | undefined);
  const {
    state: {
      loginUser: { username },
    },
    dispatch,
  } = useContext(AppContext);
  const refreshLoginUser = useCallback(
    (loginUser: any) => {
      dispatch(setloginUser(loginUser));
    },
    [dispatch]
  );
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  useImperativeHandle(ref, () => {
    return {
      openLoginModal: openModal,
      // closeLoginModal: closeModal,
    }
  })
  console.log(`login modal is open :${isOpen}`);
  const onSubmitLogin = (loginType: string) => (data: any) => {
    if (loginType === "verfiyCode") {
      fetch(loginURL, {
        method: "POST",
        body: JSON.stringify({
          phone: data.phone,
          verifyCode: data.verifyCode,
        }),
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          refreshLoginUser({
            loginName: json.result.loginName,
            username: json.result.username,
            userId: json.result.userId,
          });
        });
    } else {
      fetch(loginURL, {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          refreshLoginUser({
            loginName: json.result.loginName,
            username: json.result.username,
            userId: json.result.userId,
          });
          closeModal();
        });
    }
  };

  function logout() {
    refreshLoginUser({
      //登录用户信息
      userId: null,
      loginName: null,
      username: null,
      phone: null,
      role: null,
    });
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="pb-4">
        <div className="fixed left-0 right-0 w-3/4 pb-2 mx-auto bg-white pt-4">
          <div className="flex items-center justify-around gap-10 pt-3 text-xs justify-items-stretch">
            <div className="flex flex-col justify-start">
              <div className="text-xl tracking-widest text-gray-900">
                资金监管平台
              </div>
              <div className="text-sm tracking-widest text-gray-400">
                我的课堂
              </div>
            </div>
            <div className="flex flex-row items-center w-96">
              <input
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
              </button>
            </div>
            <div className="flex flex-row justify-end items-center text-white">
              <button
                className="h-10  mr-3 text-base   rounded-md  px-4 py-2 bg-primary-600 focus:bg-primary-800 hover:bg-primary-700"
                hidden={username != null}
                onClick={openModal}
              >
                登录
              </button>
              <button
                className="h-10 px-4 py-2  text-base  rounded-md bg-primary-600 focus:bg-primary-800 hover:bg-primary-700"
                hidden={username != null}
              >
                注册
              </button>
              <button
                className="h-10 px-4 py-2  mr-3 text-base  rounded-md bg-primary-600 focus:bg-primary-800 hover:bg-primary-700 "
                hidden={username == null}
                onClick={logout}
              >
                退出
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* 新增课程模态框 */}
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
                    账号登录
                    <hr className="mt-2 mb-4" />
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmitPwd(onSubmitLogin("account"))}
                    className="flex flex-col items-center rounded-lg justify-items-center"
                  >
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex leading-7 justify-items-center" >
                        <div className="flex justify-end p-1 w-36">用户名:</div>
                        <input
                          className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                          {...registerPwd("username", { required: true })}
                          // className="inline w-full border-b focus:outline-none"
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                          placeholder="请输入账号"
                        ></input>
                      </div>
                    </div>

                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex justify-items-center">
                        <span className="flex justify-end p-1 mr-1 w-36">
                          密码:
                        </span>
                        <input
                          className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                          type="password"
                          {...registerPwd("password", { required: true })}
                          // className="inline w-full py-1 border-b focus:outline-none"
                          placeholder="请输入密码"
                        ></input>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2 justify-items-center">
                      <input
                        value="取消"
                        type="button"
                        className="px-6 py-2 border rounded-md "
                        onClick={closeModal}
                      />
                      <input
                        value="确定"
                        type="submit"
                        className="px-6 py-2 text-white border rounded-md bg-primary-600"
                        onClick={() => closeModal()}
                      />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
});

export default Search;
