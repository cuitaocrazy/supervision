
import { useEffect,useCallback,useContext,useState } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext,setTransferManualList} from '../../../appState';
import {Transfer} from '../../../types/types'
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonModal,
  IonCardContent
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState({} as Transfer);
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
  dispatch(setTransferManualList(eduOrgs));
},[dispatch]);
const onTransfer = (item:Transfer)=>() => {
  setDetail(item);
  setIsModalOpen(true);
  // doHandle(item)
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

const onManual =()=>{
  doHandle(detail)
}
useEffect(() => { 
  // fetch(paramStr, {
  //   method: 'GET',
  //   headers: {
  //     'Content-type': 'application/json;charset=UTF-8',
  //   },
  // }).then(res => res.json())
  // .then((json) => {
  // const {transferList} = json 
  
  // return })
  refreshList(demotransferList)
},[]);


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
  return   <IonPage >
                <div className='relative'>
                <div className='flex'>
                </div>
              <div className='absolute w-full mt-10'>
                    <IonModal isOpen={isModalOpen}>
                        < IonCardContent>
                          <form onSubmit={onManual}>
                              <IonList>
                                <IonRow>
                                  <IonCol>
                                    <IonLabel>
                                      <p  className='text-center'>教育机构名称：</p>
                                    </IonLabel> 
                                  </IonCol>
                                  <IonCol>
                                    <IonLabel>
                                      <p  className='text-center'>{detail.eduName}</p>
                                    </IonLabel> 
                                  </IonCol>
                                </IonRow>
                                <IonRow>
                                  <IonCol>
                                    <IonLabel>
                                      <p  className='text-center'>课程名称：</p>
                                    </IonLabel> 
                                  </IonCol>
                                  <IonCol>
                                    <IonLabel>
                                      <p  className='text-center'>{detail.lessonName}</p>
                                    </IonLabel> 
                                  </IonCol>
                                  </IonRow>
                                  <IonRow>
                                    <IonCol>
                                      <IonLabel>
                                        <p  className='text-center'>划拨金额：</p>
                                      </IonLabel> 
                                    </IonCol>
                                    <IonCol>
                                      <IonLabel>
                                        <p  className='text-center'>{detail.transferAmt/100}</p>
                                      </IonLabel> 
                                    </IonCol>
                                  </IonRow>
                                  <IonRow>
                                    <IonCol>
                                      <IonLabel>
                                       <button type='submit'>确认</button>
                                      </IonLabel> 
                                    </IonCol>
                                    <IonCol>
                                      <IonLabel>
                                        <button onClick={()=>{setIsModalOpen(false)}}>取消</button>
                                      </IonLabel> 
                                    </IonCol>
                                  </IonRow>                               
                              </IonList>
                              
                              
                          </form>
                        </IonCardContent>
                    </IonModal> 
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
                    {state.transferManual.transferManualList.map((list:Transfer, i: any) => (
                    <ListEntry transfer={list}
                    key={i} />
                  ))}
                    </div>
                </IonList>
            </div> 
            </div>            
      </IonPage>
}
export default TransferManualQuery;

