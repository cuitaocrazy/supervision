import { FC } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { motion } from "framer-motion";
import SexDownList from "components/SexDownList";
import RelationRadio from "components/RelationRadio";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

// 添加学生信息页面
const AddStuInfo = () => {
  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent>
        <form>
          <div className="w-3/4 mx-auto mt-2 mb-3 text-base bg-white pb-15 scroll-auto">
          <div className="flex px-2 py-2 mt-6 text-sm text-gray-400 bg-gray-100">
          <div className="flex items-center ">
            <span className="pr-2">添加学生</span>
          </div>
          </div>
            <div className="p-2 px-2 pt-4 pb-4 rounded-lg shadow-md">
              <RelationRadio />
              <div className="flex items-center justify-center mt-3 justify-items-center">
                <span className="pr-2 text-gray-400 ">学生姓名:</span>
                <input
                  className="py-1 pl-2 text-gray-800 border rounded-md focus:outline-none"
                  placeholder="请输入学生姓名"
                ></input>
              </div>
              <div className="flex items-center justify-center mt-3 justify-items-center">
                <span className="flex pr-2 text-gray-400 ">出生日期:</span>
                <input
                  className="flex py-1 pl-2 text-gray-800 border rounded-md focus:outline-none"
                  placeholder="请输入日期"
                ></input>
              </div>

              <div className="flex items-center justify-center mt-3 justify-items-center">
                <span className="pr-2 text-gray-400">学生性别:</span>
                <SexDownList />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-1/2 mx-auto mt-10 bg-white h-14 justify-items-center">
            <Link to="stuInfoList" className="flex items-center justify-center w-full h-10 mx-6 mt-1 text-sm font-medium text-center text-white bg-gray-400 rounded-3xl">
              <div>
                取消
              </div>
            </Link>
            <Link
              to="stuInfoList"
              className="flex items-center justify-center w-full h-10 mx-6 mt-1 text-sm font-medium text-center text-white bg-primary-500 rounded-3xl"
            >
              <div >确定</div>
            </Link>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddStuInfo;
