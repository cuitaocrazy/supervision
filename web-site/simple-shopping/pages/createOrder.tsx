import Button from "../components/Button"
import type { NextPage } from 'next'
import { useForm } from "react-hook-form";
import orderStyles from './CreateOrder.module.css'

const CreateOrder: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data: any) => console.log(data)

  return <div className="flex items-center justify-center w-full bg-green-100">
    <div className="w-1/2 p-8 m-4 bg-white rounded shadow-2xl">
      <h1 className="block w-full text-2xl font-bold text-center text-gray-800">学生缴费页面</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-lg font-bold ">学校</label>
          <input className="px-3 py-2 border text-grey-800" type="text"  {...register('school', { required: true })} placeholder="请输入学校信名称" />
          {errors.school && <p>school is required.</p>}
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-lg font-bold ">班级</label>
          <input className="px-3 py-2 border text-grey-800" type="text" {...register('class', { required: true })} placeholder="请输入班级名称" />
          {errors.class && <p>class is required.</p>}
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-lg font-bold ">姓名</label>
          <input className="px-3 py-2 border text-grey-800" type="text" {...register('name', { required: true })} placeholder="请输入姓名" />
          {errors.name && <p>name is required.</p>}
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-lg font-bold ">金额</label>
          <input className="px-3 py-2 border text-grey-800" type="text" {...register('amt', { required: true })} placeholder="请输入金额" />
          {errors.amt && <p>amt is required.</p>}
        </div>
        <input className="block p-3 mx-auto text-lg text-white bg-green-500 rounded hover:bg-green-600" type="submit" />
      </form>
    </div>
  </div>
}

export default CreateOrder