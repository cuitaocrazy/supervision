import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import {  flash } from 'ionicons/icons';

import Query from './Query';
import Detail from './Detail';
import TranSum from './TranSumQuery'
import Monitor from './Monitor'
import BankQuery from './BankQuery'


const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/query" component={Query} exact={true} />
        <Route path="/tabs/detail" component={Detail} exact={true} />
        <Route path="/tabs" render={() => <Redirect to="/tabs/feed" />} exact={true} />
        <Route path="/tabs/transum" component={TranSum} exact={true} />
        <Route path="/tabs/monitor" component={Monitor} exact={true} />
        <Route path="/tabs/bankquery" component={BankQuery} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/query">
          <IonIcon icon={flash} />
          <IonLabel>交易明细查询</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab1" href="/tabs/transum">
          <IonIcon icon={flash} />
          <IonLabel>交易明细汇总查询</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab1" href="/tabs/monitor">
          <IonIcon icon={flash} />
          <IonLabel>交易监管查询</IonLabel>
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
