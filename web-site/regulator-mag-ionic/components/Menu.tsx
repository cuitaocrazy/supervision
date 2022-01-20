import { StatusBar, Style } from '@capacitor/status-bar';
import {
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
import {  flash } from 'ionicons/icons';
import Router from 'next/router'
import {AppContext} from '../appState';

const pages = [
  {
    title: '监管机构查询',
    icon: flash,
    url: '/tabs/query',
    role: 'SV',
  },
  {
    title: '教育机构查询',
    icon: flash,
    url: '/tabs/USVQuery',
    role: 'USV',
  },
  {
    title: '金融机构查询',
    icon: flash,
    url: '/tabs/financeQuery',
    role: 'Finance',
  },
  {
    title: '监管机构汇总',
    icon: flash,
    url: '/tabs/transum',
    role: 'SV',
  },
];




const Menu = () => {
  const [isDark, setIsDark] = useState(false);
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
  }, [state.userInfo.role]);


  return (
    <IonMenu hidden={state.userInfo.role===''} side="start" contentId="main" onIonDidOpen={handleOpen} onIonDidClose={handleClose}>
      <IonHeader >
        <IonToolbar>
          <IonTitle className="text-center">教育资金监管机构管理端</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList >
          {pages.filter((p)=>{
              return p.role===state.userInfo.role
          }).map((p, k) => (
            <IonMenuToggle autoHide={false} key={k}>
              <IonItem className="flex flex-row justify-center text-center" routerLink={p.url} routerDirection="none" detail={false} lines="none">
                <IonIcon icon={p.icon} slot="start" />
                <IonLabel className="font-bold">{p.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>

  );
};

export default Menu;
