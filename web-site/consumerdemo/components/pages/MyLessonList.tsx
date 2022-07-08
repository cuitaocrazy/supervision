import { FC,useContext,useCallback,useState,useEffect } from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import Router, { useRouter } from 'next/router'
import Navbar from 'components/Navbar'
import { Contract } from '../../types/types'
import { Link } from 'react-router-dom';
import {AppContext,setContractDetail} from '../../appState';
import {searchContractURL} from'../../const/const';

interface OrderListProps {
  lessonImages?: string
  lessonName?: string
  consumerStuName?: string
  lessonTotalQuantity?: number
  lessonCompletedQuantity?: number
  item?: Contract
}

// 课程列表card 
const LessonListCard: FC<OrderListProps> = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const refreshContractDetail = useCallback((contract:Contract) => {
    dispatch(setContractDetail(contract));
  },[dispatch]);
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
        onClick={() => { Router.push({ pathname: ("./myLessonEvalDetail"), query: { item: JSON.stringify(props.item) } }) }}>去评价</div>
      <div className='px-6 py-1 shadow-md rounded-3xl bg-secondary-300 shadow-secondary-300'
        onClick={() => { Router.push({ pathname: ("./myApplyComp"), query: { item: JSON.stringify(props.item) } }) }}>去投诉</div>
      <Link to='/myLessonDetail'>
        <div className='px-4 py-1 shadow-md rounded-3xl bg-remind-400 shadow-remind-400'
          onClick={() => {refreshContractDetail(props.item as Contract)  }}>查看详情</div>
      </Link>  
    </div>
  </div>
}

// let orderList: Contract[] = [
//   { lessonImages: "http://placekitten.com/g/200/300", lessonName: "小熊美术1", teacherName: "张雷", lessonTotalPrice: 999, lessonTotalQuantity: 58, eduAddress: "北京市海淀区大钟寺东路", eduContactPhone: "010-980990090", consumerStuName: "张大宝", lessonCompletedQuantity: 10, teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", lessonIntroduce: "艺术教育是未来教育，是快乐教育" },
//   { lessonImages: "http://placekitten.com/g/200/300", lessonName: "小熊美术2", teacherName: "张雷", lessonTotalPrice: 999, lessonTotalQuantity: 58, eduAddress: "北京市海淀区大钟寺东路", eduContactPhone: "010-980990090", consumerStuName: "张大宝", lessonCompletedQuantity: 10, teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", lessonIntroduce: "艺术教育是未来教育，是快乐教育" },
//   { lessonImages: "http://placekitten.com/g/200/300", lessonName: "小熊美术3", teacherName: "张雷", lessonTotalPrice: 999, lessonTotalQuantity: 58, eduAddress: "北京市海淀区大钟寺东路", eduContactPhone: "010-980990090", consumerStuName: "张大宝", lessonCompletedQuantity: 10, teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", lessonIntroduce: "艺术教育是未来教育，是快乐教育" },
//   { lessonImages: "http://placekitten.com/g/200/300", lessonName: "小熊美术4", teacherName: "张雷", lessonTotalPrice: 999, lessonTotalQuantity: 58, eduAddress: "北京市海淀区大钟寺东路", eduContactPhone: "010-980990090", consumerStuName: "张大宝", lessonCompletedQuantity: 10, teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", lessonIntroduce: "艺术教育是未来教育，是快乐教育" },
//   { lessonImages: "http://placekitten.com/g/200/300", lessonName: "小熊美术5", teacherName: "张雷", lessonTotalPrice: 999, lessonTotalQuantity: 58, eduAddress: "北京市海淀区大钟寺东路", eduContactPhone: "010-980990090", consumerStuName: "张大宝", lessonCompletedQuantity: 10, teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", lessonIntroduce: "艺术教育是未来教育，是快乐教育" },
//   { lessonImages: "http://placekitten.com/g/200/300", lessonName: "小熊美术6", teacherName: "张雷", lessonTotalPrice: 999, lessonTotalQuantity: 58, eduAddress: "北京市海淀区大钟寺东路", eduContactPhone: "010-980990090", consumerStuName: "张大宝", lessonCompletedQuantity: 10, teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", lessonIntroduce: "艺术教育是未来教育，是快乐教育" },
//   { lessonImages: "http://placekitten.com/g/200/300", lessonName: "小熊美术7", teacherName: "张雷", lessonTotalPrice: 999, lessonTotalQuantity: 58, eduAddress: "北京市海淀区大钟寺东路", eduContactPhone: "010-980990090", consumerStuName: "张大宝", lessonCompletedQuantity: 10, teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", lessonIntroduce: "艺术教育是未来教育，是快乐教育" },
// ]



// 课程列表页面
const MyLessonList = () => {
  const [orderList,setOrderList] = useState([] as Contract[])
useEffect(()=>{
  fetch(searchContractURL, {
    method: 'GET',
    // body: JSON.stringify({
      
    // }),
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
  }).then(res => res.json())
  .then((json) => {
    setOrderList(json.result)
  })
},[])
  return <IonPage>
    <IonHeader>
      <Navbar title="课程列表" />
    </IonHeader>
    <IonContent>
      {orderList.map((item, index) => {
        return <LessonListCard key={index} lessonImages={item.lessonImages} lessonName={item.lessonName} consumerStuName={item.consumerStuName} lessonTotalQuantity={item.lessonTotalQuantity} lessonCompletedQuantity={item.lessonAccumulationQuantity} item={item} />
      })}
    </IonContent>
  </IonPage>
}

export default MyLessonList