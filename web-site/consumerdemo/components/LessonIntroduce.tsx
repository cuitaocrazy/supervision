import { FC } from 'react'

interface lessonProps {
  lessonIntroduce?: string
}

// 课程介绍组件
const LessonIntroduce:FC<lessonProps> = (props) => {
  return <div className='p-3 mx-3 mt-2 text-xs rounded-lg shadow-md'>
    <div className='text-sm font-bold text-gray-600'>课程介绍</div>
    <div className='pt-1 text-gray-500'>{props.lessonIntroduce}</div>
  </div>
}
export default LessonIntroduce