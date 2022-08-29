//BaseInfo的详细页面
import React, { useState } from "react";
import {
  IonPage,
  IonCard,
  IonRadioGroup,
  IonRadio,
  IonCardHeader,
  IonCardSubtitle,
  IonLabel,
  IonInput,
  IonCardContent,
  IonItem,
  IonButton,
  IonList,
  IonDatetime,
  IonPicker,
  IonCol,
  IonRow,
} from "@ionic/react";
import { Redirect } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { AppContext, setEduOrgDetail } from "../../appState";
import { PickerColumn } from "@ionic/core";
import Quit from "components/components/Quit";

export const SupervisorAccount: React.FC = () => {
  //   const queryURL = 'http://localhost:3003/baseInfo/query'
  const [supversingAccountAmt, setSupversingAccountAmt] = useState("******");
  const [buyCardNumber, setBuyCardNumber] = useState("0");
  const [buyCardAmt, setBuyCardAmt] = useState("0");
  const [refundNumber, setRefundNumber] = useState("0");
  const [refundAmt, setRefundAmt] = useState("0");
  const [transferNumber, setTranferNumber] = useState("0");
  const [transferAmt, setTranferAmt] = useState("0");
  const onQuery = () => {
    //todo fetch
    fetch(paramStr, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const {
          result,
          buyCardNumber,
          buyCardAmt,
          refundNumber,
          refundAmt,
          transferNumber,
          transferAmt,
        } = json;
        if (result) {
          setBuyCardNumber(buyCardNumber);
          setBuyCardAmt(buyCardAmt);
          setRefundNumber(refundNumber);
          setRefundAmt(refundAmt);
          setTranferNumber(transferNumber);
          setTranferAmt(transferAmt);
        }
      });
  };
  useEffect(onQuery, []);

  const findURL = "http://localhost:3003/edu/transaction/sum";
  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach((key) => {
      if (params[key]) result = result + key + "=" + params[key] + "&";
    });
    return url + result;
  };

  //todo 从localStoge中取值
  const paramStr = getParamStr(
    {
      loginName: window.loginUser,
    },
    findURL
  );
  const onClick = () => {
    //todo fetch
    setSupversingAccountAmt("1000");
  };

  return (
    <IonPage className="bg-gray-100">
      <Quit />
      <div className="relative w-full h-screen mx-6 overflow-auto">
        {/* <div className="flex pt-2 my-2 text-gray-800">
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
          <div>
            <span className="pr-1 text-gray-600">监管账户余额</span>
          </div>
        </div> */}
        <div className="w-11/12 h-screen px-4 py-2 mt-4 bg-white rounded-lg">
          <span className="font-bold">监管账户汇总</span>
          <hr className="mt-2 mb-4" />
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-screen h-96">
              <svg
                className="rounded-lg cursor-pointer"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1876"
                width="200"
                height="200"
              >
                <path
                  d="M512 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512S0 794.7776 0 512 229.2224 0 512 0z m121.856 260.2496c-19.3536-10.3936-44.3904-1.024-55.7056 20.992l-20.6848 40.0896c-0.3072 0.512-0.768 1.0752-1.0752 1.8432l-21.248 41.1648h-0.2048l-21.5552 41.728-21.6064-41.728h-0.2048l-21.248-41.1648-1.0752-1.8432-20.6848-40.0896c-11.1616-21.76-36.352-31.2832-55.7056-20.992-19.4048 10.3936-25.856 36.5568-14.592 58.5728l25.6 49.7664 21.8112 42.1888H366.8992c-24.4224 0-44.3392 18.1248-44.3392 40.2432 0 22.2208 19.968 40.2944 44.3392 40.2944h105.984v58.0096h-105.984c-24.4224 0-44.3392 18.176-44.3392 40.2944 0 22.2208 19.968 40.2944 44.3392 40.2944h105.984v97.28c0 24.7808 17.92 45.1072 39.7312 45.1072 21.76 0 39.7312-20.3264 39.7312-45.056v-97.536h106.1888c24.3712 0 44.3392-18.176 44.3392-40.2944 0-22.2208-19.968-40.2944-44.3392-40.2944h-106.2912V491.3152h106.3936c24.4224 0 44.3392-18.176 44.3392-40.2944 0-22.2208-19.968-40.2432-44.3392-40.2432h-57.6l21.8112-42.1888 25.6-49.7664c11.264-22.016 4.8128-48.2816-14.5408-58.5728z"
                  p-id="1877"
                  fill="#5045E4"
                ></path>
              </svg>
              {/* <img className="rounded-lg cursor-pointer" src='http://placekitten.com/g/200/300' alt="" /> */}
            </div>

            <div className="mt-6">
              <span className="font-bold">教育机构监管账户余额：</span>
              <span className="text-lg text-orange-600 font-blod">
                {supversingAccountAmt}
              </span>
              <span className="pl-1 font-bold">元</span>
              <a className="pl-2 text-sm text-blue-600" onClick={onClick}>
                点击查看
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 justify-items-stretch">
            <div className="items-center h-20 pt-8 text-center bg-red-100">
              今日购课数量:{buyCardNumber}
            </div>
            <div className="items-center h-20 pt-8 text-center bg-red-300">
              今日购课金额:{buyCardAmt}
            </div>
            <div className="items-center h-20 pt-8 text-center bg-yellow-100">
              今日退课数量:{refundNumber}
            </div>
            <div className="items-center h-20 pt-8 text-center bg-yellow-300">
              今日退课金额：{refundAmt}
            </div>
            <div className="items-center h-20 pt-8 text-center bg-blue-100">
              今日划拨次数:{transferNumber}
            </div>
            <div className="items-center h-20 pt-8 text-center bg-blue-300">
              今日划拨金额:{transferAmt}
            </div>
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default SupervisorAccount;
