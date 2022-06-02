
import { useEffect,useCallback,useContext,useState } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext,setComplaintList,setComplaintDetail} from '../../../appState';
import {Complaint} from '../../../types/types'
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
} from '@ionic/react';

const queryURL = 'http://localhost:3003/complaint/query'
const handleComplaint = 'http://localhost:3003/complaint/detail'



const demoComplaintList:Complaint[] = [
  {
    complaintId:'1',
    eduId:'1',
    eduName:'教育机构1',
    eduContact:'1',
    eduContactPhone:'asasa',
    complaintDate:'2020-01-01',
    complaintTime:'00:00:00',
    complaintType:'1',
    consumerName:'消费者1',
    consumerPhone:'1233442121',
    complaintTitle:'不合理',
    complaintContent:'课程不合理',
    complaintStatus:'1',
    complaintGrade:'aaa'
  },
  {
    complaintId:'2',
    eduId:'1',
    eduName:'教育机构1',
    eduContact:'1',
    eduContactPhone:'asasa',
    complaintDate:'2020-01-01',
    complaintTime:'00:00:00',
    complaintType:'1',
    consumerName:'消费者1',
    consumerPhone:'1233442121',
    complaintTitle:'不合理',
    complaintContent:'课程不合理',
    complaintStatus:'1',
    complaintGrade:'aaa'
  },
]

const ComplaintQuery:React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({eduName:'',complaintDate:'',complaintStatus:'',complaintTitle:''})

  const onDetail = (item:Complaint)=>() => {
    doSetDetail(item)
  }
  
  const doSetDetail = useCallback(teacher => {
    dispatch({...setComplaintDetail(teacher),...{backPage:'/tabs/complaint/query'}});
  },[dispatch]);
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
    eduName:queryInfo.eduName,
    complaintDate:queryInfo.complaintDate,
    complaintStatus:queryInfo.complaintStatus,
    complaintTitle:queryInfo.complaintTitle
 },queryURL)
 const refreshList = useCallback((eduOrgs:Complaint[]) => {
  dispatch(setComplaintList(eduOrgs));
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
  const {ComplaintList} = json //todo
  
  return 
  })
},[ paramStr, refreshList]);
const ListEntry = ({ complaint,key, ...props } : {complaint:Complaint,key:any}) => (
  <IonItem key={key} >
    <IonLabel>
      <p  className='text-center'>{complaint.complaintTitle}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{complaint.complaintType}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{complaint.complaintContent}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{complaint.complaintDate}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{complaint.complaintGrade}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{complaint.complaintStatus}</p>
    </IonLabel>
    <IonLabel>
       <div className='flex gap-2'>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(complaint)}>手动划拨</button>
       </div>
    </IonLabel>
  </IonItem>
  );
  if(state.complaint.complaintDetail==null||state.complaint.complaintDetail==undefined){
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
                      <div className='font-black text-center'>投诉标题</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>投诉类型</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>投诉日期</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>紧急状态</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>投诉状态</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>操作</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>操作</div>
                    </IonLabel>
                </IonItem>
                    <div className=''>
                    {state.complaint.complaintList.map((list:Complaint, i: any) => (
                    <ListEntry complaint={list}
                    key={i} />
                  ))}
                    </div>
                </IonList>
            </div> 
            </div>            
      </IonPage>
   }
   else{
     return <Redirect to="/tabs/Complaint/detail" />
   }  
}
export default ComplaintQuery;

