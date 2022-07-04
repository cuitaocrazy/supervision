import { StatusBar, Style } from '@capacitor/status-bar';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
  IonCard
} from '@ionic/react';
import { useEffect, useState, useContext } from 'react';
import { flash, arrowDown, arrowUp } from 'ionicons/icons';

import { AppContext } from '../appState';
import Router from 'next/router'
import { Link } from 'react-router-dom';



const Menu = () => {
  const [isDark, setIsDark] = useState(false);
  const [lessonVisible, setLessonVisible] = useState(false);

  const [attendanceVisible, setAttendanceVisible] = useState(false);
  const [statisticVisible, setStatisticVisible] = useState(false);
  const handleOpen = async () => {
    try {
      await StatusBar.setStyle({
        style: isDark ? Style.Dark : Style.Light,
      });
    } catch { }
  };
  const handleClose = async () => {
    try {
      await StatusBar.setStyle({
        style: isDark ? Style.Dark : Style.Light,
      });
    } catch { }
  };

  useEffect(() => {
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  return (
    <IonMenu hidden={false} side="start" menuId="first" contentId="main" onIonDidOpen={handleOpen} onIonDidClose={handleClose} className="w-1/6 ">
      <IonHeader >
        <IonToolbar >
          <IonTitle className="py-4 text-center text-white bg-primary-500">教育机构管理系统</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <div className='fixed flex flex-col items-center justify-start w-full h-screen px-6 text-white bg-primary-600'>
          <Link className='flex items-center justify-start w-full px-3 py-2 mt-2 space-x-6 rounded-lg hover:text-white focus:bg-primary-500 focus:text-white hover:bg-primary-500 focus:rounded-lg md:w-52'
           to="/tabs/lesson/query">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span>课程列表</span>
          </Link>
          <Link className='flex items-center justify-start w-full px-3 py-2 mt-2 space-x-6 rounded-lg hover:text-white focus:bg-primary-500 focus:text-white hover:bg-primary-500 focus:rounded-lg md:w-52'
          to="/tabs/attendance/launch">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <span>课程签到发起</span>
          </Link>
          <Link className='flex items-center justify-start w-full px-3 py-2 mt-2 space-x-6 rounded-lg hover:text-white focus:bg-primary-500 focus:text-white hover:bg-primary-500 focus:rounded-lg md:w-52' 
          to="/tabs/transfer/query">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>课程划拨</span>
          </Link>
          <Link className='flex items-center justify-start w-full px-3 py-2 mt-2 space-x-6 rounded-lg hover:text-white focus:bg-primary-500 focus:text-white hover:bg-primary-500 focus:rounded-lg md:w-52' 
          to="/tabs/orderQuery">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" />
              <path fillRule="evenodd" d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
            </svg>
            <span>订单查询</span>
          </Link>
        </div>


        {/* <IonList >
          <IonItem className="flex flex-row justify-center text-center " routerLink={'/tabs/baseInfo'} routerDirection="none" detail={false} lines="none">
            <IonIcon icon={flash} slot="start" />
            <IonLabel className="font-bold bg-white">{'基本信息维护'}</IonLabel>
          </IonItem>
          <IonItem className="flex flex-row justify-center text-center" routerLink={'/tabs/changePwd'} routerDirection="none" detail={false} lines="none">
            <IonIcon icon={flash} slot="start" />
            <IonLabel className="font-bold">{'更改密码'}</IonLabel>
          </IonItem>
          <IonItem className="flex flex-row justify-center text-center" button onClick={() => {
            setLessonVisible(!lessonVisible)
          }}>
            <IonLabel>课程管理</IonLabel>
            <IonIcon
              slot="end"
              icon={lessonVisible ? arrowUp : arrowDown}
            ></IonIcon>
          </IonItem>
          <IonMenuToggle autoHide={!lessonVisible} key={'lesson'}>
            <IonItem className="flex flex-row justify-center text-center" routerLink={'/tabs/lesson/query'} routerDirection="none" detail={false} lines="none">
              <IonIcon icon={flash} slot="start" />
              <IonLabel className="font-bold">{'课程列表'}</IonLabel>
            </IonItem>
            <IonItem className="flex flex-row justify-center text-center" routerLink={'/tabs/refund/query'} routerDirection="none" detail={false} lines="none">
              <IonIcon icon={flash} slot="start" />
              <IonLabel className="font-bold">{'课程退订审批'}</IonLabel>
            </IonItem>
            <IonItem className="flex flex-row justify-center text-center" routerLink={'/tabs/attendance/launch'} routerDirection="none" detail={false} lines="none">
              <IonIcon icon={flash} slot="start" />
              <IonLabel className="font-bold">{'课程签到发起'}</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonItem className="flex flex-row justify-center text-center" routerLink={'/tabs/teacher/query'} routerDirection="none" detail={false} lines="none">
            <IonIcon icon={flash} slot="start" />
            <IonLabel className="font-bold">{'教师管理'}</IonLabel>
          </IonItem>
          <IonItem className="flex flex-row justify-center text-center" routerLink={'/tabs/contractNego/query'} routerDirection="none" detail={false} lines="none">
            <IonIcon icon={flash} slot="start" />
            <IonLabel className="font-bold">{'协商管理'}</IonLabel>
          </IonItem>
          <IonItem className="flex flex-row justify-center text-center" routerLink={'/tabs/attendance/launch'} routerDirection="none" detail={false} lines="none">
            <IonIcon icon={flash} slot="start" />
            <IonLabel className="font-bold">{'课程签到发起'}</IonLabel>
          </IonItem>
          <IonMenuToggle autoHide={!attendanceVisible} key={'attendance'}>
            <IonItem className="flex flex-row justify-center text-center" routerLink={'todo'} routerDirection="none" detail={false} lines="none">
              <IonIcon icon={flash} slot="start" />
              <IonLabel className="font-bold">{'考勤汇总'}</IonLabel>
            </IonItem>
            <IonItem className="flex flex-row justify-center text-center" routerLink={'/tabs/attendance/query'} routerDirection="none" detail={false} lines="none">
              <IonIcon icon={flash} slot="start" />
              <IonLabel className="font-bold">{'考勤明细'}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonItem className="flex flex-row justify-center text-center" button onClick={() => {
            setStatisticVisible(!attendanceVisible)
          }}>
            <IonLabel>课程考勤</IonLabel>
            <IonIcon
              slot="end"
              icon={attendanceVisible ? arrowUp : arrowDown}
            ></IonIcon>
          </IonItem>
          <IonItem className="flex flex-row justify-center text-center" routerLink={'/tabs/transfer/query'} routerDirection="none" detail={false} lines="none">
            <IonIcon icon={flash} slot="start" />
            <IonLabel className="font-bold">{'课程划拨'}</IonLabel>
          </IonItem>
          <IonItem className="flex flex-row justify-center text-center" routerLink={'/tabs/supervisorAccount'} routerDirection="none" detail={false} lines="none">
            <IonIcon icon={flash} slot="start" />
            <IonLabel className="font-bold">{'监管账户余额'}</IonLabel>
          </IonItem>
          <IonItem className="flex flex-row justify-center text-center" routerLink={'/tabs/announcement/query'} routerDirection="none" detail={false} lines="none">
            <IonIcon icon={flash} slot="start" />
            <IonLabel className="font-bold">{'监管机构公告'}</IonLabel>
          </IonItem>
          <IonItem className="flex flex-row justify-center text-center" button onClick={() => {
            setStatisticVisible(!statisticVisible)
          }}>
            <IonLabel>报表</IonLabel>
            <IonIcon
              slot="end"
              icon={statisticVisible ? arrowUp : arrowDown}
            ></IonIcon>
          </IonItem>
          <IonMenuToggle autoHide={!statisticVisible} key={'statistic'}>
            <IonItem className="flex flex-row justify-center text-center" routerLink={'/tabs/statistic/income'} routerDirection="none" detail={false} lines="none">
              <IonLabel className="font-bold">{'月收入报表'}</IonLabel>
            </IonItem>
          </IonMenuToggle>

        </IonList> */}
      </IonContent>
      {/* <IonContent>
       <IonToolbar className='h-72 mt-36'> 
          <button className="w-24 p-2 text-white rounded-md mt-60 bg-primary-500 hover:bg-primary-700 focus:outline-none">退出</button>
       </IonToolbar>
      </IonContent> */}

    </IonMenu>

  );
};

export default Menu;
