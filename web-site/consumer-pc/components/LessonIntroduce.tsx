import { FC } from 'react'

interface lessonProps {
  lessonIntroduce?: string
}

// 课程介绍组件
const LessonIntroduce:FC<lessonProps> = (props) => {
  return <div className=' justify-center w-80 h-80 shadow-md'>
    <div className="text-base font-bold bg-yellow-500 text-white  text-center py-10 rounded-lg">课程介绍</div>
    <div className='mt-2 mx-2 leading-5 text-gray-700 text-sm'>
      {/* {props.lessonIntroduce} */}
      <h5 className="text-base ">课程目标</h5>
      <div >打牢知识要点基础</div>
      <div>全面理解并掌握学科知识点，灵活运用</div>
      <h5 >初步形成解题思路</h5>
      <div>知识*考点，从“看书能懂”到“拿题会做”</div>
      <h5 >养成良好学习习惯</h5>
      <div>笔记+练习循序渐进，掌握高效学习方法</div>
      
      </div>
  </div>
}
export default LessonIntroduce