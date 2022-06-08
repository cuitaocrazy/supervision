import React from 'react'
import {IonPage,IonHeader,IonContent}from "@ionic/react"

const RefoundLesson=()=>{
  return <IonPage>
  <IonHeader>
    <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
      <div className='text-center'>退订课程</div>
    </div>
  </IonHeader>
  <IonContent>
    <div className='px-3 py-4 mx-2 mt-3 mb-6 rounded-lg shadow-md'>
      <div className='flex px-4 py-2 mb-3 text-sm rounded-md bg-primary-50'>
        <div className='pr-4 text-gray-500'>课程名称</div>
        <div className='text-gray-700'>少儿编程</div>
      </div>
      <div className='flex px-4 py-2 mb-3 text-sm rounded-md bg-primary-50'>
        <div className='pr-4 text-gray-500'>学生姓名</div>
        <div>张大宝</div>
      </div>
      <div className='flex px-4 py-2 mb-2 text-sm rounded-md bg-primary-50'>
        <div className='pr-4 text-gray-500'>退订金额</div>
        <div className='text-gray-700'>¥</div>
        <div className='text-gray-700'>710.4</div>
        <div className='text-gray-700'>元</div>
      </div>
      <p className='mb-3 text-xs leading-4 text-primary-600'>按照当地政府要求，监管账户的资金已部分划拨到机构账户中本系统仅支持未划拨部分退款，其余部分与机构进行沟通协商。退款金额会按原交易渠道进行退回。</p>
      <div className='text-sm text-gray-700'>协商原因</div>
      <textarea className='w-full h-40 px-4 py-4 mt-2 text-xs rounded-md bg-primary-50'  placeholder='请告诉我们您退订课程的原因，让我们进一步改进!' />


    </div>
    <div className='flex items-center justify-items-center'> 
     {/* <button className='py-2 font-bold text-center text-white shadow-md shadow-primary-600 px-28 rounded-3xl bg-primary-600'>提交申请</button> */}
     <input type="submit" className="w-full py-2 mx-5 mt-8 mb-1 text-sm font-bold text-white shadow-lg rounded-3xl bg-primary-500 focus:outline-none hover:bg-primary-700 hover:shadow-none"
          value="提交申请" />
    </div>

  </IonContent>
  </IonPage>
}

export default RefoundLesson