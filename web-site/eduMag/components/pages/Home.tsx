import { FC, useEffect, useState, useCallback, useContext } from "react";
import { IonPage, IonRow, IonCol, IonLabel, useIonToast } from "@ionic/react";
import Quit from "components/components/Quit";
import localforage from "localforage";

// 首页
const Home: FC = () => {
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
      loginName: loginName,
    },
    findURL
  );

  interface tranSumCardProps {
    d?: string;
    tranDesc?: string;
    tranCount?: string;
    logoClassName: string;
  }

  const TranSumCard: FC<tranSumCardProps> = (props) => {
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
          <div className="flex flex-col w-36">
            <div className="text-lg font-bold tracking-wide text-gray-800">
              {props.tranDesc}
            </div>
            <div className="text-3xl font-bold">{props.tranCount}</div>
          </div>
        </div>
      </div>
    );
  };

  const onClick = () => {
    //todo fetch
    setSupversingAccountAmt("1000");
  };
  return (
    <IonPage className="bg-gray-100">
      <Quit />
      <div className="relative w-full h-screen mx-6 overflow-auto">
        <div className="w-11/12 h-screen px-4 py-2 mt-4 bg-white rounded-lg">
          <span className="font-bold">交易汇总</span>
          <hr className="mt-2 mb-4" />

          <div className="grid justify-center grid-cols-2 px-6 py-4 gap-x-10 gap-y-6">
            <TranSumCard
              tranDesc="今日购课数量"
              tranCount={buyCardNumber}
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              logoClassName="w-16 h-16 text-purple-400"
            />
            <TranSumCard
              tranDesc="今日购课金额"
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
              tranDesc="今日退课金额"
              tranCount={refundAmt}
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
              tranDesc="今日划拨金额"
              tranCount={transferAmt}
              d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z"
              logoClassName="w-16 h-16 text-orange-400"
            />
            <TranSumCard
              tranDesc="进行中的订单"
              tranCount={contractValid}
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              logoClassName="w-16 h-16 text-blue-400"
            />
            <TranSumCard
              tranDesc="已完成的订单"
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

export default Home;
