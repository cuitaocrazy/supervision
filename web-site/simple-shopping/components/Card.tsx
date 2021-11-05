import { FC } from 'react'

interface CardProps {
  image: string
  title: string
  descript: string
  amt: number
  onAdd: () => void
}

const Card: FC<CardProps> = (props) => <div className="max-w-lg mx-auto">
  <div className="max-w-sm mb-5 bg-white border border-gray-200 rounded-lg shadow-md">
    <a href="detail">
      <img className="rounded-t-lg" src={props.image} alt="" />
    </a>
    <div className="p-5">
      <a href="detail">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{props.title}</h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 truncate">{props.descript}</p>
      <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-secondary-500 hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-300"
      onClick={props.onAdd} >
        添加
      </a>
    </div>
  </div>
</div>

export default Card
