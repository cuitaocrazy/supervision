
import { useEffect,useCallback,useContext,useState } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext,setTransferList,setTransferDetail} from '../../../appState';
import {Transfer} from '../../../types/types'
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
} from '@ionic/react';

const queryURL = 'http://localhost:3003/attendannce/query'
const handleTransfer = 'http://localhost:3003/attendannce/handleTransfer'


const demotransferList:Transfer[] = [
  {
    transferId:'1',
    attendanceId:'1',
    attendanceDate:'2020-01-01',
    attendanceTime:'00:00:00',
    eduId:'1',
    eduName:'教育机构1',
    lessonId:'1',
    lessonName:'课程1',
    consumerId:'1',
    consumerName:'消费者1',
    consumerStuName:'学生1',
    tranLsId:'1',
    supversingAccount:'1111111111',
    normalAccount:'22222222222',
    transferAmt:100,
    transferResult:'success',
    reason:''
    
  },
  {
    transferId:'2',
    attendanceId:'1',
    attendanceDate:'2020-01-01',
    attendanceTime:'00:00:00',
    eduId:'1',
    eduName:'教育机构1',
    lessonId:'1',
    lessonName:'课程1',
    consumerId:'1',
    consumerName:'消费者1',
    consumerStuName:'学生1',
    tranLsId:'2',
    supversingAccount:'1111111111',
    normalAccount:'22222222222',
    transferAmt:100,
    transferResult:'success',
    reason:''
    
  },
]

const TransferManualQuery:React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({})
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
    // consumerName:queryInfo.consumerName,
    // lessonName:queryInfo.lessonName,
    // consumerStuName:queryInfo.consumerStuName,
 },queryURL)
 const refreshList = useCallback((eduOrgs:Transfer[]) => {
  dispatch(setTransferList(eduOrgs));
},[dispatch]);
const onTransfer = (item:Transfer)=>() => {
  doHandle(item)
}



const doHandle = async (item:Transfer)=>() => {
  fetch(handleTransfer, {
    method: 'POST',
    body: JSON.stringify({
      transferId:item.transferId,
    }),
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
  }).then(res => res.json())
  .then((json) => {
    alert(json.result)
  })
}
useEffect(() => { 
  fetch(paramStr, {
    method: 'GET',
  /* `teacher` is a property of `Lesson` */
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
  }).then(res => res.json())
  .then((json) => {
  const {transferList} = json //todo
  
  return 
  })
},[ paramStr, refreshList]);
const ListEntry = ({ transfer,key, ...props } : {transfer:Transfer,key:any}) => (
  <IonItem key={key} >
    <IonLabel>
      <p  className='text-center'>{transfer.eduName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{transfer.lessonName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{transfer.consumerName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{transfer.attendanceDate}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{transfer.attendanceTime}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{transfer.transferAmt}</p>
    </IonLabel>
    <IonLabel>
       <div className='flex gap-2'>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onTransfer(transfer)}>手动划拨</button>
       </div>
    </IonLabel>
  </IonItem>
  );
  if(state.transfer.transferDetail==null||state.transfer.transferDetail==undefined){
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
                    {state.transfer.transferList.map((list:Transfer, i: any) => (
                    <ListEntry transfer={list}
                    key={i} />
                  ))}
                    </div>
                </IonList>
            </div> 
            </div>            
      </IonPage>
   }
   else{
     return <Redirect to="/tabs/transferManual/detail" />
   }  
}
export default TransferManualQuery;
