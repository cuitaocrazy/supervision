import { IonPage, IonHeader, IonContent } from "@ionic/react";
import Navbar from "../Navbar";

const CardDetail = () => {
  return (
    <IonPage>
      <IonHeader>
        <Navbar title="卡详情" />
      </IonHeader>
      <IonContent>
        <div className="flex flex-col items-center justify-center mx-4 my-2 rounded-lg shadow-lg">
          <div className="flex flex-col pt-4 mt-4 mb-6 space-y-2 scroll-auto">
            <div className="flex">
              <span className="mr-2 text-right text-gray-400 w-28">购卡人姓名</span>
              <span className="mr-2 text-gray-800">刘云飞</span>
            </div>
            <div className="flex">
              <span className="mr-2 text-right text-gray-400 w-28">购卡人身份证号</span>
              <span className="mr-2 text-gray-800">3929 **** **** 8949</span>
            </div>
            <div className="flex">
              <span className="mr-2 text-right text-gray-400 w-28">购卡人手机号</span>
              <span className="mr-2 text-gray-800">186 **** 8948</span>
            </div>
            <div className="flex">
              <span className="mr-2 text-right text-gray-400 w-28">协议详情</span>
              <a className="mr-2 text-gray-800" href="./cardProtocolDetail">点击查看详情</a>
            </div>
            <div className="flex">
              <span className="mr-2 text-right text-gray-400 w-28">卡号</span>
              <span className="mr-2 text-gray-800">9021 8875 8757 6158</span>
            </div>
            <div className="flex">
              <span className="mr-2 text-right text-gray-400 w-28">商家联系电话</span>
              <span className="mr-2 text-gray-800">0539-8797893</span>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CardDetail;
