import type {NextPage} from 'next'
import Layout from '../components/layout'

const liquRepo:NextPage=()=>{
  return <div className='flex'>
   <Layout>
     <div>
       <form>
         <fieldset>
           <div className='mb-4'>
             <label className='text-white pr-4 font-bold'>教育机构:</label>
             <input className='rounded-sm'></input>
           </div>
           <div className='mb-4'>
             <label className='text-white pr-4 font-bold'>交易日期:</label>
             <input className='rounded-sm'></input>
           </div>
           <div className=''>
             <a className='text-white pr-4 font-bold bg-blue-500 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-700'>查询</a>
           </div>
         </fieldset>
       </form>
     </div>
     <div>
       <table className='mt-4'>
        <thead>
          <tr className='text-white '>
            <th className='border border-gray-500 px-4 py-2  font-bold text-left'>教育机构名称</th>
            <th className='border border-gray-500 px-4 py-2  font-bold text-left'>项目名称</th>
            <th className='border border-gray-500 px-4 py-2  font-bold text-left'>教育机构订单号</th>
            <th className='border border-gray-500 px-4 py-2  font-bold text-left'>支付渠道交易流水号</th>
            <th className='border border-gray-500 px-4 py-2  font-bold text-left'>支付渠道交易日期</th>
            <th className='border border-gray-500 px-4 py-2  font-bold text-left'>支付渠道交易时间</th>
            <th className='border border-gray-500 px-4 py-2  font-bold text-left'>交易金额（单位分）</th>
            <th className='border border-gray-500 px-4 py-2  font-bold text-left'>操作</th>
          </tr>
        </thead>
        <tbody className='text-gray-800'>
          <tr className='bg-gray-200 border'>
            <td className='border border-gray-500 p-2 text-left'>灵纳教育培训机构</td>
            <td className='border border-gray-500 p-2 text-left'>英语兴趣培养</td>
            <td className='border border-gray-500 p-2 text-left'>191919119191919</td>
            <td className='border border-gray-500 p-2 text-left'>222222222222</td>
            <td className='border border-gray-500 p-2 text-left'>2021.12.14</td>
            <td className='border border-gray-500 p-2 text-left'>09:20:15</td>
            <td className='border border-gray-500 p-2 text-left'>10000</td>
            <td className='border border-gray-500 p-2 text-left'>
              <button>撤销</button>
              <button>完成</button>
              <button>详情</button>
            </td>
          </tr>
          <tr className='bg-white border '>
            <td className='border border-gray-500 p-2 text-left'>灵纳教育培训机构</td>
            <td className='border border-gray-500 p-2 text-left'>英语兴趣培养</td>
            <td className='border border-gray-500 p-2 text-left'>191919119191919</td>
            <td className='border border-gray-500 p-2 text-left'>222222222222</td>
            <td className='border border-gray-500 p-2 text-left'>2021.12.14</td>
            <td className='border border-gray-500 p-2 text-left'>09:20:15</td>
            <td className='border border-gray-500 p-2 text-left'>10000</td>
            <td className='border border-gray-500 p-2 text-left'>
              <button>撤销</button>
              <button>完成</button>
              <button>详情</button>
              <button></button>
            </td>
          </tr>
        </tbody>
       </table>
     </div>
   </Layout>
  </div>

}
export default liquRepo