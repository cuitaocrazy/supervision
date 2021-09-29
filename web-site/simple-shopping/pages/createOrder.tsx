import Button from "../components/Button"
import type { NextPage } from 'next'
import { useForm,SubmitHandler } from "react-hook-form";
import orderStyles from './CreateOrder.module.css'
import { useState, useEffect } from 'react'

type FormData={
  school: string;
  class: string;
  name: string;
  amt: number
}

const CreateOrder: NextPage = () => {
  const { register, handleSubmit, formState: { errors },setValue } = useForm<FormData>()

  const onSubmit:SubmitHandler<FormData> = (data: FormData) => {
    saveData();
    alert(JSON.stringify(data))
  }
  
  //TODO 保存数据
  function saveData():void{
    
  }
   

  return <div className="flex items-center justify-center w-full h-screen bg-green-100">
    <div className="w-1/2 p-8 m-4 bg-white rounded shadow-2xl">
      <h1 className="block w-full text-2xl font-bold tracking-wider text-center text-gray-800">学生缴费页面</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-lg font-bold tracking-wider">学校</label>
          <input className="px-3 py-2 border text-grey-800" type="text"  {...register('school', { required: true, minLength: 2, maxLength: 10,pattern:/[^/+\x00-\xff]$/})} placeholder="请输入学校名称" />
          {errors.school && <p className="pt-2 pl-3 text-base text-red-500">至少输入2个汉字</p>}
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-lg font-bold tracking-wider">班级</label>
          <input className="px-3 py-2 border text-grey-800" type="text" {...register('class', { required: true, minLength: 2, maxLength: 10,pattern:/[^/+\x00-\xff]$/ })} placeholder="请输入班级名称" />
          {errors.class && <p className="pt-2 pl-3 text-base text-red-500">至少输入2个汉字</p>}
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-lg font-bold tracking-wider">姓名</label>
          <input className="px-3 py-2 border text-grey-800" type="text" {...register('name', { required: true,minLength: 2, maxLength: 10,pattern:/[^/+\x00-\xff]$/ })} placeholder="请输入姓名" />
          {errors.name && <p className="pt-2 pl-3 text-base text-red-500">至少输入2个汉字</p>}
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-lg font-bold tracking-wider">金额</label>
          <input className="px-3 py-2 border text-grey-800" type="text" {...register('amt', { required: true,pattern:/^([1-9]\d*\.\d*|0\.\d*[1-9]\d*)|(-?[1-9]\d*)$/ })} placeholder="请输入金额" />
          {errors.amt && <p className="pt-2 pl-3 text-base text-red-500"></p>}
        </div>
        <input className="block p-3 mx-auto text-lg text-white bg-green-500 rounded hover:bg-green-600" type="submit" />
      </form>
    </div>
  </div>
}

export default CreateOrder