import React from 'react'
import { IonPage, IonHeader, IonContent } from '@ionic/react'
import { useRouter } from 'next/router'

// 个人信息页面
const MyPersonalInfo = () => {
  const router=useRouter()
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>个人信息</div>
      </div>
    </IonHeader>
    <IonContent>
      <div className='px-4 py-4 mx-2 my-2 text-sm rounded-md shadow-md'>
        <div className=''>
          <p className='text-gray-800'>手机号
            <span className='pl-1 text-remind-500'>(不可修改)</span>
          </p>
          <input className='w-full mt-2 mb-3 border-b' value='18610626134' />
        </div>
        <div>
          <p>客户姓名</p>
          <input className='w-full mt-1 mb-3 border-b' placeholder='请输入客户姓名' />
        </div>
        <div className='text-gray-800'>
          <p className=''>性别</p>
          <div className='flex gap-10 pt-1'>
            <div>
              <input className='' type="radio" value="男" checked />
              <label className='pl-2'>男</label>
            </div>
            <div>
              <input type="radio" value="女" />
              <label className='pl-2'>女</label>
            </div>
            <div>
              <input type="radio" value="保密" />
              <label className='pl-2'>保密</label>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-2 my-2 text-sm'>
        <p>以下为学生列表</p>
        <div className='flex justify-between p-3 mt-2 rounded-md shadow-md'>
          <div className='w-24 p-5 rounded-md shadow-md shadow-secondary-200 bg-secondary-50'>
            <div className='font-semibold text-center text-orange-400'>张大宝</div>
            <div className='pt-1 text-xs text-center text-gray-500'>12周岁</div>
          </div>
          <div className='w-24 p-5 rounded-md shadow-md shadow-secondary-200 bg-secondary-50'>
            <div className='font-semibold text-center text-orange-400'>张二宝</div>
            <div className='pt-1 text-xs text-center text-gray-500'>10周岁</div>
          </div>
          <a className='w-24 p-5 rounded-md shadow-md shadow-secondary-200 bg-secondary-50'
            href="./addStuInfo">
            <svg className="w-8 h-8 mt-1 ml-3 text-secondary-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
          </a>
        </div>
        <div className='flex mt-10'>
          <input className='w-full py-2 mx-6 font-bold text-white shadow-md bg-primary-600 rounded-3xl shadow-primary-600' 
                 type="button" value="确定修改" 
                 onClick={()=>{alert("修改成功")}}/>
        </div>

        {/* <div className='px-2 py-2 rounded-md shadow-md'>
          <div className='flex items-center justify-between px-2 py-2 my-2 rounded-md text-secondary-400 bg-secondary-50'>
            <div className='px-2 py-2 rounded-md '>
              <p className='text-base font-bold'>张大宝</p>
              <p className='text-center text-gray-500'>12周岁</p>
            </div>
            <div>
            <svg className="w-8 h-8 text-gray-400"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
            </div>
          </div>

          <div className='flex items-center justify-between px-2 py-2 my-2 rounded-md text-secondary-400 bg-secondary-50'>
            <div className='px-2 py-2 rounded-md '>
              <p className='text-base font-bold'>张二宝</p>
              <p className='text-center text-gray-500'>10周岁</p>
            </div>
            <div>
            <svg className="w-8 h-8 text-gray-400"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
            </div>
          </div>

          <div className='flex items-center justify-between px-2 py-2 my-2 rounded-md text-secondary-400 bg-secondary-50'>
            <div className='px-2 py-2 rounded-md '>
              <p className='text-base font-bold'>张小宝</p>
              <p className='text-center text-gray-500'>8周岁</p>
            </div>
            <div>
            <svg className="w-8 h-8 text-gray-400"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
            </div>
          </div>

        </div> */}

      </div>
    </IonContent>
  </IonPage>
}

export default MyPersonalInfo