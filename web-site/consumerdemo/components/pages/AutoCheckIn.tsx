import React from 'react'
import { IonPage, IonHeader, IonContent } from '@ionic/react'

// 自动签到页面
const AutoCheckIn = () => {
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>自动签到</div>
      </div>
    </IonHeader>
    <IonContent>
      <div className='mx-3'>
        <div className='mt-3 rounded-lg shadow-md '>
          <div className='grid h-24 grid-cols-3 mx-2 rounde-xl'>
            <img className='w-20 h-20 col-span-1 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
            <div className='flex flex-col col-span-2 mt-2 justify-items-start'>
              <p className='mt-2 text-sm'>思维逻辑小游戏</p>
              <div className='mt-1 text-xs text-gray-500'>
                <span>学生姓名：</span>
                <span>张大宝</span>
              </div>
              <div className='text-xs mt-qaz19861'>
                <span className='text-gray-400'>总课时/</span>
                <span className='text-gray-400 '>已上课时：</span>
                <span className='pr-1 text-gray-800'>32</span>
                <span className='pr-1 text-gray-800'>/</span>
                <span className='text-secondary-400'>6</span>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-3 rounded-lg shadow-md'>
          <div className='grid h-24 grid-cols-3 mx-2 rounde-xl'>
            <img className='w-20 h-20 col-span-1 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
            <div className='flex flex-col col-span-2 mt-2 justify-items-start'>
              <p className='mt-2 text-sm'>思维逻辑小游戏</p>
              <div className='mt-1 text-xs text-gray-500'>
                <span>学生姓名：</span>
                <span>张大宝</span>
              </div>
              <div className='mt-1 text-xs'>
                <span className='text-gray-400'>总课时/</span>
                <span className='text-gray-400 '>已上课时：</span>
                <span className='pr-1 text-gray-800'>32</span>
                <span className='pr-1 text-gray-800'>/</span>
                <span className='text-secondary-400'>6</span>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-3 rounded-lg shadow-md'>
          <div className='grid h-24 grid-cols-3 mx-2 rounde-xl'>
            <img className='w-20 h-20 col-span-1 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
            <div className='flex flex-col col-span-2 mt-2 justify-items-start'>
              <p className='mt-2 text-sm'>思维逻辑小游戏</p>
              <div className='mt-1 text-xs text-gray-500'>
                <span>学生姓名：</span>
                <span>张大宝</span>
              </div>
              <div className='mt-1 text-xs'>
                <span className='text-gray-400'>总课时/</span>
                <span className='text-gray-400 '>已上课时：</span>
                <span className='pr-1 text-gray-800'>32</span>
                <span className='pr-1 text-gray-800'>/</span>
                <span className='text-secondary-400'>6</span>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-3 rounded-lg shadow-md'>
          <div className='grid h-24 grid-cols-3 mx-2 rounde-xl'>
            <img className='w-20 h-20 col-span-1 mt-2 ml-1 rounded-xl' src="http://placekitten.com/g/200/300"></img>
            <div className='flex flex-col col-span-2 mt-2 justify-items-start'>
              <p className='mt-2 text-sm'>思维逻辑小游戏</p>
              <div className='mt-1 text-xs text-gray-500'>
                <span>学生姓名：</span>
                <span>张大宝</span>
              </div>
              <div className='mt-1 text-xs'>
                <span className='text-gray-400'>总课时/</span>
                <span className='text-gray-400 '>已上课时：</span>
                <span className='pr-1 text-gray-800'>32</span>
                <span className='pr-1 text-gray-800'>/</span>
                <span className='text-secondary-400'>6</span>
              </div>
            </div>
          </div>
        </div>

        

        <div className='flex mt-10'>
          <input className='w-full py-2 mx-3 font-bold text-white shadow-md bg-primary-600 rounded-3xl shadow-primary-600' type="button" value="开启自动签到" />
        </div>

      </div>

    </IonContent>
  </IonPage>

}

export default AutoCheckIn