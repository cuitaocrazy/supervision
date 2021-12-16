import type {NextPage} from 'next'
import Layout from '../components/layout'
import Cander from '../components/cander'
import Paging from '../components/paging'

// 清算流水交易查询页面
const liquRepo:NextPage=()=>{
  return <div className='flex'>
   <Layout>
       <form>
         <fieldset className='flex flex-row gap-x-6 justify-around'>
           <div className='mb-4'>
             <label className='text-white pr-4 font-bold'>交易日期:</label>
             <input className='rounded-md p-2 focus:outline-none text-gray-800'></input>
             {/* <Cander /> */}
           </div>
           <div className="relative inline-flex">
            <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
            <label className='text-white pr-4 font-bold pt-2'>教育机构:</label>
            <select className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-primary-400 focus:outline-none appearance-none">
              <option>--请选择教育机构--</option>
              <option>灵纳教育</option>
              <option>呱呱龙</option>
              <option>火花思维</option>
              <option>斑马英语</option>
              <option>常青藤爸爸</option>
              <option>宝宝玩英语</option>
            </select>
          </div>
           <div className='mt-1'>
             <a className='p-3 px-3 text-white font-bold bg-secondary-500 rounded-md cursor-pointer hover:bg-blue-700'>查询</a>
           </div>
         </fieldset>
       </form>
     <div className="flex justify-center">
       <table className='mt-4 ml-2'>
        <thead>
          <tr className='text-white '>
            <th className='border border-gray-500 px-4 py-2  font-bold text-center'>教育机构名称</th>
            <th className='border border-gray-500 px-4 py-2  font-bold text-center'>项目名称</th>
            <th className='border border-gray-500 px-4 py-2  font-bold text-center'>教育机构订单号</th>
            <th className='border border-gray-500 px-4 py-2  font-bold text-center'>支付渠道交易流水号</th>
            <th className='border border-gray-500 px-4 py-2  font-bold text-center'>支付渠道交易日期</th>
            <th className='border border-gray-500 px-4 py-2  font-bold text-center'>支付渠道交易时间</th>
            <th className='border border-gray-500 px-4 py-2  font-bold text-center'>交易金额（单位分）</th>
            <th className='border border-gray-500 px-4 py-2  font-bold text-center'>操作</th>
          </tr>
        </thead>
        <tbody className='text-gray-800'>
          <tr className='bg-gray-200'>
            <td className='border border-gray-500 p-2 text-center'>灵纳教育培训机构</td>
            <td className='border border-gray-500 p-2 text-center'>英语兴趣培养</td>
            <td className='border border-gray-500 p-2 text-center'>191919119191919</td>
            <td className='border border-gray-500 p-2 text-center'>222222222222</td>
            <td className='border border-gray-500 p-2 text-center'>2021.12.14</td>
            <td className='border border-gray-500 p-2 text-center'>09:20:15</td>
            <td className='border border-gray-500 p-2 text-center'>10000</td>
            <td className='border-r border-b border-gray-500 p-2 text-center flex gap-x-3'>
              <button className='text-white bg-secondary-500 rounded-md p-1 px-2 hover:bg-blue-700 hover:shadow-md'>撤销</button>
              <button className='text-white bg-secondary-500 rounded-md p-1 px-2 hover:bg-blue-700 hover:shadow-md'>完成</button>
              <button className='text-white bg-secondary-500 rounded-md p-1 px-2 hover:bg-blue-700 hover:shadow-md'>详情</button>
            </td>
          </tr>
          <tr className='bg-white'>
            <td className='border border-gray-500 p-2 text-center'>灵纳教育培训机构</td>
            <td className='border border-gray-500 p-2 text-center'>英语兴趣培养</td>
            <td className='border border-gray-500 p-2 text-center'>191919119191919</td>
            <td className='border border-gray-500 p-2 text-center'>222222222222</td>
            <td className='border border-gray-500 p-2 text-center'>2021.12.14</td>
            <td className='border border-gray-500 p-2 text-center'>09:20:15</td>
            <td className='border border-gray-500 p-2 text-center'>10000</td>
            <td className='border-r border-gray-500 p-2 text-center flex gap-x-3'>
              <button className='text-white bg-secondary-500 rounded-md p-1 px-2 hover:bg-blue-700 hover:shadow-md'>撤销</button>
              <button className='text-white bg-secondary-500 rounded-md p-1 px-2 hover:bg-blue-700 hover:shadow-md'>完成</button>
              <button className='text-white bg-secondary-500 rounded-md p-1 px-2 hover:bg-blue-700 hover:shadow-md'>详情</button>
            </td>
          </tr>
        </tbody>
       </table>
     </div>
     <div>
       <Paging></Paging>
     </div>
   </Layout>
  </div>

}
export default liquRepo