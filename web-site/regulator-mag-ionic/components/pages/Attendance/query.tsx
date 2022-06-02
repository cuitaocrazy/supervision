
import { useEffect,useCallback,useContext,useState } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext,setAttendanceList,setAttendanceDetail} from '../../../appState';
import {Attendance} from '../../../types/types'
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
} from '@ionic/react';

const queryURL = 'http://localhost:3003/attendannce/query'

const demoattendanceList:Attendance[] = [
  {
    attendanceID:'1',
    attendanceDate:'2020-01-01',
    attendanceTime:'00:00:00',
    attendanceType:'vaild',
    attendanceLessionQuantity:'111',
    eduId:'1',
    eduName:'教育机构1',
    lessonId:'1',
    lessonName:'课程1',
    consumerId:'1',
    consumerName:'消费者1',
    consumerStuName:'学生1',
    attendanceStatus:'vaild',
    updateDate:'2020-01-01',
    updateTime:'2020-01-01',
    updateReason:'aaaa',
    contractId:'1',
    
  },
  {
    attendanceID:'2',
    attendanceDate:'2020-01-01',
    attendanceTime:'00:00:00',
    attendanceType:'vaild',
    attendanceLessionQuantity:'111',
    eduId:'1',
    eduName:'教育机构1',
    lessonId:'1',
    lessonName:'课程1',
    consumerId:'1',
    consumerName:'消费者1',
    consumerStuName:'学生2',
    attendanceStatus:'vaild',
    updateDate:'2020-01-01',
    updateTime:'2020-01-01',
    updateReason:'aaaa',
    contractId:'2'
    
  },
]

const AttendanceQuery:React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({consumerName:'',lessonName:'',consumerStuName:''})
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
    consumerName:queryInfo.consumerName,
    lessonName:queryInfo.lessonName,
    consumerStuName:queryInfo.consumerStuName,
 },queryURL)
 const refreshList = useCallback((eduOrgs:Attendance[]) => {
  dispatch(setAttendanceList(eduOrgs));
},[dispatch]);
const onDetail = (item:Attendance)=>() => {
  doSetDetail(item)
}



const doSetDetail = useCallback(attendance => {
  dispatch({...setAttendanceDetail(attendance),...{backPage:'/tabs/attendance/query'}});
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
  const {attendanceList} = json //todo
  
  refreshList(demoattendanceList.filter((attendance:Attendance)=>attendance.consumerName.indexOf(queryInfo.consumerName)>-1).filter((attendance:Attendance)=>attendance.lessonName.indexOf(queryInfo.lessonName)>-1).filter((attendance:Attendance)=>attendance.consumerStuName.indexOf(queryInfo.consumerStuName)>-1))
  return 
  })
},[queryInfo.consumerStuName,queryInfo.lessonName,queryInfo.consumerName, paramStr, refreshList]);
const ListEntry = ({ attendance,key, ...props } : {attendance:Attendance,key:any}) => (
  <IonItem key={key} >
    <IonLabel>
      <p  className='text-center'>{attendance.contractId}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{attendance.eduName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{attendance.lessonName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{attendance.consumerName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{attendance.attendanceDate}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{attendance.attendanceTime}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{attendance.attendanceType}</p>
    </IonLabel>
    <IonLabel>
       <div className='flex gap-2'>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(attendance)}>查看详情</button>
       </div>
    </IonLabel>
  </IonItem>
  );
  if(state.attendance.attendanceDetail==null||state.attendance.attendanceDetail==undefined){
    return   <IonPage >
                <div className='relative'>
                <div className='flex'>
                <IonRow className='flex justify-between '>
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>教育机构名称查询：</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{eduName:e.target.value}})} />
                      </IonCol>   
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>课程名称查询：</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{lessonName:e.target.value}})} />
                      </IonCol>   
                </IonRow>
                </div>
              <div className='absolute w-full mt-10'>
                <IonList>
                  <IonItem key='title'>
                    <IonLabel> 
                      <div className='font-black text-center'>合同ID</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>教育机构名称</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>课程名称</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>客户姓名</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>签到日期</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>签到时间</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>签到类型</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>操作</div>
                    </IonLabel>
                </IonItem>
                    <div className=''>
                    {state.attendance.attendanceList.map((list:Attendance, i: any) => (
                    <ListEntry attendance={list} key={i} />
                  ))}
                    </div>
                </IonList>
            </div> 
            </div>            
      </IonPage>
   }
   else{
     return <Redirect to="/tabs/attendance/detail" />
   }  
}
export default AttendanceQuery;

