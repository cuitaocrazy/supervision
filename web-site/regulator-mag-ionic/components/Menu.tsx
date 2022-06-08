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
import Router from 'next/router'
import {AppContext} from '../appState';

const pages = [
  // {
  //   title: '基本信息维护',
  //   item:[
  //     {
  //       title: '教育机构管理0',
  //       icon: flash,
  //       url: '/tabs/orgMag/query',
  //     },
  //     {
  //       title: '教育机构管理1',
  //       icon: flash,
  //       url: '/tabs/orgMag/query',
  //     },
  //   ]
  // },
];


const Menu = () => {
  const [isDark, setIsDark] = useState(false);
  const [baseInfoVisible, setBaseInfoVisible] = useState(false);
  const [eduOrgMagVisible, setEduOrgMagVisible] = useState(false);
  const [fundVisible, setFundVisible] = useState(false);
  const { state } = useContext(AppContext);
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
          <IonTitle className="text-center">教育资金监管管理端</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList >

              <IonItem className="flex flex-row justify-center text-center" button onClick={()=>{
                  setBaseInfoVisible(!baseInfoVisible)
              }}>
                <IonIcon slot="start" icon={'informationCircleOutline'}></IonIcon>
                <IonLabel>基本信息维护</IonLabel>
                <IonIcon
                  slot="end"
                  icon={baseInfoVisible ? arrowDown : arrowUp}
                ></IonIcon>
              </IonItem>
              <IonMenuToggle autoHide={!baseInfoVisible} key={'baseInfo'}>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'用户管理'}</IonLabel>
                </IonItem>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'监管机构管理'}</IonLabel>
                </IonItem>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'系统字典维护'}</IonLabel>
                </IonItem>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'修改密码'}</IonLabel>
                </IonItem>
            </IonMenuToggle>
            <IonItem className="flex flex-row justify-center text-center" button onClick={()=>{
                  setEduOrgMagVisible(!eduOrgMagVisible)
              }}>
                <IonLabel>教育机构管理</IonLabel>
                <IonIcon
                  slot="end"
                  icon={eduOrgMagVisible ? arrowDown : arrowUp}
                ></IonIcon>
            </IonItem>
            <IonMenuToggle autoHide={!eduOrgMagVisible} key={'eduMag'}>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/orgMag/query'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'教育机构管理'}</IonLabel>
                </IonItem>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/teacher/query'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'查看教师信息'}</IonLabel>
                </IonItem>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/lesson/query'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'课程管理'}</IonLabel>
                </IonItem>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/announcement/query'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'政策公告'}</IonLabel>
                </IonItem>
                <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'黑名单管理'}</IonLabel>
                </IonItem>
            </IonMenuToggle>
            <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/contract/query'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'合同管理'}</IonLabel>
            </IonItem>
            <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/attendance/query'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'考勤管理'}</IonLabel>
            </IonItem>

            <IonItem className="flex flex-row justify-center text-center" button onClick={()=>{
                  setFundVisible(!fundVisible)
              }}>
                <IonLabel>资金管理</IonLabel>
                <IonIcon
                  slot="end"
                  icon={fundVisible ? arrowDown : arrowUp}
                ></IonIcon>
            </IonItem>
            <IonMenuToggle autoHide={!fundVisible} key={'fund'}>
              <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/tranferManual/query'} routerDirection="none" detail={false} lines="none">
                <IonLabel className="font-bold">{'手动划拨'}</IonLabel>
              </IonItem>
              <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/contractNego/query'} routerDirection="none" detail={false} lines="none">
                <IonLabel className="font-bold">{'手动退课'}</IonLabel>
              </IonItem>
              <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/contractNego/query'} routerDirection="none" detail={false} lines="none">
                <IonLabel className="font-bold">{'查看账户余额'}</IonLabel>
              </IonItem>
              <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/contractNego/query'} routerDirection="none" detail={false} lines="none">
                <IonLabel className="font-bold">{'划拨清单'}</IonLabel>
              </IonItem>
            </IonMenuToggle>         
            <IonItem  className="flex flex-row justify-center text-center" routerLink={'/tabs/complaint/query'} routerDirection="none" detail={false} lines="none">
                  <IonIcon icon={flash} slot="start" />
                  <IonLabel className="font-bold">{'投诉管理'}</IonLabel>
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
