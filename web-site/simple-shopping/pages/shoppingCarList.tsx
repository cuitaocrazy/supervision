import type { NextPage } from 'next'
import Layout from '@/components/layout'
import ShoppingCar from '@/components/ShoppingCar'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'
import { Order } from '@/types/types'

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
        pathname: '/qrCode',
        query: state.chooseOrder,
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
  const onDelete = (delOrder:Order) => {
    const newCarList = state.carList
    for (let i = 0; i < newCarList.length; i++) {
      if (newCarList[i].USVItemID === delOrder.USVItemID) {
        newCarList.splice(i, 1)
        break
      }
    }
    setState({ ...state, ...{ carList: newCarList } })
  }

  // 向后台发送要够买的课程数据

  return <Layout title="购物车" >
    <div className="flex flex-col items-center max-w-full py-6 m-auto">
      {state.carList.map((item, index) => {
        return <ShoppingCar key={index} image={item.image} title={item.USVItemDesc || ''} amt={item.TranAmt} setChosenLesson={setChosenLesson} onDelete={onDelete} order={item} />
      })}
      <input type="button" onClick={onSubmit} value="立即支付" className="w-1/4 p-3 text-sm font-medium text-white rounded-md shadow-md bg-secondary-500 justify-self-center focus:outline-none hover:bg-secondary-700 hover:shadow-none"
      ></input>
      </div>
  </Layout>
}
export default ShoppingCarList
