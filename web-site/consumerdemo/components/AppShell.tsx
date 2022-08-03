import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonReactRouter, } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

import Tabs from './pages/Tabs';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import OrgList from './pages/OrgList'
import OrgLessonList from './pages/OrgLessonList'
import SearchLessonList from './pages/SearchLessonList'
import SearchLessonDetail from './pages/SearchLessonDetail';
import ShoppingCar from './pages/ShoppingCar';
import ConOrder from './pages/ConOrder';
import StuInfoList from './pages/StuInfoList';
import AddStuInfo from './pages/AddStuInfo'
import EditStuInfo from './pages/EditStuInfo'
import PayResult from './pages/PayResult';
import MyLessonList from './pages/MyLessonList';
import MyLessonDetail from './pages/MyLessonDetail';
import RefoundLesson from './pages/RefundLesson';
import CheckInAndLeave from './pages/CheckInAndLeave';
import MyCheckInList from './pages/MyCheckInList'
import MyApplyComp from './pages/MyApplyComp';
import MyLessonEvalDetail from './pages/MyLessonEvalDetail';
import MyPersonalCenter from './pages/MyPersonalCenter';
import MyNoticeInfoList from './pages/MyNoticeInfoList';
import MyNoticeDetail from './pages/MyNoticeDetail';
import MyCompList from './pages/MyCompList';
import MyCompDetail from './pages/MyCompDetail';
import MyLessonEvalList from './pages/MyLessonEvalList';
import EditPwd from './pages/EditPwd';
import MyAutoCheckIn from './pages/MyAutoCheckIn';
import MyBatchCheckIn from './pages/MyBatchCheckIn';
import MyAllCheckInList from './pages/MyAllCheckInList';
import MyPersonalInfo from './pages/MyPersonalInfo';
import ApplyDiscuss from './pages/ApplyDiscuss';
import ECNYPay from './pages/ECNYPay';
import ECNYPayResult from './pages/ECNYPayResult';
import Demo from './pages/Demo'
import Setting from './pages/Setting'
import MyDiscussList from './pages/MyDiscussList'
import MyDiscussDetail from './pages/MyDiscussDetail'
import { AppContextProvider } from '../appState'


// 装载ionic样式，ionic6 必须执行。
setupIonicReact();
window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
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
        <IonReactRouter>
          {/* <Menu></Menu> */}

          <IonSplitPane contentId="main" className="space-y-16 bg-gray-300 shadow-lg rounded-tl-xl rounded-bl-xl">
            {/* <Menu /> */}
            <IonRouterOutlet id="main">
              <Route path="/tabs" render={() => <Tabs />} />
              <Route path="/login" render={() => <Login />} />
              <Route path="/register" render={() => <Register />} />
              <Route path="/home" render={() => <Home />} />
              <Route path="/orgList" render={() => <OrgList />} />
              <Route path="/orgLessonList" render={() => <OrgLessonList />} />
              <Route path="/searchLessonList" render={() => <SearchLessonList />} />
              <Route path="/searchLessonDetail" render={() => <SearchLessonDetail />} />
              <Route path="/shoppingCar" render={() => <ShoppingCar />} />
              <Route path="/conOrder" render={() => <ConOrder />} />
              <Route path="/stuInfoList" render={() => <StuInfoList />} />
              <Route path="/addStuInfo" render={() => <AddStuInfo />} />
              <Route path="/editStuInfo" render={() => <EditStuInfo />} />
              <Route path="/payResult" render={() => <PayResult />} />
              <Route path="/myLessonList" render={() => <MyLessonList />} />
              <Route path="/myLessonDetail" render={() => <MyLessonDetail />} />
              <Route path="/refoundLesson" render={() => <RefoundLesson />} />
              <Route path="/checkInAndLeave" render={() => <CheckInAndLeave />} />
              <Route path="/myCheckInList" render={() => <MyCheckInList />} />
              <Route path="/myApplyComp" render={() => <MyApplyComp />} />
              <Route path="/myLessonEvalDetail" render={() => <MyLessonEvalDetail />} />
              <Route path="/myPersonalCenter" render={() => <MyPersonalCenter />} />
              <Route path="/myNoticeInfoList" render={() => <MyNoticeInfoList />} />
              <Route path="/myNoticeDetail" render={() => <MyNoticeDetail />} />
              <Route path="/mycompList" render={() => <MyCompList />} />
              <Route path="/myCompDetail" render={() => <MyCompDetail />} />
              <Route path="/myLessonEvalList" render={() => <MyLessonEvalList />} />
              <Route path="/editPwd" render={() => <EditPwd />} />
              <Route path="/myAutoCheckIn" render={() => <MyAutoCheckIn />} />
              <Route path="/myBatchCheckIn" render={() => <MyBatchCheckIn />} />
              <Route path="/myAllCheckInList" render={() => <MyAllCheckInList />} />
              <Route path="/myPersonalInfo" render={() => <MyPersonalInfo />} />
              <Route path="/applyDiscuss" render={() => <ApplyDiscuss />} />
              <Route path="/eCNYPay" render={() => <ECNYPay />} />
              <Route path="/eCNYPayResult" render={() => <ECNYPayResult />} />
              <Route path="/setting" render={() => <Setting />} />
              <Route path="/demo" render={() => <Demo />} />
              <Route path="/myDiscussList" render={() => <MyDiscussList />} />
              <Route path="/myDiscussDetail" render={() => <MyDiscussDetail />} />
              <Route exact={true} path="/" render={() => <Redirect to="/tabs/home" />} />
            </IonRouterOutlet>
          </IonSplitPane>

        </IonReactRouter>
      </IonApp>
    </AppContextProvider>
  );
};

export default AppShell;

