import { FC } from "react";

console.log('yyyy')
const Layout:FC=(props:any)=>{
  return (
    <div className="flex w-full bg-primary-600">
      <main className="w-screen min-h-screen pt-20">{props.children}</main>
    </div>
  )
}
export default Layout