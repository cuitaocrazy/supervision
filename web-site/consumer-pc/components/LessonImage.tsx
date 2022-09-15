import { FC } from 'react'

interface LessonImageProps{
  lessonImage?:string
}

// 课程图片组件
const LessonImage:FC<LessonImageProps> = (props) => {
  return (
    <div className='mt-2'>
      <img className="w-1/2 mx-auto rounded-md cursor-pointer h-52" src={props.lessonImage}></img>
    </div>
  )
}

export default LessonImage