import React from 'react'

// 考勤下拉菜单
const AtteDropDown = () => {
  return <div >
    <div className="max-w-md mx-auto">
      <label htmlFor="select" className="block py-2 text-gray-500">修改考勤</label>

      <button className="relative">
        <div className="flex items-center h-10 bg-white border border-gray-200 rounded">
          <input value="Javascript" name="select" id="select" className="w-full px-4 text-gray-800 outline-none appearance-none" checked />

          <button className="text-gray-300 transition-all outline-none cursor-pointer focus:outline-none hover:text-gray-600">
            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <label htmlFor="show_more" className="text-gray-300 transition-all border-l border-gray-200 outline-none cursor-pointer focus:outline-none hover:text-gray-600">
            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </label>
        </div>

        <input type="checkbox" name="show_more" id="show_more" className="hidden peer" checked />
        <div className="flex-col hidden w-full mt-1 overflow-hidden bg-white border border-gray-200 rounded shadow peer-checked:flex">
          <div className="cursor-pointer group">
            <a className="block p-2 border-l-4 border-transparent group-hover:border-blue-600 group-hover:bg-gray-100">签到</a>
          </div>
          <div className="border-t cursor-pointer group">
            <a className="block p-2 border-l-4 border-transparent border-blue-600 group-hover:border-blue-600 group-hover:bg-gray-100">请假</a>
          </div>
          <div className="border-t cursor-pointer group">
            <a className="block p-2 border-l-4 border-transparent group-hover:border-blue-600 group-hover:bg-gray-100">旷课</a>
          </div>
        </div>
      </button>
    </div>
  </div>
}

export default AtteDropDown