import { FC } from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import Navbar from 'components/Navbar'
import {Link} from 'react-router-dom'

type FormData = {
  name: string;
}

// 教育机构的支付结果页面
const PayResult = () => {

  return <IonPage>
    <IonHeader>
      <Navbar title="支付结果" />
    </IonHeader>
    <IonContent>
      <div className='relative '>
        <div className='grid justify-center grid-rows-1'>
          <div className='mt-20 '>
            {/* <img className='w-48 h-32 rounded-lg' src="http://placekitten.com/g/200/300"></img> */}
            <svg className="w-48 h-32 rounded-lg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1721" width="200" height="200"><path d="M512 1024C229.23264 1024 0 794.76736 0 512S229.23264 0 512 0s512 229.23264 512 512-229.23264 512-512 512zM283.92448 484.07552l-41.8816 55.84896 223.41632 209.4592 339.77344-386.32448-32.57344-37.24288-307.2 316.5184-181.53472-158.2592z" p-id="1722" fill="#5045E4"></path></svg>
          </div>
          <div className='pt-4 pb-16 text-lg text-center text-gray-700'>恭喜您支付成功！</div>
        </div>
        <div className='grid grid-cols-3 gap-3 mx-3 font-bold'>
          <Link to='/tabs/home' className='py-2 text-sm text-center text-white shadow-md shadow-primary-500 bg-primary-500 rounded-3xl'>
            返回首页
          </Link>
          <Link to='searchLessonlist' className='py-2 text-sm text-center text-white shadow-md shadow-secondary-300 bg-secondary-300 rounded-3xl'>
          继续购买
            </Link>
            {/* <Link to='myLessonDetail'  className='py-2 text-sm text-center text-white bg-red-400 shadow-md shadow-remind-400 rounded-3xl'> */}
            <Link to={{pathname:'myLessonDetail',state:{backPage:'/tabs/home'}}}  className='py-2 text-sm text-center text-white bg-red-400 shadow-md shadow-remind-400 rounded-3xl'>
          查看详情
            </Link>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default PayResult