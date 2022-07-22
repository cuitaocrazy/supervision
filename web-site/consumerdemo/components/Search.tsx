import { FC } from 'react'

interface searchProps{
  setQueryStr:Function,
  onQuery:Function
}
{/* 搜索框 */ }
const Search:FC<searchProps> = (props) => {
  const {setQueryStr,onQuery} = props 
  const onSubmit = (e)=>{
    e.preventDefault();
    onQuery()
  } 
  return (
    <form onSubmit={onSubmit}>
      <div className='fixed left-0 right-0 pb-2 mt-3 bg-white'>
        <div className="flex pt-3 font-mono text-xs ">
          <input type="text" 
            className="flex items-center justify-center h-8 pl-4 ml-3 text-sm text-gray-300 border border-gray-400 shadow-lg rounded-l-3xl grow focus:outline-none focus:glow-primary-600"
            placeholder="请输入搜索关键词" x-model="search" 
            onChange={e =>
              setQueryStr(e.target.value)
            }
            />
          <button type="submit"    
                  className="flex items-center justify-center flex-none h-8 mr-3 bg-primary-600 rounded-r-3xl w-14 focus:outline-none hover:bg-primary-700 ">
            <svg className="w-5 h-5 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  )
}

export default Search