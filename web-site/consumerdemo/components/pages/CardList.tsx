import { FC, useEffect, useState, useCallback, useContext } from "react";
import { IonPage,IonHeader,IonContent, IonRow, IonCol, IonLabel, useIonToast } from "@ionic/react";
import CardListCard from '../../components/CardLIstCard'
import Navbar from "../Navbar";

// 卡列表
const CardList: FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Navbar title="使用记录" />
      </IonHeader>
      <IonContent>
      <div>
        <CardListCard cardName="稿定画室（一对多）" bankName="中国银行" balanceAmt="999.00" className="relative z-0 flex mx-5 my-3 text-white border-2 rounded-lg bg-gradient-to-r from-red-300 to-red-400" />
        <CardListCard cardName="C++编程（一对一小班）" bankName="中国银行" balanceAmt="899.00" className="relative z-0 flex mx-5 my-3 text-white rounded-lg bg-gradient-to-r from-orange-400 to-orange-500" />
        <CardListCard cardName="爵士舞（一对多中班）" bankName="中国银行" balanceAmt="789.89" className="relative z-0 flex mx-5 my-3 text-white rounded-lg bg-gradient-to-r from-orange-300 to-orange-400" />
        <CardListCard cardName="时尚造型会员卡" bankName="中国银行" balanceAmt="9999.00" className="relative z-0 flex mx-5 my-3 text-white rounded-lg bg-gradient-to-r from-gray-800 to-gray-900" />
        <CardListCard cardName="黑马程序员（前端进阶班）" bankName="中国银行" balanceAmt="10000.00" className="relative z-0 flex mx-5 my-3 text-white rounded-lg bg-gradient-to-r from-gray-300 to-gray-500" />
        <CardListCard cardName="乐博乐博机器人编程（4岁班）" bankName="中国银行" balanceAmt="10000.00" className="relative z-0 flex mx-5 my-3 text-white rounded-lg bg-gradient-to-r from-blue-300 to-blue-500" />
        <CardListCard cardName="灵纳教育（兴趣英语）" bankName="中国银行" balanceAmt="9000.00" className="relative z-0 flex mx-5 my-3 text-white rounded-lg bg-gradient-to-r from-pink-300 to-pink-500" />
      </div>
    </IonContent>
    </IonPage>
  );
};

export default CardList;
