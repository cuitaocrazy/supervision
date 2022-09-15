import {FC} from 'react';
import { IonPage, IonHeader, IonContent } from "@ionic/react"
import { motion } from 'framer-motion'
import {Link} from 'react-router-dom'
import SexDownList from 'components/SexDownList';
import RelationRadio from 'components/RelationRadio';
import Navbar from '../Navbar'

type FormData = {
  name: string;
}

// 编辑学生信息页面
const EditStuInfo = () => {

  return <IonPage>
    <IonHeader>
      <Navbar title='编辑学员信息' />
    </IonHeader>
    <IonContent>
    <form>
        <div className='mt-2 mb-3 ml-4 mr-3 text-base bg-white pb-15 scroll-auto'>
          <div className='p-2 px-2 pt-4 pb-4 rounded-lg shadow-md'>
            <RelationRadio />
            <div className='grid grid-cols-2 mt-3 justify-items-stretch'>
              <span className='pr-2 text-gray-400 '>学生姓名:</span>
              <input className='py-2 pl-2 text-gray-800 border rounded-md focus:outline-none' value="张大宝"></input>
            </div>
            <div className='grid grid-cols-2 mt-3 justify-items-stretch'>
              <span className='flex pr-2 text-gray-400 '>出生日期:</span>
              <input className='flex py-2 pl-2 text-gray-800 border rounded-md focus:outline-none' value="2020.0101"></input>
            </div>
            <div className='grid grid-cols-2 mt-3 justify-items-stretch'>
              <span className='pr-2 text-gray-400'>学生性别:</span>
              <SexDownList />
            </div>
          </div>
        </div>
        <div className='fixed bottom-0 flex w-full mt-6 bg-white border-t h-14 justify-items-center'>
          <Link to='stuInfoList'>
            <button className='self-center w-full h-10 mx-6 mt-1 text-sm font-medium text-white bg-gray-400 rounded-3xl' onClick={() => {  }}>取消</button>
          </Link>
          <Link to='stuInfoList'>
            <button className='self-center w-full h-10 mx-6 mt-1 text-sm font-medium text-white bg-primary-500 rounded-3xl' onClick={() => { }}>确定</button>
          </Link>
        </div>
      </form>
    </IonContent>
  </IonPage>
}

export default EditStuInfo 