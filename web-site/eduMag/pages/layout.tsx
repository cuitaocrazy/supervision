import { FC } from "react";
import Router from 'next/router'

// 侧边栏菜单组件
console.log('aaaaaa')
const Layout:FC=(props:any)=>{
  return (
    <div className="flex bg-primary-600 w-full">
      <aside className="flex flex-col px-12 space-y-16 pt-16 mr-2 items-center justify-start rounded-tl-xl rounded-bl-xl bg-primary-800 shadow-lg">
        <div className="flex items-center justify-center">
          <h1 className="text-white font-black text-xl break-normal rounded-md p-2">监管机构管理端</h1>
        </div>
        <ul>
          <li className="text-white flex space-x-2 mt-2 px-2 py-2 hover:bg-white hover:text-secondary-800 font-medium hover:rounded-br-3xl  cursor-pointer">
            <a onClick={()=>{
              Router.push({pathname:'/userInfo',query:{}})
            }}>用户信息</a>
          </li>
          <li className="text-white flex space-x-2 mt-4 px-2 py-2 hover:bg-white hover:text-secondary-800 font-medium hover:rounded-br-3xl transition duration-100 cursor-pointer">
          <a onClick={()=>{
               Router.push({pathname:'/liquRepo',query:{}})
            }}>清算报表查询</a>
          </li>
        </ul>
      </aside>
      <main className="w-screen min-h-screen pt-20">{props.children}</main>
    </div>
  )
}
export default Layout