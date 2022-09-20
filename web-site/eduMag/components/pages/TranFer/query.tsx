import { useEffect, useCallback, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  AppContext,
  setTransferList,
  setTransferDetail,
} from "../../../appState";
import { Transfer } from "../../../types/types";
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
} from "@ionic/react";
import Paging from "../../paging";
import Quit from "components/components/Quit";
import { eduTransferFindURL } from "const/consts";

const queryURL = eduTransferFindURL;
const handleTransfer = "http://localhost:3003/attendannce/handleTransfer";

const TransferQuery: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({
    consumerName: "",
    lessonName: "",
  });
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(101); //todo
  const onPageChange = (records: any, total: number, newPage: number) => {
    setPage(newPage);
    setTotal(total);
    refreshList(records);
  };

  const onDetail = (item: Transfer) => () => {
    doSetDetail(item);
  };

  const doSetDetail = useCallback(
    (item: Transfer) => {
      dispatch({
        ...setTransferDetail(item),
        ...{ backPage: "/tabs/transfer/query" },
      });
    },
    [dispatch]
  );
  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach((key) => {
      if (params[key]) result = result + key + "=" + params[key] + "&";
    });
    return url + result;
  };
  const paramStr = getParamStr(
    {
      consumerName: queryInfo.consumerName,
      lessonName: queryInfo.lessonName,
    },
    queryURL
  );
  const refreshList = useCallback(
    (eduOrgs: Transfer[]) => {
      dispatch(setTransferList(eduOrgs));
    },
    [dispatch]
  );
  const onTransfer = (item: Transfer) => () => {
    doHandle(item);
  };

  const doHandle = async (item: Transfer) => () => {
    fetch(handleTransfer, {
      method: "POST",
      body: JSON.stringify({
        transferId: item.transferId,
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        alert(json.result);
      });
  };
  const onQuery = () => {
    fetch(paramStr, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { result, records, total } = json;
        if (result) {
          setTotal(total);
          refreshList(records);
        }
      });
  };
  useEffect(onQuery, []);

  const ListEntry = ({
    transfer,
    myKey,
    ...props
  }: {
    transfer: Transfer;
    myKey: any;
  }) => (
    <tr
      key={myKey}
      className="grid items-center grid-cols-8 gap-2 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100"
    >
      <td className="flex items-center justify-center leading-10">
        {transfer.eduName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {transfer.lessonName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {transfer.consumerName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {transfer.attendanceDate}
      </td>
      <td className="flex items-center justify-center leading-10">
        {transfer.attendanceTime}
      </td>
      <td className="flex items-center justify-center leading-10">
        {Number(transfer.transferAmt) / 100}
      </td>
      <td className="flex items-center justify-center leading-10">
        {transfer.transferResult}
      </td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button className="p-1 text-primary-600" onClick={onDetail(transfer)}>
            查看详情
          </button>
        </div>
      </td>
    </tr>
  );

  console.log("state");
  console.log(state);
  if (state.transfer?.transferDetail) {
    return <Redirect to="/tabs/transfer/detail" />;
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
            <span className="pr-1 text-gray-600">数币管理</span>/
            <span className="pl-1 text-primary-500">资金划拨查询</span>
          </div>
        </div>
        <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
          <div className="text-base font-bold">快速查询</div>
          <hr className="mt-2 mb-4" />
          <div className="flex">
            <IonRow className="flex justify-between ">
              <IonCol className="flex ml-8">
                <IonLabel className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  课程名称
                </IonLabel>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  onChange={(e) =>
                    setQueryInfo({
                      ...queryInfo,
                      ...{ lessonName: e.target.value },
                    })
                  }
                  placeholder="请输入课程名称"
                />
              </IonCol>
              <IonCol className="flex ml-8">
                <IonLabel className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  客户姓名
                </IonLabel>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  onChange={(e) =>
                    setQueryInfo({
                      ...queryInfo,
                      ...{ eduName: e.target.value },
                    })
                  }
                  placeholder="请输入客户姓名"
                />
              </IonCol>
              <IonCol className="flex ml-8">
                <button
                  className="w-24 h-12 mr-6 text-white border-2 rounded-md shadow-md bg-primary-600 focus:bg-primary-700"
                  onClick={() => onQuery()}
                >
                  查询
                </button>
              </IonCol>
            </IonRow>
          </div>
        </div>
        <div className="absolute w-full mt-10">
          <table className="w-11/12 ">
            <thead>
              <tr className="grid items-center h-10 grid-cols-8 gap-2 font-bold text-gray-700 bg-white rounded-lg w-fulls justify-items-center">
                <th className="flex items-center justify-center">
                  教育机构名称
                </th>
                <th className="flex items-center justify-center">课程名称</th>
                <th className="flex items-center justify-center">客户姓名</th>
                <th className="flex items-center justify-center">考勤日期</th>
                <th className="flex items-center justify-center">考勤时间</th>
                <th className="flex items-center justify-center">
                  划拨金额（元）
                </th>
                <th className="flex items-center justify-center">划拨结果</th>
                <th className="flex items-center justify-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {state.transfer.transferList.map((list: Transfer, i: any) => (
                <ListEntry transfer={list} key={i} myKey={i} />
              ))}
              <tr>
                <td colSpan={7}>
                  {" "}
                  <Paging
                    url={paramStr}
                    page={page}
                    pagesize={20}
                    total={total}
                    onPageChange={onPageChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default TransferQuery;
