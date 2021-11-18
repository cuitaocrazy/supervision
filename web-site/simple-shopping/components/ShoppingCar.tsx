import { FC } from 'react'
import { useAppDispatch } from '@/app/hook'
import { decrement } from '@/features/order-cart/counterSlice'
import { Order } from '@/types/types'

interface CarProps {
  image: string
  title: string
  amt: number
  setChosenLesson: any
  onDelete:any
  order: Order
}

// TODO购物车删除商品

const ShoppingCar: FC<CarProps> = (props) => {
  const dispatch = useAppDispatch()
  const choose = () => {
    props.setChosenLesson(props.order)
    return () => {}
  }

  const deleteFun = () => {
    const isDeleteMessage = confirm('你确定要删除商品吗？')
    // const router = useRouter()
    if (isDeleteMessage === true) {
      dispatch(decrement(props.order.USVItemID))
      props.onDelete(props.order)
    } else if (isDeleteMessage === false) {
      alert('取消成功')
    }
  }
  return <div className="flex justify-center">
    <div className="flex flex-row mb-5 bg-white border border-gray-200 rounded-lg shadow-md xl:w-2/3 md:w-4/5">
     <div className="ml-2">
        <input type="radio" name="option" className="mt-10 mr-8" onClick={choose}/>
      </div>
      <div className="ml-2">
        <img src={props.image} className="h-24 rounded-lg" />
      </div>
      <div className="flex flex-col">
        <div className="h-10 px-3 py-2 truncate w-60 text-primary-600">{props.title}</div>
        <div className="flex flex-row justify-between px-3">
          <div className="text-red-500">¥{props.amt}</div>
          <input type="button" className="px-3 py-1 text-white border border-green-300 rounded-md shadow-md bg-secondary-500 hover:bg-secondary-700 hover:shadow-none" value="删除" onClick={() => { deleteFun() }} >
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg> */}
          </input>
        </div>
      </div>
    </div>
  </div>
}

export default ShoppingCar
