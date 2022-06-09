import React from 'react'
import {IonPage,IonHeader,IonContent} from '@ionic/react'

// 申请投诉
const FileComp=()=>{
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>投诉内容</div>
      </div> 
    </IonHeader>
    <IonContent>
      <div className='text-sm bg-white'>
        <p className='flex items-center justify-between gap-2 px-4 py-2 shadow-md'>
          <span className='flex '>投诉类型</span>
          <span className='px-5 py-1 text-white bg-secondary-300 rounded-3xl'>课程</span>
          <span className='px-5 py-1 text-gray-500 border rounded-3xl'>老师</span>
          <span className='px-5 py-1 text-gray-500 border rounded-3xl'>其他</span>
        </p>
        <div className='px-4 mx-2 mt-2 rounded-md shadow-md'>
          <p className='px-3 py-2 mt-2 leading-7 rounded-md bg-primary-50'>
            <span className='pr-3'>机构名称</span>
            <span>核桃编程</span>
          </p>
          <p className='pt-2 leading-6'>投诉标题</p>
          <input type="text" placeholder='请输入您的投诉标题' className='w-full pl-2 mb-2 leading-7 border-b border-b-gray-400' />
          <p>投诉内容</p>
          <textarea placeholder='请描述您要投诉的内容......' className='w-full h-40 py-2 pl-2 my-2 rounded-md bg-gray-50' />
        </div>
        <div className='flex justify-center'>
         <input className='w-full py-3 mx-6 mt-6 font-bold text-center text-white shadow-md bg-primary-600 shadow-primary-500 rounded-3xl' value="提交投诉" />
        </div>
      </div>

    </IonContent>
  </IonPage>
}

export default FileComp