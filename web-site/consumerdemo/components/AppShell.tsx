import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonReactRouter, } from '@ionic/react-router';
import { Route, Redirect, Router } from 'react-router-dom';

import Tabs from './pages/Tabs';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Home from './pages/Home';
import OrgList from './pages/OrgList'
import OrgLessonList from './pages/OrgLessonList'
import SearchLessonList from './pages/SearchLessonList'
import SearchLessonDetail from './pages/SearchLessonDetail';
import ShoppingCar from './pages/ShoppingCar';
import ConOrder from './pages/ConOrder';


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
              <Route path="/home" render={() => <Home />} />
              <Route path="/orgList" render={()=> <OrgList />} />
              <Route path="/orgLessonList" render={()=> <OrgLessonList />} />
              <Route path="/searchLessonList" render={()=><SearchLessonList />} />
              <Route path="/searchLessonDetail" render={()=><SearchLessonDetail />} />
              <Route path="/shoppingCar" render={()=><ShoppingCar />} />
              <Route path="/conOrder" render={()=><ConOrder />} />
              <Route exact={true} path="/" render={() => <Redirect to="/tabs" />} />
            </IonRouterOutlet>
          </IonSplitPane>

        </IonReactRouter>
      </IonApp>
    </AppContextProvider>
  );
};

export default AppShell;

