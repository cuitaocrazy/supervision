import type { NextPage } from 'next'
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/router'


type FormData = {
  username: string;
  password: string;
}

const Login: NextPage = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>()
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    saveLoginData();
  }

  //TODO 保存数据
  function saveLoginData(): void {

  }

  function isVerify(): void {


  }

    // return <div className="flex flex-col h-screen bg-green-100 dark:bg-red-100">
    //   <div className="grid mx-2 my-20 place-items-center sm:my-auto">
    //     <div className="w-11/12 p-12 px-6 py-10 bg-white rounded-lg shadow-md sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 sm:px-10 sm:py-6 lg:shadow-lg">
    //       <h2 className="text-3xl font-semibold text-center text-gray-800 lg:text-4xl">登录</h2>
    //       <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
    //         <label className="block text-xs font-semibold text-gray-600">用户名</label>
    //         <input className="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
    //           type="text"  {...register('username', { required: true, minLength: 2, maxLength: 10 },)} placeholder="请输入用户名" />
    //         {errors.username && <p className="pt-2 pl-3 text-base text-red-500">用户名不能为空</p>}

    //         <label className="block mt-2 text-xs font-semibold text-gray-600">密码</label>
    //         <input className="block w-full px-1 py-3 mt-2 mb-4 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
    //           type="password" {...register('password', { required: true, minLength: 6, maxLength: 6 })} placeholder="请输入密码" />
    //         {errors.password && <p className="">密码不能为空</p>}

    //         <input className="w-full py-3 mt-10 font-medium text-white bg-green-300 rounded-md focus:outline-none hover:bg-green-500 hover:shadow-none"
    //           type="submit" value="登录"  />
    //       </form>
    //     </div>
    //   </div>
    // </div>

  return <div className="flex h-screen bg-green-100 ">
    <form onSubmit={handleSubmit(onSubmit)} className="w-11/12 p-12 px-6 py-10 pt-4 mx-auto my-auto bg-white rounded-lg shadow-md h-3/4 sm:w-1/2 md:w-2/5 xl:w-1/3 2xl:w-1/4 ">
      <fieldset >
        <legend className="mb-4 text-3xl font-semibold text-center text-gray-800">登录</legend>
        <div>
          <label className="block text-xs font-semibold text-gray-600">用户名</label>
          <input type="text" className="block w-full px-1 py-3 text-gray-800 border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 " {...register('username', { required: true},)} placeholder="请输入用户名"/>
          {errors.username && <p className="pt-2 pl-3 text-base text-red-500">用户名不能为空</p>}
        </div>
        <div className="mt-2">
          <label className="block text-xs font-semibold text-gray-600">密码</label>
          <input type="text" className="block w-full px-1 py-3 text-gray-800 border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 " {...register('password', { required: true})} placeholder="请输入密码" />
          {errors.password && <p className="pt-2 pl-3 text-base text-red-500">密码不能为空</p>}
        </div>
      </fieldset>
      <input type="submit" className="w-full py-3 my-10 font-medium text-white bg-green-300 rounded-md shadow-md focus:outline-none hover:bg-green-500 hover:shadow-none" value="登录" />
    </form>
  </div>
   }

  

  export default Login