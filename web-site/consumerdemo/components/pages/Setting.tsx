import React from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import Navbar from "components/Navbar";

// 设置页面
const Setting = () => {
  return (
    <IonPage>
      <IonHeader>
        <div className="flex flex-row justify-between h-24 pt-2 text-sm font-medium text-white bg-primary-600">
          <div className="flex">
            <div className="mt-4 ml-5 ">
              <img
                className="rounded-full cursor-pointer w-14 h-14 "
                src="http://placekitten.com/g/200/300"
                alt=""
              />
            </div>
            <div className="mt-6 ml-4">
              <p>江山多姿</p>
              <p className="pt-1">18610206133</p>
            </div>
          </div>
        </div>
      </IonHeader>
      <IonContent>
        <div className=" bg-primary-600">
          <div className="w-full h-4 bg-white rounded-t-full"></div>
          <div className="bg-white">
            <div className="flex justify-center ">
              <input
                value="退出登录"
                type="button"
                className="fixed py-2 font-medium tracking-wider text-white shadow-md w-80 bottom-6 bg-primary-600 rounded-3xl shadow-primary-600"
                onClick={()=>{}}
              />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Setting;
