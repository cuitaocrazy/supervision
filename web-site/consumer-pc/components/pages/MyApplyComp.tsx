import React, { useState,useEffect } from "react";
import { IonPage, IonHeader, IonContent } from '@ionic/react'
import { RadioGroup } from '@headlessui/react'
import {useRouter} from 'next/router'
import Navbar from 'components/Navbar'
import Search from '../Search'
import {searchLessonURL} from'../../const/const';
import { Lesson } from '../../types/types'

// 申请投诉页面
const MyApplyComp = () => {
  const [queryStr, setQueryStr] = useState('')
  const router=useRouter();
  const [page,setPage] = useState(0)
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  let [plan, setPlan] = useState('startup')
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
  return <IonPage>
    <IonHeader>
    <Search setQueryStr={setQueryStr} onQuery={onQuery} />
    </IonHeader>
    <IonContent>
      <form className='text-sm bg-white mt-24 w-3/4 mx-auto grid grid-cols-3 shadow-md'>
        <p className=''>
          <RadioGroup value={plan} onChange={setPlan} 
                className="flex items-center justify-between  px-4 py-2 mx-2 ">
              <RadioGroup.Label className="px-2 py-2">投诉类型</RadioGroup.Label>
              <RadioGroup.Option value="startup">
                {({ checked }) => (
                  <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
                    课程</span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="business">
                {({ checked }) => (
                  <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
                    老师</span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="enterprise">
                {({ checked }) => (
                  <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
                    其他</span>
                )}
               </RadioGroup.Option>
          </RadioGroup>
        </p>
        <div className='px-4 pt-2 mx-2 mt-2 rounded-md shadow-md'>
          <p className='px-3 py-2 mt-2 leading-7 rounded-md bg-primary-50'>
            <span className='pr-3'>机构名称</span>
            <span>核桃编程</span>
          </p>
          <p className='pt-2 mt-2 leading-6 '>投诉标题</p>
          <input type="text" placeholder='请输入您的投诉标题'
            className='w-full pl-2 mb-2 leading-6 rounded-md focus:outline-none ' />
          <p className='mt-4'>投诉内容</p>
          <textarea placeholder='请描述您要投诉的内容......'
            className='w-full h-40 py-2 pl-2 mt-1 mb-2 rounded-md bg-gray-50 focus:outline-none' />
           <div className="text-sm text-gray-700">协商原因</div>
            <textarea
              name="reason"
              className="w-full h-40 px-4 py-4 mt-2 text-xs border-0 border-none rounded-md outline-none focus:border-0 focus:border-none bg-primary-50 focus:outline-none focus:glow-primary-600"
              placeholder="请描述您要投诉的内容......"
              // onChange={(e) => {
              //   setRefundState({
              //     ...refundState,
              //     reason: e.target?.value,
              //   });
              // }}
            /> 


            
        </div>
        <div className='flex justify-center col-span-3'>
          <input className='w-80  py-3 mx-auto mt-6 font-bold tracking-wider text-center text-white shadow-md bg-primary-600 shadow-primary-500 rounded-3xl focus:outline-none focus:border-primary-700'
            value="提交投诉" 
            type="button"
            onClick={()=>{router.push("./compList")}}/>
        </div>
      </form>
    </IonContent>
  </IonPage>
}

export default MyApplyComp