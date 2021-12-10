import type { NextPage } from 'next'
import Layout from '@/components/layout'
import Card from '@/components/Card'
import { useAppDispatch } from '@/app/hook'
import { increment } from '@/features/order-cart/counterSlice'
import { Order } from '@/types/types'

const Test: NextPage = () => {
  const dispatch = useAppDispatch()

  const demoOrder : Order[] = [
    { USVOrgID: 'Edu1', USVItemID: 'Id1', USVItemName: '哈佛学霸养成计划', USVItemDesc: '第一期 开始时间:2021-10-30 结束时间: 2022-10-30', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id2', USVItemName: '实验课程', USVItemDesc: '第二期 开始时间:2021-10-30 结束时间: 2022-10-30', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id3', USVItemName: '3-8岁兴趣英语课程', USVItemDesc: '第三期 开始时间:2021-10-30 结束时间: 2022-10-30', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id4', USVItemName: '体能运动课程', USVItemDesc: '第四期 开始时间:2021-10-30 结束时间: 2022-10-30', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id5', USVItemName: '篮球课程', USVItemDesc: '第五期 开始时间:2021-10-30 结束时间: 2022-10-30', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id6', USVItemName: '美术课程', USVItemDesc: '第六期 开始时间:2021-10-30 结束时间: 2022-10-30', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id7', USVItemName: '奥尔夫音乐课程', USVItemDesc: '第七期 开始时间:2021-10-30 结束时间: 2022-10-30', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id8', USVItemName: '早教认知课程', USVItemDesc: ' 第八期 开始时间:2021-10-30 结束时间: 2022-10-30', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id9', USVItemName: '机器人编程课程', USVItemDesc: '第九期 开始时间:2021-10-30 结束时间: 2022-10-30', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id10', USVItemName: '戏剧表演课程', USVItemDesc: '第十期 开始时间:2021-10-30 结束时间: 2022-10-30', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id11', USVItemName: '非洲鼓课程', USVItemDesc: '第十一期 开始时间:2021-10-30 结束时间: 2022-10-30', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id12', USVItemName: '钢琴课程', USVItemDesc: '第十二期 开始时间:2021-10-30 结束时间: 2022-10-30', TranAmt: 100, image: '1.jpeg' },
    { USVOrgID: 'Edu1', USVItemID: 'Id13', USVItemName: '古筝课程', USVItemDesc: '第十三期 开始时间:2021-10-30 结束时间: 2022-10-30', TranAmt: 100, image: '1.jpeg' },
  ]

  return <Layout title="测试">
    <div className="grid col-span-4 py-16 m-auto xl:grid-cols-3 lg:grid-cols-2 max-w-7xl">
      {demoOrder.map((item, index) => {
        return <Card key={index} item = {item} image={item.image} title={item.USVItemName || ''} descript={item.USVItemDesc || ''} amt={item.TranAmt} onAdd={ () => dispatch(increment({ payload: item }))}/>
      })}
    </div>
  </Layout>
}

export default Test
