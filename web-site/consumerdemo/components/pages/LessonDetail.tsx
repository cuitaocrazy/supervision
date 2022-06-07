import React from 'react';
import {IonPage,IonHeader,IonContent}from "@ionic/react"
import {motion} from 'framer-motion'
// import Schedule from '../Schedule'

const LessonDetail=()=>{
  return <IonPage>
    <IonHeader>
      <div className='grid h-10 grid-cols-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='col-span-9'>课程详情</div>
        <div className='text-center'>
        <svg className="w-5 h-6 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />  <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
        <motion.div key="2" className={'absolute top-2 right-5 ' } animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div>
        </div>
      </div>
    </IonHeader>
    <IonContent>
        <div className='relative mb-3 bg-white pb-14 scroll-auto'>
          {/* 课程图片 */}
            <div>
              <img className='w-full h-40' src="http://placekitten.com/g/200/300"></img>
            </div>
            <div className='flex pt-2 mx-10 text-xs text-gray-500 justify-items-stretch'>
              <div className='grid grow justify-items-center'>
                <div className='font-medium text-primary-600'>课程详情</div>
                <div className=''>
                  <svg className="w-5 h-5 text-primary-500"  viewBox="0 7 24 24"  fill="none"  stroke="currentColor"  strokeWidth="4"  strokeLinecap="round"  strokeLinejoin="round">  <line x1="5" y1="12" x2="19" y2="12" /></svg>
                </div>
              </div>
              <div className='flex justify-center grow'>课程大纲</div>
              <div className='flex justify-center grow'>评价(148)</div>
            </div>
            {/* 培训机构介绍 */}
            <div className='px-3 py-1 mx-3 rounded-lg shadow-md'>
              <div className='text-lg font-bold'>小画家美术培训</div>
              {/* 讲师 姓名 星星 */}
              <div className='flex pt-1'>
                <div className='text-sm text-gray-500'>讲师:</div>
                <div className='text-sm'>&nbsp;&nbsp;李雷</div>
                <div className='flex flex-auto justify-self-end'>
                  <svg className="w-3 h-3 m-1 text-yellow-500 "  fill="orange" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                  <svg className="w-3 h-3 mt-1 mr-1 text-yellow-500 "  fill="orange" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                  <svg className="w-3 h-3 mt-1 mr-1 text-yellow-500 "  fill="orange" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                  <svg className="w-3 h-3 mt-1 mr-1 text-yellow-500 "  fill="orange" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                  <svg className="w-3 h-3 mt-1 text-yellow-500 "  fill="orange" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                 </div>                                                                                                                                           
              </div>
              {/* 价格和课时 */}
              <div className='flex pt-1 text-xs'>
                <div className="text-red-500 ">¥888.00</div>
                <div className='pl-3 text-gray-500'>56课时</div>
              </div>
              <div className='flex pt-1 text-xs'>
                <div className='text-gray-500'>地址：</div>
                <div>北京市海淀区远大路22号D座2层</div>
              </div>
              <div className='flex pt-1 text-xs'>
                <div className='text-gray-500'>电话：</div>
                <div>010-87667890</div>
              </div>
            </div>
              
            {/* 学习里程碑   */}
            <div className='px-2 pt-3 pb-4 mx-3 mt-2 text-xs rounded-lg shadow-md'>
              <div className='flex'>
                <div className='font-bold tracking-wider text-primary-500'>张大宝</div>
                <div className='font-bold text-gray-700'>学习里程碑</div>
                <div className='text-gray-500'>(56课时)</div>
              </div>
              <div className='pt-2 tracking-wider text-center text-gray-500'>
                学习进度
                <label className='font-medium text-primary-700'>50%</label>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-1">
                <div className="bg-primary-600 h-1.5 rounded-full w-1/2" ></div>
                {/* <div className="w-8 h-4 text-white rounded-full bg-primary-600" >50%</div> */}
              </div>
            </div>

            {/* 课程介绍 */}
            <div className='p-2 mx-3 mt-2 text-xs rounded-lg shadow-md'>
              <div className='text-sm font-bold text-gray-600'>课程介绍</div>
              <div className='pt-1 text-gray-500'>艺术教育是未来教育，是快乐教育</div>
            </div>

            {/* 教师简介 */}
            <div className='p-2 mx-3 mt-2 text-xs rounded-lg shadow-md'>
              <div className='text-sm font-bold text-gray-600'>教师简介</div>
              <div className='pt-1 leading-5 text-gray-500'>李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......</div>
            </div>   

            {/* 订单信息     */}
            <div className='px-2 pt-3 pb-4 mx-3 mt-2 text-xs rounded-lg shadow-md'>
              <div className='flex leading-6'>
                <div className='pr-3 text-gray-500'>订单编号</div>
                <div className='text-gray-700'>3493214839149321</div>
              </div>
              <div className='flex leading-6'>
                <div className='pr-3 text-gray-500'>下单时间</div>
                <div className='text-gray-700'>2022-01-21 09：14:30</div>
              </div>
              <div className='flex leading-6'>
                <div className='pr-3 text-gray-500'>付款时间</div>
                <div className='text-gray-700'>2022-01-21 09：12:30</div>
              </div>
              <div className='flex leading-6'>
                <div className='pr-3 text-gray-500'>支付方式</div>
                <div className='text-gray-700'> 在线支付</div>
              </div>
              <div className='flex leading-6'>
                <div className='pr-3 text-gray-500'>客户姓名</div>
                <div className='text-gray-700'>王女士</div>
              </div>
              <div className='flex leading-6'>
                <div className='pr-3 text-gray-500'>联系方式</div>
                <div className='text-gray-700'>18610678900</div>
              </div>
              <div className='flex leading-6'>
                <div className='pr-3 text-gray-500'>优惠金额</div>
                <div>庆双旦享8.8折</div>
              </div>
              <div className='flex leading-6'>
                <div className='pr-3 text-gray-500'>获得积分</div>
                <div className='text-gray-700'>可获得888积分</div>
              </div>
              <div className='flex justify-end font-bold text-gray-700'>
                <div>实付金额：</div>
                <div>¥710.40</div>
              </div>


            </div>
        </div>
        
        {/* 底部菜单 */}
        <div className='fixed bottom-0 grid w-full grid-cols-3 mt-6 bg-white border-t h-14 justify-items-center'>
              <div className='mt-2 text-primary-500'>
                <div className=''>
                  <svg className="w-5 h-5 ml-4 "  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M3 21v-13l9-4l9 4v13" />  <path d="M13 13h4v8h-10v-6h6" />  <path d="M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3" /></svg>
                </div>
                <div className='text-xs'>签到/请假</div>
              </div>
              <div className='mt-2 text-green-500'>
                <div>
                  <svg className="w-5 h-5 ml-3"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="9" cy="19" r="2" />  <circle cx="17" cy="19" r="2" />  <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" /></svg>
                </div>
                <div className='mr-4 text-xs'>签到列表</div>
              </div>
              <div className='mt-2 text-secondary-300'>
                <div>
                  <svg className="w-5 h-5 "  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="9" cy="19" r="2" />  <circle cx="17" cy="19" r="2" />  <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" /></svg>
                </div>
                <div className='mr-4 text-xs'>评价</div>
              </div>

            </div>
    </IonContent>
  </IonPage>
}

export default LessonDetail