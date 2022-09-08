import { FC } from "react";
import { Link } from "react-router-dom";

interface searchProps {
  setQueryStr: Function;
  onQuery: Function;
}
{
  /* 搜索框 */
}
const Search: FC<searchProps> = (props) => {
  const { setQueryStr, onQuery } = props;
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onQuery();
  };
  return (
    <form onSubmit={onSubmit} className="pt-3 ">
      <div className="fixed left-0 right-0 w-3/4 pb-2 mx-auto mt-1 bg-white ">
        <div className="flex items-center justify-around gap-10 pt-3 text-xs justify-items-stretch">
          <div className="flex flex-col justify-start">
            <div className="text-xl tracking-widest text-gray-900">
              资金监管平台
            </div>
            <div className="text-sm tracking-widest text-gray-400">我的课堂</div>
          </div>
          <div className="flex flex-row items-center w-96">
            <input
              type="text"
              className="flex items-center justify-center h-10 pl-2 ml-3 text-sm text-gray-300 border border-gray-400 shadow-lg rounded-l-3xl grow focus:outline-none focus:glow-primary-600"
              placeholder="请输入机构名称/课程名称/教师姓名关键词"
              x-model="search"
              onChange={(e) => setQueryStr(e.target.value)}
            />
            <button
              type="submit"
              className="flex items-center justify-center flex-none w-20 h-10 mr-3 bg-primary-600 rounded-r-3xl focus:outline-none hover:bg-primary-700 "
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
              </svg>
              <span className="pr-2 ml-1 text-sm text-white">搜索</span>
            </button>
          </div>
          <div className="flex flex-row justify-end ">
            <Link to="./login" className="h-10 px-2 mt-5 mr-3 text-base text-gray-800 rounded-md ">
              登录
            </Link>
            <Link to="" className="h-10 px-2 mt-5 text-base text-gray-800 rounded-md ">
              注册
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Search;
