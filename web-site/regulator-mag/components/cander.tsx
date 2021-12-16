import {FC} from 'react'

// 日历组件
const Cander:FC=()=>{
  return (
<div className="flex flex-grow flex-col bg-white border-t border-b sm:rounded sm:border shadow overflow-hidden">    
  <div className="border-b">
    <div className="flex justify-between pl-6 -mb-px">
      <h3 className="text-blue-dark py-4 font-normal text-lg">Vacation Settings</h3>
      <div className="flex"></div>
    </div>
  </div>
  <div className="flex px-2 py-2 -mb-px">
    <div className="flex flex-wrap bg-white overflow-hidden">
      <div className="w-auto mx-3 my-3 border-solid border-grey-light rounded border shadow-sm">
        <div className="bg-grey-lighter px-2 py-2 border-solid border-grey-light border-b text-center">December 2018</div>
        <div className="">
          <table className="w-full">
            <tr className="border-b">
              <th className="py-3 px-4">S</th>
              <th className="py-3 px-4">M</th>
              <th className="py-3 px-4">T</th>
              <th className="py-3 px-4">W</th>
              <th className="py-3 px-4">T</th>
              <th className="py-3 px-4">F</th>
              <th className="py-3 px-4">S</th>
            </tr>
              <tr>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">1</td>
              </tr>
              <tr>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">2</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">3</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">4</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">5</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer bg-blue text-white">6</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer bg-blue text-white">7</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">8</td>
              </tr>
              <tr>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">9</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">10</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">11</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">12</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">13</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">14</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">15</td>
              </tr>
              <tr>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">16</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">17</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">18</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">19</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">20</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">21</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">22</td>
              </tr>
              <tr>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">23</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">24</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">25</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">26</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">27</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">28</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">29</td>
              </tr>
              <tr>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">30</td>
                <td className="py-3 px-4 hover:bg-blue hover:text-white text-center cursor-pointer">31</td>
              </tr>
              </table>
            </div>
          </div>
        </div>
  </div>
</div>
  )
}
export default Cander