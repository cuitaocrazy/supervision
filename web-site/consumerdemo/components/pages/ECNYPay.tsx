import React, { useEffect, useState, useContext,useCallback } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar";
import { Contract } from "../../types/types";
import { preOrderURL } from "../../const/const";
import { AppContext,setContractDetail } from "../../appState";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

// 数币支付页面
const ECNYPay = () => {
  const socketUrl = "http://localhost:3003";
  const history = useHistory();
  const socket = io(socketUrl);
  const [contract, setContract] = useState({} as Contract);
  const { state,dispatch } = useContext(AppContext);
  const [payUrl, setPayUrl] = useState("");
  const refreshContract = useCallback((contract:Contract) => {
    dispatch(setContractDetail(contract));
  },[dispatch]);

  useEffect(() => {
    // socket.on("open", () => {
    //   console.log("socket io is open !");
    // });
    fetch(preOrderURL, {
      method: "POST",
      body: JSON.stringify({
        lessonId: state.lessonDetail.lessonId,
        username: state.loginUser?.username,
        studentName: state.studentName,
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setContract(json.result)
        refreshContract(json.result);
        // setPayUrl(json.payUrl);
        // socket.emit("pay", json.result.contractId);
        // socket.on(json.result.contractId + "_pay", () => {
        //   console.log("支付成功");
        //   history.push("/tabs/payResult");
        // });
      });
  }, []);

  // const onClick = ()=>{
  //   window.open(payUrl)
  // }

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
              <span className="text-gray-800">{contract.orderNo}</span>
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

          <div className="flex mt-12 text-base">
            <Link to="/eCNYPayResult" className="flex w-full h-10 py-2">
              <input
                className="w-full h-10 py-2 mx-6 font-bold tracking-widest text-white shadow-md bg-primary-600 rounded-3xl bg-grimary-600 shadow-primary-600 focus:bg-primary-700"
                type="submit"
                value="去支付"
              />
            </Link>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ECNYPay;
