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
  keyIndex:number
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
    if (isDeleteMessage === true) {
      // dispatch(decrement(props.order.USVItemID))
      console.log(props.keyIndex)
      dispatch(decrement(props.keyIndex))
      props.onDelete(props.keyIndex)
    } else if (isDeleteMessage === false) {
      alert('取消成功')
    }
  }
  return <div className="flex justify-center ">
    <div className="flex flex-row mb-5 bg-white border border-gray-200 rounded-lg shadow-md ">
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
          <input type="button" className="px-3 py-1 text-white rounded-md shadow-md bg-secondary-500 hover:bg-secondary-700 hover:shadow-none" value="删除" onClick={() => { deleteFun() }} >
          </input>
        </div>
      </div>
    </div>
  </div>
}

export default ShoppingCar
