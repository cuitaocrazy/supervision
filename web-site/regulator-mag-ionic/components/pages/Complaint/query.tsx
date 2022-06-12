
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
  IonModal,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonInput,
  IonButton
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [handleState, setHandleState] = useState({complaintResult:'',complaintId:'',complaintTitle:'',complaintContent:''});
  const onDetail = (item:Complaint)=>() => {
    doSetDetail(item)
  }
  
  const doSetDetail = useCallback(item => {
    dispatch({...setComplaintDetail(item),...{backPage:'/tabs/complaint/query'}});
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




const onHandle = ()=>() => {
  
}

useEffect(() => { 
  refreshList(demoComplaintList)
},[]);

const onQuery = () => {
  // fetch(paramStr, {
  //   method: 'GET',
  //   headers: {
  //     'Content-type': 'application/json;charset=UTF-8',
  //   },
  // }).then(res => res.json())
  // .then((json) => {
  // const {ComplaintList} = json
  refreshList(demoComplaintList)
}

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
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(complaint)}>详情</button>
          {<button className='p-1 text-white bg-blue-500 rounded-md'  onClick={()=>{setHandleState({'complaintId':complaint.complaintId,'complaintResult':'',complaintTitle:complaint.complaintTitle,complaintContent:complaint.complaintContent}) ;setIsModalOpen(true)} }>去处理</button>}
       </div>
    </IonLabel>
  </IonItem>
  );
  if(state.complaint.complaintDetail==null||state.complaint.complaintDetail==undefined){
    return   <IonPage >
                <div className='relative'>
                <div className='flex'>

                <IonModal isOpen={isModalOpen}>
                        < IonCardContent>
                          <form onSubmit={onHandle}>
                              <IonList>
                                <IonItem>
                                  <IonLabel position="floating">投诉标题</IonLabel>
                                  <IonInput name="eduName" value={handleState.complaintTitle} readonly></IonInput>
                                </IonItem>
                                <IonItem>
                                  <IonLabel position="floating">投诉内容</IonLabel>
                                  <IonInput name="eduAddress" value={handleState.complaintResult} readonly ></IonInput>
                                </IonItem>
                                <IonItem>
                                  <IonLabel position="floating">处理结果</IonLabel>
                                  <IonInput name="eduLegalPerson" value={handleState.complaintResult}  onIonChange={e => setHandleState({...handleState, complaintResult: e.detail.value!})} ></IonInput>
                                </IonItem>
                                </IonList>

                            <IonItem className="">
                            <IonButton className="m-5 text-base " type='submit' fill="solid">提交</IonButton>
                            <IonButton className="m-5 text-base " onClick={()=>setIsModalOpen(false)} fill="solid">返回</IonButton>
                            </IonItem>
                          </form>
                        </IonCardContent>
                    </IonModal>
                <IonRow className='flex justify-between '>
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>教育机构名称：</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{eduName:e.target.value}})} />
                      </IonCol>   
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>投诉日期</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{complaintDate:e.target.value}})} />
                      </IonCol>   
                </IonRow>
                <IonRow className='flex justify-between '>
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>教育机构名称：</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{complaintStatus:e.target.value}})} />
                      </IonCol>   
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>投诉标题</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{complaintTitle:e.target.value}})} />
                      </IonCol>   
                </IonRow>
                <IonRow className='flex justify-between '>
  
                      <IonCol className='flex ml-8' aria-colspan={2}>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>课程名称查询：</IonLabel>
                        <button onClick={()=>{onQuery()}}>查询</button>
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

