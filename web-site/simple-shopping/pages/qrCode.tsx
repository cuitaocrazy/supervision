import type { NextPage } from 'next'
import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

/** 二维码支付页面 */
const preOrderURL = 'http://localhost:3004/preOrder'
// USVOrgID=Edu1&USVItemID=Id1&USVItemName=哈佛学霸养成计划——培养孩子超强学习力&USVItemDesc=哈佛学霸养成计划——培养孩子超强学习力&TranAmt=100&image=102.jpeg

const qrCode:NextPage = () => {
// const qrCode = () => {
  const router = useRouter()
  console.log(router.query)
  const { USVOrgID, USVItemID, USVItemName, USVItemDesc, TranAmt } = router.query
  const [qrCodeUrl, setQrCodeUrl] = useState('')

  useEffect(() => {
    fetch(preOrderURL, {
      method: 'POST',
      body: JSON.stringify({
        USVOrgID: USVOrgID,
        USVItemID: USVItemID,
        USVItemName: USVItemName,
        USVItemDesc: USVItemDesc,
        PayerRemark: '',
        TranAmt: TranAmt,
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
      .then((json) => {
        console.log(json)
        const { codeUrl, BankTranId, USVOrderNo, BankID, SVOrgID } = json
        // qrCodeurl = codeUrl + '&BankTranId=' + BankTranId + '&BankID=' + BankID + '&SVOrgID=' + SVOrgID + '&USVOrderNo=' + USVOrderNo
        setQrCodeUrl(codeUrl + '&BankTranId=' + BankTranId + '&BankID=' + BankID + '&SVOrgID=' + SVOrgID + '&USVOrderNo=' + USVOrderNo)
      })
  }, [])
  return <>
    <div className="pt-6 mx-2 mb-4 text-3xl font-semibold text-center text-gray-800">XX银行</div>
    <div className="m-1 text-center text-gray-600">订单提交成功，请尽快付款！订单号：<span>11111111111144444444444</span></div>
    <div className="m-1 text-center text-gray-600">应付金额&nbsp;<span className="text-lg text-red-500">199</span>&nbsp;元</div>
    <div className="flex justify-center">
      <QRCode value={qrCodeUrl} renderAs="svg" size={200} imageSettings={{ src: 'https://static.zpao.com/favicon.png', height: 50, width: 50, excavate: true }}></QRCode>
    </div>
    <div className="m-2 text-sm text-center text-gray-600">请您在&nbsp;<span className="text-red-500">23时59分43秒</span>&nbsp;内完成支付，否则订单会被自动取消</div>
  </>
}

export default qrCode
