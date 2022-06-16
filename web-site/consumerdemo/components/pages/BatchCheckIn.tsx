import React from 'react'
import { IonPage, IonHeader, IonContent } from '@ionic/react'
import { useRouter } from 'next/router'

// 批量签到课程组件card
const CheckInLessonList = () => {
  const router = useRouter();
  return <div>
    <div className='flex items-center mx-4 my-2 mb-1'>
      <input className='mr-3 border-gray-300 rounded outline-none cursor-pointer text-primary-600 focus:ring-0 focus:ring-primary-600 focus:outline-none checked:bg-primary-500' type="checkbox" id="cbox1" value="first_checkbox" />
      <label className='text-sm text-center text-gray-500 '>核桃编程培训机构</label>
    </div>
    <div className='mt-2 rounded-lg shadow-md glow-third-200'>
      <div className='grid grid-cols-12 mx-2 h-28 rounde-xl'>
        <div className='flex items-center justify-center'>
          <input className='col-span-1 border-gray-300 rounded outline-none cursor-pointer text-primary-600 focus:ring-0 focus:ring-primary-600 focus:outline-none checked:bg-primary-500' type="checkbox" />
        </div>
        <a className='col-span-4 mt-2 mr-2' onClick={
          () => {
            router.push('/lessonDetail')
          }
        }>
          <img className='w-24 h-24 rounded-xl' src="http://placekitten.com/g/200/300"></img>
        </a>
        <div className='flex flex-col col-span-7 mt-2 mr-3 justify-items-start'>
          <a onClick={
            () => {
              router.push('/lessonDetail')
            }
          }>
            <div className='flex justify-between mt-1'>
              <div className='overflow-hidden text-sm text-ellipsis'>思维逻辑小游戏</div>
            </div>
            <div className='h-8 mt-1 overflow-hidden text-xs text-gray-500 text-ellipsis'>锻炼孩子动手能力，提高孩子思维能力，学习完课程可组装不同的形状</div>
            <div className='flex gap-3 mt-3'>
              <span className='text-xs font-bold text-remind-500'>¥3558.00</span>
              <span className='text-xs text-gray-700'>36课时</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
}

// 批量签到页面
const BatchCheckIn = () => {
  const router = useRouter();

  const BatchCheckInFun=()=>{
    alert("批量签到成功")
  }
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>批量签到</div>
      </div>
    </IonHeader>
    <IonContent>
      <div className='py-3 text-sm text-center shadow-md text-secondary-400'>
        <div className='inline'>2022年5月18日</div>
        <div className='inline pl-2'>07:25:56</div>
      </div>
      <div className='pt-6 pb-6 mx-2 mt-2 mb-4 text-center rounded-lg shadow-md'>
        <div className='grid grid-cols-1 justify-items-center'>
          <button className='text-base font-bold text-white rounded-full w-28 h-28 bg-primary-600'
                   onClick={()=>{BatchCheckInFun()}}>
            <div className='pt-4'>批量签到</div>
            <div className='pt-1'>07:25:26</div>
          </button>
        </div>
        <div className='mt-8'>
          <CheckInLessonList />
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default BatchCheckIn