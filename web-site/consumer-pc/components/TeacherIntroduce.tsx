import {FC} from 'react'

interface teacherProps{
  teacherIntroduce?:string
}

const TeacherIntroduce:FC<teacherProps> =(props)=>{
  return <div className='flex flex-col p-3 mt-2 text-xs justify-center items-center'>
  <div className='text-sm font-bold text-gray-600'>教师简介</div>
  <div className='pt-1 leading-5 text-gray-500'>{props.teacherIntroduce}</div>
</div>
}

export default TeacherIntroduce