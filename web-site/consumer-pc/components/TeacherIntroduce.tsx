import {FC} from 'react'

interface teacherProps{
  teacherIntroduce?:string
}

const TeacherIntroduce:FC<teacherProps> =(props)=>{
  return <div className='w-80 h-80'>
    <div className="text-lg font-bold bg-red-500 text-white  text-center py-10 rounded-lg">教师简介</div>
    <div className='pt-1 mx-2 leading-5 text-gray-500'>{props.teacherIntroduce}</div>
</div>
}

export default TeacherIntroduce