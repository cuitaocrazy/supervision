import { NextPage } from "next";
import Layout from "../components/layout";

const userInfo:NextPage=()=>{
 return <div>
   <Layout>
     <div className="text-white">欢迎登录监管机构管理端</div>
     <hr className="text-white" />
     <label className="text-white">用户名：</label>
     <span className="text-white">administarator</span>
   </Layout>
 </div> 

}
export default userInfo