//课程协商列表页面
import {
  useEffect,
  useCallback,
  useContext,
  useState,
  useRef,
  Fragment,
} from "react";
import { Redirect } from "react-router-dom";
import {
  AppContext,
  // setLessonList,
  // setLessonDetail,
  setDiscussList,
  setDiscussDetail
} from "../../../appState";
// import { Lesson } from "../../../types/types";
import {LessonDiscussInfo} from "../../../types/types";
import {
  IonPage,
  IonRow,
  IonCol,
  PickerColumn,
  IonToast,
} from "@ionic/react";
import { EditorState } from "draft-js";
import Paging from '../../paging';
import Quit from "components/components/Quit";

// const findAll = "http://localhost:3003/edu/lesson/findAll";
const find = "http://localhost:3003/edu/lesson/find";

// 课程查询页面
const DiscussQuery: React.FC = () => {

  const onPageChange = (records:any,total:number,newPage:number)=>{
    console.log(records)
    console.log(total)
    console.log(newPage)
    setPage(newPage)
    setTotal(total)
    refreshDiscussList(records)
  }

  const [page,setPage] = useState(0)
  const [total,setTotal]= useState(101)//todo

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = useRef(null);

  // function focusEditor() {
  //   editor.current.focus();

  // }


  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({
    lessonName: "",
    lessonStatus: null,
  });
  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach((key) => {
      if (params[key]) result = result + key + "=" + params[key] + "&";
    });
    return url + result;
  };
  const paramStr = getParamStr(
    {
      lessonName: queryInfo.lessonName,
    },
    find
  );

  const lessonTypePickerColumn = {
    name: "lessonTypePickerColumn",
    options: [
      { text: "语文", value: "0" },
      { text: "数学", value: "1" },
    ],
  } as PickerColumn;

  const refreshDiscussList = useCallback(
    (discussInfo: LessonDiscussInfo[]) => {
      dispatch(setDiscussList(discussInfo));
    },
    [dispatch]
  );

  const onDetail = (item: LessonDiscussInfo) => () => {
    doSetDetail(item);
  };

  const doSetDetail = useCallback(
    (discussInfo: LessonDiscussInfo | undefined) => {
      dispatch({
        ...setDiscussDetail(discussInfo),
        ...{ backPage: "/tabs/discuss/query" },
      });
    },
    [dispatch]
  );
  useEffect(() => {
    fetch(find, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { result, records,total } = json;

        if (result) {
          setTotal(total)
          refreshDiscussList(records);
        }
        return;
      });
    return;
  }, []);

  const onQuery = () => {
    fetch(paramStr, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { result, records,total } = json;
        if (result) {
          setTotal(total)
          refreshDiscussList(records)
        };
        return;
      });
  };

  const getStatus = (statusEnglish: any) => {
    if (statusEnglish === "pending") {
      return "待审核";
    }
    if (statusEnglish === "reject") {
      return "审核未通过";
    }
    if (statusEnglish === "on") {
      return "上架";
    }
    if (statusEnglish === "off") {
      return "下架";
    }
    return statusEnglish;
  };

  const ListEntry = ({
    discussInfo,
    ...props
  }: {
    discussInfo: LessonDiscussInfo;
  }) => (
    <tr
      className="grid items-center grid-cols-9 gap-2 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100"
    >
      <td className="flex items-center justify-center leading-10">
        {discussInfo.lessonName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {discussInfo.lessonDate}
      </td>
      <td className="flex items-center justify-center leading-10">
      {discussInfo.consumerName}
      </td>
      <td className="flex items-center justify-center leading-10">
      {discussInfo.stuName}
      </td>
      <td className="flex items-center justify-center leading-10">
      {discussInfo.attendanceState}
      </td>
      <td className="flex items-center justify-center leading-10">
      {discussInfo.discussTitle}
      </td>
      <td className="flex items-center justify-center leading-10">
      {discussInfo.discussDate}
      </td>
      <td className="flex items-center justify-center leading-10">
      {discussInfo.discussTime}
      </td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button
            className="p-1 rounded-md text-primary-600"
            onClick={onDetail(discussInfo)}
          >
            查看详情
          </button>
        </div>
      </td>
    </tr>
  );
  if (state.discuss.lessonDetail) {
    return <Redirect to="/tabs/discuss/detail" />;
  }

  return (
    <IonPage className="bg-gray-100">
      <Quit />
      <div className="relative w-full h-screen mx-6 overflow-auto">
        <div className="flex pt-2 my-2 text-gray-800">
          <div className="mr-2 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <span className="pr-1 text-gray-600">课程协商管理</span>/
            <span className="pl-1 text-primary-500">课程协商列表</span>
          </div>
        </div>
        <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
          <div className="text-base font-bold">快速查询</div>
          <hr className="mt-2 mb-4" />
          <div className="flex">
            <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  课程名称：
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入课程名称"
                  onChange={(e) =>
                    setQueryInfo({
                      ...queryInfo,
                      ...{ lessonName: e.target.value },
                    })
                  }
                />
              </IonCol>
              <IonCol className="flex ml-8">
                <button
                  className="w-24 h-12 mr-6 text-white border-2 rounded-md shadow-md bg-primary-600 focus:bg-primary-700"
                  onClick={() => {
                    onQuery();
                  }}
                >
                  查询
                </button>
              </IonCol>
            </IonRow>
          </div>
        </div>

        {/* 课程协商列表 */}
        <div className="absolute w-full mt-10">
          <table className="w-11/12">
            <thead>
              <tr className="grid items-center h-10 grid-cols-9 gap-2 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">课程名称</th>
                <th className="flex items-center justify-center">课程日期</th>
                <th className="flex items-center justify-center">家长姓名</th>
                <th className="flex items-center justify-center">学生姓名</th>
                <th className="flex items-center justify-center">考勤状态</th>
                <th className="flex items-center justify-center">协商标题</th>
                <th className="flex items-center justify-center">提交协商日期</th>
                <th className="flex items-center justify-center">提交协商日期</th>
                <th className="flex items-center justify-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {state.discuss.discussList.map((list: LessonDiscussInfo, i: any) => (
                <ListEntry discussInfo={list} key={i} />
              ))}
              <tr>
                <td colSpan={5}> <Paging url={paramStr} page={page} pagesize={20} total={total} onPageChange={onPageChange}/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default DiscussQuery;
