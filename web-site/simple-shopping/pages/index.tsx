import useAxios from 'axios-hooks'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [{ data, loading }, refetch] = useAxios(
    '/api/hello',
  )

  return <div>
    <button className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
      onClick={() => refetch()}
    >
      Refresh
    </button>
    {/* <Button name="test" /> */}
    <div className="text-white bg-gray-500">{
      loading ? 'Loading...' : `Hello World!${data.name}`
    }</div>
  </div>
}

export default Home
