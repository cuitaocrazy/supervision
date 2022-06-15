import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React from 'react'
import { useRouter } from "next/router";

// 登录页面
const Register = () => {
  const router = useRouter();
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>用户注册</div>
      </div>
    </IonHeader>
    <IonContent>
      <div className="px-2 mx-4 mt-6 text-sm ">
        <p className="pb-2">联系方式</p>
        <input className="inline w-full leading-7 border-b focus:outline-none" placeholder="请输入手机号" />
      </div>

      <div className="flex px-2 mx-4 my-5 text-sm">
        <input className="inline w-full leading-7 border-b" placeholder="请输入验证码" />
        <input className="px-4 py-1 border justify-self-end rounded-3xl text-primary-500 border-primary-500 focus:outline-none" type="button" value="获取验证码" />
      </div>

      <div className="flex items-center px-2 mx-4 justify-items-center">
        <div className="pr-2">
          <input className="border-gray-300 rounded outline-none cursor-pointer text-primary-600 focus:ring-0 focus:ring-primary-600 focus:outline-none checked:bg-primary-500" type="checkbox"></input>
        </div>
        <div className="pt-1 text-sm text-gray-800 ">同意
          <span className="text-primary-500">《资金监管平台注册协议》</span>
          <span className="text-gray-800">&</span>
          <span className="text-primary-500">《隐私政策》</span>
        </div>
      </div>

      <div className="flex mt-12 text-base">
        <button className="w-full h-10 py-2 mx-6 font-bold tracking-widest text-white shadow-md rounded-3xl bg-primary-600 bg-grimary-600 shadow-primary-600 focus:bg-primary-700"
          type="button"
          onClick={() => { router.push('./home') }} >注册并登录
        </button>
      </div>
    </IonContent>
  </IonPage>

}

export default Register;
