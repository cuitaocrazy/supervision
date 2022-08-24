import { FC, useEffect, useState, useCallback, useContext } from "react";
import { IonPage, IonRow, IonCol, IonLabel, useIonToast } from "@ionic/react";
import CardListCard from '../../components/CardLIstCard'

// 卡列表
const CardList: FC = () => {
  return (
    <IonPage className="bg-white">
      <div>
        <CardListCard className="relative z-0 flex mx-5 my-3 text-white rounded-lg z-1 bg-gradient-to-r from-red-300 to-red-400" />
        <CardListCard className="relative z-0 flex mx-5 my-3 text-white rounded-lg z-1 bg-gradient-to-r from-orange-400 to-orange-500" />
        <CardListCard className="relative z-0 flex mx-5 my-3 text-white rounded-lg z-1 bg-gradient-to-r from-orange-300 to-orange-400" />
        <CardListCard className="relative z-0 flex mx-5 my-3 text-white rounded-lg z-1 bg-gradient-to-r from-gray-800 to-gray-900" />
        <CardListCard className="relative z-0 flex mx-5 my-3 text-white rounded-lg z-1 bg-gradient-to-r from-gray-300 to-gray-500" />
        
      {/* <div className="flex mx-5 my-3 text-white rounded-lg bg-gradient-to-r from-red-300 to-red-400">
        <div className="mx-2 my-4">
          <img
            className="rounded-full w-14 h-14"
            src="http://placekitten.com/g/200/300"
          ></img>
        </div>
        <div className="my-5">
          <div className="font-bold">时尚造型会员卡</div>
          <div className="text-sm">中国银行</div>
        </div>
        <div className="flex items-center font-bold pl-14">
          <div className="flex justify-self-end">
            <span>余额：</span>
            <span>11111.99</span>
          </div>
        </div>
      </div> */}

      {/* <div className="flex mx-5 my-3 text-white rounded-lg bg-gradient-to-r from-orange-400 to-orange-500">
        <div className="mx-2 my-4">
          <img
            className="rounded-full w-14 h-14"
            src="http://placekitten.com/g/200/300"
          ></img>
        </div>
        <div className="my-5">
          <div className="font-bold">时尚造型会员卡</div>
          <div className="text-sm">中国银行</div>
        </div>
        <div className="flex items-center font-bold pl-14">
          <div className="flex justify-self-end">
            <span>余额：</span>
            <span>11111.99</span>
          </div>
        </div>
      </div>

      <div className="flex mx-5 my-3 text-white rounded-lg bg-gradient-to-r from-orange-300 to-orange-400">
        <div className="mx-2 my-4">
          <img
            className="rounded-full w-14 h-14"
            src="http://placekitten.com/g/200/300"
          ></img>
        </div>
        <div className="my-5">
          <div className="font-bold">时尚造型会员卡</div>
          <div className="text-sm">中国银行</div>
        </div>
        <div className="flex items-center font-bold pl-14">
          <div className="flex justify-self-end">
            <span>余额：</span>
            <span>11111.99</span>
          </div>
        </div>
      </div>

      <div className="flex mx-5 my-3 text-white rounded-lg bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="mx-2 my-4">
          <img
            className="rounded-full w-14 h-14"
            src="http://placekitten.com/g/200/300"
          ></img>
        </div>
        <div className="my-5">
          <div className="font-bold">时尚造型会员卡</div>
          <div className="text-sm">中国银行</div>
        </div>
        <div className="flex items-center font-bold pl-14">
          <div className="flex justify-self-end">
            <span>余额：</span>
            <span>11111.99</span>
          </div>
        </div>
      </div>

      <div className="flex mx-5 my-3 text-white rounded-lg bg-gradient-to-r from-gray-300 to-gray-500">
        <div className="mx-2 my-4">
          <img
            className="rounded-full w-14 h-14"
            src="http://placekitten.com/g/200/300"
          ></img>
        </div>
        <div className="my-5">
          <div className="font-bold">时尚造型会员卡</div>
          <div className="text-sm">中国银行</div>
        </div>
        <div className="flex items-center font-bold pl-14">
          <div className="flex justify-self-end">
            <span>余额：</span>
            <span>11111.99</span>
          </div>
        </div>
      </div> */}

      </div>
      
    </IonPage>
  );
};

export default CardList;
