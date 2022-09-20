import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToast,
  useIonToast,
} from "@ionic/react";
import Navbar from "components/Navbar";
import { AppContext } from "../../appState";
import { useContext } from "react";
import { Contract } from "../../types/types";
import { refundURL } from "../../const/const";
import { useHistory } from "react-router-dom";

// 退订课程页面
const RefoundLesson = () => {
  const history = useHistory();
  const [present, dismiss] = useIonToast();
  const { state } = useContext(AppContext);
  console.log(state.loginUser);
  let order: Contract = state.contractDetail;
  const [refundState, setRefundState] = useState({
    contractId: order.contractId,
    consumerId: state.loginUser.userId,
    refundAmt: "0",
    reason: "",
  });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e.target);
    console.log(refundState);

    fetch(refundURL, {
      method: "PUT",
      body: JSON.stringify(refundState),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // alert(json.result);
        const { result, status } = json;
        if (status == "true") {
          present({
            message: "提交退货成功",
            duration: 1000,
            position: "middle",
            cssClass: "text-center",
          });
        } else
          present({
            buttons: [{ text: "关闭", handler: () => dismiss() }],
            message: result,
          });
        history.push("./myLessonDetail");
      });
  };

  // 退课结果Toast
  const [showRefundtToast, setShowRefundtToast] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <Navbar title="退订课程" />
      </IonHeader>
      <IonContent>
        <form onSubmit={onSubmit}>
          <div className="px-3 py-4 mx-2 mt-3 mb-6 rounded-lg shadow-md">
            <div className="flex px-4 py-2 mb-3 text-sm rounded-md bg-primary-50">
              <div className="pr-4 text-gray-500">课程名称</div>
              <div className="text-gray-700">{order.lessonName}</div>
            </div>
            <div className="flex px-4 py-2 mb-3 text-sm rounded-md bg-primary-50">
              <div className="pr-4 text-gray-500">学生姓名</div>
              <div>{order.consumerStuName}</div>
            </div>
            <div className="flex items-center px-4 py-2 mb-2 text-sm rounded-md bg-primary-50">
              <div className="pr-4 text-gray-500 ">退订金额</div>
              <input
                className="h-8 pl-1 rounded-md outline-none bg-primary-50 focus:outline-none focus:glow-primary-600"
                // type="number"
                name="refundAmt"
                onChange={(e) => {
                  setRefundState({
                    ...refundState,
                    refundAmt: e.target?.value,
                  });
                }}
              ></input>
              <div className="ml-2 text-gray-700">元</div>
            </div>
            <p className="mb-3 text-xs leading-4 text-primary-600">
              按照当地政府要求，监管账户的资金已部分划拨到机构账户中本系统仅支持未划拨部分退款，其余部分与机构进行沟通协商。退款金额会按原交易渠道进行退回。
            </p>
            <div className="text-sm text-gray-700">协商原因</div>
            <textarea
              name="reason"
              className="w-full h-40 px-4 py-4 mt-2 text-xs border-0 border-none rounded-md outline-none focus:border-0 focus:border-none bg-primary-50 focus:outline-none focus:glow-primary-600"
              placeholder="请告诉我们您退订课程的原因，让我们进一步改进!"
              onChange={(e) => {
                setRefundState({
                  ...refundState,
                  reason: e.target?.value,
                });
              }}
            />
          </div>
          <div className="flex items-center justify-items-center">
            {/* <button className='py-2 font-bold text-center text-white shadow-md shadow-primary-600 px-28 rounded-3xl bg-primary-600'>提交申请</button> */}
            <input
              type="submit"
              className="w-full py-3 mx-5 mt-8 mb-1 text-sm font-bold text-white shadow-lg rounded-3xl bg-primary-500 focus:outline-none hover:bg-primary-700 hover:shadow-none"
              value="提交申请"
            />
          </div>
          <IonToast
            isOpen={showRefundtToast}
            onDidDismiss={() => setShowRefundtToast(false)}
            message="课程签到成功."
            duration={300}
            position="middle"
          />
        </form>
      </IonContent>
    </IonPage>
  );
};

export default RefoundLesson;
