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
    <div className="px-3 pt-3 pb-4 mx-3 mt-2 text-xs rounded-lg shadow-md flex flex-col  justify-start">
      <div className=" font-bold text-lg">订单信息</div>
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
  );
};

export default OrderInfo;
