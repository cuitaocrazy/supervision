import { FC } from 'react'

interface lessonImagesProps{
  lessonImages?:string
}

// 轮播图 
const LessonImages:FC<lessonImagesProps> = (props) => {
  return (
    <div className='flex items-center justify-center px-32 pt-24'>
      <img className="rounded-md cursor-pointer " src={props.lessonImages} alt="" />
    </div>
  )
}

export default LessonImages