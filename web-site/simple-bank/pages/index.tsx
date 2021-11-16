import type { NextPage } from 'next'

// 银行端的确认、取消按钮
const Pay: NextPage = () => {
  return <div className="flex flex-col pt-40">
    <form className="p-12 px-6 py-10 pt-4 mx-auto my-auto bg-white rounded-lg shadow-md border-primaryColor-300 w-80">
    <div className="text-lg text-center text-gray-800">您是否确认支付</div>
    <div className="flex flex-row gap-3">
      <input type="button" value="确定" className="w-full py-3 my-10 text-sm font-medium text-white bg-blue-500 rounded-md shadow-md focus:outline-none hover:bg-blue-700 hover:shadow-none" />
      <input type="button" value="取消" className="w-full py-3 my-10 text-sm font-medium text-white bg-blue-500 rounded-md shadow-md focus:outline-none hover:bg-blue-700 hover:shadow-none" />
    </div>
    </form>
  </div>
}

export default Pay
