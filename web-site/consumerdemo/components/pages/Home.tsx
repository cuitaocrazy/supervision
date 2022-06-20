import { FC } from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Search from '../Search'

interface LessonListCardProps{
  lesson_imgs:string
  lesson_name:string
  lesson_introduce:string
  edu_address:string
}
// 首页课程列表card组件
const LessonListCard:FC<LessonListCardProps> = (props) => {
  const router = useRouter()
  return (
    <a onClick={
      () => {
        router.push('/searchLessonDetail')
      }
    }>
      <div className="flex flex-col max-w-sm mb-3 ml-3 mr-2 bg-white border-gray-200 rounded-lg shadow-md h-36">
        <img className="h-20 rounded-t-lg cursor-pointer" src={props.lesson_imgs} alt="" />
        <div className="flex flex-col justify-center px-2 pt-1">
          <p className="text-xs font-bold text-gray-900 truncate cursor-pointer ">{props.lesson_name}</p>
          <p className='pt-1 text-xs text-gray-400 truncate'>{props.lesson_introduce}</p>
          <p className="text-xs text-gray-400 truncate">{props.edu_address}</p>
        </div>
      </div>
    </a>
  )
}


interface LessonList{
  lesson_imgs:string
  lesson_id:string
  lesson_name:string
  lesson_introduce:string
  edu_address:string
  edu_id:string
}
// 首页
const Home = () => {
  const lessonListDemo:LessonList[]=[
    {lesson_imgs:'http://placekitten.com/g/200/300',lesson_id:'Lesson1',lesson_name:'幼小衔接', lesson_introduce:'简介：让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生',edu_id:'Edu01',edu_address:'地址：廊坊市安次区和平路荣益广场3层206'},
    {lesson_imgs:'http://placekitten.com/g/200/300',lesson_id:'Lesson2',lesson_name:'幼小衔接', lesson_introduce:'简介：让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生',edu_id:'Edu01',edu_address:'地址：廊坊市安次区和平路荣益广场3层206'},
    {lesson_imgs:'http://placekitten.com/g/200/300',lesson_id:'Lesson3',lesson_name:'幼小衔接', lesson_introduce:'简介：让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生',edu_id:'Edu01',edu_address:'地址：廊坊市安次区和平路荣益广场3层206'},
    {lesson_imgs:'http://placekitten.com/g/200/300',lesson_id:'Lesson3',lesson_name:'幼小衔接', lesson_introduce:'简介：让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生',edu_id:'Edu01',edu_address:'地址：廊坊市安次区和平路荣益广场3层206'},
    {lesson_imgs:'http://placekitten.com/g/200/300',lesson_id:'Lesson3',lesson_name:'幼小衔接', lesson_introduce:'简介：让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生',edu_id:'Edu01',edu_address:'地址：廊坊市安次区和平路荣益广场3层206'},
    {lesson_imgs:'http://placekitten.com/g/200/300',lesson_id:'Lesson3',lesson_name:'幼小衔接', lesson_introduce:'简介：让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生',edu_id:'Edu01',edu_address:'地址：廊坊市安次区和平路荣益广场3层206'},
    {lesson_imgs:'http://placekitten.com/g/200/300',lesson_id:'Lesson3',lesson_name:'幼小衔接', lesson_introduce:'简介：让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生',edu_id:'Edu01',edu_address:'地址：廊坊市安次区和平路荣益广场3层206'},
    {lesson_imgs:'http://placekitten.com/g/200/300',lesson_id:'Lesson3',lesson_name:'幼小衔接', lesson_introduce:'简介：让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生',edu_id:'Edu01',edu_address:'地址：廊坊市安次区和平路荣益广场3层206'}
  ]

  return <IonPage>
    <IonHeader>
      <div className='grid h-10 grid-cols-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='col-span-9'>教育资金监管平台</div>
        <div className='text-center'>
          <svg className="w-5 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />  <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
          <motion.div key="2" className={'absolute top-2 right-5 '} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div>
        </div>
      </div>
    </IonHeader>
    <IonContent>
      <div className='relative bg-primary-600'>
        <div className='fixed left-0 right-0 h-5 bg-primary-600 top-15'>
          <div className='fixed left-0 right-0 h-4 bg-white rounded-t-3xl top-15'></div>
        </div>
        <div className='bg-white'>

          {/* 搜索框 */}
          <Search />
          {/* 轮播图 */}
          <div className='pt-20 mx-3'>
            <img className="w-full h-32 rounded-lg cursor-pointer " src='http://placekitten.com/g/200/300' alt="" />
          </div>

          {/* 课程列表card */}
          <div className='grid items-center grid-cols-6 mt-3'>
            <div className='col-span-5 text-sm font-bold text-gray-900'>
              <svg className="inline w-5 h-5 ml-1 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="4" x2="12" y2="19" /></svg>
              <div className='inline'>精选推荐</div>
            </div>
            <div className='flex mb-1 mr-3 text-xs text-gray-400 justify-self-end'>
              <a href="http://www.w3school.com.cn">
                <div>
                  更多
                  <svg className="inline w-3 h-3 mb-1 text-gray-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="9 6 15 12 9 18" /></svg>
                </div>
              </a>
            </div>
          </div>

          <div>
            <div className="grid py-2 sm1:grid-cols-2 sm2:grid-cols-2 sm3:grid-cols-2">
              {lessonListDemo.map((item,index)=>{
                return <LessonListCard key={index} item = {item} lesson_imgs={item.lesson_imgs} lesson_name={item.lesson_name} lesson_introduce={item.lesson_introduce} edu_address={item.edu_address} />
              })}
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default Home