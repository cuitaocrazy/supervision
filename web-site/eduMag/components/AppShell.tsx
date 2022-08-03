import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./Menu";

import Login from "../pages/Login";
import { AppContext, AppContextProvider } from "../appState";
import BaseInfo from "./pages/baseInfo/Detail";
import ChangePwd from "./pages/ChangePwd";
import Lesson from "./pages/lesson/Query";
import LessonDetail from "./pages/lesson/Detail";
import LessonEdit from "./pages/lesson/Edit";
import SupervisorAccount from "./pages/SupervisorAccount";
import Announcement from "./pages/Announcement/query";
import { AnnouncementDetail } from "./pages/Announcement/detail";
import TranFer from "./pages/TranFer/query";
import TranFerDetail from "./pages/TranFer/detail";
import Attendance from "./pages/attendance/query";
import { AttendanceDetail } from "./pages/attendance/detail";
import AttendanceLaunch from "./pages/attendance/launch";
import ContractNego from "./pages/contractNego/query";
import Teacher from "./pages/teacher/Query";
import TeacherDetail from "./pages/teacher/Detail";
import TeacherEdit from "./pages/teacher/Edit";
import Income from "./pages/statistic/income";
import Refund from "./pages/refund/query";
import OrderQuery from "./pages/OrderQuery";
import Discuss from "./pages/Discuss/query";
import DiscussDetail from "./pages/Discuss/detail";
import { useContext } from "react";

// 装载ionic样式，ionic6 必须执行。
setupIonicReact();
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addListener(async (status) => {
    try {
      await StatusBar.setStyle({
        style: status.matches ? Style.Dark : Style.Light,
      });
    } catch {}
  });

const AppShell = () => {
  return (
    <AppContextProvider>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane
            when={true}
            contentId="main"
            className="space-y-16 bg-gray-300 shadow-lg rounded-tl-xl rounded-bl-xl"
          >
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/tabs/baseInfo/" component={BaseInfo} exact={true} />
              <Route
                path="/tabs/changePwd/"
                component={ChangePwd}
                exact={true}
              />
              <Route
                path="/tabs/lesson/query"
                component={Lesson}
                exact={true}
              />
              <Route
                path="/tabs/lesson/detail"
                component={LessonDetail}
                exact={true}
              />
              <Route
                path="/tabs/lesson/edit"
                component={LessonEdit}
                exact={true}
              />
              <Route
                path="/tabs/teacher/query"
                component={Teacher}
                exact={true}
              />
              <Route
                path="/tabs/teacher/detail"
                component={TeacherDetail}
                exact={true}
              />
              <Route
                path="/tabs/teacher/edit"
                component={TeacherEdit}
                exact={true}
              />
              <Route
                path="/tabs/refund/query"
                component={Refund}
                exact={true}
              />
              <Route
                path="/tabs/contractNego/query"
                component={ContractNego}
                exact={true}
              />
              <Route
                path="/tabs/attendance/query"
                component={Attendance}
                exact={true}
              />
              <Route
                path="/tabs/attendance/detail"
                component={AttendanceDetail}
                exact={true}
              />
              <Route
                path="/tabs/attendance/launch"
                component={AttendanceLaunch}
                exact={true}
              />
              <Route
                path="/tabs/transfer/query"
                component={TranFer}
                exact={true}
              />
              <Route
                path="/tabs/transfer/detail"
                component={TranFerDetail}
                exact={true}
              />
              <Route
                path="/tabs/changePwd"
                component={ChangePwd}
                exact={true}
              />
              <Route
                path="/tabs/supervisorAccount"
                component={SupervisorAccount}
                exact={true}
              />
              <Route
                path="/tabs/announcement/query"
                component={Announcement}
                exact={true}
              />
              <Route
                path="/tabs/announcement/detail"
                component={AnnouncementDetail}
                exact={true}
              />
              <Route
                path="/tabs/statistic/income"
                component={Income}
                exact={true}
              />
              <Route
                path="/tabs/orderQuery"
                component={OrderQuery}
                exact={true}
              />
              <Route
                path="/tabs/discussQuery"
                component={Discuss}
                exact={true}
              />
              <Route
                path="/tabs/discussInfo/detail"
                component={DiscussDetail}
                exact={true}
              />
              <Route exact path="/" render={() => <Redirect to="/login" />} />
            </IonRouterOutlet>
          </IonSplitPane>
          {/* <IonRouterOutlet>
            <Route path="/login" render={() => <Login />} />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
          </IonRouterOutlet> */}
        </IonReactRouter>
      </IonApp>
    </AppContextProvider>
  );
};
export default AppShell;
