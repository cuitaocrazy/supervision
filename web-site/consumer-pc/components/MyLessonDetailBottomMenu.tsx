import { Link } from 'react-router-dom';
// 我的课程详情页面底部菜单组件
const MyLessonDetailBottomMenu = () => {
  return <div className='fixed bottom-0 grid w-full grid-cols-3 mt-6 bg-white border-t h-14 justify-items-center'>
    <Link to='checkInAndLeave' className='mt-2 text-white'
      >
      <button className='h-10 px-4 py-2  mr-3 text-sm  rounded-md bg-green-500'>签到/请假</button>
    </Link>
    <Link to='MyCheckInList' className='mt-2 text-white '
      >
      <button className='h-10 px-4 py-2  mr-3 text-sm  rounded-md bg-secondary-500'>签到列表</button>
      
    </Link>
    {/* <Link to="./myLessonEvalDetail" className='mt-2 text-secondary-300'
      >
      <div>
        <svg className="w-5 h-5 " width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
      </div>
      <div className='mr-4 text-xs'>评价</div>
    </Link> */}
    <Link to="./refundLesson" className='mt-2 text-white'
      >
      <button className='h-10 px-4 py-2  mr-3 text-sm  rounded-md bg-pink-500'>退订课程</button>
    </Link>
  </div>
}

export default MyLessonDetailBottomMenu