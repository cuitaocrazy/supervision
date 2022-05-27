import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonReactRouter, } from '@ionic/react-router';
import { Route, Redirect, Router } from 'react-router-dom';

import Tabs from './pages/Tabs';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Home from './pages/Home';
import Org from './pages/Org'
import OrgLessonList from './pages/OrgLessonList'


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
              <Route path="/org" render={()=> <Org />} />
              <Route path="/orgLessonList" render={()=> <OrgLessonList />} />
              <Route exact={true} path="/" render={() => <Redirect to="/tabs" />} />
            </IonRouterOutlet>
          </IonSplitPane>

        </IonReactRouter>
      </IonApp>
    </AppContextProvider>
  );
};

export default AppShell;

