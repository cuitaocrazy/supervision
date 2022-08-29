import { FC} from 'react'
import TeacherName from './TeacherName'
import OrgAddressAndPhone from './OrgAddressAndPhone'

interface lessonDetailProps {
  lessonName?: string
  teacherName?: string
  lessonTotalPrice?: number
  lessonTotalQuantity?: number
  eduAddress?: string
  eduContactPhone?: string
  lessonIntroduce?: string
}

// 课程的培训机构课程信息组件

const OrgLessonInfo: FC<lessonDetailProps> = (props) => {
  return (<>
    <div className='px-3 py-1 mx-3 rounded-lg shadow-md'>
      <div className='text-lg font-bold'>{props.lessonName}</div>
      <TeacherName teacherName={props.teacherName} />
      <div className='flex pt-1 text-xs'>
        <div className="text-red-500 "><span>¥</span>{props.lessonTotalPrice}</div>
        <div className='pl-3 text-gray-500'>{props.lessonTotalQuantity}<span>课时</span></div>
      </div>
      <OrgAddressAndPhone eduContactPhone={props.eduContactPhone} eduAddress={props.eduAddress} />
    </div>
  </>
  )
}

export default OrgLessonInfo