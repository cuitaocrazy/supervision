import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { FC, Fragment,useCallback,useEffect, useState,useContext } from 'react'
import { useRouter } from "next/router";
import { Redirect } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'
import { Tab } from '@headlessui/react'
import Navbar from '../Navbar'
import {AppContext,setloginUser} from '../../appState';

type FormDate = {
  username: string
  password: string
  phone:string
  verifyCode:string
}

// 账号登录和验证码登录Tab
const MyLoginTabs = () => {
  const { register, formState: { errors },handleSubmit } = useForm<FormDate>()
  const [username,setUserName] = useState(undefined as string|undefined)
  const router = useRouter()
  const { state, dispatch } = useContext(AppContext);
  // const onSubmit: SubmitHandler<FormDate> = (data: FormDate) => {
  //  // fetch
  //   console.log(data)
  //   setUserName(data.username)
  //   setloginUser({loginName:data.username,username:'userName'})
  //   // router.push('./home')
  // }

  const onSubmit = (loginType:string) => (data: FormDate)=>{

    if(loginType==='verfiyCode'){
      setUserName(data.phone)
      setloginUser({loginName:data.phone,username:'userName'})
    }else{
      setUserName(data.username)
      setloginUser({loginName:data.username,username:'userName1'})
    }

  }

  if(username){
    return <Redirect to={'/tabs/home'} />
  }

  return (
    <Tab.Group>
      <Tab.List>
        <Tab as={Fragment}>
          {({ selected }) => {
            return <button id='loginButton'
              className={
                selected ? ' px-2 pt-2 mx-2 mt-4 font-bold  text-primary-600 focus:outline-none ' : 'px-2 py-2 mx-2 my-4  text-gray-800 font-bold '
              }
            >
              验证码登录
            </button>
          }}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => {
            
            return  <button
              className={
                selected ? ' px-2 pt-2 mx-2 mt-4 font-bold  text-primary-600 focus:outline-none' : 'px-2 py-2 mx-2 my-4  text-gray-800 font-bold '
              }
            >
              账号登录
            </button>
            }
          }
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <form onSubmit={handleSubmit(onSubmit('verfiyCode'))}>
            <div className="flex px-2 mx-2 my-2 text-sm">
              <div className="pr-4">
                <svg className="inline w-6 h-6 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="7" y="4" width="10" height="16" rx="1" />  <line x1="11" y1="5" x2="13" y2="5" />  <line x1="12" y1="17" x2="12" y2="17.01" /></svg>
              </div>
              <input className="inline w-full border-b focus:outline-none" placeholder="请输入手机号"
                {...register('phone', { required: true })} />
              {errors.phone && <p className="pt-2 pl-3 text-base text-error-400">手机号不能为空</p>}
            </div>

            <div className="flex px-2 mx-2 my-5 text-sm">
              <div className="pr-5">
                <svg className="inline w-6 h-6 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg>
              </div>
              <input  {...register('verifyCode')} className="inline w-full border-b focus:outline-none" placeholder="请输入验证码" />
              <input className="px-4 py-1 border justify-self-end rounded-3xl text-primary-500 border-primary-500" type="button" value="获取验证码" />
            </div>
            <LoginBtn />
          </form>
        </Tab.Panel>
        <Tab.Panel>
          <form onSubmit={handleSubmit(onSubmit('account'))}>
            <div className="flex px-2 mx-2 my-2 text-sm">
              <div className="pr-4">
                <svg className="inline w-6 h-6 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
              </div>
              <input  {...register('username', { required: true })} className="inline w-full border-b focus:outline-none" onChange={(e)=>{console.log(e.target.value)}}
                placeholder="请输入账号" />
            </div>

            <div className="flex px-2 mx-2 my-5 text-sm">
              <div className="pr-5">
                <svg className="inline w-6 h-6 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="5" y="11" width="14" height="10" rx="2" />  <circle cx="12" cy="16" r="1" />  <path d="M8 11v-4a4 4 0 0 1 8 0v4" /></svg>
              </div>
              <input  type='password' {...register('password', { required: true })} className="inline w-full py-1 border-b focus:outline-none"
                placeholder="请输入密码"
                 />
            </div>
            <LoginBtn />
          </form>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

// 登录按钮
const LoginBtn = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex mt-12 text-base">
        <input className="w-full h-10 py-2 mx-6 font-bold tracking-widest text-white shadow-md rounded-3xl bg-primary-600 bg-grimary-600 shadow-primary-600 focus:bg-primary-700"
          type="submit"
          value="登录"
           />
      </div>
      <p className="pt-8 text-sm text-center text-gray-500">登录即同意资金监管平台
        <span className="text-primary-500">《隐私政策》</span>
      </p>
    </div>
  )
}

// 登录页面
const Login = () => {
  return <IonPage>
    <IonHeader>
      <Navbar title="用户登录" />
    </IonHeader>
    <IonContent>
      <MyLoginTabs />
    </IonContent>
  </IonPage>

}

export default Login;
