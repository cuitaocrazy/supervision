import { FC } from 'react'
interface CarProps {
  image: string
  title: string
  amt: number
}

const ShoppingCar: FC<CarProps> = (props) => <div>
  <div className="flex flex-row justify-center mb-5 bg-white border border-gray-200 rounded-lg shadow-md mx-80">
    <div className="ml-2">
      <input type="radio" name="option1" className="mt-10 mr-8" />
    </div>
    <div className="ml-2">
      <img src={props.image} className="h-24 rounded-lg w-36" />
    </div>
    <div className="flex flex-col w-72">
      <div className="h-10 px-3 py-2 truncate w-72 text-primary-600">{props.title}</div>
      <div className="flex flex-row ">
        <div className="px-3 text-red-500">{props.amt}</div>
        <button className="ml-40 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

export default ShoppingCar
