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
    <div className="grid grid-cols-1 py-6 m-auto max-w-7xl">
      {state.carList.map((item, index) => {
        return <ShoppingCar key={index} keyIndex={index} image={item.image} title={item.USVItemDesc || ''} amt={item.TranAmt} setChosenLesson={setChosenLesson} onDelete={onDelete} order={item} />
      })}
      <input type="button" onClick={onSubmit} value="立即支付" className="py-3 my-10 text-sm font-medium text-white rounded-md shadow-md mx-80 bg-secondary-500 focus:outline-none hover:bg-secondary-700 hover:shadow-none"
      ></input>
      </div>
  </Layout>
}

export default ShoppingCarList
