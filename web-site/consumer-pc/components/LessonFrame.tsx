import {FC} from 'react'

interface LessonFrameProps{
  lessonOutline?:string
}

// 课程大纲组件
const LessonFrameCard:FC<LessonFrameProps> =(props)=>{
  return <div className='px-2 pt-4 pb-3 mx-3 mt-2 shadow-md'>
  <div className='text-sm font-bold'>课程大纲</div>
  <div className='pt-2 pb-2 pl-4 mt-2 text-sm rounded-md text-third-600 bg-primary-50'>{props.lessonOutline}</div>
</div> 
}
export default LessonFrameCard