import { FC } from 'react'

interface lessonImagesProps{
  lessonImages?:string
}

// 轮播图 
const LessonImages:FC<lessonImagesProps> = (props) => {
  return (
    <div className='pt-20 mx-3'>
      <img className="w-full h-32 rounded-lg cursor-pointer " src={props.lessonImages} alt="" />
    </div>
  )
}

export default LessonImages