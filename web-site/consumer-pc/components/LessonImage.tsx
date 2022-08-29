import { FC } from 'react'

interface LessonImageProps{
  lessonImage?:string
}

// 课程图片组件
const LessonImage:FC<LessonImageProps> = (props) => {
  return (
    <div>
      <img className='w-full h-40' src={props.lessonImage}></img>
    </div>
  )
}

export default LessonImage