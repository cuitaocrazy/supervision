import type { NextPage } from 'next'
import Layout from '@/components/layout'
import ShoppingCar from '@/components/ShoppingCar'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'
import { Order } from '@/types/types'

const pathname = '/qrCode'
type State = {
  chooseOrder? : Order,
  carList : Order[]
}

// 购物车商品信息页面
const ShoppingCarList: NextPage = () => {
  const router = useRouter()
  const { carList } = router.query

  const onSubmit = () => {
    if (state.chooseOrder != null) {
      Router.push({
        pathname: pathname,
        query: state.chooseOrder as any,
      })
    } else {
      alert('请选择课程')
    }
  }
  let shoppingList : Order[] = []
  if (typeof carList === 'object') {
    shoppingList = carList.map((item: string) => { return JSON.parse(item) })
  } else if (typeof carList === 'string') {
    shoppingList.push(JSON.parse(carList))
  }

  const [state, setState] = useState<State>({ carList: shoppingList })
  const setChosenLesson = (chooseOrder:Order) => {
    setState({ ...state, ...{ chooseOrder: chooseOrder } })
  }

  const onDelete = (key:number) => {
    const newCarList = state.carList
    newCarList.splice(key, 1)
    setState({ ...state, ...{ carList: newCarList } })
  }

  // 向后台发送要够买的课程数据

  return <Layout title="购物车" >
    <div className="flex flex-col justify-center py-6 m-auto max-w-7xl">
      {state.carList.map((item, index) => {
        return <ShoppingCar key={index} keyIndex={index} image={item.image} title={item.USVItemDesc || ''} amt={item.TranAmt} setChosenLesson={setChosenLesson} onDelete={onDelete} order={item} />
      })}
      <div className='flex justify-center'>
      <input type="button" onClick={onSubmit} value="立即支付" className="flex justify-center w-1/3 py-3 my-10 text-sm font-medium text-white rounded-md shadow-md bg-secondary-500 focus:outline-none hover:bg-secondary-700 hover:shadow-none" />
      </div>
      </div>
  </Layout>
}

export default ShoppingCarList
