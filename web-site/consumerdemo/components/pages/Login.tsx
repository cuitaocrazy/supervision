import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { FC, Fragment,useCallback,useEffect, useState,useContext } from 'react'
import { useRouter } from "next/router";
import { Redirect } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'
import { Tab } from '@headlessui/react'
import NavbarNoGoBackBtn from '../NavbarNoGoBackBtn'
import {AppContext,setloginUser} from '../../appState';
import {loginURL} from '../../const/const'

type FormPwd = {
  username: string
  password: string
}

type FormVc = {
  phone:string
  verifyCode:string
}


// 账号登录和验证码登录Tab
const MyLoginTabs = () => {
  const useFormPwd= useForm<FormPwd>()
  const registerPwd = useFormPwd.register
  const handleSubmitPwd = useFormPwd.handleSubmit
  const errorsPwd = useFormPwd.formState.errors

  const useFormVc= useForm<FormVc>()
  const registerVc = useFormVc.register
  const handleSubmitVc = useFormVc.handleSubmit
  const errorsVc = useFormVc.formState.errors

  // const { register, formState: { errors },handleSubmit } = useForm<FormVc>()
  const [username,setUserName] = useState(undefined as string|undefined)
  const router = useRouter()
  const { state, dispatch } = useContext(AppContext);

  const [selectedIndex, setSelectedIndex] = useState(0)

  const refreshLoginUser = useCallback((loginUser:any) => {
    dispatch(setloginUser(loginUser));
  },[dispatch]);

  const onError = (e:any)=>{
    console.log('ERROR')
    console.log(e)
  }

  const onSubmit = (loginType:string) => (data: FormDate)=>{
    console.log('login')
    console.log(loginType)
    if(loginType==='verfiyCode'){
      fetch(loginURL, {
        method: 'POST',
        body: JSON.stringify({
            phone:data.phone,
            verifyCode:data.verifyCode
        }),
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
        },
      }).then(res => res.json())
      .then((json) => {
        console.log('asda')
         console.log(json)
         setUserName(json.result.username)
         refreshLoginUser({loginName:json.result.loginName,username:json.result.username})
      })
    }else{
        fetch(loginURL, {
          method: 'POST',
          body: JSON.stringify({
              username:data.username,
              password:data.password
          }),
          headers: {
            'Content-type': 'application/json;charset=UTF-8',
          },
        }).then(res => res.json())
        .then((json) => {
         setUserName(json.result.username)
         refreshLoginUser({loginName:json.result.loginName,username:json.result.username})
        })
    }
  }


  if(username){
    return <Redirect to={'/tabs/home'} />
  }
  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex} >
      <Tab.List>
        {/* <Tab as={Fragment}>
          {({ selected }) => {
            return <button id='test'
              className={
                selected ? ' px-2 pt-2 mx-2 mt-4 font-bold  text-primary-600 focus:outline-none ' : 'px-2 py-2 mx-2 my-4  text-gray-800 font-bold '
              }
            >
              test
            </button>
          }}
        </Tab> */}
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
        {/* <Tab.Panel>
          测试
          <form onSubmit={handleSubmit((data: FormDate)=>console.log('AAA'))}>
            <input></input>
            <button type="submit" >test</button>
          </form>
        </Tab.Panel> */}
        <Tab.Panel>
          <form id='1' onSubmit={handleSubmitVc(onSubmit('verfiyCode'),onError)}>
            <div className="flex px-2 mx-2 my-2 text-sm">
              <div className="pr-4">
                <svg className="inline w-6 h-6 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="7" y="4" width="10" height="16" rx="1" />  <line x1="11" y1="5" x2="13" y2="5" />  <line x1="12" y1="17" x2="12" y2="17.01" /></svg>
              </div>
              <input className="inline w-full border-b focus:outline-none" placeholder="请输入手机号"
                {...registerVc('phone', { required: true })} />
              {errorsVc.phone && <p className="pt-2 pl-3 text-base text-error-400">手机号不能为空</p>}
            </div>

            <div className="flex px-2 mx-2 my-5 text-sm">
              <div className="pr-5">
                <svg className="inline w-6 h-6 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg>
              </div>
              <input  {...registerVc('verifyCode')} className="inline w-full border-b focus:outline-none" placeholder="请输入验证码" />
              <input className="px-4 py-1 border justify-self-end rounded-3xl text-primary-500 border-primary-500" type="button" value="获取验证码" />
            </div>

            
            <LoginBtn />
          </form>
        </Tab.Panel>
        <Tab.Panel>
          <form id='2' onSubmit={handleSubmitPwd(onSubmit('account'))}>
            <div className="flex px-2 mx-2 my-2 text-sm">
              <div className="pr-4">
                <svg className="inline w-6 h-6 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
              </div>
              <input  {...registerPwd('username', { required: true })} className="inline w-full border-b focus:outline-none" onChange={(e)=>{console.log(e.target.value)}}
                placeholder="请输入账号" />
            </div>

            <div className="flex px-2 mx-2 my-5 text-sm">
              <div className="pr-5">
                <svg className="inline w-6 h-6 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="5" y="11" width="14" height="10" rx="2" />  <circle cx="12" cy="16" r="1" />  <path d="M8 11v-4a4 4 0 0 1 8 0v4" /></svg>
              </div>
              <input  type='password' {...registerPwd('password', { required: true })} className="inline w-full py-1 border-b focus:outline-none"
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
  return (
    <div>
      <div className="flex mt-12 text-base">
        <input className="w-full h-10 py-2 mx-6 font-bold tracking-widest text-white shadow-md rounded-3xl bg-primary-600 bg-grimary-600 shadow-primary-600 focus:bg-primary-700"
          onClick={console.log}
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
      <NavbarNoGoBackBtn title="用户登录" />
    </IonHeader>
    <IonContent>
      <MyLoginTabs />
    </IonContent>
  </IonPage>

}

export default Login;
