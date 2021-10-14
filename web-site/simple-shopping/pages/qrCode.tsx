import type { NextPage } from 'next'
import QRCode from 'qrcode.react'

const qrCode: NextPage = () => {
  return <div className="flex flex-row justify-center bg-gray-100 justify-items-center" >
    <div >中国银行收银台</div>
    <div >订单提交成功，请尽快付款！订单号：111111111111</div>
    <div >应付金额：100.05元</div>
    <div className="">
      <QRCode value="http://2.3.4.5./aaa" size="200" includeMargin="true" imagesSettings={{src:"11",x:10,y:10,height:50,width:"50",excavate:false}}></QRCode>
    </div>
  </div>
}

export default qrCode


