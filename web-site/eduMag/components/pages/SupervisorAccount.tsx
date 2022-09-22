import React, { useState } from "react";
import { IonPage } from "@ionic/react";
import { useEffect } from "react";
import Quit from "components/components/Quit";
import { eduTransactionSumURL } from "const/consts";
import localforage from "localforage";

interface tranSumCardProps {
  d?: string;
  tranDesc?: string;
  tranCount?: string;
  logoClassName: string;
}

const TranSumCard: React.FC<tranSumCardProps> = (props) => {
  return (
    <div className="flex-row py-4 mx-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-row">
        <div className="flex w-20 mx-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={props.logoClassName}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={props.d} />
          </svg>
        </div>
        <div className="flex flex-col w-60">
          <div className="text-lg font-bold tracking-wide text-gray-800">
            {props.tranDesc}
          </div>
          <div className="text-3xl font-bold">{props.tranCount}</div>
        </div>
      </div>
    </div>
  );
};

export const SupervisorAccount: React.FC = () => {
  //   const queryURL = 'http://localhost:3003/baseInfo/query'
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

  const [supervisedAccount, setSupervisedAccount] = useState("");
  const [balance, setBalance] = useState("0");
  const onQuery = () => {
    //todo fetch
    paramStr = getParamStr(
      {
        loginName: loginName,
      },
      findURL
    );
    console.log(paramStr);
    console.log(loginName);
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
          supervisedAccount,
          balance,
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
          setSupervisedAccount(supervisedAccount);
          setBalance(balance);
        }
      });
  };
  useEffect(() => {
    localforage.getItem("loginName").then((value) => {
      setLoginName(value as string);
      console.log(value);
      onQuery();
    });
  }, [loginName]);

  const findURL = eduTransactionSumURL;
  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach((key) => {
      if (params[key]) result = result + key + "=" + params[key] + "&";
    });
    return url + result;
  };

  //todo 从localStoge中取值
  let paramStr = "";

  const onClick = () => {
    //todo fetch
    console.log(balance);
    setSupversingAccountAmt(balance);
  };

  return (
    <IonPage className="bg-gray-100">
      <Quit />
      <div className="relative w-full h-screen mx-6 overflow-auto">
        <div className="w-11/12 h-screen px-4 py-2 mt-4 bg-white rounded-lg">
          <span className="font-bold">交易汇总</span>
          <hr className="mt-2 mb-4" />
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-screen h-48">
              <svg
                className="rounded-lg cursor-pointer"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1876"
                width="150"
                height="150"
              >
                <path
                  d="M512 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512S0 794.7776 0 512 229.2224 0 512 0z m121.856 260.2496c-19.3536-10.3936-44.3904-1.024-55.7056 20.992l-20.6848 40.0896c-0.3072 0.512-0.768 1.0752-1.0752 1.8432l-21.248 41.1648h-0.2048l-21.5552 41.728-21.6064-41.728h-0.2048l-21.248-41.1648-1.0752-1.8432-20.6848-40.0896c-11.1616-21.76-36.352-31.2832-55.7056-20.992-19.4048 10.3936-25.856 36.5568-14.592 58.5728l25.6 49.7664 21.8112 42.1888H366.8992c-24.4224 0-44.3392 18.1248-44.3392 40.2432 0 22.2208 19.968 40.2944 44.3392 40.2944h105.984v58.0096h-105.984c-24.4224 0-44.3392 18.176-44.3392 40.2944 0 22.2208 19.968 40.2944 44.3392 40.2944h105.984v97.28c0 24.7808 17.92 45.1072 39.7312 45.1072 21.76 0 39.7312-20.3264 39.7312-45.056v-97.536h106.1888c24.3712 0 44.3392-18.176 44.3392-40.2944 0-22.2208-19.968-40.2944-44.3392-40.2944h-106.2912V491.3152h106.3936c24.4224 0 44.3392-18.176 44.3392-40.2944 0-22.2208-19.968-40.2432-44.3392-40.2432h-57.6l21.8112-42.1888 25.6-49.7664c11.264-22.016 4.8128-48.2816-14.5408-58.5728z"
                  p-id="1877"
                  fill="#5045E4"
                ></path>
              </svg>
              {/* <img className="rounded-lg cursor-pointer" src='http://placekitten.com/g/200/300' alt="" /> */}
            </div>
            <div className="mt-2">
              <span className="font-bold text-gray-900">
                数字人民币监管账号：
              </span>
              <span className="text-lg text-gray-900">{supervisedAccount}</span>
            </div>
            <div className="mt-2">
              <span className="font-bold text-gray-900">账户余额：</span>
              <span className="text-lg text-orange-600 font-blod">
                {supversingAccountAmt}
              </span>
              <span className="pl-1 font-bold">元</span>
              <a className="pl-2 text-sm text-blue-600" onClick={onClick}>
                点击查看
              </a>
            </div>
          </div>
          <div className="grid justify-center grid-cols-2 px-6 py-4 gap-x-10 gap-y-6">
            <TranSumCard
              tranDesc="今日购课数量"
              tranCount={buyCardNumber}
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              logoClassName="w-16 h-16 text-purple-400"
            />
            <TranSumCard
              tranDesc="今日购课金额（元）"
              tranCount={buyCardAmt}
              d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z"
              logoClassName="w-16 h-16 text-purple-400"
            />
            <TranSumCard
              tranDesc="今日退课数量"
              tranCount={refundNumber}
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              logoClassName="w-16 h-16 text-green-400"
            />
            <TranSumCard
              tranDesc="今日退课金额（元）"
              tranCount={refundAmt? refundAmt.replace('-',''):"0"}
              d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z"
              logoClassName="w-16 h-16 text-green-400"
            />
            <TranSumCard
              tranDesc="今日划拨次数"
              tranCount={transferNumber}
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              logoClassName="w-16 h-16 text-orange-400"
            />
            <TranSumCard
              tranDesc="今日划拨金额（元）"
              tranCount={transferAmt? transferAmt.replace('-',''):"0"}
              d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z"
              logoClassName="w-16 h-16 text-orange-400"
            />
            <TranSumCard
              tranDesc="进行中的智能合约数量"
              tranCount={contractValid}
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              logoClassName="w-16 h-16 text-blue-400"
            />
            <TranSumCard
              tranDesc="已完成的智能合约数量"
              tranCount={contractFinish}
              d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
              logoClassName="w-16 h-16 text-blue-400"
            />
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default SupervisorAccount;
