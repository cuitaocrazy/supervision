import type { NextPage } from 'next'
import Layout from '../components/layout'
import Card from '../components/Card'

const Test: NextPage = () => {
  return <Layout title="测试">
    <div className="grid grid-cols-3 py-6 m-auto max-w-7xl">
      <Card key="123" image="1.jpeg" title="Test" descript="test descript" amt={1} onAdd={ () => alert('123')}/>
    </div>
  </Layout>
}

export default Test