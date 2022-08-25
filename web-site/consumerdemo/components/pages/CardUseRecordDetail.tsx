import { IonPage, IonHeader, IonContent } from "@ionic/react";
import Navbar from "../Navbar";

const CardUseRecordDetail = () => {
  return (
    <IonPage>
      <IonHeader>
        <Navbar title="使用记录详情" />
      </IonHeader>
      <IonContent>
        <div className="bg-white">
          <div className="flex flex-col items-center justify-center mx-2 my-2 rounded-lg shadow-lg">
            <div className="flex mt-10">
              <img
                className="rounded-full w-14 h-14 "
                src="http://placekitten.com/g/200/300"
              ></img>
            </div>
            <div className="flex flex-col items-center justify-center mt-1">
              <div className="flex">黑马程序员(前端进阶班)</div>
              <div className="flex mt-4 mb-4 text-3xl font-bold">-198.00元</div>
            </div>
            <hr />
            <div className="flex flex-col mt-2 mb-6 space-y-2">
              <div className="flex">
                <span className="mr-2 text-gray-400">交易时间</span>
                <span className="mr-2 text-gray-800">2022年8月18日</span>
                <span className="text-gray-800">19:28:19</span>
              </div>
              <div>
                <span className="mr-2 text-gray-400">交易金额</span>
                <span className="mr-2 text-gray-800">198元</span>
              </div>
              <div>
                <span className="mr-2 text-gray-400">交易类型</span>
                <span className="mr-2 text-gray-800">消费</span>
              </div>
              <div>
                <span className="mr-2 text-gray-400">交易状态</span>
                <span className="mr-2 text-gray-800">成功</span>
              </div>
              <div>
                <span className="mr-2 text-gray-400">商户名称</span>
                <span className="mr-2 text-gray-800">黑马程序员培训机构</span>
              </div>
              <div>
                <span className="mr-2 text-gray-400">权益变化</span>
                <span className="mr-2 text-gray-800">剩余32课时</span>
              </div>
              <div className="flex items-center justify-start ">
                <span className="flex w-16 mr-2 text-gray-400 justify-self-end">卡名称</span>
                <span className="mr-2 text-gray-800 justify-self-start">前端进阶班</span>
              </div>
              <div className="flex">
                <span className="w-16 mr-2 text-gray-400">卡号</span>
                <span className="mr-2 text-gray-800">9021 8875 8757 6158</span>
              </div>
          </div>
          </div>
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CardUseRecordDetail;
