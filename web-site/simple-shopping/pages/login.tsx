import type { NextPage } from 'next'
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/router'


type FormData = {
  username: string
  password: string
}

const Login: NextPage = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>()
  const router = useRouter()

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    saveLoginData()
  }

  //TODO 保存数据
  function saveLoginData(): void {

  }

  function isVerify(): void {


  }

  return <div className="flex h-screen bg-green-100">
  <form onSubmit={handleSubmit(onSubmit)} className="p-12 px-6 py-10 pt-4 mx-auto my-auto border-2 rounded-lg shadow-md border-primaryColor-300 w-80 bg-primaryColor-100">
    <fieldset >
      <legend className="mb-4 text-3xl font-semibold text-center text-gray-800">登录</legend>
      <div>
        <label className="block mb-2 text-xs font-semibold text-gray-600">用户名</label>
        <input type="text" className="block w-full px-1 py-3 border-2 rounded-md bg-primaryColor-50 border-primaryColor-200 focus:bg-gray-500 focus:ring-opacity-20 focus:border-secondaryColor-500 focus:ring-offset-blue-300 focus:ring-4"
          {...register('username', { required: true },)} placeholder="请输入用户名" />
        {errors.username && <p className="pt-2 pl-3 text-base text-errorColor-500">用户名不能为空</p>}
      </div>
      <div className="mt-6">
        <label className="block mb-2 text-xs font-semibold text-gray-600">密码</label>
        <input type="text" className="block w-full px-1 py-3 border-2 rounded-md bg-primaryColor-50 border-primaryColor-200 focus:bg-gray-500 focus:ring-opacity-20 focus:border-secondaryColor-500 focus:ring-offset-blue-300 focus:ring-4"
          {...register('password', { required: true })} placeholder="请输入密码" />
        {errors.password && <p className="pt-2 pl-3 text-base text-errorColor-500">密码不能为空</p>}
      </div>
    </fieldset>
    <input type="submit" className="w-full py-3 my-10 font-medium rounded-md shadow-md text-primaryColor-50 bg-secondaryColor-500 focus:outline-none hover:bg-secondaryColor-500 hover:shadow-none"
      value="登录" />
  </form>
</div>
}



export default Login