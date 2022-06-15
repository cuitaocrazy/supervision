import { FC } from 'react'
import styles from './Schedule.module.css'

type ScheduleProps = {
  className?: string
}

// 进度条组件
const Schedule: FC<ScheduleProps> = (props) => {
  return <div className="w-full h-1.5 mt-4 mb-2 bg-gray-200 rounded-full dark:bg-gray-700">
    <div className={props.className || styles.schedu} ></div>
  </div>
}

export default Schedule