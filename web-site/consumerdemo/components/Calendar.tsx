import React from 'react'

// 日历组件
const Calendar = () => {
  return <div className='flex items-start justify-start mx-2 mt-1'>
    <div className='flex flex-col w-full max-w-lg p-6 mx-auto bg-white shadow-xl rounded-2xl'>
      <div className="flex justify-center pb-2">
        <div className="-rotate-90 cursor-pointer">
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.001 6L6.00098 1L1.00098 6" stroke="black" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="px-3 py-2 text-sm font-semibold text-white rounded-md bg-secondary-300">2022/06</span>
        <div className="rotate-90 cursor-pointer">
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.001 6L6.00098 1L1.00098 6" stroke="black" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

      </div>
      <div className="flex justify-between pt-4 pb-2 text-xs font-medium uppercase border-t">

        <div className="flex items-center justify-center h-5 px-3 rounded-sm shadow-md w-14">
          日
        </div>


        <span className="flex items-center justify-center h-5 px-3 rounded-sm shadow-md w-14">
          一
        </span>


        <span className="flex items-center justify-center h-5 px-3 rounded-sm shadow-md w-14">
          二
        </span>


        <span className="flex items-center justify-center h-5 px-3 rounded-sm shadow-md w-14">
          三
        </span>


        <span className="flex items-center justify-center h-5 px-3 rounded-sm shadow-md w-14">
          四
        </span>


        <span className="flex items-center justify-center h-5 px-3 rounded-sm shadow-md w-14">
          五
        </span>


        <span className="flex items-center justify-center h-5 px-3 rounded-sm shadow-md w-14">
          六
        </span>

      </div>

      <div className="flex justify-between pb-2 text-sm font-medium">

        <span className="flex items-center justify-center px-1 text-gray-400 w-14">
          30
        </span>


        <span className="flex items-center justify-center px-1 text-gray-400 w-14">
          31
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          01
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          02
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          03
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          04
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          05
        </span>

      </div>
      <div className="flex justify-between pb-2 text-sm font-medium">

        <span className="flex items-center justify-center px-1 border cursor-pointer w-14">
          06
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          07
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          08
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          09
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          10
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          11
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          12
        </span>

      </div>

      <div className="flex justify-between pb-2 text-sm font-medium">

        <span className="flex items-center justify-center px-1 border cursor-pointer w-14">
          13
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          14
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          15
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          16
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          17
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          18
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          19
        </span>

      </div>

      <div className="flex justify-between pb-2 text-sm font-medium">

        <span className="flex items-center justify-center px-1 border cursor-pointer w-14">
          20
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          21
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          22
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          23
        </span>


        <span className="flex items-center justify-center px-1 text-white bg-red-500 border border-red-500 shadow-md cursor-pointer w-14 rounded-2xl">
          24
        </span>


        <span className="flex items-center justify-center px-1 text-white bg-green-500 border border-green-500 shadow-md cursor-pointer w-14 rounded-2xl">
          25
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          26
        </span>

      </div>

      <div className="flex justify-between pb-2 text-sm font-medium">

        <span className="flex items-center justify-center px-1 border cursor-pointer w-14">
          27
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          28
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          29
        </span>


        <span className="flex items-center justify-center px-1 border cursor-pointer w-14 hover:border-green-500 hover:text-green-500">
          30
        </span>


        <span className="flex items-center justify-center px-1 text-gray-400 w-14">
          01
        </span>


        <span className="flex items-center justify-center px-1 text-gray-400 w-14">
          02
        </span>


        <span className="flex items-center justify-center px-1 text-gray-400 w-14">
          03
        </span>

      </div>

    </div>
  </div>
}
export default Calendar