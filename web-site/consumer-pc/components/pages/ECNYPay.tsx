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
import Search from '../Search'
import { searchLessonURL } from '../../const/const'
import { Lesson } from '../../types/types'

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
    console.log(`socketUrl is: [${socketUrl}]`);
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
        console.log('准备 3 秒后跳转')
        // 模拟 3 秒后支付完成
        setTimeout(() => {
          console.log('获取pc支付结果')
          socket.emit("pcPay", json.result.contractId);
          socket.on(json.result.contractId + "_pay", () => {
            console.log("支付成功");
            history.push("/eCNYPayResult");
            // setPageReload(new Date().toUTCString());
            // socket.disconnect()
            // console.log('socket disconnect!!!')
          });

          refreshContract(json.result);

        }, 3000)

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

  const [lessonList, setLessonList] = useState([] as Lesson[])
  const onQuery = () => {
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
      .then((json) => {
        setLessonList(json.result)
      })
  }
  useEffect(onQuery, [])

  const [queryStr, setQueryStr] = useState('')
  const [page, setPage] = useState(0)
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  const paramStr = getParamStr(
    {
      queryStr: queryStr,
      page: page,
      size: 10
    },
    searchLessonURL
  );

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col w-3/4 mx-auto">
          {/* <div className="flex items-center justify-around gap-10 pt-3 text-xs justify-items-stretch">
          <div className="flex flex-col justify-start">
            <div className="text-xl tracking-widest text-gray-900">
              资金监管平台
            </div>
            <div className="text-sm tracking-widest text-gray-400">我的课堂</div>
          </div>
          <div className="flex flex-row items-center w-96">
          </div>
          <div className="flex flex-row justify-end ">
          
          </div>
        </div> */}
          <Search username={state.loginUser.username} setQueryStr={setQueryStr} onQuery={onQuery} />
          <div className="flex px-2 py-2 mt-24 text-sm text-gray-400 bg-gray-100">
            <div className="flex items-center ">
              <span className="pr-2">订单支付</span>
            </div>
          </div>
          <div className="px-4 py-4 text-base leading-7 shadow-md rounded-b-md">
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
              <span className="pr-1 ">实付金额:</span>
              <span className="text-red-600">¥</span>
              <span className="text-red-600">{contract.lessonTotalPrice}</span>
            </p>
          </div>
          <div className="grid mt-20 justify-items-stretch">
            <div className="mb-10 text-2xl font-bold justify-self-center">扫码支付</div>
            <div
              className="justify-self-center border-2 border-primary-600 p-2"
              onClick={() => {
                setPayUrl("");
                setPageReload(new Date().toUTCString());
              }}
            >
              {myQrCode(payUrl)}
              {/* <QRCodeCanvas value={payUrl} size={300}></QRCodeCanvas> */}
            </div>
            <div className="mt-6 text-center text-gray-600">请使用数字人民币APP扫一扫完成付款</div>
          </div>

          {/* <div className="flex mt-12 text-base">
            <Link to="/eCNYPayResult" className="flex w-full">
              <input
                className="w-full h-10 py-2 mx-6 font-bold tracking-widest text-white shadow-md bg-primary-600 rounded-3xl bg-grimary-600 shadow-primary-600 focus:bg-primary-700"
                type="submit"
                value="支付完成"
              />
            </Link>
          </div> */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ECNYPay;
