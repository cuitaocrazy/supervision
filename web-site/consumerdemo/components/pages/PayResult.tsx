import { FC } from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import Navbar from 'components/Navbar'

type FormData = {
  name: string;
}

// 教育机构的支付结果页面
const PayResult = () => {
  const router = useRouter()
  return <IonPage>
    <IonHeader>
      <Navbar title="支付结果" />
    </IonHeader>
    <IonContent>
      <div className='relative '>
        <div className='grid justify-center grid-rows-1'>
          <div className='mt-20 '>
            <img className='w-48 h-32 rounded-lg' src="http://placekitten.com/g/200/300"></img>
          </div>
          <div className='pt-4 pb-16 text-lg text-center text-gray-700'>恭喜您支付成功！</div>
        </div>
        <div className='grid grid-cols-3 gap-3 mx-3 font-bold'>
          <button className='py-2 text-sm text-white shadow-md shadow-primary-500 bg-primary-500 rounded-3xl'
            onClick={() => { router.push("./home") }}>返回首页</button>
          <button className='py-2 text-sm text-white shadow-md shadow-secondary-300 bg-secondary-300 rounded-3xl'
            onClick={() => { router.push("./searchLessonlist") }}>继续购买</button>
          <button className='py-2 text-sm text-white bg-red-400 shadow-md shadow-remind-400 rounded-3xl'
            onClick={() => { router.push("./myLessonDetail") }}>查看详情</button>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default PayResult