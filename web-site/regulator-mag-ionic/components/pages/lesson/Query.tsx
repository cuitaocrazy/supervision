//Lesson的查询页面
import { useEffect,useCallback,useContext,useState } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext,setLessonList,setLessonDetail} from '../../../appState';
import {Lesson} from '../../../types/types'
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
const demoLessonList:Lesson[] = [
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
    lessonStatus: '未开始',
    lessonCreateDate: '2020-01-01',
    lessonCreateTime: '00:00:00',
    lessonUpdateDate: '2020-01-01',
    lessonUpdateTime:   '00:00:00',
    lessonUpdateReason: '第二课程更新原因',
    eduId: '1',
    edu: {
      eduId: '1',
      eduName:'第一学院',
      eduLoginName:'第一学院登录名',
      supervisorOrgId: '1',
    },
    teacherId: '1',
    teacher: {
      teacherId: '1',
      teacherName: '第一老师',
    }},
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
          lessonStatus: '未开始',
          lessonCreateDate: '2020-01-01',
          lessonCreateTime: '00:00:00',
          lessonUpdateDate: '2020-01-01',
          lessonUpdateTime:   '00:00:00',
          lessonUpdateReason: '第3课程更新原因',
          eduId: '1',
          edu: {
            eduId: '1',
            eduName:'第一学院',
            eduLoginName:'第一学院登录名',
            supervisorOrgId: '1',
          },
          teacherId: '2',
          teacher: {
            teacherId: '2',
            teacherName: '第2老师',
          }}
      ]

      




// 课程查询页面
const LessonQuery:React.FC =()=>{

  const onCancel = (item:Lesson)=>() => {
    fetch(delURL, {
      method: 'PUT',
      body: JSON.stringify({
        "lessonId":item.lessonId,
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      alert(json.result)
    })
  }


  const onAttendance = (item:Lesson)=>() => {
    fetch(attendURL, {
      method: 'PUT',
      body: JSON.stringify({
        "lessonId":item.lessonId,
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
  const [queryInfo, setQueryInfo] = useState({lessonName:'',eduId:''})
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
    lessonId: state.loginUser.role==='SV'?queryInfo.eduId:state.loginUser.orgId,
    lessonName:queryInfo.lessonName,
  },queryURL)

  const refreshLessonList = useCallback((lessons:Lesson[]) => {
    dispatch(setLessonList(lessons));
  },[dispatch]);

  const onDetail = (item:Lesson)=>() => {
    doSetDetail(item)
  }

  const doSetDetail = useCallback(lessons => {
    dispatch({...setLessonDetail(lessons),...{backPage:'/tabs/lessonQuery'}});
  },[dispatch]);
  useEffect(() => { 
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
    const {LessonList} = json //todo
    refreshLessonList(demoLessonList.filter((lesson:Lesson)=>lesson.eduId===queryInfo.eduId||(lesson.eduId===state.loginUser.orgId&&state.loginUser.role==='Edu')).filter((lesson:Lesson)=>lesson.lessonName.indexOf(queryInfo.lessonName)>-1))
    return 
    })
  },[queryInfo.eduId, queryInfo.lessonName, paramStr, refreshLessonList]);

  const ListEntry = ({ lesson,key, ...props } : {lesson:Lesson,key:any}) => (
    <IonItem key={key} >
      <IonLabel>
        <p className='text-center'>{lesson.eduId}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{lesson.lessonName}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{lesson.lessonTotalPrice}</p>
      </IonLabel>
      <IonLabel>
         <div className='flex gap-2'>
            <button className='p-1 text-white bg-blue-500 rounded-md' onClick={onCancel(lesson)}>删除</button> 
            <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(lesson)}>详情</button>
            <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onAttendance(lesson)}>签到</button>
         </div>
      </IonLabel>
    </IonItem>
    );
    if(state.lesson.lessonDetail==null||state.lesson.lessonDetail==undefined){
      return   <IonPage >
                  <div className='relative'>
                  <div className='flex'>
                  <IonRow className='flex justify-between '>
                        <IonCol className='flex ml-8'>
                          <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>消费查询：</IonLabel>
                          <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{PayerStub:e.target.value}})} />
                        </IonCol>   
                  </IonRow>
                  </div>
                <div className='absolute w-full mt-10'>
                  <IonList>
                    <IonItem key='title'>
                      <IonLabel> 
                        <div className='font-black text-center'>教育机构名称ID</div>
                      </IonLabel>
                      <IonLabel>
                        <div className='font-black text-center'>项目名称</div>
                      </IonLabel>
                      <IonLabel>
                        <div className='font-black text-center'>交易金额（单位分）</div>
                      </IonLabel>
                      <IonLabel>
                        <div className='font-black text-center'>操作</div>
                      </IonLabel>
                  </IonItem>
                      <div className=''>
                      {state.lesson.lessonList.map((list:Lesson, i: any) => (
                      <ListEntry lesson={list} key={i} />
                    ))}
                      </div>
                  </IonList>
              </div> 
              </div>            
        </IonPage>
     }
     else{
       return <Redirect to="/tabs/lesson/detail" />
     }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
}
export default LessonQuery