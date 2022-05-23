import { Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import {
  home,
  flash,
  search
} from 'ionicons/icons';

const Tabs = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href = "/home">
          <IonIcon icon={home} />
          <IonLabel>Tab1</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/login">
          <IonIcon icon={flash} />
          <IonLabel>Tab2</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/">
          <IonIcon icon={search} />
          <IonLabel>Tab3</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
