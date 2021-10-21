import type { NextPage } from 'next'
import Layout from '../components/layout'
import ShoppingCar from '../components/ShoppingCar'

const ShoppingCarList: NextPage = () => {
  return <Layout title="购物车">
    <ShoppingCar image="102.jpeg" title="哈佛学霸养成计划——培养孩子超强学习力" amt={1000} />
    <ShoppingCar image="102.jpeg" title="哈佛学霸养成计划——培养孩子超强学习力" amt={1000} />
    <ShoppingCar image="102.jpeg" title="哈佛学霸养成计划——培养孩子超强学习力" amt={1000} />
    <ShoppingCar image="102.jpeg" title="哈佛学霸养成计划——培养孩子超强学习力" amt={1000} />
    <ShoppingCar image="102.jpeg" title="哈佛学霸养成计划——培养孩子超强学习力" amt={1000} />
    <input type="button" value="立即支付" className="w-full py-3 my-10 text-sm font-medium text-white rounded-md shadow-md mx-80 bg-secondary-500 focus:outline-none hover:bg-secondary-700 hover:shadow-none"></input>
  </Layout>
}
export default ShoppingCarList
