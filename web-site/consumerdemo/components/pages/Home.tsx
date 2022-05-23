import React, { useState, useCallback, useContext } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonButton,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';


const Home = () => {
  return (
    // <IonPage>
    //   <IonHeader>
    //     <IonToolbar>
    //       <IonTitle>测试页面</IonTitle>
    //     </IonToolbar>
    //   </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>测试label</IonLabel>
          </IonListHeader>

            <IonItem key="01"  button>
              <IonThumbnail slot="start">
                <img src=""/>
              </IonThumbnail>
              <IonLabel>
                <h2>测试1</h2>
                <p>测试1</p>
              </IonLabel>
            </IonItem>
            <IonItem key="02"  button>
              <IonThumbnail slot="start">
                <img src=""/>
              </IonThumbnail>
              <IonLabel>
                <h2>测试2</h2>
                <p>测试2</p>
              </IonLabel>
            </IonItem>

        </IonList>

        <IonList>
          <IonListHeader>
            <IonLabel>新课程测试</IonLabel>
          </IonListHeader>
          <IonGrid>
            <IonRow>
                <IonCol
                  size="6"
                  className="newLesson"
                  key="1"
                >
                  <img src="" />
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>测试3</h3>
                      <p>测试3</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol
                  size="6"
                  className="newLesson"
                  key="4"
                >
                  <img src="" />
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>测试4</h3>
                      <p>测试4</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>

    // </IonPage>
  );
};

export default Home;
