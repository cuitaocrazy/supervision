import type { NextPage } from 'next'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

type FormData = {
  school: string;
  class: string;
  name: string;
  amt: number
}

const CreateOrder: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const router = useRouter()
  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    router.push('/qrCode')
  }

  return <div className="flex items-center justify-center w-full h-screen bg-primary-50">
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 m-4 bg-white rounded shadow-2xl w-80 md:w-3/5 lg:w-1/2 xl:w-2/5 ">
      <fieldset>
        <legend className="block w-full text-3xl font-bold tracking-wider text-center text-gray-800">学生缴费页面</legend>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-sm font-bold tracking-wider">机构</label>
          <input className="relative w-full px-3 py-2 text-sm bg-white border rounded-lg text-grey-800 focus:outline-none focus:glow-secondary-500"
          // eslint-disable-next-line no-control-regex
          type="text" {...register('school', { required: true, minLength: 2, maxLength: 10, pattern: /[^/+\x00-\xff]$/ })} placeholder="请输入机构名称" />
          {errors.school && <p className="pt-2 pl-3 text-sm text-red-500 ">至少输入2个汉字</p>}
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-sm font-bold tracking-wider">科目</label>
          <input className="relative w-full px-3 py-2 text-sm bg-white border rounded-lg text-grey-800 focus:outline-none focus:glow-secondary-500"
          // eslint-disable-next-line no-control-regex
          type="text" {...register('class', { required: true, minLength: 2, maxLength: 10, pattern: /[^/+\x00-\xff]$/ })} placeholder="请输入科目名称" />
          {errors.class && <p className="pt-2 pl-3 text-sm text-red-500">至少输入2个汉字</p>}
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-sm font-bold tracking-wider">姓名</label>
          <input className="relative w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none text-grey-800 focus:glow-secondary-500"
          // eslint-disable-next-line no-control-regex
          type="text" {...register('name', { required: true, minLength: 2, maxLength: 10, pattern: /[^/+\x00-\xff]$/ })} placeholder="请输入姓名" />
          {errors.name && <p className="pt-2 pl-3 text-sm text-red-500">至少输入2个汉字</p>}
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-sm font-bold tracking-wider">金额</label>
          <input className="relative w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none text-grey-800 focus:glow-secondary-500"
          type="text" {...register('amt', { required: true, pattern: /^([1-9]\d*\.\d*|0\.\d*[1-9]\d*)|(-?[1-9]\d*)$/ })} placeholder="请输入金额" />
          {errors.amt && <p className="pt-2 pl-3 text-sm text-red-500">金额不可为空，请输入整数或小数</p>}
        </div>
      </fieldset>
      <input className="block w-full p-3 mx-auto mt-8 text-sm font-medium text-white rounded bg-secondary-500 hover:bg-secondary-700" type="submit" value="缴费" />
    </form>
  </div>
}

export default CreateOrder
