import useAxios from 'axios-hooks'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [{ data, loading, error }, refetch] = useAxios(
    '/api/hello'
  )

  return <div>
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={() => refetch()}
    >
      Refresh
    </button>
    {/* <Button name="test" /> */}
    <div className="bg-gray-500 text-white">{
      loading ? "Loading..." : `Hello World!${data.name}`
    }</div>
  </div>
}

export default Home
