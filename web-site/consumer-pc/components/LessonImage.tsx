import { FC } from 'react'

interface LessonImageProps{
  lessonImage?:string
}

// 课程图片组件
const LessonImage:FC<LessonImageProps> = (props) => {
  return (
    <div className='mt-2'>
      <img className="w-3/4 mx-auto rounded-lg cursor-pointer h-56" src={props.lessonImage}></img>
    </div>
  )
}

export default LessonImage