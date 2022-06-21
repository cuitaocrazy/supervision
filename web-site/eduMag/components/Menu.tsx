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
} from '@ionic/react';
import { useEffect, useState,useContext } from 'react';
import {  flash,arrowDown,arrowUp } from 'ionicons/icons';

import {AppContext} from '../appState';



const Menu = () => {
  const [isDark, setIsDark] = useState(false);
  const [lessonVisible, setLessonVisible] = useState(false);

  const [attendanceVisible,setAttendanceVisible] = useState(false);
  const [statisticVisible, setStatisticVisible] = useState(false);
  const handleOpen = async () => {
    try {
      await StatusBar.setStyle({
        style: isDark ? Style.Dark : Style.Light,
      });
    } catch {}
  };
  const handleClose = async () => {
    try {
      await StatusBar.setStyle({
        style: isDark ? Style.Dark : Style.Light,
      });
    } catch {}
  };

  useEffect(() => {
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  return (
    <IonMenu hidden={false} side="start" contentId="main" onIonDidOpen={handleOpen} onIonDidClose={handleClose}>
      <IonHeader >
        <IonToolbar>
          <IonTitle className="text-center">教育机构管理系统</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList >
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/baseInfo'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'基本信息维护'}</IonLabel>
                </IonItem>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/changePwd'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'更改密码'}</IonLabel>
                </IonItem>
                <IonMenuToggle autoHide={!lessonVisible} key={'lesson'}>
                  <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/lesson/query'} routerDirection="none" detail={false} lines="none">
                    <IonIcon icon={flash} slot="start" />
                    <IonLabel className="font-bold">{'课程列表'}</IonLabel>
                  </IonItem>
                  <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/refund/query'} routerDirection="none" detail={false} lines="none">
                    <IonIcon icon={flash} slot="start" />
                    <IonLabel className="font-bold">{'课程退订审批'}</IonLabel>
                  </IonItem>
                  <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/attendance/launch'} routerDirection="none" detail={false} lines="none">
                    <IonIcon icon={flash} slot="start" />
                    <IonLabel className="font-bold">{'课程签到发起'}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
                <IonItem className="flex flex-row justify-center text-center" button onClick={()=>{
                  setStatisticVisible(!lessonVisible)
                }}>
                <IonLabel>课程考勤</IonLabel>
                <IonIcon
                  slot="end"
                  icon={lessonVisible ? arrowDown : arrowUp}
                ></IonIcon>
                </IonItem>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/teacher/query'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'教师管理'}</IonLabel>
                </IonItem>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/contractNego/query'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'协商管理'}</IonLabel>
                </IonItem>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/contractNego/query'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'协商管理'}</IonLabel>
                </IonItem>
                <IonMenuToggle autoHide={!attendanceVisible} key={'attendance'}>
                  <IonItem  className="flex flex-row justify-center text-center" routerLink={'todo'} routerDirection="none" detail={false} lines="none">
                    <IonIcon icon={flash} slot="start" />
                    <IonLabel className="font-bold">{'考勤汇总'}</IonLabel>
                  </IonItem>
                  <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/attendance/query'} routerDirection="none" detail={false} lines="none">
                    <IonIcon icon={flash} slot="start" />
                    <IonLabel className="font-bold">{'考勤明细'}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
                <IonItem className="flex flex-row justify-center text-center" button onClick={()=>{
                  setStatisticVisible(!attendanceVisible)
                }}>
                <IonLabel>课程考勤</IonLabel>
                <IonIcon
                  slot="end"
                  icon={attendanceVisible ? arrowDown : arrowUp}
                ></IonIcon>
                </IonItem>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/transfer/query'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'课程划拨'}</IonLabel>
                </IonItem>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/supervisorAccount'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'监管账户余额'}</IonLabel>
                </IonItem>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/supervisorAccount'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'监管机构公告'}</IonLabel>
                </IonItem>
                <IonMenuToggle autoHide={!statisticVisible} key={'statistic'}>
              <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/statistic/income'} routerDirection="none" detail={false} lines="none">
                <IonLabel className="font-bold">{'月收入报表'}</IonLabel>
              </IonItem>
            </IonMenuToggle> 
            <IonItem className="flex flex-row justify-center text-center" button onClick={()=>{
                  setStatisticVisible(!statisticVisible)
              }}>
                <IonLabel>报表</IonLabel>
                <IonIcon
                  slot="end"
                  icon={statisticVisible ? arrowDown : arrowUp}
                ></IonIcon>
            </IonItem>          
        </IonList>
      </IonContent> 
      <IonContent>
       <IonToolbar className='h-72 mt-36'> 
          <button className="w-24 p-2 text-white rounded-md mt-60 bg-primary-500 hover:bg-primary-700 focus:outline-none">退出</button>
       </IonToolbar>
      </IonContent>
    </IonMenu>

  );
};

export default Menu;
