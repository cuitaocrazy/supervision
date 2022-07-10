

// 分页组件
const Paging =(props:{url:string,total:number,pagesize:number,page:number,onPageChange:Function})=>{
  const {url,total,pagesize,page,onPageChange} = props
  const totalPage = Math.ceil(total/pagesize)



  const onClick = (newPage:number)=>{
     const pagingUrl = url+'page='+newPage+'&size='+pagesize
     fetch(pagingUrl, {
      method: 'GET',
      // body: JSON.stringify({
        
      // }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      const { result, records } = json;
      if (result) onPageChange(records);
    })
  }
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-10">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          上一页
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          下一页
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            展示 <span className="font-medium">{page*pagesize+1}</span> 到 <span className="font-medium">{Math.min(page*pagesize+pagesize,total)}</span> 
            一共 <span className="font-medium">{total}</span> 条结果
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              onClick={()=>onClick(page-1)}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              {/* <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" /> */}
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            <a
              
              aria-current="page"
              className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {page+1}
            </a>
            <a
              hidden={page+1>totalPage?true:false}
              onClick={()=>onClick(page+1)}
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {page+2}
            </a>
            <a
              hidden={page+2>totalPage?true:false}
              onClick={()=>onClick(page+2)}
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              {page+3}
            </a>
            <span hidden={page+2>totalPage?true:false} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <a
              hidden={page+2>totalPage?true:false}
              onClick={()=>onClick(Math.min(page+10,totalPage))}
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {Math.min(page+11,totalPage+1)}
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
export default Paging