//Lesson的查询页面
import { useEffect, useCallback, useContext, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { AppContext, setLessonList, setLessonDetail } from '../../../appState';
import { Lesson } from '../../../types/types'
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
} from '@ionic/react';

const queryURL = 'http://localhost:3003/lesson/query'
const delURL = 'http://localhost:3003/lesson/del'
const modifyURL = 'http://localhost:3003/lesson/modifyURL'
const attendURL = 'http://localhost:3003/lesson/attend'
const demoLessonList: Lesson[] = [
  {
    lessonId: '2',
    lessonName: '第二课',
    lessonPerPrice: 12,
    lessonTotalPrice: 120,
    lessonIntroduce: '第二课程介绍',
    lessonType: '第二课程类型',
    lessonOutline: '第二课程大纲',
    lessonStartDate: '2020-01-01',
    lessonStartTime: '00:00:00',
    lessonEndDate: '2021-01-01',
    lessonEndTime: '00:00:00',
    lessonStatus: 'pending',
    lessonCreateDate: '2020-01-01',
    lessonCreateTime: '00:00:00',
    lessonUpdateDate: '2020-01-01',
    lessonUpdateTime: '00:00:00',
    lessonUpdateReason: '第二课程更新原因',
    eduId: '1',
    edu: {
      eduId: '1',
      eduName: '第一学院',
      eduLoginName: '第一学院登录名',
      supervisorOrgId: '1',
    },
    teacherId: '1',
    teacher: {
      teacherId: '1',
      teacherName: '第一老师',
    }
  },
  {
    lessonId: '2',
    lessonName: '第3课',
    lessonPerPrice: 12,
    lessonTotalPrice: 120,
    lessonIntroduce: '第3课程介绍',
    lessonType: '第3课程类型',
    lessonOutline: '第3课程大纲',
    lessonStartDate: '2020-01-01',
    lessonStartTime: '00:00:00',
    lessonEndDate: '2021-01-01',
    lessonEndTime: '00:00:00',
    lessonStatus: 'on',
    lessonCreateDate: '2020-01-01',
    lessonCreateTime: '00:00:00',
    lessonUpdateDate: '2020-01-01',
    lessonUpdateTime: '00:00:00',
    lessonUpdateReason: '第3课程更新原因',
    eduId: '1',
    edu: {
      eduId: '1',
      eduName: '第一学院',
      eduLoginName: '第一学院登录名',
      supervisorOrgId: '1',
    },
    teacherId: '2',
    teacher: {
      teacherId: '2',
      teacherName: '第2老师',
    }
  }
]






