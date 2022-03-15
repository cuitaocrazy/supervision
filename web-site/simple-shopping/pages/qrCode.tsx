import type { NextPage } from 'next'
import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { io } from 'socket.io-client'
import { decrement } from '@/features/order-cart/counterSlice'
import { useAppDispatch } from '@/app/hook'
import LayoutNoCar from '@/components/layout-nocar'
// import style from '@/components/Button.module.css'

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
  const [time, setTime] = useState(60)

  // const getUrl = (urlInfo:UrlInfo) => {
  //   const { codeUrl, BankTranID, USVOrderNo, BankID, SVOrgID } = urlInfo
  //   return codeUrl + '?BankTranID=' + BankTranID + '&BankID=' + BankID + '&SVOrgID=' + SVOrgID + '&USVOrderNo=' + USVOrderNo
  // }

  // const min = Math.floor(time / 60)
  const second = (time === 60) ? 60 : time % 60

  // const style= (time<=0):

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
      <div className="pb-8 mx-auto mt-16 bg-white rounded-md w-96">
        <div className="pt-8 mx-2 mb-4 text-3xl font-semibold text-center text-gray-800">XX银行</div>
        <div className="m-1 text-lg text-center text-gray-700">订单提交成功，请扫码完成支付！</div>
        <div className="m-1 font-bold text-center text-gray-800">订单总计:&nbsp;<span className="text-lg text-red-700">¥{TranAmt}</span>&nbsp;</div>
          <section className="flex flex-col items-center justify-center bg-gray-100 h-96">
            <div className="z-20 bg-gray-800 rounded-lg w-60 h-60 bg-opacity-90"></div>
            <div className="absolute z-30">
              <QRCode value={state.codeUrl} renderAs="svg" size={200} imageSettings={{ src: 'https://static.zpao.com/favicon.png', height: 50, width: 50, excavate: true }}></QRCode>
            </div>
            <div className="absolute z-10 flex items-center justify-center h-12 text-center text-red-500 bg-gray-300 w-60">二维码已过期</div>
          </section>
          {/* <button className={props.className || style.btn}></button> */}
        {/* <div>{getUrl(state)}</div> */}
        <div>{state.codeUrl}</div>
        <div className="m-2 text-sm text-center text-gray-700">请您在&nbsp;<span className="text-green-700">{second}秒</span>&nbsp;内完成支付，否则订单会被自动取消</div>
      </div>
  </LayoutNoCar>
}

export default qrCode
