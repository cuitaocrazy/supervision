import { FC, useEffect, useState, useCallback, useContext } from "react";
import { IonPage, IonRow, IonCol, IonLabel } from "@ionic/react";
import { AppContext, setContractList } from "../../appState";
import { Contract } from "../../types/types";
import Paging from "../paging"

const findUrl = "http://localhost:3003/edu/contract/find";

const ListEntry = ({ contract }: { contract: Contract }) => (
  <tr className="grid items-center grid-cols-12 gap-2 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 ">
    <td className="flex items-center justify-center leading-10">
      {contract.contractId}
    </td>
    <td className="flex items-center justify-center leading-10">
      {contract.consumerName}
    </td>
    <td className="flex items-center justify-center leading-10">
      {contract.consumerStuName}
    </td>
    <td className="flex items-center justify-center leading-10">
      {contract.lessonName}
    </td>
    <td className="flex items-center justify-center leading-10">
      {contract.lessonType}
    </td>
    <td className="flex items-center justify-center leading-10">
      {contract.lessonStartDate}
    </td>
    <td className="flex items-center justify-center leading-10">
      {contract.lessonEndDate}
    </td>
    <td className="flex items-center justify-center leading-10">
      {contract.lessonAttendanceType}
    </td>
    <td className="flex items-center justify-center leading-10">
      {contract.lessonTotalQuantity}
    </td>
    <td className="flex items-center justify-center leading-10">
      {contract.lessonTotalPrice}
    </td>
    <td className="flex items-center justify-center leading-10">
      {contract.lessonPerPrice}
    </td>
    <td className="flex items-center justify-center leading-10">
      {contract.teacherName}
    </td>
  </tr>
);

const OrderQuery = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({ contractId: "" });
  const [page,setPage] = useState(0)
  const [total,setTotal]= useState(101)//todo
  const onPageChange = (records:any,total:number,newPage:number)=>{
    setPage(newPage)
    setTotal(total)
    refreshList(records)    
  }
  const refreshList = useCallback(
    (contracts: Contract[]) => {
      dispatch(setContractList(contracts));
    },
    [dispatch]
  );
  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach((key) => {
      if (params[key] !== "") result = result + key + "=" + params[key] + "&";
    });
    return url + result;
  };
  const paramStr = getParamStr(
    {
      contractId: queryInfo.contractId,
    },
    findUrl
  );
  const onQuery = () => {
    state.contract?.contractList?.map(() => {
      console.log("holy shit");
    });
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
          refreshList(records)};
      });
  };
  useEffect(onQuery, []);
  return (
    <IonPage className="bg-gray-100">
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
            <span className="pr-1 text-gray-600">报表</span>/
            <span className="pl-1 text-primary-500">订单查询</span>
          </div>
        </div>
        <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
          <div className="text-base font-bold">快速查询</div>
          <hr className="mt-2 mb-4" />
          <div className="flex">
            <IonRow className="flex justify-between ">
              <IonCol className="flex ml-8">
                <IonLabel className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  订单号
                </IonLabel>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入订单号"
                  onChange={(e) => {
                    setQueryInfo({
                      ...queryInfo,
                      ...{ contractId: e.target.value },
                    });
                  }}
                />
              </IonCol>
              <IonCol className="flex ml-8">
                <button
                  onClick={onQuery}
                  className="w-24 h-12 mr-6 text-white border-2 rounded-md shadow-md bg-primary-600 focus:bg-primary-700"
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
              <tr className="grid items-center h-10 grid-cols-12 gap-2 font-bold text-gray-700 bg-white rounded-lg w-fulls justify-items-center">
                <th className="flex items-center justify-center">订单号</th>
                <th className="flex items-center justify-center">客户姓名</th>
                <th className="flex items-center justify-center">学生姓名</th>
                <th className="flex items-center justify-center">课程名称</th>
                <th className="flex items-center justify-center">课程类型</th>
                <th className="flex items-center justify-center">
                  课程开始日期
                </th>
                <th className="flex items-center justify-center">
                  课程结束日期
                </th>
                <th className="flex items-center justify-center">
                  课程签到类型
                </th>
                <th className="flex items-center justify-center">总课时</th>
                <th className="flex items-center justify-center">总价格</th>
                <th className="flex items-center justify-center">课时单价</th>
                <th className="flex items-center justify-center">教师姓名</th>
              </tr>
            </thead>
            <tbody>
              {state.contract?.contractList.map(
                (item: Contract, index: number) => (
                  <ListEntry key={index} contract={item} />
                )
              )}
              <tr>
                <td colSpan={12}> <Paging url={paramStr} page={page} pagesize={20} total={total} onPageChange={onPageChange}/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default OrderQuery;
