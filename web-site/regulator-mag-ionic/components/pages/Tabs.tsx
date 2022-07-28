import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { flash } from 'ionicons/icons';

import Announcement from './Announcement/query';
import Attendance from './Attendance/query';
// import Balance from './Balance/query'
import BaseInfo from './baseInfo/query';
import Complaint from './Complaint/query';
import Contract from './Contract/query';
import ContractNego from './contractNego/query';
import Lesson from './lesson/Query';
import OrgMag from './orgMag/Query';
import Teacher from './Teacher/Query';
import Tranfer from './transfer/query';
import TranferManul from './TranFerManual/query';
// import Login from './Login';

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/announcement/query" component={Announcement} exact={true} />
        <Route path="/tabs/attendance/query" component={Attendance} exact={true} />
        {/* <Route path="/tabs" render={() => <Redirect to="/tabs/feed" />} exact={true} /> */}
        <Route path="/tabs/baseInfo/query" component={BaseInfo} exact={true} />
        <Route path="/tabs/complaint/query" component={Complaint} exact={true} />
        <Route path="/tabs/contract/query" component={Contract} exact={true} />
        <Route path="/tabs/contractNego/query" component={ContractNego} exact={true} />
        <Route path="/tabs/lesson/query" component={Lesson} exact={true} />
        <Route path="/tabs/orgMag/query" component={OrgMag} exact={true} />
        <Route path="/tabs/teacher/query" component={Teacher} exact={true} />
        <Route path="/tabs/tranfer/query" component={Tranfer} exact={true} />
        <Route path="/tabs/tranferManual/query" component={TranferManul} exact={true} />
        {/* <Route path="/login" component={Login} exact={true} /> */}
        <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default Tabs;
