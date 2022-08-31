import { FC } from "react";
import { motion } from "framer-motion";
import Router, { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  increment,
  selectCount,
  selectCarList,
} from "../features/order-cart/counterSlice";
import { Lesson, Teacher, EduOrg } from "../types/types";
import { Link, Redirect } from "react-router-dom";

// 课程详情页面底部菜单组件
const LessonDetailBottomMenu = () => {
  console.log("进入LessonDetailBottomMenu");
  const router = useRouter();
  let lesson: Lesson = {};
  const { item } = router.query;
  if (typeof item === "string") {
    lesson = JSON.parse(item);
  }
  const count = useAppSelector(selectCount);
  const carList = useAppSelector(selectCarList);
  const carListStr = carList.map((item) => {
    return JSON.stringify(item);
  });
  const dispatch = useAppDispatch();

  return (
    <div className="fixed bottom-0 flex w-full pl-5 mt-6 ml-3 mr-5 bg-white h-14">
      {/* <button className='h-10 px-3 mt-2 mr-8 text-sm font-medium text-white grow bg-primary-500 rounded-r-3xl'
      onClick={() => {
        Router.push("./conOrder")
      }}>立即购买 </button> */}
      <Link
        className="h-10 px-3 mt-2 mr-8 text-sm font-medium text-white grow bg-primary-500 rounded-r-3xl text-center pt-2 "
        to="/conOrder"
      >
        立即购买
      </Link>
    </div>
  );
};

export default LessonDetailBottomMenu;
