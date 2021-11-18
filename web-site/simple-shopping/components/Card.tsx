import { FC } from 'react'
import Router from 'next/router'
import { Order } from '@/types/types'

interface CardProps {
  image: string
  title: string
  descript: string
  amt: number
  item: Order
  onAdd: () => void
}

const Card: FC<CardProps> = (props) => <div className="max-w-lg mx-auto">
  <div className="flex flex-col max-w-sm mb-5 bg-white border border-gray-200 rounded-lg shadow-md">
    <a onClick={
      () => {
        Router.push({ pathname: '/detail', query: { item: JSON.stringify(props.item) } })
      }
    }>
      <img className="rounded-t-lg" src={props.image} alt="" />
    </a>
    <div className="flex flex-row justify-between">
      <div className="p-5">
        <a onClick={
          () => {
            Router.push({ pathname: '/detail', query: { item: JSON.stringify(props.item) } })
          }
        }>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{props.title}</h5>
        </a>
        <p className="w-64 mb-3 font-normal text-gray-700 truncate">{props.descript}</p>
      </div>
      <a className="inline-flex items-center px-3 py-2 my-10 mr-4 text-sm font-medium text-center text-white rounded-lg bg-secondary-500 hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-300"
        onClick={props.onAdd} >
          添加
      </a>
    </div>
  </div>
</div>

export default Card
