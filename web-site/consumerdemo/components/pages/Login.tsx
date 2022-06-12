import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { phonePortrait, mailOutline } from 'ionicons/icons';

import styles from './Login.module.css';

// 登录页面
const Login = () => {
  return <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle >登录/注册</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonList className={styles.list}>
        <IonItem>
          <IonIcon icon={phonePortrait}></IonIcon>
          <IonInput placeholder="请输入手机号" ></IonInput>
        </IonItem>
        <IonItem>
          <IonIcon icon={mailOutline}></IonIcon>
          <IonInput placeholder="请输入验证码" ></IonInput>
          <IonButton shape="round" color="primary" fill="outline">获取验证码</IonButton>
        </IonItem>
        <IonItem lines="none" >
          <IonButton color="primary" shape="round" fill="outline" expand="block" size="default">登录/注册</IonButton>
        </IonItem>
      </IonList>

    </IonContent>
    {/* <div className="flex h-screen bg-primary-50">
      <form onSubmit={() => { }} className="p-12 px-6 py-10 pt-4 mx-auto my-auto bg-white rounded-lg shadow-md border-primaryColor-300 w-80">
        <fieldset>
          <legend className="mb-4 text-3xl font-semibold text-center text-gray-800">登录</legend>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-600">用户名</label>
            <input type="text" className="relative block w-full px-1 py-3 pl-4 text-base bg-white border rounded-md border-primary-200 focus:outline-none focus:glow-secondary-500" />
          </div>
          <div className="mt-6">
            <label className="block mb-2 text-sm font-semibold text-gray-600">密码</label>
            <input type="password" className="relative block w-full px-1 py-3 pl-4 text-base bg-white border rounded-md border-primary-200 focus:outline-none focus:glow-secondary-500" />
          </div>
        </fieldset>
        <input type="submit" className="w-full py-3 my-10 mb-1 text-base font-medium text-white rounded-md shadow-md bg-secondary-500 focus:outline-none hover:bg-secondary-700 hover:shadow-none"
          value="登录" />
      </form>
    </div> */}
  </IonPage>

}

export default Login;