// 课程查询页面
const LessonQuery: React.FC = () => {

  const onCancel = (item: Lesson) => () => {
    fetch(delURL, {
      method: 'PUT',
      body: JSON.stringify({
        "lessonId": item.lessonId,
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
      .then((json) => {
        alert(json.result)
      })
  }


  const onAttendance = (item: Lesson) => () => {
    fetch(attendURL, {
      method: 'PUT',
      body: JSON.stringify({
        "lessonId": item.lessonId,
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
      .then((json) => {
        alert(json.result)
      })
  }

  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({ lessonName: '', lessonStatus: null })
  const getParamStr = (params: any, url: string) => {
    let result = '?'
    Object.keys(params).forEach(key => result = result + key + '=' + params[key] + '&')
    return url + result
  }
  const paramStr = getParamStr({
    lessonName: queryInfo.lessonName,
    lessonStatus: queryInfo.lessonStatus,
  }, queryURL)

  const refreshLessonList = useCallback((lessons: Lesson[]) => {
    dispatch(setLessonList(lessons));
  }, [dispatch]);

  const onDetail = (item: Lesson) => () => {
    doSetDetail(item)
  }

  const doSetDetail = useCallback(lessons => {
    dispatch({ ...setLessonDetail(lessons), ...{ backPage: '/tabs/lesson/query' } });
  }, [dispatch]);
  useEffect(() => {
    // fetch(paramStr, {
    //   method: 'GET',
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8',
    //   },
    // }).then(res => res.json())
    // .then((json) => {
    // const {LessonList} = json 
    // refreshLessonList(demoLessonList.filter((lesson:Lesson)=>lesson.eduId===queryInfo.eduId||(lesson.eduId===state.loginUser.orgId&&state.loginUser.role==='Edu')).filter((lesson:Lesson)=>lesson.lessonName.indexOf(queryInfo.lessonName)>-1))
    // return 
    // })
    refreshLessonList(demoLessonList)
    return
  }, []);

  const onQuery = () => {
    refreshLessonList(demoLessonList.filter((lesson: Lesson) => lesson.lessonName.indexOf(queryInfo.lessonName) > -1).filter((lesson: Lesson) => queryInfo.lessonStatus == null || lesson.lessonStatus === queryInfo.lessonStatus))
  }

  const getStatus = (statusEnglish: any) => {
    if (statusEnglish === 'pending') {
      return '待审核'
    }
    if (statusEnglish === 'reject') {
      return '审核未通过'
    }
    if (statusEnglish === 'on') {
      return '上架'
    }
    if (statusEnglish === 'off') {
      return '下架'
    }
    return statusEnglish
  }


  const ListEntry = ({ lesson, key, ...props }: { lesson: Lesson, key: any }) => (
    // <IonItem key={key} >
    //   <IonLabel>
    //     <p className='text-center'>{lesson.edu.eduName}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p className='text-center'>{lesson.lessonName}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p className='text-center'>{lesson.lessonTotalPrice / lesson.lessonPerPrice}{'课时'}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p className='text-center'>{lesson.lessonTotalPrice / 100}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p className='text-center'>{lesson.lessonStartDate}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p className='text-center'>{lesson.lessonStartTime}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p className='text-center'>{getStatus(lesson.lessonStatus)}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <div className='flex gap-2'>
    //       <button className='p-1 text-white bg-blue-500 rounded-md' onClick={onDetail(lesson)}>详情</button>
    //       {lesson.lessonStatus === 'on' ? <button className='p-1 text-white bg-blue-500 rounded-md' onClick={onCancel(lesson)}>下架</button> : <></>}
    //       {lesson.lessonStatus === 'pending' ? <button className='p-1 text-white bg-blue-500 rounded-md' onClick={onAttendance(lesson)}>审核</button> : <></>}
    //     </div>
    //   </IonLabel>
    // </IonItem>
    <tr
      key={key}
      className="grid items-center grid-cols-8 gap-2 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 "
    >
      <td className="flex items-center justify-center leading-10">
        {lesson.edu.eduName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {lesson.lessonName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {lesson.lessonTotalPrice / lesson.lessonPerPrice}
      </td>
      <td className="flex items-center justify-center leading-10">
        {lesson.lessonTotalPrice / 100}
      </td>
      <td className="flex items-center justify-center leading-10">
        {lesson.lessonStartDate}
      </td>
      <td className="flex items-center justify-center leading-10">
        {lesson.lessonStartTime}
      </td>
      <td className="flex items-center justify-center leading-10">
        {getStatus(lesson.lessonStatus)}
      </td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button className='p-1 text-primary-600' onClick={onDetail(lesson)}>详情</button>
          {lesson.lessonStatus === 'on' ? <button className='p-1 text-fuchsia-600' onClick={onCancel(lesson)}>下架</button> : <></>}
          {lesson.lessonStatus === 'pending' ? <button className='p-1 text-cyan-600' onClick={onAttendance(lesson)}>审核</button> : <></>}
        </div>
      </td>
    </tr>
  );
  if (state.lesson.lessonDetail) {
    return <Redirect to="/tabs/lesson/detail" />
  }

  return <IonPage className="bg-gray-100">
    <div className='relative w-full h-screen mx-6 overflow-auto'>
      <div className="flex pt-2 my-2 text-gray-800">
        <div className="mr-2 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div>
          <span className="pr-1 text-gray-600">教育机构管理</span>/
          <span className="pl-1 text-primary-500">课程管理</span>
        </div>
      </div>
      <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
        <div className="text-base font-bold">快速查询</div>
        <hr className="mt-2 mb-4" />
        <div className="flex">
          <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
            <IonCol className="flex ml-8 text-gray-800">
              <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                课程状态:
              </div>
              <input
                type="text"
                className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                placeholder="请输入教育机构名称"
                onChange={e => setQueryInfo({ ...queryInfo, ...{ eduName: e.target.value } })}
              />
            </IonCol>
            <IonCol className="flex ml-8 text-gray-800">
              <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                教育机构名称:
              </div>
              <input
                type="text"
                className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                placeholder="请输入教育机构名称"
                onChange={e => setQueryInfo({ ...queryInfo, ...{ eduName: e.target.value } })}
              />
            </IonCol>
            <IonCol className="flex ml-8">
              <button
                className="w-24 h-12 mr-6 text-white border-2 rounded-md shadow-md bg-primary-600 focus:bg-primary-700"
                onClick={() => onQuery()}
              >
                查询
              </button>
              <button
                className="w-24 h-12 rounded-md shadow-md bg-gray-50 text-primary-600 focus:bg-gray-200"
              // onClick={openCreateModal}
              >
                新增
              </button>
            </IonCol>
          </IonRow>
        </div>
      </div>
      {/* 列表 */}
      <div className='absolute w-full mt-10'>
        <table className="w-11/12">
          <thead>
            <tr className="grid items-center h-10 grid-cols-8 gap-2 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
              <th className="flex items-center justify-center">教育机构名称</th>
              <th className="flex items-center justify-center">课程名称</th>
              <th className="flex items-center justify-center">总课时</th>
              <th className="flex items-center justify-center">总价格（元）</th>
              <th className="flex items-center justify-center">开课日期</th>
              <th className="flex items-center justify-center">结束日期</th>
              <th className="flex items-center justify-center">课程状态</th>
              <th className="flex items-center justify-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {state.lesson.lessonList.map((list: Lesson, i: any) => (
              <ListEntry lesson={list} key={i} />
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className='absolute w-full mt-10'>
        <IonList>
          <IonItem key='title'>
            <IonLabel>
              <div className='font-black text-center'>教育机构名称</div>
            </IonLabel>
            <IonLabel>
              <div className='font-black text-center'>课程名称</div>
            </IonLabel>
            <IonLabel>
              <div className='font-black text-center'>总课时</div>
            </IonLabel>
            <IonLabel>
              <div className='font-black text-center'>总价格</div>
            </IonLabel>
            <IonLabel>
              <div className='font-black text-center'>开课日期</div>
            </IonLabel>
            <IonLabel>
              <div className='font-black text-center'>结束日期</div>
            </IonLabel>
            <IonLabel>
              <div className='font-black text-center'>课程状态</div>
            </IonLabel>
            <IonLabel>
              <div className='font-black text-center'>操作</div>
            </IonLabel>
          </IonItem>
          <div className=''>
            {state.lesson.lessonList.map((list: Lesson, i: any) => (
              <ListEntry lesson={list} key={i} />
            ))}
          </div>
        </IonList>
      </div> */}
    </div>
  </IonPage>

}
export default LessonQuery