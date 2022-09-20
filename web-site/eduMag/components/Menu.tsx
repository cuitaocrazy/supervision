import { StatusBar, Style } from "@capacitor/status-bar";
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
  IonCard,
} from "@ionic/react";
import { useEffect, useState, useContext } from "react";
import { flash, arrowDown, arrowUp } from "ionicons/icons";
import { useRouter } from "next/router";
import { AppContext } from "../appState";
import Router from "next/router";
import { Link } from "react-router-dom";
import localforage from "localforage";

const Menu = () => {
  const [isDark, setIsDark] = useState(false);
  const [lessonVisible, setLessonVisible] = useState(false);

  const [attendanceVisible, setAttendanceVisible] = useState(false);
  const [statisticVisible, setStatisticVisible] = useState(false);
  const router = useRouter();
  //todo 以后根据保存到localstorage的信息判断

  // console.log(window.loginUser);
  // if (!window.loginUser) {
  //   console.log("未登录");
  //   router.push("/Login");
  // }

  const MeunPage = [
    { title: "首页", path: "/tabs/home" },
    { title: "基础信息维护", path: "/tabs/baseInfo" },
    {
      title: "业务管理",
      subMenu: [
        { title: "退课管理", path: "/tabs/contractNego/query" },
        { title: "课程协商管理", path: "/tabs/discussQuery" },
        { title: "教师管理", path: "/tabs/teacher/query" },
        { title: "课程管理", path: "/tabs/lesson/query" },
        { title: "课程签到发起", path: "/tabs/attendance/launch" },
        { title: "考勤明细", path: "/tabs/attendance/query" },
      ],
    },
    {
      title: "数币管理",
      subMenu: [
        { title: "当日交易汇总", path: "/tabs/supervisorAccount" },
        { title: "监管账户明细", path: "/tabs/statistic/transaction" },
        { title: "月交易汇总查询", path: "/tabs/tranSumQuery" },
        { title: "缴费订单查询", path: "/tabs/orderQuery" },
        { title: "资金划拨查询", path: "/tabs/transfer/query" },
      ],
    },
  ];

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
    localforage.getItem("loginName").then((value) => {
      if (!value) {
        router.push("/Login");
      }
      // setLoginName(value as string);
    });
    setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

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
        "flex items-center justify-start w-full px-3 py-2 mt-2 space-x-6 rounded-lg hover:text-white focus:bg-primary-500 focus:text-white hover:bg-primary-500 focus:rounded-lg md:w-52";
      let svgHidden = true;
      if (subMenu) {
        className =
          "flex items-center justify-start w-full text-sm px-6 py-2 mt-2 space-x-6 rounded-lg hover:text-white focus:bg-primary-500 focus:text-white hover:bg-primary-500 focus:rounded-lg md:w-52";
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
            onClick={(e) => {
              const element = document.getElementById(menuItem.title);
              if (element != null) {
                element.hidden = !element.hidden;
              }
              const upElement = document.getElementById(
                menuItem.title + "arrowUp"
              );
              if (upElement != null) {
                upElement.hidden = element?.hidden || false;
              }
              const downElement = document.getElementById(
                menuItem.title + "arrowDown"
              );
              if (downElement != null) {
                downElement.hidden = !element?.hidden;
              }
            }}
          >
            {menuItem.title}
            <IonIcon
              name="arrow-down-outline"
              id={menuItem.title + "arrowDown"}
              hidden={false}
            ></IonIcon>
            <IonIcon
              id={menuItem.title + "arrowUp"}
              name="arrow-up-outline"
              hidden={true}
            ></IonIcon>
          </div>
          <div id={menuItem.title} hidden={true}>
            {menuItem.subMenu?.map((subMenuItem) => {
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
      menuId="first"
      contentId="main"
      onIonDidOpen={handleOpen}
      onIonDidClose={handleClose}
      className="w-1/6 "
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle className="py-4 text-center text-white h-14 bg-primary-500">
            教育机构管理系统
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="flex flex-col items-center justify-start w-full h-full px-6 text-white bg-primary-600 scroll-auto">
          {MeunPage.map((menuItem) => {
            return showMenuItem(menuItem);
          })}
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
