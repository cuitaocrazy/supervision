import React from "react";
import { IonPage,IonHeader,IonContent } from "@ionic/react";
import { useRouter } from 'next/router'

// 数币支付页面
const ECNYPay =()=>{
  const router=useRouter();
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 text-lg font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>数币支付页面</div>
      </div>
    </IonHeader>
    <IonContent>
      <div>
        <div className="px-4 py-4 mx-2 my-2 text-base leading-7 rounded-md shadow-md">
          <p>
            <span className="pr-3 text-gray-400">订单编号</span>
            <span className="text-gray-800">8374312432143231</span>
          </p>
          <p>
            <span className="pr-3 text-gray-400">机构名称</span>
            <span className="text-gray-800">核桃编程培训机构</span>
          </p>
          <p>
            <span className="pr-3 text-gray-400">课程名称</span>
            <span className="text-gray-800">少儿图形化编程</span>
          </p>
          <p>
            <span className="pr-3 text-gray-400">课程数量</span>
            <span className="text-gray-800">01</span>
          </p>
          <p>
            <span className="pr-3 text-gray-400">优惠金额</span>
            <span className="text-gray-800">183.00</span>
            <span className="text-gray-800">元</span>
          </p>
          <hr className="my-4 text-gray-300" />
          <p className="font-bold text-right text-gray-800">
            <span className="pr-1">实付金额:</span>
            <span>¥</span>
            <span>558.00</span>
          </p>
        </div>
        <div className="flex pt-10">
          <input className="w-full py-2 mx-6 font-bold tracking-wider text-white shadow-md rounded-3xl shadow-primary-600 bg-primary-600"  
          value="去支付" type="button" onClick={()=>{router.push("./eCNYPayResult")}}  />
        </div>
      </div>
    </IonContent>
  </IonPage>

}

export default ECNYPay