import type { NextPage } from 'next'
import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { io } from 'socket.io-client'
import { decrement } from '@/features/order-cart/counterSlice'
import { useAppDispatch } from '@/app/hook'
import LayoutNoCar from '@/components/layout-nocar'

/** 二维码支付页面 */
const preOrderURL = 'http://localhost:3004/preOrder'
const socketUrl = 'http://localhost:3004'
// type UrlInfo = {
//   codeUrl:string,
//   BankTranID:string,
//   BankID:string,
//   SVOrgID:string,
//   USVOrderNo:string
// }
const qrCode:NextPage = () => {
  const dispatch = useAppDispatch()

  const router = useRouter()
  const { USVOrgID, USVItemID, USVItemName, USVItemDesc, TranAmt } = router.query
  const [state, setState] = useState({ codeUrl: '', BankTranID: '', BankID: '', SVOrgID: '', USVOrderNo: '', time: 15 * 60 })
  const [time, setTime] = useState(15 * 60)

  // const getUrl = (urlInfo:UrlInfo) => {
  //   const { codeUrl, BankTranID, USVOrderNo, BankID, SVOrgID } = urlInfo
  //   return codeUrl + '?BankTranID=' + BankTranID + '&BankID=' + BankID + '&SVOrgID=' + SVOrgID + '&USVOrderNo=' + USVOrderNo
  // }

  const min = Math.floor(time / 60)
  const second = time % 60

  useEffect(() => {
    const socket = io(socketUrl)
    socket.on('open', () => {
      console.log('socket io is open !')
    })
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
        // const { codeUrl, BankTranID, USVOrderNo, BankID, SVOrgID } = json
        // const urlInfo : UrlInfo = { codeUrl, BankTranID, USVOrderNo, BankID, SVOrgID }

        const { PayUrl, SubscribeID } = json
        console.log(PayUrl)
        socket.emit('pay', SubscribeID)
        socket.on(SubscribeID + '_pay', () => {
          console.log('支付成功')
          const confirmResult = confirm('支付成功，是否返回首页？')
          if (confirmResult) {
            dispatch(decrement(USVItemID))
            router.push('/test')
          }
        })
        setState({ ...state, ...{ codeUrl: PayUrl } })
        return () => socket.close()
      })
  }
  , [])

  useEffect(() => {
    const interval = setInterval(() => setTime(time - 1), 1000)
    return () => clearInterval(interval)
  }, [time])
  return <LayoutNoCar title="支付">
    <div className="flex">
      <div className="pb-8 mx-auto mt-16 bg-white rounded-md w-96">
        <div className="pt-8 mx-2 mb-4 text-3xl font-semibold text-center text-gray-800">XX银行</div>
        <div className="m-1 text-lg text-center text-gray-600">订单提交成功，请扫码完成支付！</div>
        <div className="m-1 font-bold text-center text-gray-600">订单总计:&nbsp;<span className="text-lg text-red-700">¥{TranAmt}</span>&nbsp;</div>
        <div className="flex justify-center py-4 mx-20 border border-gray-200 rounded-md">
          <QRCode value={state.codeUrl} renderAs="svg" size={200} imageSettings={{ src: 'https://static.zpao.com/favicon.png', height: 50, width: 50, excavate: true }}></QRCode>
        </div>
        {/* <div>{getUrl(state)}</div> */}
        <div>{state.codeUrl}</div>
        <div className="m-2 text-sm text-center text-gray-600">请您在&nbsp;<span className="text-green-700">{min}分{second}秒</span>&nbsp;内完成支付，否则订单会被自动取消</div>
      </div>
    </div>
  </LayoutNoCar>
}

export default qrCode
