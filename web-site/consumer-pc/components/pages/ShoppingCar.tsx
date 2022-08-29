import { FC, useState } from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import { motion } from 'framer-motion'
import Router, { useRouter } from 'next/router'
import Navbar from 'components/Navbar'
import { Lesson } from '../../types/types'
import { useAppDispatch } from '../../app/hook'
import { decrement } from 'features/order-cart/counterSlice';

type State = {
  chooseLesson?: Lesson,
  carList: Lesson[]
}

interface CarProps {
  edu_name?: string
  image?: string
  lesson_name?: string
  lesson_introduce?: string
  lesson_total_price?: number
  lesson_total_quantity?: number
  onDelete: any
  lesson: Lesson
  keyIndex: number
  setChooseLesson: any
}

// 购物车课程列表card 
const ShoppingCarCard: FC<CarProps> = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch()

  // 选择购物车课程
  const choose = () => {
    props.setChooseLesson(props.lesson)
    return () => { }
  }
  // 删除购物车课程
  const deleteFun = () => {
    const isDelMsg = confirm('你确定要删除课程吗？')
    if (isDelMsg === true) {
      console.log("删除成功" + props.keyIndex)
      dispatch(decrement(props.keyIndex))
      props.onDelete(props.keyIndex)
    } else if (isDelMsg === false) {
      alert("取消成功")
    }
  }
  return <div>
    <div className='mt-2 bg-white '>
      <div className='flex items-center mx-4 mb-1'>
        <input className='mr-3 border-gray-300 rounded outline-none cursor-pointer text-primary-600 focus:ring-0 focus:ring-primary-600 focus:outline-none checked:bg-primary-500'
          type="checkbox" id="" value="" />
        <label className='text-sm text-center text-gray-500 '>{props.edu_name}</label>
      </div>

      <div className='rounded-lg shadow-md glow-third-200'>
        <div className='grid grid-cols-12 mx-2 h-28 rounde-xl'>
          <div className='flex items-center justify-center'>
            <input className='col-span-1 border-gray-300 rounded outline-none cursor-pointer text-primary-600 focus:ring-0 focus:ring-primary-600 focus:outline-none checked:bg-primary-500'
              onClick={() => { choose() }}
              type="checkbox" />
          </div>
          <div className='col-span-4 mt-2 mr-2'>
            <img className='w-24 h-24 rounded-xl' src="http://placekitten.com/g/200/300"></img>
          </div>
          <div className='flex flex-col col-span-7 mt-2 mr-3 justify-items-start'>
            <div className='flex justify-between mt-1'>
              <div className='overflow-hidden text-sm text-ellipsis'>{props.lesson_name}</div>
              <button onClick={() => { deleteFun() }}>
                <svg className="w-4 h-4 text-gray-400" width="6" height="6" viewBox="0 0 24 23" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
              </button>
            </div>
            <div className='h-8 mt-1 overflow-hidden text-xs text-gray-500 text-ellipsis'>{props.lesson_introduce}</div>
            <div className='flex gap-3 mt-3'>
              <div className='text-xs font-bold text-remind-500'><span>¥</span>{props.lesson_total_price}</div>
              <div className='text-xs text-gray-700'>{props.lesson_total_quantity}<span>课时</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

// 购物车课程列表信息页面
const ShoppingCar = () => {
  const router = useRouter();
  const { carList } = router.query
  let shoppingList: Lesson[] = []
  const [state, setState] = useState<State>({ carList: shoppingList })
  const setChoseLesson = (chooseLesson: Lesson) => {
    setState({ ...state, ...{ chooseLesson: chooseLesson } })
  }
  const onSubmit = () => {
    if (state.chooseLesson != null) {
      Router.push({
        pathname: './conOrder',
        query: state.chooseLesson as any,
      })
    } else {
      alert('请选择课程')
    }
  }
  if (typeof carList === 'object') {
    shoppingList = carList.map((item: string) => { return JSON.parse(item) })
  } else if (typeof carList === 'string') {
    shoppingList.push(JSON.parse(carList))
  }

  const onDelete = (key: number) => {
    const newCarList = state.carList
    newCarList.splice(key, 1)
    setState({ ...state, ...{ carList: newCarList } })
  }


  return <IonPage>
    <IonHeader>
      <Navbar title="购物车" />
    </IonHeader>
    <IonContent>
      <form>
        <div className='relative mb-3 bg-white pb-14 scroll-auto'>
          <div className='mx-3 '>
            {state.carList.map((item,index)=>{
              return <ShoppingCarCard key={index} keyIndex={index} image={item.lessonImgs} edu_name={item.edu?.eduName} lesson_name={item.lessonName} lesson_introduce={item.lessonIntroduce} lesson_total_price={item.lessonTotalPrice} lesson_total_quantity={item.lessonTotalQuantity} 
              setChooseLesson={setChoseLesson} onDelete={onDelete} lesson={item}/>
            })}
          </div>
        </div>

        {/* 底部菜单 */}
        <div className='fixed bottom-0 flex justify-between w-full pl-5 mt-6 bg-white border-t h-14'>
          <div className='flex ml-2'>
            <div className='self-center mr-2'>
              <input className='col-span-1 border-gray-300 rounded outline-none cursor-pointer text-primary-600 focus:ring-0 focus:ring-primary-600 focus:outline-none checked:bg-primary-500' type="checkbox" />
            </div>
            <div className='self-center text-xs text-gray-500'>全选</div>
          </div>
          <div className='flex justify-items-end'>
            <div className='self-center text-xs text-gray-500'>合计：</div>
            <div className='self-center mr-4 text-2xl font-black text-red-500 grow'>¥11120.00</div>
            <button className='self-center h-10 px-6 mt-1 mr-2 text-sm font-medium text-white justify-self-end bg-primary-500 rounded-3xl'
              onClick={() => {onSubmit()}}>去结算</button>
          </div>
        </div>
      </form>
    </IonContent>
  </IonPage>
}

export default ShoppingCar