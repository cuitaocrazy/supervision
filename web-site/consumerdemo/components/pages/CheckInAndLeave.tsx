import React from 'react';
import { IonPage, IonHeader, IonContent } from '@ionic/react';
import { useRouter } from 'next/router';
import Navbar from '../Navbar'

// 签到和请假页面
const CheckInAndLeave = () => {
  const router=useRouter();

  // 签到结果提示
  const CheckInFun = () => {
    router.push("./checkInList")
    alert("签到成功")
  }
// 请假结果提示
  const LeaveFun = () => {
    const isLeave = confirm('你确定要请假吗？')
    if (isLeave === true) {
      router.push("./checkInList")
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
        <div className='inline'>2022年5月18日</div>
        <div className='inline pl-2'>07:25:56</div>
      </div>
      <div className='pt-6 pb-6 mx-2 mt-2 mb-4 text-center rounded-lg shadow-md'>
        <div className='grid grid-cols-1 justify-items-center'>
          <button className='text-base font-bold text-white rounded-full w-28 h-28 bg-primary-600'
                  onClick={()=>{CheckInFun()}}>
            <div className='pt-4'>课程签到</div>
            <div className='pt-1'>07:25:26</div>
          </button>
        </div>
        <div className='mt-6 text-sm text-gray-500'>
          <div className='inline'>【少儿编程】第</div>
          <div className='inline'>3</div>
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
