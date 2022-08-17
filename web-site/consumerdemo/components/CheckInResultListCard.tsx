import { FC } from 'react'
import {useRouter} from 'next/router'
import { Attendance } from '@/types/types';

// 签到结果列表
const CheckInResultListCard = (props:{attendance:Attendance}) => {
  const {attendance}= props
  const router=useRouter();
  
  return <div className='pl-2 mx-3 mt-3'>
    <div className='text-sm leading-7'>
      <span className='text-green-500 '>已签到</span>
      <span className='pl-2 text-gray-500 '>签到类型：</span>
      <span className='pl-1 text-gray-500 '>手动签到</span>
    </div>
    <div className='text-sm leading-7'>
      <span>{attendance.lessonName}</span>
      <span>（{attendance.consumerStuName}）</span>
      <span>第</span>
      <span>{attendance.attendancelessonQuantity}</span> 
      <span className='inline'>课</span>
    </div>
    <div className='leading-7'>
      <span className='font-bold'>签到时间:</span>
      <span className='font-bold'>{attendance.attendanceTime}</span>
      <input className='inline px-2 ml-4 text-xs text-center border border-secondary-300 text-secondary-300 rounded-3xl' 
      type="button" value="去协商"
      onClick={()=>{router.push("./applyDiscuss")}} />
    </div>
  </div>
}

export default CheckInResultListCard