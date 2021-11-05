import type { NextPage } from 'next'
import Layout from '@/components/layout'
import Card from '@/components/Card'
import { useAppDispatch } from '@/app/hook'
import { increment } from '@/features/order-cart/counterSlice'

const Test: NextPage = () => {
  const dispatch = useAppDispatch()
  return <Layout title="测试">
    <div className="grid col-span-4 py-6 m-auto xl:grid-cols-3 lg:grid-cols-2 max-w-7xl">
      <Card key="123" image="1.jpeg" title="哈佛学霸养成计划" descript="共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典" amt={1} onAdd={ () => dispatch(increment())}/>
      <Card key="123" image="1.jpeg" title="实验课程" descript="共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典" amt={1} onAdd={ () => dispatch(increment())}/>
      <Card key="123" image="1.jpeg" title="3-8岁兴趣英语课程" descript="共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典" amt={1} onAdd={ () => dispatch(increment())}/>
      <Card key="123" image="1.jpeg" title="体能运动课程" descript="共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典" amt={1} onAdd={ () => dispatch(increment())}/>
      <Card key="123" image="1.jpeg" title="篮球课程" descript="共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典" amt={1} onAdd={ () => dispatch(increment())}/>
      <Card key="123" image="1.jpeg" title="美术课程" descript="共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典" amt={1} onAdd={ () => dispatch(increment())}/>
      <Card key="123" image="1.jpeg" title="奥尔夫音乐课程" descript="共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典" amt={1} onAdd={ () => dispatch(increment())}/>
      <Card key="123" image="1.jpeg" title="早教认知课程" descript="共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典" amt={1} onAdd={ () => dispatch(increment())}/>
      <Card key="123" image="1.jpeg" title="机器人编程课程" descript="共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典" amt={1} onAdd={ () => dispatch(increment())}/>
      <Card key="123" image="1.jpeg" title="戏剧表演课程" descript="共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典" amt={1} onAdd={ () => dispatch(increment())}/>
      <Card key="123" image="1.jpeg" title="非洲鼓课程" descript="共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典" amt={1} onAdd={ () => dispatch(increment())}/>
      <Card key="123" image="1.jpeg" title="钢琴课程" descript="共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典" amt={1} onAdd={ () => dispatch(increment())}/>
      <Card key="123" image="1.jpeg" title="古筝课程" descript="共包含四个课程：哈佛学霸养成计划，哈佛学霸学习力之道，哈佛学霸学习力之术，哈佛学霸的学科启蒙应试宝典" amt={1} onAdd={ () => dispatch(increment())}/>
    </div>
  </Layout>
}

export default Test
