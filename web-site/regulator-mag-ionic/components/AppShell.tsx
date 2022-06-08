
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './Menu';

import Login from './pages/Login';
import {AppContextProvider} from '../appState'
import Tabs from './pages/Tabs';
import Announcement from './pages/Announcement/query';
import {AnnouncementDetail} from './pages/Announcement/detail';
import {AnnouncementEdit} from './pages/Announcement/edit';

import Attendance from './pages/Attendance/query';
import {AttendanceDetail} from './pages/Attendance/detail';

// import Balance from './Balance/query'
import BaseInfo from './pages/baseInfo/query'
import Complaint from './pages/Complaint/query'
import Contract from './pages/Contract/query'
import {ContractDetail} from './pages/Contract/detail'
import ContractNego from './pages/contractNego/query'
import Lesson from './pages/lesson/Query'
import LessonDetail from './pages/lesson/Detail'


import OrgMag from './pages/orgMag/Query'
import OrgMagDetail from './pages/orgMag/Detail'
import OrgMagEdit from './pages/orgMag/Edit'
import Teacher from './pages/Teacher/query'
import Tranfer from './pages/TranFer/query'
import TranferManul from './pages/TranFerManual/query'
import TeacherDetail from './pages/Teacher/Detail';

window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
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
          <IonSplitPane contentId="main" className="space-y-16 bg-gray-300 shadow-lg rounded-tl-xl rounded-bl-xl">
            <Menu />
            <IonRouterOutlet id="main">
            {/* <Route path="/tabs" render={() => <Tabs />} /> */}
            <Route path="/tabs/announcement/query" component={Announcement} exact={true} />
            <Route path="/tabs/announcement/detail" component={AnnouncementDetail} exact={true} />
            <Route path="/tabs/announcement/edit" component={AnnouncementEdit} exact={true} />
            <Route path="/tabs/attendance/query" component={Attendance} exact={true} />
            <Route path="/tabs/attendance/detail" component={AttendanceDetail} exact={true} />
            {/* <Route path="/tabs" render={() => <Redirect to="/tabs/feed" />} exact={true} /> */}
            <Route path="/tabs/baseInfo/query" component={BaseInfo} exact={true} />
            <Route path="/tabs/complaint/query" component={Complaint} exact={true} />
            <Route path="/tabs/contract/query" component={Contract} exact={true} />
            <Route path="/tabs/contract/detail" component={ContractDetail} exact={true} />
            <Route path="/tabs/contractNego/query" component={ContractNego} exact={true} />
            <Route path="/tabs/lesson/query" component={Lesson} exact={true} />
            <Route path="/tabs/lesson/detail" component={LessonDetail} exact={true} />
            <Route path="/tabs/orgMag/query" component={OrgMag} exact={true} />
            <Route path="/tabs/orgMag/detail" component={OrgMagDetail} exact={true} />
            <Route path="/tabs/orgMag/edit" component={OrgMagEdit} exact={true} />
            <Route path="/tabs/teacher/query" component={Teacher} exact={true} />
            <Route path="/tabs/teacher/detail" component={TeacherDetail} exact={true} />
            <Route path="/tabs/tranfer/query" component={Tranfer} exact={true} />
            <Route path="/tabs/tranferManual/query" component={TranferManul} exact={true} />
            <Route path="/login" render={() => <Login />} />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </AppContextProvider>
  );
};
export default AppShell;
