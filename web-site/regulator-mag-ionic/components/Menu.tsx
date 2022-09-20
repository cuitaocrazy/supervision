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
import {
  useEffect,
  useState,
  useContext,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';
import { flash, arrowDown, arrowUp } from 'ionicons/icons';
import { useRouter } from 'next/router';
import { AppContext } from '../appState';
import { Link, Redirect, Route } from 'react-router-dom';
import localforage from 'localforage';
import { LocationDescriptor, Location } from 'history';

const pages = [];

const Menu = () => {
  const [isDark, setIsDark] = useState(false);
  const [baseInfoVisible, setBaseInfoVisible] = useState(false);
  const [eduOrgMagVisible, setEduOrgMagVisible] = useState(false);
  const [fundVisible, setFundVisible] = useState(false);
  const [statisticVisible, setStatisticVisible] = useState(false);
  const { state } = useContext(AppContext);
  const router = useRouter();

  // console.log(window.loginUser);
  // if (!window.loginUser) {
  //   console.log('未登录');
  //   router.push('/Login');
  // }

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
    localforage.getItem('loginName').then(value => {
      if (!value) {
        router.push('/Login');
      }
      // setLoginName(value as string);
    });
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  // const MeunPage = [
  //   { title: '首页', path: '/tabs/statistics/supervisorAccount' },
  //   { title: '教育机构管理', path: '/tabs/orgMag/query' },
  //   { title: '课程管理', path: '/tabs/orgMag/query' },
  //   { title: '合同管理', path: '/tabs/contract/query' },
  //   { title: '考勤管理', path: '/tabs/attendance/query' },
  //   { title: '划拨清单', path: '/tabs/teacher/query' },
  //   { title: '修改密码', path: '/tabs/changePwd' },
  //   { title: '用户管理', path: '/tabs/baseInfo/query' },
  //   { title: '手动划拨', path: '/tabs/tranferManual/query' },
  //   { title: '手动退课', path: '/tabs/contractNego/query' },
  //   { title: '政策公告', path: '/tabs/announcement/query' },
  //   { title: '黑名单管理', path: '/tabs/black/query' },
  //   { title: '投诉管理', path: '/tabs/complaint/query' },
  //   { title: '智能合约部署查询', path: '/tabs/chainCode/query' },
  //   { title: '智能合约签署汇总查询', path: '/tabs/chainCodeSignSum/query' },
  //   { title: '商户退款信息查询', path: '/tabs/statistics/refund' },
  //   { title: '监管账户余额查询', path: '/tabs/statistics/balance' },
  //   { title: '监管账户流水查询', path: '/tabs/statistics/transaction' },
  //   { title: '监管账户清算明细查询', path: '/tabs/statistics/transaction' },
  //   { title: '月交易汇总查询', path: '/tabs/tranSumQuery' },
  // ];

  const MeunPage = [
    { title: '首页', path: '/tabs/statistics/supervisorAccount' },
    {
      title: '系统管理',
      subMenu: [
        { title: '修改密码', path: '/tabs/changePwd' },
        { title: '政策公告', path: '/tabs/announcement/query' },
        { title: '黑名单管理', path: '/tabs/black/query' },
        { title: '用户管理', path: '/tabs/baseInfo/query' },
      ],
    },
    {
      title: '业务管理',
      subMenu: [
        { title: '教育机构管理', path: '/tabs/orgMag/query' },
        { title: '课程管理', path: '/tabs/orgMag/query' },
        { title: '教师管理', path: '/tabs/teacher/query' },
        { title: '手动退课', path: '/tabs/contractNego/query' },
        { title: '投诉管理', path: '/tabs/complaint/query' },
      ],
    },

    {
      title: '合约管理',
      subMenu: [
        { title: '合同管理', path: '/tabs/contract/query' },
        { title: '合约执行', path: '/tabs/attendance/query' },
        { title: '合约资金划拨', path: '/tabs/tranferManual/query' },
        { title: '合约部署信息', path: '/tabs/chainCode/query' },
        { title: '合约签署汇总', path: '/tabs/chainCodeSignSum/query' },
      ],
    },
    {
      title: '数币管理',
      subMenu: [
        { title: '商户退款信息查询', path: '/tabs/statistics/refund' },
        { title: '监管账户余额查询', path: '/tabs/statistics/balance' },
        { title: '监管账户流水查询', path: '/tabs/statistics/transaction' },
        { title: '监管账户清算明细查询', path: '/tabs/statistics/transaction' },
        { title: '月数币交易汇总查询', path: '/tabs/tranSumQuery' },
      ],
    },
  ];

  const showMenuItem = (
    menuItem: {
      path?: string;
      title: string;
      subMenu?: { path: string; title: string }[];
    },
    subMenu?: boolean
  ) => {
    if (menuItem.path) {
      let className =
        'flex items-center justify-start w-full px-3 py-2 mt-2 space-x-6 rounded-lg hover:text-white focus:bg-primary-500 focus:text-white hover:bg-primary-500 focus:rounded-lg md:w-52';
      let svgHidden = true;
      if (subMenu) {
        className =
          'flex items-center justify-start w-full px-6 py-2 mt-2 space-x-6 text-sm rounded-lg hover:text-white focus:bg-primary-500 focus:text-white hover:bg-primary-500 focus:rounded-lg md:w-52';
        svgHidden = false;
      }

      return (
        <Link className={className} to={menuItem.path}>
          <div hidden={svgHidden}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 "
              fill="none"
              viewBox="0 0 32 32"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>

          <span>{menuItem.title}</span>
        </Link>
      );
    } else {
      return (
        <>
          <div
            className="flex items-center justify-start w-full px-3 py-2 mt-2 space-x-6 rounded-lg hover:text-white focus:bg-primary-500 focus:text-white hover:bg-primary-500 focus:rounded-lg md:w-52"
            onClick={e => {
              const element = document.getElementById(menuItem.title);
              if (element != null) {
                element.hidden = !element.hidden;
              }
              const upElement = document.getElementById(menuItem.title + 'arrowUp');
              if (upElement != null) {
                upElement.hidden = !upElement.hidden;
              }
              const downElement = document.getElementById(menuItem.title + 'arrowDown');
              if (downElement != null) {
                downElement.hidden = !downElement.hidden;
              }
            }}
          >
            {menuItem.title}
            <IonIcon
              name="arrow-down-outline"
              id={menuItem.title + 'arrowDown'}
              hidden={false}
            ></IonIcon>
            <IonIcon
              id={menuItem.title + 'arrowUp'}
              name="arrow-up-outline"
              hidden={true}
            ></IonIcon>
            {/* <ion-icon name="arrow-down-outline" id={menuItem.title + 'arrowDown'} hidden={false}></ion-icon>
            <ion-icon name="arrow-up-outline" id={menuItem.title + 'arrowUp' hidden={true}}></ion-icon> */}
          </div>
          <div id={menuItem.title} hidden={true}>
            {menuItem.subMenu?.map(subMenuItem => {
              return showMenuItem(subMenuItem, true);
            })}
          </div>
        </>
      );
    }
  };

  return (
    <IonMenu
      hidden={false}
      side="start"
      contentId="main"
      onIonDidOpen={handleOpen}
      onIonDidClose={handleClose}
      className="w-1/6 "
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle className="py-4 text-center text-white bg-primary-500 h-14">
            教育资金监管管理端
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="flex flex-col items-center justify-start w-full h-full px-6 text-white bg-primary-600 scroll-auto">
          {MeunPage.map(menuItem => {
            return showMenuItem(menuItem);
          })}
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
