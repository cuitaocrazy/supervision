import React from 'react'

// 订单信息组件
const OrderInfo = () => {
  return <div className='px-3 pt-3 pb-4 mx-3 mt-2 text-xs rounded-lg shadow-md'>
    <div className='flex leading-6'>
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
    </div>
  </div>
}

export default OrderInfo