import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonReactRouter, } from '@ionic/react-router';
import { Route, Redirect, Router } from 'react-router-dom';

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
import LessonList from './pages/LessonList';
import LessonDetail from './pages/LessonDetail';
import RefoundLesson from './pages/RefundLesson';
import CheckInAndLeave from './pages/CheckInAndLeave';
import CheckInList from './pages/CheckInList'
import FileComp from './pages/FileComp';
import LessonEvalDetail from './pages/LessonEvalDetail';
import PersonalCenter from './pages/PersonalCenter';
import NoticeInfoList from './pages/NoticeInfoList';
import NoticeDetail from './pages/NoticeDetail';
import CompList from './pages/CompList';
import CompDetail from './pages/CompDetail';
import LessonEvalList from './pages/LessonEvalList';
import EditPwd from './pages/EditPwd';
import AutoCheckIn from './pages/AutoCheckIn';
import BatchCheckIn from './pages/BatchCheckIn';
import AllCheckInList from './pages/AllCheckInList';
import PersonalInfo from './pages/PersonalInfo';
import DiscussDetail from './pages/DiscussDetail';
import ECNYPay from './pages/ECNYPay';
import ECNYPayResult from './pages/ECNYPayResult';
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
          <Menu></Menu>

          <IonSplitPane contentId="main" className="space-y-16 bg-gray-300 shadow-lg rounded-tl-xl rounded-bl-xl">
            <Menu />
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
              <Route path="/lessonList" render={() => <LessonList />} />
              <Route path="/lessonDetail" render={() => <LessonDetail />} />
              <Route path="/refoundLesson" render={() => <RefoundLesson />} />
              <Route path="/checkInAndLeave" render={() => <CheckInAndLeave />} />
              <Route path="/checkInList" render={() => <CheckInList />} />
              <Route path="/fileComp" render={() => <FileComp />} />
              <Route path="/lessonEvalDetail" render={() => <LessonEvalDetail />} />
              <Route path="/personalCenter" render={() => <PersonalCenter />} />
              <Route path="/noticeInfoList" render={() => <NoticeInfoList />} />
              <Route path="/noticeDetail" render={() => <NoticeDetail />} />
              <Route path="/compList" render={() => <CompList />} />
              <Route path="/compDetail" render={() => <CompDetail />} />
              <Route path="/lessonEvalList" render={() => <LessonEvalList />} />
              <Route path="/editPwd" render={() => <EditPwd />} />
              <Route path="/autoCheckIn" render={() => <AutoCheckIn />} />
              <Route path="/batchCheckIn" render={() => <BatchCheckIn />} />
              <Route path="/allCheckInList" render={() => <AllCheckInList />} />
              <Route path="/personalInfo" render={() => <PersonalInfo />} />
              <Route path="/discussDetail" render={() => <DiscussDetail />} />
              <Route path="/eCNYPay" render={() => <ECNYPay />} />
              <Route path="/eCNYPayResult" render={() => <ECNYPayResult />} />
              <Route exact={true} path="/" render={() => <Redirect to="/tabs/home" />} />
            </IonRouterOutlet>
          </IonSplitPane>

        </IonReactRouter>
      </IonApp>
    </AppContextProvider>
  );
};

export default AppShell;

