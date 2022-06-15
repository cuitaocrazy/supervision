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
import { useEffect, useState, useContext } from 'react';
import { flash } from 'ionicons/icons';
import Router from 'next/router'
import { AppContext } from '../../appState';

const pages = [
  {
    title: '首页',
    icon: flash,
    url: '/tabs/home',
  },
  {
    title: '机构',
    icon: flash,
    url: '/tabs/orgList',
  },
  {
    title: '课程',
    icon: flash,
    url: '/tabs/lessonList',
  },
  {
    title: '购物车',
    icon: flash,
    url: '/tabs/shoppingCar',
  },
  {
    title: '我的',
    icon: flash,
    url: '/tabs/personalCenter',
  }
];

const Menu = () => {
  const [isDark, setIsDark] = useState(false);
  const { state } = useContext(AppContext);
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



  return (
    <IonMenu hidden={true} side="start" contentId="main" onIonDidOpen={handleOpen} onIonDidClose={handleClose}>
      <IonHeader >
        <IonToolbar>
          <IonTitle className="text-center">教育资金监管</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList >
          {pages.map((p, k) => (
            <IonMenuToggle autoHide={false} key={k}>
              <IonItem className="flex flex-row justify-center text-center" routerLink={p.url} routerDirection="none" detail={false} lines="none">
                <IonIcon icon={p.icon} slot="start" />
                <IonLabel className="font-bold">{p.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
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
