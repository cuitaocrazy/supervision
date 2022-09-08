import { Link, Redirect } from "react-router-dom";

// 课程详情页面底部菜单组件
const LessonDetailBottomMenu = () => {
  console.log("进入LessonDetailBottomMenu");

  return (
    <div className="flex justify-center pl-5 mx-auto mt-6 ml-3 mr-5 bg-white h-14" >
      <Link
        className="h-10 px-3 pt-2 mt-2 mr-8 text-sm font-medium text-center text-white grow bg-primary-500 rounded-3xl"
        to="/conOrder"
      >
        立即购买
      </Link>
    </div>
  );
};

export default LessonDetailBottomMenu;
