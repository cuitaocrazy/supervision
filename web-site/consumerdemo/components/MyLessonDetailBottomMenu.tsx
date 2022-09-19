import { Link } from 'react-router-dom';
// 我的课程详情页面底部菜单组件
const MyLessonDetailBottomMenu = () => {
  return <div className='fixed bottom-0 grid w-full grid-cols-3 mt-6 bg-white border-t h-14 justify-items-center'>
    <Link to='checkInAndLeave' className='mt-2 text-primary-500'
      >
      <div>
        <svg className="w-5 h-5 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
      <div className='text-xs'>签到/请假</div>
    </Link>
    <Link to='MyCheckInList' className='mt-2 text-green-500 '
      >
      <div className='pl-3'>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <line x1="8" y1="6" x2="21" y2="6" />  <line x1="8" y1="12" x2="21" y2="12" />  <line x1="8" y1="18" x2="21" y2="18" />  <line x1="3" y1="6" x2="3.01" y2="6" />  <line x1="3" y1="12" x2="3.01" y2="12" />  <line x1="3" y1="18" x2="3.01" y2="18" /></svg>
      </div>
      <div className='mr-4 text-xs'>签到列表</div>
    </Link>
    <Link to="./myLessonEvalDetail" className='mt-2 text-secondary-300'
      >
      <div>
        <svg className="w-5 h-5 " width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
      </div>
      <div className='mr-4 text-xs'>评价</div>
    </Link>
  </div>
}

export default MyLessonDetailBottomMenu