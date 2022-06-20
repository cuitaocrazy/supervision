import React from 'react'
import { IonPage, IonHeader, IonContent } from '@ionic/react'
import { useRouter } from 'next/router'

// 申请课程评价
const MyLessonEvalDetail = () => {
  const router=useRouter();
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>课程评价</div>
      </div>
    </IonHeader>
    <IonContent>
      <form className='text-sm'>
        <div className='px-4 py-4 mx-2 rounded-md shadow-md '>
          <p className='text-gray-800'>您的评价会让老师做的更好~~</p>
          <div className='flex items-center justify-center gap-3 mt-2'>
            <div className='flex flex-col items-center justify-center'>
              <svg className="w-5 h-5 mt-1 text-yellow-500 " fill="orange" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <p className='mt-1 text-gray-400'>非常不</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <svg className="w-5 h-5 mt-1 text-gray-400 " fill="gray" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <p className='mt-1 text-gray-400'>不满意</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <svg className="w-5 h-5 mt-1 text-gray-400" fill="gray" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <p className='mt-1 text-gray-400'>一般</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <svg className="w-5 h-5 mt-1 text-gray-400" fill="gray" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <p className='mt-1 text-gray-400'>比较满意</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <svg className="w-5 h-5 mt-1 text-gray-400 " fill="gray" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <p className='mt-1 text-gray-400'>非常满意</p>
            </div>
          </div>

          <div className='grid items-center grid-cols-4 gap-3 mt-3 text-gray-300 justify-items-center'>
            <div className='px-1 border border-gray-300 rounded-3xl'>死气沉沉</div>
            <div className='px-1 border border-gray-300 rounded-3xl'>迟到早退</div>
            <div className='px-1 border border-gray-300 rounded-3xl'>不够专业</div>
            <div className='px-1 border border-gray-300 rounded-3xl'>枯燥沉闷</div>
            <div className='px-1 border border-gray-300 rounded-3xl'>过分严厉</div>
            <div className='px-1 border border-gray-300 rounded-3xl'>态度不满</div>
            <div className='px-1 border border-gray-300 rounded-3xl'>通俗易懂</div>
            <div className='px-1 border border-gray-300 rounded-3xl'>非常耐心</div>
            <div className='px-1 border border-gray-300 rounded-3xl'>幽默风趣</div>
            <div className='px-1 border border-gray-300 rounded-3xl'>治学严谨</div>
            <div className='px-1 border border-gray-300 rounded-3xl'>认真负责</div>
            <div className='px-1 border border-gray-300 rounded-3xl'>条理清晰</div>
          </div>
        </div>
        <div className='p-2 m-2 rounded-md shadow-md'>
          <div className='py-2 mx-2 mt-2 rounded-md px-2s bg-primary-50'>
            <span className='pl-2 pr-3 text-gray-400'>机构名称</span>
            <span className='text-gray-800'>核桃编程</span>
          </div>
          <div className='py-2 mx-2 mt-2 rounded-md px-2s bg-primary-50'>
            <span className='pl-2 pr-3 text-gray-400'>课程名称</span>
            <span className='text-gray-800'>少儿编程</span>
          </div>
          <p className='mx-2 my-2'>评价内容</p>
          <div className='text-gray-400'>
            <textarea className='w-full h-40 p-2 border-0 rounded focus:border-0 bg-gray-50 focus:outline-none' 
                      placeholder='请告诉我们老师的优点或者美中不足吧～' />
          </div>
        </div>
        <div className='flex'>
          <input value="提交评价" type="button" 
                 className='w-full py-2 mx-6 mt-6 font-medium tracking-wider text-white shadow-md bg-primary-600 rounded-3xl shadow-primary-600'
                 onClick={()=>{router.push("./myLessonEvalList")}} />
        </div>
      </form>
    </IonContent>
  </IonPage>
}

export default MyLessonEvalDetail