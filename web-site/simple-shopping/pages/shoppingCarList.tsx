import type { NextPage } from 'next'
import Layout from '@/components/layout'
import ShoppingCar from '@/components/ShoppingCar'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
// import { increment } from '@/features/order-cart/counterSlice'
// import { useReducer } from 'react'

type FormData = {
  isChecked: boolean
}

const ShoppingCarList: NextPage = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const router = useRouter()
  // const [state, dispatch] = useReducer(appendReducer, 0)

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    router.push('/qrCode')
  }
  useEffect(() => {
    reqQrCode()
  })

  // 向后台发送要够买的课程数据
  function saveDate (): void {
    fetch('http://localhost:3000/Subscribe', {
      method: 'POST',
      body: JSON.stringify({
        USVOrgID: '00001',
        USVItemID: '0001',
        USVItemName: '哈佛学霸培养计划',
        USVItemDesc: '共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典，50-60课.共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典，50-60课.',
        PayerRemark: '畅畅的学费-哈佛学霸',
        TranAmt: '100000',
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
  }

  // 请求二维码链接
  function reqQrCode ():any {
    fetch('http://localhost:3000/preOrder')
      .then((response) => response.json())
      .then((json) => console.log(json))
  }

  return <Layout title="购物车" >
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 py-6 m-auto max-w-7xl">
      <ShoppingCar image="102.jpeg" title="哈佛学霸养成计划——培养孩子超强学习力" amt={1000} {...register('isChecked')} />
      <ShoppingCar image="102.jpeg" title="哈佛学霸养成计划——培养孩子超强学习力" amt={1000} {...register('isChecked')} />
      <ShoppingCar image="102.jpeg" title="哈佛学霸养成计划——培养孩子超强学习力" amt={1000} {...register('isChecked')} />
      <ShoppingCar image="102.jpeg" title="哈佛学霸养成计划——培养孩子超强学习力" amt={1000} {...register('isChecked')} />
      <ShoppingCar image="102.jpeg" title="哈佛学霸养成计划——培养孩子超强学习力" amt={1000} {...register('isChecked')} />
      <input type="submit" value="立即支付" className="py-3 my-10 text-sm font-medium text-white rounded-md shadow-md mx-80 bg-secondary-500 focus:outline-none hover:bg-secondary-700 hover:shadow-none"
      onClick={() => {
        saveDate()
      }}></input>
    </form>
  </Layout>
}

export default ShoppingCarList
