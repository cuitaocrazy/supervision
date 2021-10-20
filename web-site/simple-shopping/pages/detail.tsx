import type { NextPage } from 'next'
import Layout from '../components/layout'
import { useAppDispatch } from '../app/hook'
import { increment } from '../features/order-cart/counterSlice'

const Detail: NextPage = () => {
  const dispatch = useAppDispatch()
  return <Layout title="详细信息">
    <div className="bg-primary-100">
      <div className="">
        <img src="101.jpeg" className="w-full" />
      </div>
      <div className="p-5">
        <div className="mb-1 text-2xl text-red-500">¥199.00</div>
        <div className="mb-3 text-lg font-medium text-primary-800">哈佛学霸养成计划——培养孩子超强学习力</div>
        <div className="mb-3 text-base leading-6 text-primary-500">共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典，50-60课.共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典，50-60课.共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典，50-60课.共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典，50-60课.共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典，50-60课</div>
        <a className="px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-secondary-500 hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-300"
           onClick={() => dispatch(increment())}>
          加入购物车
        </a>
      </div>
      <img src="101.jpeg" className="w-full"/>
      <img src="102.jpeg" className="w-full"/>
      <img src="103.jpeg" className="w-full"/>
      <img src="104.jpeg" className="w-full"/>
    </div>
  </Layout>
}

export default Detail
