import { FC } from 'react'
import {useRouter} from 'next/router'
import { Attendance } from '@/types/types';

// 签到结果列表
const CheckInResultListCard = (props:{attendance:Attendance}) => {
  const {attendance}= props
  const router=useRouter();
  
  return <div className='pl-2 mt-3 w-3/4 mx-auto'>
    <div className='text-sm leading-7'>
      <span className='text-green-500 '>已签到</span>
      <span className='pl-2 text-gray-500 '>签到类型：</span>
      <span className='pl-1 text-gray-500 '>手动</span>
    </div>
    <div className='text-sm leading-7'>
      <span>{attendance.lessonName}</span>
      <span>（{attendance.consumerStuName}）</span>
      <span>本次签到</span>
      <span>{attendance.attendanceLessonQuantity}</span> 
      <span className='inline'>课时</span>
    </div>
    <div className='leading-7'>
      <span className='font-bold'>签到日期时间:</span>
      <span className='font-bold'>{attendance.attendanceDate} {attendance.attendanceTime}</span>
      <input className='inline px-2 ml-4 text-xs text-center border border-secondary-300 text-secondary-300 rounded-3xl' 
      type="button" value="去协商"
      onClick={()=>{router.push("./applyDiscuss")}} />
    </div>
  </div>
}

export default CheckInResultListCard