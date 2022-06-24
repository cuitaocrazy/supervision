import { FC } from 'react';
import Router from 'next/router'
import {Lesson} from '../types/types'

interface LessonListCardProps {
  lesson_imgs?: string
  lesson_name?: string
  lesson_introduce?: string
  edu_address?: string
  item?: Lesson
}
// 首页课程列表card组件
const LessonListCard: FC<LessonListCardProps> = (props) => {
  return (
    <a onClick={
      () => {
        Router.push({pathname:'/searchLessonDetail', query: { item: JSON.stringify(props.item) }})
      }
    }>
      <div className="flex flex-col max-w-sm mb-3 ml-3 mr-2 bg-white border-gray-200 rounded-lg shadow-md h-36">
        <img className="h-20 rounded-t-lg cursor-pointer" src={props.lesson_imgs} alt="" />
        <div className="flex flex-col justify-center px-2 pt-1">
          <p className="text-xs font-bold text-gray-900 truncate cursor-pointer ">{props.lesson_name}</p>
          <p className='pt-1 text-xs text-gray-400 truncate'>{props.lesson_introduce}</p>
          <p className="text-xs text-gray-400 truncate">{props.edu_address}</p>
        </div>
      </div>
    </a>
  )
}

export default LessonListCard