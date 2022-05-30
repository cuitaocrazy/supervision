//教师的查询页面
import { useEffect,useCallback,useContext,useState } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext,setEduOrgList,setEduOrgDetail, setTeacherList, setTeacherDetail} from '../../../appState';
import {Teacher} from '../../../types/types'
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
} from '@ionic/react';
const queryURL = 'http://localhost:3003/teacher/query'
const delURL = 'http://localhost:3003/teacher/del'
const modifyURL = 'http://localhost:3003/teacher/modifyURL'
const applyURL = 'http://localhost:3003/teacher/apply'
const demoTeacherList:Teacher[] = [
  {
    teacherId:'1',
    teacherName:'张三',
    teacherIdentityNo:'123456789012345678',
    teacherExperience:3,
    teacherIntroduce:'介绍',
    teacherRating:5,
    teacherCreatedDate:'2020-01-01',
    teacherCreateTime:'00:00:00',
    teacherUpdatedDate:'2020-01-01',
    teacherUpdateTime:'00:00:00',
  },
  {
    teacherId:'2',
    teacherName:'张4',
    teacherIdentityNo:'123456789012345678',
    teacherExperience:6,
    teacherIntroduce:'介绍',
    teacherRating:5,
    teacherCreatedDate:'2020-01-01',
    teacherCreateTime:'00:00:00',
    teacherUpdatedDate:'2020-01-01',
    teacherUpdateTime:'00:00:00',
  }
]
const TeacherQuery:React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({teacherName:''})
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
    teacherName:queryInfo.teacherName,
 },queryURL)
 const refreshList = useCallback((eduOrgs:Teacher[]) => {
  dispatch(setTeacherList(eduOrgs));
},[dispatch]);
const onDetail = (item:Teacher)=>() => {
  doSetDetail(item)
}

const doSetDetail = useCallback(teacher => {
  dispatch({...setTeacherDetail(teacher),...{backPage:'/tabs/teacher/query'}});
},[dispatch]);
useEffect(() => { 
  fetch(paramStr, {
    method: 'GET',
  /* `teacher` is a property of `Lesson` */
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
  }).then(res => res.json())
  .then((json) => {
  const {TeacherList} = json //todo
  
  refreshList(demoTeacherList.filter((teacher:Teacher)=>teacher.teacherName.indexOf(queryInfo.teacherName)>-1))
  return 
  })
},[queryInfo.teacherName, paramStr, refreshList]);
const ListEntry = ({ teacher,key, ...props } : {teacher:Teacher,key:any}) => (
  <IonItem key={key} >
    <IonLabel>
      <p  className='text-center'>{teacher.teacherName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{teacher.teacherIntroduce}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{teacher.teacherExperience}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{teacher.teacherCreatedDate}</p>
    </IonLabel>
    <IonLabel>
       <div className='flex gap-2'>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(teacher)}>详情</button>
       </div>
    </IonLabel>
  </IonItem>
  );
  if(state.teacher.teacherDetail==null||state.teacher.teacherDetail==undefined){
    return   <IonPage >
                <div className='relative'>
                <div className='flex'>
                <IonRow className='flex justify-between '>
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>教育机构名称查询：</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{eduName:e.target.value}})} />
                      </IonCol>   
                </IonRow>
                </div>
              <div className='absolute w-full mt-10'>
                <IonList>
                  <IonItem key='title'>
                    <IonLabel> 
                      <div className='font-black text-center'>教师名称</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>专业领域</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>从业经历</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>注册日期</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>操作</div>
                    </IonLabel>
                </IonItem>
                    <div className=''>
                    {state.teacher.teacherList.map((list:Teacher, i: any) => (
                    <ListEntry teacher={list} key={i} />
                  ))}
                    </div>
                </IonList>
            </div> 
            </div>            
      </IonPage>
   }
   else{
     return <Redirect to="/tabs/teacher/detail" />
   }  
}
export default TeacherQuery;

