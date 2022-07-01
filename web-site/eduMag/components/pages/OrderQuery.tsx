import { FC } from 'react'
import { IonPage,IonRow,IonCol,IonLabel } from '@ionic/react'


{/* <li className='flex items-center justify-center'>订单号</li>
                <li className='flex items-center justify-center'>客户姓名</li>
                <li className='flex items-center justify-center'>学生姓名</li>
                <li className='flex items-center justify-center'>课程名称</li>
                <li className='flex items-center justify-center'>课程类型</li>
                <li className='flex items-center justify-center'>课程开始日期</li>
                <li className='flex items-center justify-center'>课程结束日期</li>
                <li className='flex items-center justify-center'>课程签到类型</li>
                <li className='flex items-center justify-center'>总课时</li>
                <li className='flex items-center justify-center'>总价格</li>
                <li className='flex items-center justify-center'>教师姓名</li> */}
interface OrderInfoProps{
  order_no:string
  consumer_name:string
  consumer_stu_name:string
  lesson_name:string



}

const ListEntry = ({ lesson, key, ...props }: { lesson: Lesson, key: any }) => (
  <ul key={key} className="grid items-center grid-cols-4 gap-10 text-gray-600 border justify-items-center even:bg-primary-100 odd:bg-white ">
    <li className='flex items-center justify-center leading-10'>{lesson.lessonId}</li>
    <li className='flex items-center justify-center leading-10'>{lesson.lessonName}</li>
    <li className='flex items-center justify-center leading-10'>{lesson.lessonFinishTimes}</li>
    <li className='flex items-center justify-center leading-10'>
      <div className='flex gap-2 '>
        {lesson.lessonStatus === 'on' ? <button className='p-1 text-primary-600' onClick={() => { setDetail(lesson); setIsModalOpen(true) }}>发起签到</button> : <></>}

      </div>
    </li>
  </ul>
);

const OrderQuery = () => {
  return (
    <IonPage className='bg-gray-100'>
      <div className='relative w-full mx-6'>
        <div className='flex pt-2 my-2 text-gray-800'>
          <div className='mr-2 text-gray-600'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <span className='pr-1 text-gray-600'>报表</span>/<span className='pl-1 text-primary-500'>订单查询</span>
          </div>
        </div>
        <div className='w-11/12 px-4 py-2 mt-4 bg-white rounded-lg '>
          <div className='text-base font-bold'>
            快速查询
          </div>
          <hr className='mt-2 mb-4' />
          <div className='flex'>
            <IonRow className='flex justify-between '>
              <IonCol className='flex ml-8'>
                <IonLabel className='flex items-center justify-center font-bold text-center text-gray-600 w-28'>订单号</IonLabel>
                <input type='text' className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  
                  placeholder="请输入订单号" />
              </IonCol>
              <IonCol className='flex ml-8'>
                <button className='w-24 h-12 mr-6 text-white border-2 rounded-md shadow-md bg-primary-600 focus:bg-primary-700' >查询</button>
              </IonCol>
            </IonRow>
          </div>
        </div>
        <div className='absolute w-full mt-10'>
          <table className='w-11/12 '>
            <thead>
              <ul className='grid items-center h-10 grid-cols-11 gap-2 font-bold text-gray-700 bg-white rounded-lg w-fulls justify-items-center'>
                <li className='flex items-center justify-center'>订单号</li>
                <li className='flex items-center justify-center'>客户姓名</li>
                <li className='flex items-center justify-center'>学生姓名</li>
                <li className='flex items-center justify-center'>课程名称</li>
                <li className='flex items-center justify-center'>课程类型</li>
                <li className='flex items-center justify-center'>课程开始日期</li>
                <li className='flex items-center justify-center'>课程结束日期</li>
                <li className='flex items-center justify-center'>课程签到类型</li>
                <li className='flex items-center justify-center'>总课时</li>
                <li className='flex items-center justify-center'>总价格</li>
                <li className='flex items-center justify-center'>教师姓名</li>
              </ul>
            </thead>
            <tbody>
              {/* {state.attendenceLanuch?.attendenceLanuchList?.map((list: Lesson, i: any) => (
                <ListEntry lesson={list} key={i} />
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  )
}

export default OrderQuery