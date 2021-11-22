import type { NextPage } from 'next'
import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { io } from 'socket.io-client'
import { decrement } from '@/features/order-cart/counterSlice'
import { useAppDispatch } from '@/app/hook'

/** 二维码支付页面 */
const preOrderURL = 'http://localhost:3004/preOrder'

type UrlInfo = {
  codeUrl:string,
  BankTranID:string,
  BankID:string,
  SVOrgID:string,
  USVOrderNo:string
}

const qrCode:NextPage = () => {
  const dispatch = useAppDispatch()
  const socket = io('http://localhost:3004')
  socket.on('open', () => {
    console.log('socket io is open !')
  })

  const router = useRouter()
  const { USVOrgID, USVItemID, USVItemName, USVItemDesc, TranAmt } = router.query
  const [qrCodeUrl, setQrCodeUrl] = useState({ codeUrl: '', BankTranID: '', BankID: '', SVOrgID: '', USVOrderNo: '' })

  const getUrl = (urlInfo:UrlInfo) => {
    const { codeUrl, BankTranID, USVOrderNo, BankID, SVOrgID } = urlInfo
    return codeUrl + '?BankTranID=' + BankTranID + '&BankID=' + BankID + '&SVOrgID=' + SVOrgID + '&USVOrderNo=' + USVOrderNo
  }

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
        const { codeUrl, BankTranID, USVOrderNo, BankID, SVOrgID } = json
        const urlInfo : UrlInfo = { codeUrl, BankTranID, USVOrderNo, BankID, SVOrgID }
        socket.emit('pay', USVOrderNo)
        socket.on(USVOrderNo + '_create', () => {
          const confirmResult = confirm('支付成功，是否返回首页？')
          if (confirmResult) {
            dispatch(decrement(USVItemID))
            router.push('/test')
          }
        })
        // qrCodeurl = codeUrl + '&BankTranID=' + BankTranID + '&BankID=' + BankID + '&SVOrgID=' + SVOrgID + '&USVOrderNo=' + USVOrderNo
        // setQrCodeUrl(codeUrl + '&BankTranID=' + BankTranID + '&BankID=' + BankID + '&SVOrgID=' + SVOrgID + '&USVOrderNo=' + USVOrderNo)
        setQrCodeUrl(urlInfo)
      })
  }, [])
  return <>
    <div className="pt-6 mx-2 mb-4 text-3xl font-semibold text-center text-gray-800">XX银行</div>
    <div className="m-1 text-center text-gray-600">订单提交成功，请尽快付款！订单号：<span>{qrCodeUrl.USVOrderNo}</span></div>
    <div className="m-1 text-center text-gray-600">应付金额&nbsp;<span className="text-lg text-red-500">{TranAmt}</span>&nbsp;元</div>
    <div className="flex justify-center">
      <QRCode value={getUrl(qrCodeUrl)} renderAs="svg" size={200} imageSettings={{ src: 'https://static.zpao.com/favicon.png', height: 50, width: 50, excavate: true }}></QRCode>
    </div>
    <div>{getUrl(qrCodeUrl)}</div>
    <div className="m-2 text-sm text-center text-gray-600">请您在&nbsp;<span className="text-red-500">23时59分43秒</span>&nbsp;内完成支付，否则订单会被自动取消</div>
  </>
}

export default qrCode
