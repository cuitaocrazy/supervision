// 智能合约签署汇总查询
import React, { useState } from 'react';
import { useEffect, useCallback, useContext } from 'react';
import { IonPage, IonRow, IonCol } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { AppContext, setChainCodeSignSumInfo } from '../../appState';
import { ChainCodeSignSum } from '../../types/types';
import Paging from '../paging';
import Quit from '../Quit';

const findURL = 'http://localhost:3003/edb/chaincode/count';

const ChinCodeSignSumQuery: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({ chaincodeDesc: '' });
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(101);

  const onPageChange = (records: any, total: number, newPage: number) => {
    setPage(newPage);
    setTotal(total);
    refreshList(records);
  };
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => {
      if (params[key]) result = result + key + '=' + params[key] + '&';
    });
    return url + result;
  };
  const paramStr = getParamStr(
    {
      chaincodeDesc: queryInfo?.chaincodeDesc,
    },
    findURL
  );
  console.log(paramStr);
  const refreshList = useCallback(
    (chainCodes: ChainCodeSignSum) => {
      dispatch(setChainCodeSignSumInfo(chainCodes));
    },
    [dispatch]
  );

  const onQuery = () => {
    console.log('111');
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log('222');
        const { result, records } = json;
        console.log('result' + result);
        if (result) {
          console.log('333');
          refreshList(records);
        }
        return;
      });
  };

  console.log(state);
  useEffect(onQuery, []);
  // const ListEntry = ({ chainCode }: { chainCode: ChainCode }) => (
  //   <tr className="grid items-center grid-cols-6 gap-10 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 ">
  //     <td className="flex items-center justify-center leading-10">{chainCode.transferCount}</td>
  //     <td className="flex items-center justify-center leading-10">{chainCode.attendanceTotal}</td>
  //     <td className="flex items-center justify-center leading-10">{chainCode.contractCount}</td>
  //   </tr>
  // );

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
            <span className="pr-1 text-gray-600">智能合约签署汇总信息</span>
          </div>
        </div>
        {/* <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
          <div className="text-base font-bold">快速查询</div>
          <hr className="mt-2 mb-4" />
          <div className="flex">
            <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  链码描述：
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入链码描述"
                  onChange={e =>
                    setQueryInfo({ ...queryInfo, ...{ chaincodeDesc: e.target.value } })
                  }
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
        </div> */}

        <div className="absolute w-full mt-10">
          <table className="w-11/12">
            <thead>
              <tr className="grid items-center h-10 grid-cols-3 gap-2 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">交易智能合约签署数量</th>
                <th className="flex items-center justify-center">考勤智能合约数量</th>
                <th className="flex items-center justify-center">划拨智能合约数量</th>
              </tr>
            </thead>
            <tbody>
              <tr className="grid items-center grid-cols-3 gap-2 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 ">
                <td className="flex items-center justify-center leading-10">
                  {state.chainCodeSignSum.chainCodeSignSumInfo?.transferCount}
                </td>
                <td className="flex items-center justify-center leading-10">
                  {state.chainCodeSignSum.chainCodeSignSumInfo?.attendanceTotal}
                </td>
                <td className="flex items-center justify-center leading-10">
                  {state.chainCodeSignSum.chainCodeSignSumInfo?.contractCount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default ChinCodeSignSumQuery;