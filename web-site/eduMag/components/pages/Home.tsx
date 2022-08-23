import { FC, useEffect, useState, useCallback, useContext } from "react";
import { IonPage, IonRow, IonCol, IonLabel,useIonToast } from "@ionic/react";
import Quit from "components/components/Quit";

// 首页
const Home:FC=()=>{
  return (
    <IonPage className="bg-white">
      <Quit />
      <div className="relative w-full h-screen mx-6 overflow-auto h-scren">
        <div className="flex pt-2 my-2 text-gray-800">
          <div className="mr-2 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="">
            <span className="pr-1 text-gray-600">账户资金汇总</span>
            
          </div>
        </div>

        <div className="absolute w-full mt-10">
          
        </div>
      </div>
    </IonPage>
  )

}

export default Home