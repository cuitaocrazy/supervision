// import {FC} from 'react'

// interface teacherProps{
//   teacherIntroduce?:string
// }

// const TeacherIntroduce:FC<teacherProps> =(props)=>{
//   return <div className='p-3 mx-3 mt-2 text-xs rounded-lg shadow-md'>
//   <div className='text-sm font-bold text-gray-600'>教师简介</div>
//   <div className='pt-1 leading-5 text-gray-500'>{props.teacherIntroduce}</div>
// </div>
// }

// export default TeacherIntroduce
import { FC } from "react";

interface orderInfoProps {
  orderNo?: string;
  contractDate?: string;
  contractTime?: string;
  consumerName?: string;
  consumerStuName?: string;
  lessonTotalPrice?: number;
}

// 订单信息组件
const OrderInfo: FC<orderInfoProps> = (props) => {
  return (
    <div className="px-3 pt-3 pb-4 mx-3 mt-2 text-xs rounded-lg shadow-md flex flex-col items-center justify-center">
      <div className="flex leading-6 justify-items-start">
        <div className="pr-3 text-gray-500 items-center justify-center">订单编号:</div>
        <div className="text-gray-700 items-center justify-center">{props.orderNo}</div>
      </div>
      <div className="flex leading-6">
        <div className="pr-3 text-gray-500">下单日期:</div>
        <div className="text-gray-700">{props.contractDate}</div>
      </div>
      <div className="flex leading-6">
        <div className="pr-3 text-gray-500">下单时间:</div>
        <div className="text-gray-700">{props.contractTime}</div>
      </div>
      <div className="flex leading-6">
        <div className="pr-3 text-gray-500">支付方式:</div>
        <div className="text-gray-700">数币支付</div>
      </div>
      <div className="flex leading-6">
        <div className="pr-3 text-gray-500">客户姓名:</div>
        <div className="text-gray-700">{props.consumerName}</div>
      </div>
      <div className="flex leading-6">
        <div className="pr-3 text-gray-500">学生姓名</div>
        <div className="text-gray-700">{props.consumerStuName}</div>
      </div>
      <div className="flex justify-end font-bold text-gray-700">
        <div>订单金额：</div>
        <div>¥{props.lessonTotalPrice}</div>
      </div>
      {/* <div className='flex leading-6'>
      <div className='pr-3 text-gray-500'>订单编号</div>
      <div className='text-gray-700'>3493214839149321</div>
    </div>
    <div className='flex leading-6'>
      <div className='pr-3 text-gray-500'>下单时间</div>
      <div className='text-gray-700'>2022-01-21 09:14:30</div>
    </div>
    <div className='flex leading-6'>
      <div className='pr-3 text-gray-500'>付款时间</div>
      <div className='text-gray-700'>2022-01-21 09:12:30</div>
    </div>
    <div className='flex leading-6'>
      <div className='pr-3 text-gray-500'>支付方式</div>
      <div className='text-gray-700'> 在线支付</div>
    </div>
    <div className='flex leading-6'>
      <div className='pr-3 text-gray-500'>客户姓名</div>
      <div className='text-gray-700'>王女士</div>
    </div>
    <div className='flex leading-6'>
      <div className='pr-3 text-gray-500'>联系方式</div>
      <div className='text-gray-700'>18610678900</div>
    </div>
    <div className='flex leading-6'>
      <div className='pr-3 text-gray-500'>优惠金额</div>
      <div>庆双旦享8.8折</div>
    </div>
    <div className='flex leading-6'>
      <div className='pr-3 text-gray-500'>获得积分</div>
      <div className='text-gray-700'>可获得888积分</div>
    </div>
    <div className='flex justify-end font-bold text-gray-700'>
      <div>实付金额：</div>
      <div>¥710.40</div>
    </div> */}
    </div>
  );
};

export default OrderInfo;
