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
import { useEffect, useState } from 'react';
import {  flash } from 'ionicons/icons';
import Router from 'next/router'

const Monitorpages1 = [
  {
    title: '交易明细查询(监管机构)',
    icon: flash,
    url: '/tabs/query',
  },
];

const Monitorpages2 = [
  {
    title: '交易汇总查询(监管机构)',
    icon: flash,
    url: '/tabs/transum',
  },
];

const Monitorpages3 = [
  {
    title: '交易监管查询(监管机构)',
    icon: flash,
    url: '/tabs/monitor',
  },
];

const Bankpages1 = [
  {
    title: '交易明细查询(银行)',
    icon: flash,
    url: '/tabs/bankQuery',
  },
];

const Menu = () => {
  const [isDark, setIsDark] = useState(false);
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
    <IonMenu side="start" contentId="main" onIonDidOpen={handleOpen} onIonDidClose={handleClose}>
      <IonHeader >
        <IonToolbar>
          <IonTitle className="text-center">教育资金监管机构管理端</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList >
          {Monitorpages1.map((p, k) => (
            <IonMenuToggle autoHide={false} key={k}>
              <IonItem className="flex flex-row justify-center text-center" routerLink={p.url} routerDirection="none" detail={false} lines="none">
                <IonIcon icon={p.icon} slot="start" />
                <IonLabel className="font-bold">{p.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
        <IonList >
          {Monitorpages2.map((p, k) => (
            <IonMenuToggle autoHide={false} key={k}>
              <IonItem className="flex flex-row justify-center text-center" routerLink={p.url} routerDirection="none" detail={false} lines="none">
                <IonIcon icon={p.icon} slot="start" />
                <IonLabel className="font-bold">{p.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
        <IonList >
        {Monitorpages3.map((p, k) => (
            <IonMenuToggle autoHide={false} key={k}>
              <IonItem className="flex flex-row justify-center text-center" routerLink={p.url} routerDirection="none" detail={false} lines="none">
                <IonIcon icon={p.icon} slot="start" />
                <IonLabel className="font-bold">{p.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
        <IonList >
        {Bankpages1.map((p, k) => (
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
