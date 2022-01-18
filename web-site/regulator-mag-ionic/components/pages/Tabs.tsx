import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import {  flash } from 'ionicons/icons';

import Query from './Query';
import Detail from './Detail';
import TranSum from './TranSumQuery'


const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/query" component={Query} exact={true} />
        <Route path="/tabs/detail" component={Detail} exact={true} />
        <Route path="/tabs" render={() => <Redirect to="/tabs/feed" />} exact={true} />
        <Route path="/tabs/transum" component={TranSum} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/query">
          <IonIcon icon={flash} />
          <IonLabel>查询</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab1" href="/tabs/transum">
          <IonIcon icon={flash} />
          <IonLabel>汇总</IonLabel>
        </IonTabButton>
        {/* <IonTabButton tab="tab2" href="/tabs/detail">
          <IonIcon icon={flash} />
          <IonLabel>测试</IonLabel>
        </IonTabButton> */}
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
