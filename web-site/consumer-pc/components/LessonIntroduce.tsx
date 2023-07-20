import { FC } from 'react'

interface lessonProps {
  lessonIntroduce?: string
}

// 课程介绍组件
const LessonIntroduce:FC<lessonProps> = (props) => {
  return <div className='flex flex-col p-3 mt-2 text-xs items-center justify-center'>
    <div className='flex text-sm font-bold text-gray-600'>课程介绍</div>
    <div className='flex pt-1 text-gray-500'>{props.lessonIntroduce}</div>
  </div>
}
export default LessonIntroduce