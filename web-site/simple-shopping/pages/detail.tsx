import type { NextPage } from 'next'
import Layout from '@/components/layout'
import { useAppDispatch } from '@/app/hook'
import { increment } from '@/features/order-cart/counterSlice'
import { useRouter } from 'next/router'
import { Order } from '@/types/types'

const Detail: NextPage = () => {
  const router = useRouter()
  const { item } = router.query
  let order : Order = { TranAmt: 0, image: '' }
  if (typeof item === 'string') {
    order = JSON.parse(item)
  }

  const dispatch = useAppDispatch()
  return <Layout title="详细信息">
    <div className="flex flex-col items-center justify-center p-8 bg-primary-100">
      <div className="md:w-full">
        <img src={order.image} className="w-full rounded-md" />
      </div>
      <div className="self-start md:w-full">
        <div className="mb-1 text-2xl text-red-500">¥{order.TranAmt}</div>
        <div className="mb-3 text-lg font-medium text-primary-800">{order.USVItemName}</div>
        <div className="mb-5 text-base leading-6 text-primary-500">{order.USVItemDesc}</div>
        <a className="px-3 py-3 text-sm font-medium text-center text-white rounded-lg bg-secondary-500 hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-300"
           onClick={() => dispatch(increment({ payload: order }))}>
          加入购物车
        </a>
      </div>
    </div>
  </Layout>
}

export default Detail
