import React,{useContext, useEffect,useState} from "react";
import { IonPage,IonHeader,IonContent } from "@ionic/react";
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import {Contract} from '../../types/types'
import {AppContext,setLessonDetail} from '../../appState';
import { Item } from "framer-motion/types/components/Reorder/Item";

// 数币支付页面
const ECNYPay =()=>{

  const { state, dispatch } = useContext(AppContext);
  const [contract, setContract ] = useState({} as Contract);
  console.log(state)
  const demoContract  = {
      contractId:'123',
      orderNo:'SASDSD',
      lessonId:state.lessonDetail.lessonId,
      lessonName:state.lessonDetail.lessonName,
      eduName:state.lessonDetail.edu.eduName,
      lessonTotalPrice:state.lessonDetail.lessonTotalPrice,
      lessonTotalQuantity:state.lessonDetail.lessonTotalQuantity
  }
  useEffect(() => { 
    //todo 与下单fetch
    setContract(demoContract as Contract)
  },[])

  return <IonPage>
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
            <span className="text-gray-800">{contract.lessonTotalQuantity}</span>
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
        <Link to="/eCNYPayResult">
        <div className="flex pt-10">
          
          <input className="w-full py-2 mx-6 font-bold tracking-wider text-white shadow-md rounded-3xl shadow-primary-600 bg-primary-600"  
          value="去支付" type="button"  />
        </div>
        </Link>
      </div>
    </IonContent>
  </IonPage>

}

export default ECNYPay