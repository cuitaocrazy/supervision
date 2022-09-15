import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";

import SearchLessonList from "./pages/SearchLessonList";
import SearchLessonDetail from "./pages/SearchLessonDetail";

import ConOrder from "./pages/ConOrder";

import EditStuInfo from "./pages/EditStuInfo";
import PayResult from "./pages/PayResult";
import MyLessonList from "./pages/MyLessonList";
import MyLessonDetail from "./pages/MyLessonDetail";
import MyNoticeDetail from "./pages/MyNoticeDetail";
import EditPwd from "./pages/EditPwd";

import MyPersonalInfo from "./pages/MyPersonalInfo";
import ECNYPay from "./pages/ECNYPay";
import ECNYPayResult from "./pages/ECNYPayResult";
import StuInfoLIst from "./pages/StuInfoList";
import AddStuInfo from "./pages/AddStuInfo";
import ContentsOfContracts from "./pages/ContentsOfContracts";
import { AppContextProvider } from "../appState";

// 装载ionic样式，ionic6 必须执行。
setupIonicReact();
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addListener(async (status) => {
    try {
      await StatusBar.setStyle({
        style: status.matches ? Style.Dark : Style.Light,
      });
    } catch { }
  });

const AppShell = () => {
  return (
    <AppContextProvider>
      <IonApp>
        <IonReactRouter basename="/consumer">
          {/* <Menu></Menu> */}

          <IonSplitPane
            contentId="main"
            className="rounded-tl-xl rounded-tr-xl"
          >
            <IonRouterOutlet id="main">
              <Route path="/register" render={() => <Register />} />
              <Route path="/home" render={() => <Home />} />

              <Route
                path="/searchLessonList"
                render={() => <SearchLessonList />}
              />
              <Route
                path="/searchLessonDetail"
                render={() => <SearchLessonDetail />}
              />

              <Route path="/conOrder" render={() => <ConOrder />} />
              <Route path="/editStuInfo" render={() => <EditStuInfo />} />
              <Route path="/payResult" render={() => <PayResult />} />
              <Route path="/myLessonList" render={() => <MyLessonList />} />
              <Route path="/myLessonDetail" render={() => <MyLessonDetail />} />
              <Route path="/myNoticeDetail" render={() => <MyNoticeDetail />} />
              <Route path="/editPwd" render={() => <EditPwd />} />
              <Route path="/myPersonalInfo" render={() => <MyPersonalInfo />} />
              <Route path="/eCNYPay" render={() => <ECNYPay />} />
              <Route path="/eCNYPayResult" render={() => <ECNYPayResult />} />
              <Route path="/stuInfoLIst" render={() => <StuInfoLIst />} />
              <Route path="/addStuInfo" render={() => <AddStuInfo />} />
              <Route path="/contract" render={() => <ContentsOfContracts />} />
              <Route
                exact={true}
                path="/"
                render={() => <Redirect to="/home" />}
              />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </AppContextProvider>
  );
};
export default AppShell;
