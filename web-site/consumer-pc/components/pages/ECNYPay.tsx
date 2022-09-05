import React, { useEffect, useState, useContext, useCallback } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar";
import { Contract } from "../../types/types";
import { preOrderURL, socketUrl } from "../../const/const";
import { AppContext, setContractDetail } from "../../appState";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

// 数币支付页面
const ECNYPay = () => {
  const history = useHistory();

  const [contract, setContract] = useState({} as Contract);
  const { state, dispatch } = useContext(AppContext);
  const [payUrl, setPayUrl] = useState("");
  const [pageReload, setPageReload] = useState("");

  const refreshContract = useCallback(
    (contract: Contract) => {
      dispatch(setContractDetail(contract));
    },
    [dispatch]
  );

  useEffect(() => {
    const socket = io(socketUrl);
    socket.on("open", () => {
      console.log("socket io is open !");
    });
    console.log("socketUrl");
    console.log(socketUrl);
    fetch(preOrderURL, {
      method: "POST",
      body: JSON.stringify({
        lessonId: state.lessonDetail.lessonId,
        username: state.loginUser?.username,
        studentName: state.stuName,
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setContract(json.result);
        setPayUrl(json.payUrl);

        socket.emit("pcPay", json.result.contractId);
        socket.on(json.result.contractId + "_pay", () => {
          console.log("支付成功");
          history.push("/eCNYPayResult");
          setPageReload(new Date().toUTCString());
        });
        refreshContract(json.result);
      });
  }, [pageReload]);

  // const onClick = ()=>{
  //   window.open(payUrl)
  // }
  //
  const myQrCode = (payUrl: string) => {
    if (payUrl == "") {
      return <a>二维码获取中</a>;
    } else {
      return <QRCodeCanvas value={payUrl} size={300}></QRCodeCanvas>;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <Navbar title="数币支付页面" />
      </IonHeader>
      <IonContent>
        <div>
          <div className="px-4 py-4 mx-2 my-2 text-base leading-7 rounded-md shadow-md">
            <p>
              <span className="pr-3 text-gray-400">订单编号</span>
              <span className="text-gray-800">{contract.contractId}</span>
            </p>
            <p>
              <span className="pr-3 text-gray-400">机构名称</span>
              <span className="text-gray-800">{contract.eduName}</span>
            </p>
            <p>
              <span className="pr-3 text-gray-400">课程名称</span>
              <span className="text-gray-800">{contract.lessonName}</span>
            </p>
            <p>
              <span className="pr-3 text-gray-400">课程数量</span>
              <span className="text-gray-800">
                {contract.lessonTotalQuantity}
              </span>
            </p>
            {/* <p>
            <span className="pr-3 text-gray-400">优惠金额</span>
            <span className="text-gray-800">183.00</span>
            <span className="text-gray-800">元</span>
          </p> */}
            <hr className="my-4 text-gray-300" />
            <p className="font-bold text-right text-gray-800">
              <span className="pr-1">实付金额:</span>
              <span>¥</span>
              <span>{contract.lessonTotalPrice}</span>
            </p>
          </div>
          <div className="grid justify-items-stretch">
            <div
              className="justify-self-center"
              onClick={() => {
                setPayUrl("");
                setPageReload(new Date().toUTCString());
              }}
            >
              {myQrCode(payUrl)}
              {/* <QRCodeCanvas value={payUrl} size={300}></QRCodeCanvas> */}
            </div>
          </div>

          {/* <div className="flex mt-12 text-base">
            <Link to="/eCNYPayResult" className="flex w-full">
              <input
                className="w-full h-10 py-2 mx-6 font-bold tracking-widest text-white shadow-md bg-primary-600 rounded-3xl bg-grimary-600 shadow-primary-600 focus:bg-primary-700"
                type="submit"
                value="去支付"
              />
            </Link>
          </div> */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ECNYPay;
