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
    <div className="w-80 h-80 ">
      <div className=" text-lg font-bold bg-green-500 text-white  text-center py-10 rounded-lg">订单信息</div>
      <div className="px-2">
        <div className="flex leading-6 justify-items-start mt-2">
          <div className="pr-3 text-gray-500 items-center justify-center">订单编号:</div>
          <div className="text-gray-700 items-center justify-center">{props.orderNo}</div>
        </div>
        <div className="flex leading-6">
          <div className="pr-3 text-gray-500 ">下单日期:</div>
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
          <div className="pr-3 text-gray-500">学生姓名:</div>
          <div className="text-gray-700">{props.consumerStuName}</div>
        </div>
        <div className="flex justify-end font-bold text-gray-700">
          <div>订单金额：</div>
          <div>¥{props.lessonTotalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
