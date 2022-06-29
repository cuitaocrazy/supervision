import {FC, useState } from 'react';
import Router,{useRouter} from 'next/router'; 
import { IonPage, IonHeader,  IonContent } from "@ionic/react"
import Search from '../Search'
import Navbar from 'components/Navbar'
import {EduOrg,Lesson} from "../../types/types"

interface OrgListProps{
  eduImage?:string,
  eduName?:string,
  eduAddress?:string,
  eduContactPhone?:string
  item?:EduOrg
  
}



// 机构列表card组件
const OrgListCard:FC<OrgListProps> = (props) => {
  return (
    <div className="flex flex-col max-w-sm mb-3 ml-2 mr-2 bg-white rounded-lg shadow-md h-36" onClick={
      () => {
        Router.push({pathname:'/searchLessonList', query: { item: JSON.stringify(props.item) }})
      }
    }>
      <img className="h-20 rounded-t-lg cursor-pointer" src={props.eduImage} alt="" />
      <div className="flex flex-col justify-center px-2 pt-1">
        <div className='flex items-center justify-center'>
          <div className='flex flex-auto text-xs font-bold text-gray-900 truncate cursor-pointer justify-self-start'>{props.eduName}</div>
          <div className='flex flex-auto justify-self-end'>
            <svg className="w-3 h-3 m-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <svg className="w-3 h-3 mt-1 mr-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <svg className="w-3 h-3 mt-1 mr-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <svg className="w-3 h-3 mt-1 mr-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <svg className="w-3 h-3 mt-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        </div>
        <p className='pt-1 text-xs text-gray-400 truncate'><span>地址：</span>{props.eduAddress}</p>
        <p className="text-xs text-gray-400 truncate"><span>电话：</span>{props.eduContactPhone}</p>
      </div>
    </div>
  )
}

let orgListDemo:EduOrg[]=[
  {eduImage:"http://placekitten.com/g/200/300",eduName:"核桃编程",eduAddress:"海淀区大钟寺东路中嘉大厦",eduContactPhone:"010-101192"},
  {eduImage:"http://placekitten.com/g/200/300",eduName:"核桃编程",eduAddress:"海淀区大钟寺东路中嘉大厦",eduContactPhone:"010-101192"},
  {eduImage:"http://placekitten.com/g/200/300",eduName:"核桃编程",eduAddress:"海淀区大钟寺东路中嘉大厦",eduContactPhone:"010-101192"},
  {eduImage:"http://placekitten.com/g/200/300",eduName:"核桃编程",eduAddress:"海淀区大钟寺东路中嘉大厦",eduContactPhone:"010-101192"},
  {eduImage:"http://placekitten.com/g/200/300",eduName:"核桃编程",eduAddress:"海淀区大钟寺东路中嘉大厦",eduContactPhone:"010-101192"},
  {eduImage:"http://placekitten.com/g/200/300",eduName:"核桃编程",eduAddress:"海淀区大钟寺东路中嘉大厦",eduContactPhone:"010-101192"},
  {eduImage:"http://placekitten.com/g/200/300",eduName:"核桃编程",eduAddress:"海淀区大钟寺东路中嘉大厦",eduContactPhone:"010-101192"},
  {eduImage:"http://placekitten.com/g/200/300",eduName:"核桃编程",eduAddress:"海淀区大钟寺东路中嘉大厦",eduContactPhone:"010-101192"},
  {eduImage:"http://placekitten.com/g/200/300",eduName:"核桃编程",eduAddress:"海淀区大钟寺东路中嘉大厦",eduContactPhone:"010-101192"},
]
// 教育机构列表页面
const OrgList = () => {
  const router = useRouter()

  return <IonPage>
    <IonHeader>
      <Navbar title="教育资金监管平台" />
    </IonHeader>
    <IonContent>
      <div className='relative bg-primary-600'>
        <div className='fixed left-0 right-0 h-5 bg-primary-600 top-15'>
          <div className='fixed left-0 right-0 h-4 bg-white rounded-t-3xl top-15'></div>
        </div>
        <div className='bg-white'>

          {/* 搜索框 */}
          <Search />
          {/* 轮播图 */}
          <div className='pt-20 mx-3'>
            <img className="w-full h-32 rounded-lg cursor-pointer " src='http://placekitten.com/g/200/300' alt="" />
          </div>
          {/* 精选机构 */}
          <div className='grid items-center grid-cols-6 mt-3'>
            <div className='col-span-5 text-sm font-bold text-gray-900'>
              <svg className="inline w-5 h-5 ml-1 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="4" x2="12" y2="19" /></svg>
              <div className='inline'>精选机构</div>
            </div>
            <div className='flex mb-1 mr-3 text-xs text-gray-400 justify-self-end'>
              <a href="http://www.w3school.com.cn">
                <div>
                  更多
                  <svg className="inline w-3 h-3 mb-1 text-gray-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="9 6 15 12 9 18" /></svg>
                </div>
              </a>
            </div>
          </div>
          {/* 机构列表card */}
          <div className="grid py-2 sm1:grid-cols-2 sm2:grid-cols-2 sm3:grid-cols-2">
           {orgListDemo.map((item,index)=>{
            return <OrgListCard  key={index} eduImage={item.eduImage} eduName={item.eduName} eduAddress={item.eduAddress} eduContactPhone={item.eduContactPhone}   />
           })}
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default OrgList


