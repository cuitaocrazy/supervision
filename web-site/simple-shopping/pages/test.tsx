import type { NextPage } from 'next'
import Layout from '@/components/layout'
import Card from '@/components/Card'
import { useAppDispatch } from '@/app/hook'
import { increment } from '@/features/order-cart/counterSlice'
// import { Order } from '../types/types'
import { Order } from '@/types/types'

// type Order ={
//   USVOrgID?: string,
//   USVItemID?: string,
//   USVItemName?: string,
//   USVItemDesc?: string,
//   PayerRemark?: string,
//   TranAmt: number,
//   image:string
// }

const Test: NextPage = () => {
  const dispatch = useAppDispatch()

  const demoOrder : Order[] = [
    { USVOrgID: 'Edu1', USVItemID: 'Id1', USVItemName: '哈佛学霸养成计划', USVItemDesc: '哈佛学霸养成计划——培养孩子超强学习力', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id2', USVItemName: '实验课程', USVItemDesc: '实验课程', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id3', USVItemName: '3-8岁兴趣英语课程', USVItemDesc: '3-8岁兴趣英语课程', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id4', USVItemName: '体能运动课程', USVItemDesc: '体能运动课程', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id5', USVItemName: '篮球课程', USVItemDesc: '篮球课程', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id6', USVItemName: '美术课程', USVItemDesc: '美术课程', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id7', USVItemName: '奥尔夫音乐课程', USVItemDesc: '奥尔夫音乐课程', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id8', USVItemName: '早教认知课程', USVItemDesc: '早教认知课程', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id9', USVItemName: '机器人编程课程', USVItemDesc: '机器人编程课程', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id10', USVItemName: '戏剧表演课程', USVItemDesc: '戏剧表演课程', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id11', USVItemName: '非洲鼓课程', USVItemDesc: '非洲鼓课程', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id12', USVItemName: '钢琴课程', USVItemDesc: '钢琴课程', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id13', USVItemName: '古筝课程', USVItemDesc: '古筝课程', TranAmt: 100, image: '1.jpeg' },
  ]

  return <Layout title="测试">
    <div className="grid col-span-4 py-6 m-auto xl:grid-cols-3 lg:grid-cols-2 max-w-7xl">
      {demoOrder.map((item, index) => {
        return <Card key={index} item = {item} image={item.image} title={item.USVItemName || ''} descript={item.USVItemDesc || ''} amt={item.TranAmt} onAdd={ () => dispatch(increment({ payload: item }))}/>
      })}
    </div>
  </Layout>
}

export default Test
