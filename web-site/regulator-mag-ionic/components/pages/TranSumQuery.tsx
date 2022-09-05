import React, { useState,FC } from "react";
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
import Quit from '../Quit';
import { edbTransactionSumURL } from '../../const/const';
import localforage from "localforage";


const TranSumQuery = () => {
  const [supversingAccountAmt, setSupversingAccountAmt] = useState("******");
  const [buyCardNumber, setBuyCardNumber] = useState("0");
  const [buyCardAmt, setBuyCardAmt] = useState("0");
  const [refundNumber, setRefundNumber] = useState("0");
  const [refundAmt, setRefundAmt] = useState("0");
  const [transferNumber, setTranferNumber] = useState("0");
  const [transferAmt, setTranferAmt] = useState("0");
  const [loginName, setLoginName] = useState("");
  const [contractValid, setContractValid] = useState("0");
  const [contractFinish, setContractFinish] = useState("0");
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
          contractValid,
          contractFinish,
        } = json;
        if (result) {
          setBuyCardNumber(buyCardNumber);
          setBuyCardAmt(buyCardAmt);
          setRefundNumber(refundNumber);
          setRefundAmt(refundAmt);
          setTranferNumber(transferNumber);
          setTranferAmt(transferAmt);
          setContractFinish(contractFinish);
          setContractValid(contractValid);
        }
      });
  };
  useEffect(() => {
    localforage.getItem("loginName").then((value) => {
      setLoginName(value as string);
    });
    onQuery();
  }, []);

  const findURL = edbTransactionSumURL;
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
      loginName: loginName,
    },
    findURL
  );
  const onClick = () => {
    //todo fetch
    setSupversingAccountAmt("1000");
  };

  // const onQuery = () => {
  //   state.contract?.contractList?.map(() => {
  //     console.log("holy shit");
  //   });
  //   fetch(paramStr, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json;charset=UTF-8",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       const { result, records, total } = json;
  //       if (result) {
  //         setTotal(total);
  //         refreshList(records);
  //       }
  //     });
  // };
  
 

  return (
    <IonPage className="bg-gray-100">
      <Quit />
      <div className="relative w-full h-screen mx-6 overflow-auto">
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
          <div>
            <span className="pr-1 text-gray-600">报表</span>/
            <span className="pl-1 text-primary-500">月交易汇总查询</span>
          </div>
        </div>
        <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
          <div className="text-base font-bold">快速查询</div>
          <hr className="mt-2 mb-4" />
          <div className="flex">
            <IonRow className="flex justify-between ">
              <IonCol className="flex ml-8">
                <IonLabel className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  年月
                </IonLabel>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入交易年月"
                  
                />
              </IonCol>
              <IonCol className="flex ml-8">
                <button
                  className="w-24 h-12 mr-6 text-white border-2 rounded-md shadow-md bg-primary-600 focus:bg-primary-700"
                >
                  查询
                </button>
              </IonCol>
            </IonRow>
          </div>
        </div>
        <div className="absolute w-full mt-10">
          <table className="w-11/12">
            <thead>
              <tr className="grid items-end w-full h-10 grid-cols-6 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center flex-1 leading-10 justify-items-end ">
                  购课数量
                </th>
                <th className="flex items-center justify-center flex-1 leading-10 ">
                  购课金额(元)
                </th>
                <th className="flex items-center justify-center flex-1 leading-10 ">
                  退课数量
                </th>
                <th className="flex items-center justify-center flex-1 leading-10 ">
                  退课金额(元)
                </th>
                <th className="flex items-center justify-center flex-1 leading-10 ">
                  划拨次数
                </th>
                <th className="flex items-center justify-center flex-1 leading-10 ">
                  划拨金额(元)
                </th>
              </tr>
            </thead>
            <tbody>
            <tr className="flex items-center justify-center text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100">
      <td className="flex items-center justify-center flex-1 leading-10 ">
      {buyCardNumber}
      </td>
      <td className="flex items-center justify-center flex-1 leading-10">
      {buyCardAmt}
      </td>
      <td className="flex items-center justify-center flex-1 leading-10">
      {refundNumber}
      </td>
      <td className="flex items-center justify-center flex-1 leading-10 ">
      {refundAmt}
      </td>

      <td className="flex items-center justify-center flex-1 leading-10 ">
      {transferNumber}
      </td>
      <td className="flex items-center justify-center flex-1 leading-10 ">
      {transferAmt}
      </td>
    </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default TranSumQuery;

