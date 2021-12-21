import type {NextPage} from 'next'
import Layout from '../components/layout'
import Paging from '../components/paging'
import DatePicker from '../components/DatePicker'
// import Datepicker from '@themesberg/tailwind-datepicker/Datepicker'
import React,{useState} from 'react'

// 清算流水交易查询页面
const liquRepo:NextPage=()=>{
  return <div className='flex'>
   <Layout>
       <form>
         <fieldset className='flex flex-row justify-around gap-x-6'>
           <div className="relative inline-flex">
            <label className='pt-2 pr-4 font-bold text-white'>交易日期:</label>
            <div className='mb-4 rounded-md'>
              <DatePicker />
            </div>
           </div>
           <div className="relative inline-flex">
           <svg className="absolute top-0 right-0 w-2 h-2 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
            <label className='pt-2 pr-4 font-bold text-white'>教育机构:</label>
            <select className="h-10 pl-5 pr-10 text-gray-600 bg-white border border-gray-300 rounded-md appearance-none hover:border-primary-400 focus:outline-none">
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
             <a className='p-3 px-3 font-bold text-white rounded-md cursor-pointer bg-secondary-500 hover:bg-blue-700'>查询</a>
           </div>
         </fieldset>
       </form>
     <div className="flex justify-center">
       <table className='mt-4 ml-2'>
        <thead>
          <tr className='text-white '>
            <th className='px-4 py-2 font-bold text-center border border-gray-500'>教育机构名称</th>
            <th className='px-4 py-2 font-bold text-center border border-gray-500'>项目名称</th>
            <th className='px-4 py-2 font-bold text-center border border-gray-500'>教育机构订单号</th>
            <th className='px-4 py-2 font-bold text-center border border-gray-500'>支付渠道交易流水号</th>
            <th className='px-4 py-2 font-bold text-center border border-gray-500'>支付渠道交易日期</th>
            <th className='px-4 py-2 font-bold text-center border border-gray-500'>支付渠道交易时间</th>
            <th className='px-4 py-2 font-bold text-center border border-gray-500'>交易金额（单位分）</th>
            <th className='px-4 py-2 font-bold text-center border border-gray-500'>操作</th>
          </tr>
        </thead>
        <tbody className='text-gray-800'>
          <tr className='bg-gray-200'>
            <td className='p-2 text-center border border-gray-500'>灵纳教育培训机构</td>
            <td className='p-2 text-center border border-gray-500'>英语兴趣培养</td>
            <td className='p-2 text-center border border-gray-500'>191919119191919</td>
            <td className='p-2 text-center border border-gray-500'>222222222222</td>
            <td className='p-2 text-center border border-gray-500'>2021.12.14</td>
            <td className='p-2 text-center border border-gray-500'>09:20:15</td>
            <td className='p-2 text-center border border-gray-500'>10000</td>
            <td className='flex p-2 text-center border-b border-r border-gray-500 gap-x-3'>
              <button className='p-1 px-2 text-white rounded-md bg-secondary-500 hover:bg-blue-700 hover:shadow-md'>撤销</button>
              <button className='p-1 px-2 text-white rounded-md bg-secondary-500 hover:bg-blue-700 hover:shadow-md'>完成</button>
              <button className='p-1 px-2 text-white rounded-md bg-secondary-500 hover:bg-blue-700 hover:shadow-md'>详情</button>
            </td>
          </tr>
          <tr className='bg-white'>
            <td className='p-2 text-center border border-gray-500'>灵纳教育培训机构</td>
            <td className='p-2 text-center border border-gray-500'>英语兴趣培养</td>
            <td className='p-2 text-center border border-gray-500'>191919119191919</td>
            <td className='p-2 text-center border border-gray-500'>222222222222</td>
            <td className='p-2 text-center border border-gray-500'>2021.12.14</td>
            <td className='p-2 text-center border border-gray-500'>09:20:15</td>
            <td className='p-2 text-center border border-gray-500'>10000</td>
            <td className='flex p-2 text-center border-r border-gray-500 gap-x-3'>
              <button className='p-1 px-2 text-white rounded-md bg-secondary-500 hover:bg-blue-700 hover:shadow-md'>撤销</button>
              <button className='p-1 px-2 text-white rounded-md bg-secondary-500 hover:bg-blue-700 hover:shadow-md'>完成</button>
              <button className='p-1 px-2 text-white rounded-md bg-secondary-500 hover:bg-blue-700 hover:shadow-md'>详情</button>
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