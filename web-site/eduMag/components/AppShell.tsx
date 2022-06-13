
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './Menu';

import Login from './pages/Login';
import {AppContextProvider} from '../appState'

import BaseInfo from './pages/baseInfo/Detail';
import ChangePwd from './pages/ChangePwd';
import Lesson from './pages/lesson/Query';
import LessonDetail from './pages/lesson/Detail'
import LessonEdit from './pages/lesson/Edit'






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

            <Route path="/tabs/baseInfo/" component={BaseInfo} exact={true} />
            <Route path="/tabs/changePwd/" component={ChangePwd} exact={true} />
            <Route path="/tabs/lesson/query" component={Lesson} exact={true} />
            <Route path="/tabs/lesson/detail" component={LessonDetail} exact={true} />
            <Route path="/tabs/lesson/edit" component={LessonEdit} exact={true} />
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
