import React,{useContext,useEffect,useState} from 'react';
import { IonPage, IonHeader, IonContent } from '@ionic/react';
import {Link, Redirect} from 'react-router-dom'
import Navbar from '../Navbar'
import {AppContext,setContractDetail} from '../../appState';
import moment from 'moment'

// 签到和请假页面
const CheckInAndLeave = () => {
  const { state } = useContext(AppContext); 
  const [date,setDate] = useState(moment().format('YYYY年MM月DD日'))
  const [time,setTime] = useState(moment().format('HH:mm:ss'))
  const [back,setBack] = useState(null as unknown)
  // 签到结果提示
  const CheckInFun = () => {
    setBack('/MyCheckInList')  
  }
  if(back){
    return <Redirect to={back as string}></Redirect>
  }

  setTimeout(()=>{
     setDate(moment().format('YYYY年MM月DD日'))
     setTime(moment().format('HH:mm:ss'))
  },1000)


  
// 请假结果提示
  const LeaveFun = () => {
    const isLeave = confirm('你确定要请假吗？')
    if (isLeave === true) {
      setBack('/MyCheckInList')  
    } else if (isLeave === false) {
      alert("取消请假")
    }
  }
  return <IonPage>
    <IonHeader>
      <Navbar title='签到/请假' />
    </IonHeader>
    <IonContent>
      <div className='py-3 text-sm text-center shadow-md text-secondary-400'>
        <div className='inline'>{date}</div>
        <div className='inline pl-2'>{time}</div>
      </div>
      <div className='pt-6 pb-6 mx-2 mt-2 mb-4 text-center rounded-lg shadow-md'>
        <div className='grid grid-cols-1 justify-items-center'>
          <button className='text-base font-bold text-white rounded-full w-28 h-28 bg-primary-600'
                  onClick={()=>{CheckInFun()}}>
            <div className='pt-4'>课程签到</div>
            <div className='pt-1'>{time}</div>
          </button>
        </div>
        <div className='mt-6 text-sm text-gray-500'>
          <div className='inline'>【{state.contractDetail.lessonName}】第</div>
          <div className='inline'>{state.contractDetail.lessonCompletedQuantity+1}</div>
          <div className='inline'>课即将开课，请您尽快签到！</div>
        </div>
      </div>
      <div className='flex mt-4'>
        <input className='w-full py-2 mx-5 font-bold tracking-widest text-white shadow-md shadow-remind-400 bg-remind-400 rounded-3xl'
               type="button" 
               value="请假"
               onClick={()=>LeaveFun()} />
      </div>
    </IonContent>
  </IonPage>
}

export default CheckInAndLeave
