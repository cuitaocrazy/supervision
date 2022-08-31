import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, IonTabs } from "@ionic/react";

import Announcement from "./Announcement/query";
import ContractNego from "./contractNego/query";
import Lesson from "./lesson/Query";
import Tranfer from "./TranFer/query";
import Login from "pages/Login";

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route
          path="/tabs/announcement/query"
          component={Announcement}
          exact={true}
        />
        <Route
          path="/tabs/contractNego/query"
          component={ContractNego}
          exact={true}
        />
        <Route path="/tabs/lesson/query" component={Lesson} exact={true} />
        <Route path="/tabs/tranfer/query" component={Tranfer} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default Tabs;
