import { FC, useEffect, useState, useCallback, useContext } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonRow,
  IonCol,
  IonLabel,
  useIonToast,
} from "@ionic/react";
import Navbar from "../Navbar";

const CardRightsAndInterests = () => {
  return (
    <IonPage>
      <IonHeader>
        <Navbar title="权益详情" />
      </IonHeader>
      <IonContent>
        <div className="p-4 mx-2 my-4 text-gray-500 shadow-lg">
          <div className="text-lg font-bold">黑马程序员(前端进阶课)</div>
          <div className="flex mt-2 font-bold ">
            <div className="">张大宝剩余:</div>
            <div className="text-primary-600">
              <span>25</span>
              <span>课时</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="pt-2 text-sm tracking-wider text-center text-gray-500">
              进度：
              <label className="text-base font-medium text-primary-700">
                25课时
              </label>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-1">
              <div className="bg-primary-600 h-1.5 rounded-full w-1/2"></div>
            </div>
            <div className="flex items-end justify-end mt-1">
              <div className="text-sm">共50课时</div>
            </div>
          </div>
        </div>
        {/* 权益使用规则 */}
        <div className="px-4 py-4 mx-2 my-4 text-gray-500 rounded-md shadow-lg">
          <div className="mb-2 font-bold">
            权益介绍：
          </div>
          <div>
            1.家长购课后，学生可在规定时间内上课；
          </div>
          <div>
            2.本课程共含有50课时，上课时间为每周六上午10:00-11:00;
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CardRightsAndInterests;
