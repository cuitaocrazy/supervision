import React from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import { useRouter } from 'next/router'
import Search from '../Search'
import Navbar from 'components/Navbar'
import RoundedCornersStyles from '../RoundedCornersStyles'

const SearchlessonlistCard = () => {
  const router = useRouter()
  return (
    <div className='mt-3 bg-white rounded-lg shadow-md '>
      <div className='grid grid-cols-3 mx-2 h-28 rounde-xl'>
        <a onClick={
          () => {
            router.push('/searchLessonDetail')
          }
        }>
          <img className='w-24 h-24 col-span-1 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
        </a>
        <div className='flex flex-col col-span-2 mt-2 justify-items-start'>
          <a onClick={
            () => {
              router.push('/searchLessonDetail')
            }
          }>
            <div className='mt-2 text-sm'>思维逻辑小游戏</div>
            <div className='mt-1 text-xs text-gray-500'>锻炼孩子动手能力，提高孩子思维能力，学习完课程可组装不同形状。</div>
            <div className='flex gap-3 mt-3'>
              <div className='text-xs font-bold text-remind-500'>¥3558.00</div>
              <div className='text-xs text-gray-700'>36课时</div>
              <div className='text-xs text-gray-700'>核桃编程</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

// 首页查询课程列表页面
const SearchLessonList = () => {
  return <IonPage>
    <IonHeader>
      <Navbar title="教育资金监管平台" />
    </IonHeader>
    <IonContent>
      <div className='relative bg-primary-600'>
        <RoundedCornersStyles />
        <div className='bg-white'>
          <Search />
          {/* 课程列表card */}
          <div className='mx-3 pt-14 '>
            <SearchlessonlistCard />
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default SearchLessonList