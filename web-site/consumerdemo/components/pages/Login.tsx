import { IonContent, IonHeader, IonPage } from "@ionic/react";
import {FC,Fragment} from 'react'
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from 'react-hook-form'
import { Tab } from '@headlessui/react'

type FormDate = {
  username: string
  password: string
}

// 账号登录和验证码登录Tab
function MyTabs() {
  const { register,  formState: { errors } } = useForm<FormDate>()
  return (
    <Tab.Group>
      <Tab.List>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={
                selected ? ' px-2 pt-2 mx-2 mt-4 font-bold  text-primary-600 focus:outline-none ' : 'px-2 py-2 mx-2 my-4  text-gray-800 font-bold '
              }
            >
              验证码登录
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={
                selected ? ' px-2 pt-2 mx-2 mt-4 font-bold  text-primary-600 focus:outline-none' : 'px-2 py-2 mx-2 my-4  text-gray-800 font-bold '
              }
            >
              账号登录
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
        <div className="flex px-2 mx-2 my-2 text-sm">
          <div className="pr-4">
            <svg className="inline w-6 h-6 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="7" y="4" width="10" height="16" rx="1" />  <line x1="11" y1="5" x2="13" y2="5" />  <line x1="12" y1="17" x2="12" y2="17.01" /></svg>
          </div>
          <input className="inline w-full border-b focus:outline-none" placeholder="请输入手机号"
                 {...register('username', { required: true })} />
                 {errors.username && <p className="pt-2 pl-3 text-base text-error-400">手机号不能为空</p>}
        </div>

        <div className="flex px-2 mx-2 my-5 text-sm">
          <div className="pr-5">
            <svg className="inline w-6 h-6 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg>
          </div>
          <input className="inline w-full border-b focus:outline-none" placeholder="请输入验证码" />
          <input className="px-4 py-1 border justify-self-end rounded-3xl text-primary-500 border-primary-500" type="button" value="获取验证码" />
        </div>
        </Tab.Panel>
        <Tab.Panel>
        <div className="flex px-2 mx-2 my-2 text-sm">
          <div className="pr-4">
          <svg className="inline w-6 h-6 text-primary-600"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
          </div>
          <input className="inline w-full border-b focus:outline-none" placeholder="请输入账号" />
        </div>

        <div className="flex px-2 mx-2 my-5 text-sm">
          <div className="pr-5">
          <svg className="inline w-6 h-6 text-primary-600"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="5" y="11" width="14" height="10" rx="2" />  <circle cx="12" cy="16" r="1" />  <path d="M8 11v-4a4 4 0 0 1 8 0v4" /></svg>
          </div>
          <input className="inline w-full py-1 border-b focus:outline-none" placeholder="请输入密码" />
        </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

// 登录页面
const Login = () => {
  const router = useRouter();
  const { handleSubmit} = useForm<FormDate>()
  const onSubmit: SubmitHandler<FormDate> = (data: FormDate) => {
    saveLoginDate()
    router.push('./home')
  }

  function saveLoginDate(): void {

  }
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>用户登录</div>
      </div>
    </IonHeader>
    <IonContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MyTabs />
        <div className="flex mt-12 text-base">
          <input className="w-full h-10 py-2 mx-6 font-bold tracking-widest text-white shadow-md rounded-3xl bg-primary-600 bg-grimary-600 shadow-primary-600 focus:bg-primary-700"
            type="button"
            value="登录"
            onClick={()=>{router.push("./home")}} />
        </div>
        <p className="pt-8 text-sm text-center text-gray-500">登录即同意资金监管平台
          <span className="text-primary-500">《隐私政策》</span>
        </p>
      </form>
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
