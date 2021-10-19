import type { NextPage } from 'next'
import QRCode from 'qrcode.react'

/** 二维码支付页面 */
const qrCode: NextPage = () => {
  return <>
    <div className="pt-6 mx-2 mb-4 text-3xl font-semibold text-center text-gray-800">中国银行收银台</div>
    <div className="m-1 text-center text-gray-600">订单提交成功，请尽快付款！订单号：<span>11111111111144444444444</span></div>
    <div className="m-1 text-center text-gray-600">应付金额&nbsp;<span className="text-lg text-red-500">100.05</span>&nbsp;元</div>
    <div className="flex justify-center">
      <QRCode value="http://2.3.4.5./aaa" renderAs="canvas" size={200} includeMargin imageSettings={{ src: '11', height: 50, width: 50, excavate: false }}></QRCode>
    </div>
    <div className="m-2 text-sm text-center text-gray-600">请您在&nbsp;<span className="text-red-500">23时59分43秒</span>&nbsp;内完成支付，否则订单会被自动取消</div>
  </>
}

export default qrCode
