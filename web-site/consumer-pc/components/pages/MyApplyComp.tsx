import { IonPage, IonHeader, IonContent, IonToast } from '@ionic/react'
import { useEffect,useContext, useState } from 'react';
import { AppContext } from 'appState';
import { useHistory } from 'react-router-dom';
import { Complaint } from '@/types/types';
import { RadioGroup } from '@headlessui/react';
import { complaintCreate } from 'const/const'
import Search from '../Search'
import {searchLessonURL} from'../../const/const';
import { Lesson } from '../../types/types'

// 申请投诉页面
const MyApplyComp = () => {
  const [queryStr, setQueryStr] = useState('')
  const { state: { contractDetail } } = useContext(AppContext);
  // console.log("申请投产页面PC"+JSON.stringify(contractDetail))
  const [toastMsg, setToastMsg] = useState<string | undefined>();
  const history = useHistory();
  const [complaint, setComplaint] = useState<Partial<Pick<Complaint, 'consumerId' | 'eduId' | 'complaintTitle' | 'complaintContent' | 'complaintType'>>>({
    consumerId: contractDetail?.consumerId,
    eduId: contractDetail?.eduId,
    complaintType: 'lesson'
  })
  const doCommit = () => {
    console.log(JSON.stringify(complaint))
    if (!complaint.complaintTitle) {
      setToastMsg('标题必填')
      return;
    }
    if (!complaint.complaintContent) {
      setToastMsg('内容必填')
      return;
    }
    fetch(complaintCreate, {
      method: "POST",
      body: JSON.stringify(complaint),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(({ result }) => {
        if (result) {
          setToastMsg('已提交');
          setTimeout(() => { history.push("./myLessonList") }, 1000)
          return;
        }
        setToastMsg('未知异常')
      });
  }
  const [page,setPage] = useState(0)
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
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

  const formNode = <form className='text-sm bg-white mt-24 pb-6 w-3/4 mx-auto grid grid-cols-2 shadow-md rounded-md'>
    <RadioGroup value={complaint.complaintType}
      onChange={(value: string | undefined) => setComplaint(pre => ({ ...pre, complaintType: value }))}
      className="flex items-center justify-between px-4 py-2 mx-2 " >
      <RadioGroup.Label className="px-2 py-2">投诉类型</RadioGroup.Label>
      <RadioGroup.Option value="lesson">
        {({ checked }) => (
          <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
            课程</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="teacher">
        {({ checked }) => (
          <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
            老师</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="other">
        {({ checked }) => (
          <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
            其他</span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
    <div className='px-2   '>
      <p className='px-3 py-3 mt-2 leading-7 rounded-md bg-primary-50'>
        <span className='pr-3'>机构名称 :</span>
        <span>{contractDetail?.eduName}</span>
      </p>
    </div>
    <div className="flex items-center px-4 py-3 mt-2 mb-2 mx-2 text-sm rounded-md bg-primary-50 col-span-2">
              <div className="mr-2 text-gray-700 w-24">投诉标题</div>
              <input
                className="h-8 pl-4 rounded-md outline-none bg-primary-50 focus:outline-none focus:glow-primary-600 w-full "
                name="refundAmt"
                placeholder="请输入您的投诉标题"
                onChange={(event) => setComplaint(pre => ({ ...pre, complaintTitle: event.target.value }))}
              ></input>
    </div>
    <div className='flex items-start px-4 py-3 mt-2 mb-2 mx-2 text-sm rounded-md bg-primary-50 col-span-2'>
      <div className="text-sm text-gray-700 w-24 pt-2">投诉内容</div>
              <textarea
                name="reason"
                className="w-full h-40  text-sm border-0 border-none rounded-md outline-none focus:border-0 focus:border-none bg-primary-50 focus:outline-none focus:glow-primary-600"
                placeholder="请描述您要投诉的内容......"
                onChange={(event) => setComplaint(pre => ({ ...pre, complaintContent: event.target.value }))}
              />
    </div>
    <div className='flex justify-center col-span-2'>
      <input className='w-80 mx-auto py-3 mt-6 font-bold tracking-wider text-center text-white shadow-md bg-primary-600 shadow-primary-500 rounded-3xl focus:outline-none focus:border-primary-700'
        value="提交投诉"
        type="button"
        onClick={doCommit} />
    </div>
  </form>

  return <IonPage>
    <IonHeader>
      <Search setQueryStr={setQueryStr} onQuery={onQuery} />
    </IonHeader>
    <IonContent>
      {contractDetail?.consumerId ? formNode : <div className="relative ">
        <div className="grid justify-center grid-rows-1">
          <div className="mt-20 ">
            <svg className="w-48 h-32 rounded-lg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1721" width="200" height="200"><path d="M512 1024C229.23264 1024 0 794.76736 0 512S229.23264 0 512 0s512 229.23264 512 512-229.23264 512-512 512zM283.92448 484.07552l-41.8816 55.84896 223.41632 209.4592 339.77344-386.32448-32.57344-37.24288-307.2 316.5184-181.53472-158.2592z" p-id="1722" fill="#5045E4"></path></svg>
          </div>
          <div className="pt-4 pb-16 text-lg text-center text-gray-700">
            因刷新丢失关键信息，请后退重新操作!
          </div>
        </div>
      </div>}
      <IonToast
        isOpen={Boolean(toastMsg)}
        onDidDismiss={() => setToastMsg(undefined)}
        message={toastMsg}
        duration={1000}
        position="middle"
      />
    </IonContent>
  </IonPage>
}

export default MyApplyComp


// import React, { useState,useEffect } from "react";
// import { IonPage, IonHeader, IonContent } from '@ionic/react'
// import { RadioGroup } from '@headlessui/react'
// import {useRouter} from 'next/router'
// import Navbar from 'components/Navbar'
// import Search from '../Search'
// import {searchLessonURL} from'../../const/const';
// import { Lesson } from '../../types/types'

// // 申请投诉页面
// const MyApplyComp = () => {
//   const [queryStr, setQueryStr] = useState('')
//   const router=useRouter();
//   const [page,setPage] = useState(0)
//   const getParamStr = (params: any, url: string) => {
//     let result = '?';
//     Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
//     return url + result;
//   };
//   let [plan, setPlan] = useState('startup')
//   const paramStr = getParamStr(
//     {
//       queryStr: queryStr,
//       page:page,
//       size:10
//     },
//     searchLessonURL
//   );
//   useEffect(()=>{
//     onQuery()
//   },[])
//     // 课程列表数据
//     const [lessonList, setLessonList] = useState([] as Lesson[])
//   const onQuery = ()=>{
//     fetch(paramStr, {
//       method: 'GET',
//       headers: {
//         'Content-type': 'application/json;charset=UTF-8',
//       },
//     }).then(res => res.json())
//     .then((json) => {
//       setLessonList(json.result)
//     })
//   }
//   return <IonPage>
//     <IonHeader>
//     <Search setQueryStr={setQueryStr} onQuery={onQuery} />
//     </IonHeader>
//     <IonContent>
//       <form className='text-sm bg-white mt-24 w-3/4 mx-auto grid grid-cols-3 shadow-md'>
//         <p className=''>
//           <RadioGroup value={plan} onChange={setPlan} 
//                 className="flex items-center justify-between  px-4 py-2 mx-2 ">
//               <RadioGroup.Label className="px-2 py-2">投诉类型</RadioGroup.Label>
//               <RadioGroup.Option value="startup">
//                 {({ checked }) => (
//                   <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
//                     课程</span>
//                 )}
//               </RadioGroup.Option>
//               <RadioGroup.Option value="business">
//                 {({ checked }) => (
//                   <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
//                     老师</span>
//                 )}
//               </RadioGroup.Option>
//               <RadioGroup.Option value="enterprise">
//                 {({ checked }) => (
//                   <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
//                     其他</span>
//                 )}
//                </RadioGroup.Option>
//           </RadioGroup>
//         </p>
//         <div className='px-4 pt-2 mx-2 mt-2 rounded-md shadow-md'>
//           <p className='px-3 py-2 mt-2 leading-7 rounded-md bg-primary-50'>
//             <span className='pr-3'>机构名称</span>
//             <span>核桃编程</span>
//           </p>
//           <p className='pt-2 mt-2 leading-6 '>投诉标题</p>
//           <input type="text" placeholder='请输入您的投诉标题'
//             className='w-full pl-2 mb-2 leading-6 rounded-md focus:outline-none ' />
//            <div className="flex items-center px-4 py-2 mb-2 text-sm rounded-md bg-primary-50">
//               <div className="pr-4 text-gray-500 ">退订金额(元)</div>
//               <input
//                 className="h-8 pl-1 rounded-md outline-none bg-primary-50 focus:outline-none focus:glow-primary-600 "
//                 name="refundAmt"
//                 placeholder="请输入退款金额"
//                 // onChange={(e) => {
//                 //   setRefundState({
//                 //     ...refundState,
//                 //     refundAmt: e.target?.value,
//                 //   });
//                 // }}
//               ></input>
//             </div>

//           {/* <p className='mt-4'>投诉内容</p>
//           <textarea placeholder='请描述您要投诉的内容......'
//             className='w-full h-40 py-2 pl-2 mt-1 mb-2 rounded-md bg-gray-50 focus:outline-none' /> */}
//            <div className="text-sm text-gray-700">投诉内容</div>
//             <textarea
//               name="reason"
//               className="w-full h-40 px-4 py-4 mt-2 text-xs border-0 border-none rounded-md outline-none focus:border-0 focus:border-none bg-primary-50 focus:outline-none focus:glow-primary-600"
//               placeholder="请描述您要投诉的内容......"
//               // onChange={(e) => {
//               //   setRefundState({
//               //     ...refundState,
//               //     reason: e.target?.value,
//               //   });
//               // }}
//             /> 


            
//         </div>
//         <div className='flex justify-center col-span-3'>
//           <input className='w-80  py-3 mx-auto mt-6 font-bold tracking-wider text-center text-white shadow-md bg-primary-600 shadow-primary-500 rounded-3xl focus:outline-none focus:border-primary-700'
//             value="提交投诉" 
//             type="button"
//             onClick={()=>{router.push("./compList")}}/>
//         </div>
//       </form>
//     </IonContent>
//   </IonPage>
// }

// export default MyApplyComp