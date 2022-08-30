import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './Menu';

// import Login from './pages/Login';
import { AppContextProvider } from '../appState';
import Tabs from './pages/Tabs';
import Announcement from './pages/Announcement/query';
import { AnnouncementDetail } from './pages/Announcement/detail';
import { AnnouncementEdit } from './pages/Announcement/edit';
import Black from './pages/Black/query';
import { BlackDetail } from './pages/Black/detail';
import Attendance from './pages/Attendance/query';
import { AttendanceDetail } from './pages/Attendance/detail';

// import Balance from './Balance/query'
import BaseInfo from './pages/baseInfo/query';

import SuperVisorOrgQuery from './pages/SupervisorOrg/query';
import SuperVisorOrgDetail from './pages/SupervisorOrg/detail';
import SuperVisorOrgEdit from './pages/SupervisorOrg/edit';
import Complaint from './pages/Complaint/query';
import Contract from './pages/Contract/query';
import { ContractDetail } from './pages/Contract/detail';
import ContractNego from './pages/contractNego/query';
import Lesson from './pages/lesson/Query';
import LessonDetail from './pages/lesson/Detail';
import LessonAudit from './pages/lesson/Audit';
import OrgMag from './pages/orgMag/Query';
import OrgMagDetail from './pages/orgMag/Detail';
import OrgMagEdit from './pages/orgMag/Edit';
import Teacher from './pages/Teacher/Query';
import Tranfer from './pages/transfer/query';
import TranferDetail from './pages/transfer/detail';
import TranferManul from './pages/TranFerManual/query';
import TeacherDetail from './pages/Teacher/Detail';
import ComplaintDetail from './pages/Complaint/detail';
import Subject from './pages/statistics/Subject';
import OrgSum from './pages/statistics/OrgSum';
import Student from './pages/statistics/Student';
import Income from './pages/statistics/income';
import ChangePwd from './pages/ChangePwd';
import ComplaintStatistic from './pages/statistics/complaint';
import BaseInfoDetail from './pages/baseInfo/Detail';
import BaseInfoEdit from './pages/baseInfo/Edit';
import ChainCode from './pages/ChainCodeInfo';
import ChainCodeSignSum from './pages/ChainCodeSignSum';

import RefundStatistic from './pages/statistics/refund';
import BalanceStatistic from './pages/statistics/balance';
import TransactionStatistic from './pages/statistics/transaction';

import SupervisorAccount from './pages/statistics/SupervisorAccount';

// 装载ionic样式，ionic6 必须执行。
setupIonicReact();
window.matchMedia('(prefers-color-scheme: dark)').addListener(async status => {
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
          <IonSplitPane contentId="main" className="bg-gray-300 shadow-lg">
            <Menu />
            <IonRouterOutlet id="main">
              {/* <Route path="/tabs" render={() => <Tabs />} /> */}
              <Route path="/tabs/announcement/query" component={Announcement} exact={true} />
              <Route path="/tabs/announcement/detail" component={AnnouncementDetail} exact={true} />
              <Route path="/tabs/announcement/edit" component={AnnouncementEdit} exact={true} />
              <Route path="/tabs/attendance/query" component={Attendance} exact={true} />
              <Route path="/tabs/attendance/detail" component={AttendanceDetail} exact={true} />
              <Route path="/tabs/changePwd" component={ChangePwd} exact={true}></Route>
              <Route path="/tabs/supervisorOrg/query" component={SuperVisorOrgQuery} exact={true} />
              <Route
                path="/tabs/supervisorOrg/detail"
                component={SuperVisorOrgDetail}
                exact={true}
              />
              <Route path="/tabs/supervisorOrg/edit" component={SuperVisorOrgEdit} exact={true} />
              <Route path="/tabs/black/query" component={Black} exact={true} />
              <Route path="/tabs/black/detail" component={BlackDetail} exact={true} />
              {/* <Route path="/tabs" render={() => <Redirect to="/tabs/feed" />} exact={true} /> */}
              <Route path="/tabs/baseInfo/query" component={BaseInfo} exact={true} />
              <Route path="/tabs/baseInfo/Detail" component={BaseInfoDetail} exact={true} />
              <Route path="/tabs/baseInfo/Edit" component={BaseInfoEdit} exact={true} />
              <Route path="/tabs/complaint/query" component={Complaint} exact={true} />
              <Route path="/tabs/complaint/query" component={Complaint} exact={true} />
              <Route path="/tabs/complaint/detail" component={ComplaintDetail} exact={true} />
              <Route path="/tabs/contract/query" component={Contract} exact={true} />
              <Route path="/tabs/contract/detail" component={ContractDetail} exact={true} />
              <Route path="/tabs/contractNego/query" component={ContractNego} exact={true} />
              <Route path="/tabs/lesson/query" component={Lesson} exact={true} />
              <Route path="/tabs/lesson/detail" component={LessonDetail} exact={true} />
              <Route path="/tabs/lesson/audit" component={LessonAudit} exact={true} />
              <Route path="/tabs/orgMag/query" component={OrgMag} exact={true} />
              <Route path="/tabs/orgMag/detail" component={OrgMagDetail} exact={true} />
              <Route path="/tabs/orgMag/edit" component={OrgMagEdit} exact={true} />
              <Route path="/tabs/teacher/query" component={Teacher} exact={true} />
              <Route path="/tabs/teacher/detail" component={TeacherDetail} exact={true} />
              <Route path="/tabs/transfer/query" component={Tranfer} exact={true} />
              <Route path="/tabs/transfer/detail" component={TranferDetail} exact={true} />
              <Route path="/tabs/tranferManual/query" component={TranferManul} exact={true} />
              <Route path="/tabs/contractNego/query" component={ContractNego} exact={true} />
              <Route path="/tabs/statistics/orgSum" component={OrgSum} exact={true} />
              <Route path="/tabs/statistics/subject" component={Subject} exact={true} />
              <Route path="/tabs/statistics/student" component={Student} exact={true} />
              <Route path="/tabs/statistics/income" component={Income} exact={true} />
              <Route path="/tabs/chainCode/query" component={ChainCode} exact={true} />
              <Route
                path="/tabs/chainCodeSignSum/query"
                component={ChainCodeSignSum}
                exact={true}
              />

              <Route path="/tabs/statistics/refund" component={RefundStatistic} exact={true} />
              <Route path="/tabs/statistics/balance" component={BalanceStatistic} exact={true} />
              <Route
                path="/tabs/statistics/transaction"
                component={TransactionStatistic}
                exact={true}
              />
              <Route
                path="/tabs/statistics/complaint"
                component={ComplaintStatistic}
                exact={true}
              />
              <Route
                path="/tabs/statistics/supervisorAccount"
                component={SupervisorAccount}
                exact={true}
              />

              {/* <Route path="/login" component={Login} /> */}
              <Route exact path="/" render={() => <Redirect to="/login" />} />
              {/* <Route path="/login" render={() => <Login />} />
              <Route exact path="/" render={() => <Redirect to="/login" />} /> */}
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </AppContextProvider>
  );
};
export default AppShell;
