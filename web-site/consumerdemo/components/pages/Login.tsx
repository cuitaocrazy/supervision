import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from 'react'
import {useRouter} from "next/router";
// import { phonePortrait, mailOutline } from 'ionicons/icons';

// import styles from './Login.module.css';

// 登录页面
const Login = () => {
   const router=useRouter();
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>用户登录</div>
      </div>
    </IonHeader>
    <IonContent>
      <div className="flex font-bold text-md ">
        <div className="grid px-2 pt-2 mx-2 mt-4 font-bold justify-items-center">
          <p className="text-primary-600">验证码登录</p>
          <svg className="w-5 h-5 text-primary-600" viewBox="0 7 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">  <line x1="5" y1="12" x2="19" y2="12" /></svg>
        </div>
        <div className="px-2 py-2 mx-2 my-4 justify-items-center">
          <p className="text-gray-800">账号登录</p>
        </div>
      </div>

      <div className="flex px-2 mx-2 my-2 text-sm">
        <div className="pr-4">
          <svg className="inline w-7 h-7 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="7" y="4" width="10" height="16" rx="1" />  <line x1="11" y1="5" x2="13" y2="5" />  <line x1="12" y1="17" x2="12" y2="17.01" /></svg>
        </div>
        <input className="inline w-full border-b" placeholder="请输入手机号" />
      </div>

      <div className="flex px-2 mx-2 my-5 text-sm">
        <div className="pr-5">
          <svg className="inline w-6 h-6 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg>
        </div>
        <input className="inline w-full border-b" placeholder="请输入验证码" />
        <input className="px-4 py-1 border justify-self-end rounded-3xl text-primary-500 border-primary-500" type="button" value="获取验证码" />
      </div>

      <div className="flex mt-12 text-base">
        <button className="w-full h-10 py-2 mx-6 font-bold tracking-widest text-white shadow-md rounded-3xl bg-primary-600 bg-grimary-600 shadow-primary-600" 
              type="button"
              onClick={()=>{router.push('./home')}} >登录
      </button>
      </div>
      <p className="pt-8 text-sm text-center text-gray-500">登录即同意资金监管平台
        <span className="text-primary-500">《隐私政策》</span>
      </p>
    </IonContent>
  </IonPage>

}

// const Login = () => {
//   return <IonPage>
//     <IonHeader>
//       <IonToolbar color="primary">
//         <IonTitle >登录/注册</IonTitle>
//       </IonToolbar>
//     </IonHeader>
//     <IonContent fullscreen>
//       <IonList className={styles.list}>
//         <IonItem>
//           <IonIcon icon={phonePortrait}></IonIcon>
//           <IonInput placeholder="请输入手机号" ></IonInput>
//         </IonItem>
//         <IonItem>
//           <IonIcon icon={mailOutline}></IonIcon>
//           <IonInput placeholder="请输入验证码" ></IonInput>
//           <IonButton shape="round" color="primary" fill="outline">获取验证码</IonButton>
//         </IonItem>
//         <IonItem lines="none" >
//           <IonButton color="primary" shape="round" fill="outline" expand="block" size="default">登录/注册</IonButton>
//         </IonItem>
//       </IonList>

//     </IonContent>
//   </IonPage>

// }

export default Login;
