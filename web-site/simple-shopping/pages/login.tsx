import type { NextPage } from 'next'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

type FormData = {
  username: string
  password: string
}

const Login: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const router = useRouter()

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    saveLoginData()
    router.push('/createOrder')
  }

  // TODO 保存数据
  function saveLoginData (): void {

  }

  return <div className="flex h-screen bg-primary-50">
    <form onSubmit={handleSubmit(onSubmit)} className="p-12 px-6 py-10 pt-4 mx-auto my-auto bg-white rounded-lg shadow-md border-primaryColor-300 w-80">
      <fieldset>
        <legend className="mb-4 text-3xl font-semibold text-center text-gray-800">登录</legend>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-600">用户名</label>
          <input type="text" className="relative block w-full px-1 py-3 pl-4 text-sm bg-white border rounded-md border-primary-200 focus:outline-none focus:glow-secondary-500"
            {...register('username', { required: true })} placeholder="请输入用户名" />
          {errors.username && <p className="pt-2 pl-3 text-base text-error-400">用户名不能为空</p>}
        </div>
        <div className="mt-6">
          <label className="block mb-2 text-sm font-semibold text-gray-600">密码</label>
          <input type="text" className="relative block w-full px-1 py-3 pl-4 text-sm bg-white border rounded-md border-primary-200 focus:outline-none focus:glow-secondary-500"
            {...register('password', { required: true })} placeholder="请输入密码" />
          {errors.password && <p className="pt-2 pl-3 text-base text-error-400">密码不能为空</p>}
        </div>
      </fieldset>
      <input type="submit" className="w-full py-3 my-10 text-sm font-medium text-white rounded-md shadow-md bg-secondary-500 focus:outline-none hover:bg-secondary-700 hover:shadow-none"
        value="登录" />
    </form>
  </div>
}

export default Login
