import React from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

type FormData = {
  name: string;
};

// 数币系统的支付结果页面
const ECNYPayResult = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    // router.push('/searchLessonList')
  };
  return (
    <IonPage>
      <IonHeader>
        <Navbar title="支付结果" />
      </IonHeader>
      <IonContent>
        <div className="relative ">
          <div className="grid justify-center grid-rows-1">
            <div className="mt-20 ">
              <img
                className="w-48 h-32 rounded-lg"
                src="http://placekitten.com/g/200/300"
              ></img>
            </div>
            <div className="pt-4 pb-16 text-lg text-center text-gray-700">
              支付成功！
            </div>
          </div>

          <div className="flex mt-12 text-base">
            <Link to="/payResult" className="flex w-full h-10 py-2">
              <input
                className="w-full h-10 py-2 mx-6 font-bold tracking-widest text-white shadow-md bg-primary-600 rounded-3xl bg-grimary-600 shadow-primary-600 focus:bg-primary-700"
                type="submit"
                value="返回教育机构"
              />
            </Link>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ECNYPayResult;
