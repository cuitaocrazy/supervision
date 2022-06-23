import {FC} from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import { useRouter } from 'next/router'
import Navbar from 'components/Navbar'
import {Contract} from '../../types/types'

interface OrderProps{
  lessonImages?:string
  lessonName?:string
  consumerStuName?:string
  lessonTotalQuantity?:number
  lessonCompletedQuantity?:number
}

// 课程列表card 
const LessonListCard:FC<OrderProps> = (props) => {
  const router = useRouter()
  return <div className='pb-3 mx-3 mt-2 bg-white rounded-lg shadow-md'>
    <div className='flex pb-1 mx-2 mb-2 rounde-xl'>
      <img className='w-20 h-20 mt-2 ml-1 rounded-xl' src={props.lessonImages}></img>
      <div className='mt-3 ml-3'>
        <div className='text-sm font-medium text-gray-700 '>{props.lessonName}</div>
        <div className='flex mt-1'>
          <div className='text-sm text-gray-400 '>学生姓名：</div>
          <div className='text-sm text-gray-800'>{props.consumerStuName}</div>
        </div>
        <div className='flex mt-1'>
          <div className='text-sm text-gray-400 '>总课时/已上课时：</div>
          <div className='text-sm text-gray-700'>{props.lessonTotalQuantity}<span>/</span></div>
          <div className='pl-1 text-sm text-orange-400'>{props.lessonCompletedQuantity}</div>
        </div>
      </div>
    </div>
    <div className='grid grid-cols-3 gap-2 text-xs text-white justify-items-center'>
      <div className='px-6 py-1 shadow-md rounded-3xl bg-primary-500 shadow-primary-300'
        onClick={() => { router.push("./myLessonEvalDetail") }}>去评价</div>
      <div className='px-6 py-1 shadow-md rounded-3xl bg-secondary-300 shadow-secondary-300'
        onClick={() => { router.push("./myApplyComp") }}>去投诉</div>
      <div className='px-4 py-1 shadow-md rounded-3xl bg-remind-400 shadow-remind-400'
        onClick={() => { router.push("myLessonDetail") }}>查看详情</div>
    </div>
  </div>
}

let orderList:Contract[]=[
  {lessonImages:"http://placekitten.com/g/200/300",lessonName:"小熊美术",consumerStuName:"张大宝",lessionTotalQuantity:58,lessionCompletedQuantity:10},
  {lessonImages:"http://placekitten.com/g/200/300",lessonName:"小熊美术",consumerStuName:"张大宝",lessionTotalQuantity:58,lessionCompletedQuantity:10},
  {lessonImages:"http://placekitten.com/g/200/300",lessonName:"小熊美术",consumerStuName:"张大宝",lessionTotalQuantity:58,lessionCompletedQuantity:10},
  {lessonImages:"http://placekitten.com/g/200/300",lessonName:"小熊美术",consumerStuName:"张大宝",lessionTotalQuantity:58,lessionCompletedQuantity:10},
  {lessonImages:"http://placekitten.com/g/200/300",lessonName:"小熊美术",consumerStuName:"张大宝",lessionTotalQuantity:58,lessionCompletedQuantity:10},
  {lessonImages:"http://placekitten.com/g/200/300",lessonName:"小熊美术",consumerStuName:"张大宝",lessionTotalQuantity:58,lessionCompletedQuantity:10},
  {lessonImages:"http://placekitten.com/g/200/300",lessonName:"小熊美术",consumerStuName:"张大宝",lessionTotalQuantity:58,lessionCompletedQuantity:10},
]
// 课程列表页面
const MyLessonList = () => {
  const router = useRouter()
  return <IonPage>
    <IonHeader>
      <Navbar title="课程列表" />
    </IonHeader>
    <IonContent>
      {orderList.map((item,index)=>{
        return <LessonListCard key={index} lessonImages={item.lessonImages} lessonName={item.lessonName} consumerStuName={item.consumerStuName} lessonTotalQuantity={item.lessionTotalQuantity} lessonCompletedQuantity={item.lessionCompletedQuantity} />
      })}
    </IonContent>
  </IonPage>
}

export default MyLessonList