import { FC } from 'react'

interface lessonProps {
  lessonIntroduce?: string
}

// 课程介绍组件
const LessonIntroduce:FC<lessonProps> = (props) => {
  return <div className=' justify-center w-80 h-80 shadow-md'>
    <div className="text-lg font-bold bg-yellow-500 text-white  text-center py-10 rounded-lg">课程介绍</div>
    <div className='flex mt-2 text-gray-500 text-sm'>{props.lessonIntroduce}</div>
  </div>
}
export default LessonIntroduce