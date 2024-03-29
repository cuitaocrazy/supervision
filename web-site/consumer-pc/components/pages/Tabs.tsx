import { Route } from "react-router-dom";
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { home, school, cart, person, list } from "ionicons/icons";
import Home from "./Home";
import MyLessonList from "./MyLessonList";

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/home" component={Home} exact={true} />
        <Route
          path="/tabs/myLessonList"
          component={MyLessonList}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="首页" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel>首页</IonLabel>
        </IonTabButton>
        <IonTabButton tab="机构" href="/orgList">
          <IonIcon icon={school} />
          <IonLabel>机构</IonLabel>
        </IonTabButton>
        <IonTabButton tab="课程" href="/tabs/myLessonList">
          <IonIcon icon={list} />
          <IonLabel>课程</IonLabel>
        </IonTabButton>
        <IonTabButton tab="购物车" href="/shoppingCar">
          <IonIcon icon={cart} />
          <IonLabel>购物车</IonLabel>
        </IonTabButton>
        <IonTabButton tab="我的" href="/myPersonalCenter">
          <IonIcon icon={person} />
          <IonLabel>我的</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
