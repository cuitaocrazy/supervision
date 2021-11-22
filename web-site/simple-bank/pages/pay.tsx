import type { NextPage } from 'next'
import router from 'next/router'
import Router, { useRouter } from 'next/router'
// 银行端的确认支付页面
const Pay: NextPage = () => {
  const payURL = 'http://localhost:3001/pay'
  const router = useRouter()
  const {BankTranID} = router.query
  const onclick = ()=>{
    fetch(payURL, {
      method: 'POST',
      body: JSON.stringify({
        BankTranID: BankTranID
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
      .then((json) => {
        alert(json.result==='FAIL'?'FAIL':'SUCCESS')
      })
  }

  
  return <div className="flex flex-col pt-40">
    <form className="p-12 px-6 py-10 pt-4 mx-auto my-auto bg-white border-gray-300 rounded-lg shadow-md w-80">
    <div className="pt-4 text-lg font-medium text-center text-gray-600">您是否确认支付</div>
    <div className="flex flex-row gap-3">
      <input type="button" value="确定" onClick = {onclick} className="w-full py-3 my-10 text-sm font-medium text-white bg-blue-500 rounded-md shadow-md focus:outline-none hover:bg-blue-700 hover:shadow-none" />
      <input type="button" value="取消" className="w-full py-3 my-10 text-sm font-medium text-white bg-blue-500 rounded-md shadow-md focus:outline-none hover:bg-blue-700 hover:shadow-none" />
    </div>
    </form>
  </div>
}

export default Pay
