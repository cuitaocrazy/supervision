import Button from "../components/Button"
import type { NextPage } from 'next'
import { useForm } from "react-hook-form";

const Test: NextPage = () => {
  const {register, handleSubmit, formState: { errors }} = useForm()

  const onSubmit = (data: any) => console.log(data)

  return <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('school', {required: true})} placeholder="学校" />
      {errors.school && <p>school is required.</p>}
      <input {...register('class', {required: true})} placeholder="班级" />
      {errors.class && <p>class is required.</p>}
      <input {...register('name', {required: true})} placeholder="姓名" />
      {errors.name && <p>name is required.</p>}
      <input {...register('amt', {required: true})} placeholder="金额" />
      {errors.amt && <p>amt is required.</p>}
      <input type="submit" />
    </form>
  </div>
}

export default Test