import { FC } from 'react'
// import styles from './Schedule.module.css'

type ScheduleProps = {
  className?: string
}

// 进度组件
const Schedule: FC<ScheduleProps> = (props) => {
  return <div className='px-3 pt-3 pb-4 mx-3 mt-2 text-xs rounded-lg shadow-md'>
    <div className='flex'>
      <div className='font-bold tracking-wider text-primary-500'>张大宝</div>
      <div className='font-bold text-gray-600'>学习里程碑</div>
      <div className='text-gray-500'>(56课时)</div>
    </div>
    <div className='pt-2 tracking-wider text-center text-gray-500'>
      学习进度
      <label className='font-medium text-primary-700'>50%</label>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-1">
      <div className="bg-primary-600 h-1.5 rounded-full w-1/2" ></div>
    </div>
  </div>
  // return <div className="w-full h-1.5 mt-4 mb-2 bg-gray-200 rounded-full dark:bg-gray-700">
  //   <div className={props.className || styles.schedu} ></div>
  // </div>

}

export default Schedule