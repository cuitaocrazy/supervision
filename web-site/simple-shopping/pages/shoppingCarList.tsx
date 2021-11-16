import type { NextPage } from 'next'
import Layout from '@/components/layout'
import ShoppingCar from '@/components/ShoppingCar'
// import { useForm, SubmitHandler } from 'react-hook-form'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'

type Order ={
  USVOrgID?: string,
  USVItemID?: string,
  USVItemName?: string,
  USVItemDesc?: string,
  PayerRemark?: string,
  TranAmt: number,
  image:string
}

const ShoppingCarList: NextPage = () => {
  const [chosenLesson, setChosenLesson] = useState<Order>({ TranAmt: 0, image: '' })
  const router = useRouter()
  const { carList } = router.query
  const onSubmit = () => {
    Router.push({
      pathname: '/qrCode',
      query: chosenLesson,
    })
  }
  console.log('aaaaa')
  console.log(carList)
  const demoShoppingList : Order[] = carList.map((item: string) => { return JSON.parse(item) })

  console.log(demoShoppingList)

  // 向后台发送要够买的课程数据

  return <Layout title="购物车" >
    {/* <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 py-6 m-auto max-w-7xl"> */}
    <div className="grid grid-cols-1 py-6 m-auto max-w-7xl">
      {demoShoppingList.map((item, index) => {
        return <ShoppingCar key={index} image={item.image} title={item.USVItemDesc || ''} amt={item.TranAmt} setChosenLesson={setChosenLesson} order={item} />
      })}

      <input type="button" onClick={onSubmit} value="立即支付" className="py-3 my-10 text-sm font-medium text-white rounded-md shadow-md mx-80 bg-secondary-500 focus:outline-none hover:bg-secondary-700 hover:shadow-none"
      ></input>
      </div>
  </Layout>
}

export default ShoppingCarList
