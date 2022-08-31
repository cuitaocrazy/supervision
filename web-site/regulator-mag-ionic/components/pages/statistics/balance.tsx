import { useContext, useState } from 'react';
import { IonPage, IonRow, IonCol } from '@ionic/react';
import { AppContext } from '../../../appState';
import Quit from '../../Quit';
import moment from 'moment';
import { edbBalanceFindURL } from 'const/const';

const findURL = edbBalanceFindURL;

const Balance: React.FC = () => {
  const [balanceStatState, setBalanceStatState] = useState({
    account: '',
    sum: null,
    tranDate: '',
  });
  const [queryInfo, setQueryInfo] = useState({
    account: '',
    tranDate: moment().format('YYYYMMDD'),
  });
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => {
      if (params[key]) result = result + key + '=' + params[key] + '&';
    });
    return url + result;
  };
  const paramStr = getParamStr(
    {
      account: queryInfo.account,
      tranDate: queryInfo.tranDate,
    },
    findURL
  );

  const onQuery = () => {
    if (queryInfo.account == '' || queryInfo.tranDate == '') {
      alert('必须输入账户号和日期才能查询');
      return;
    }

    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const { result, records, total } = json;
        if (result) {
          // todo 测试方便
          // setTotal(total)
          setBalanceStatState(records[0]);
        }
      });
  };

  return (
    <IonPage className='bg-gray-100'>
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
            <span className="pr-1 text-gray-600">监管机构管理</span>/
            <span className="pl-1 text-primary-500">余额查询</span>
          </div>
        </div>
        <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
          <div className="text-base font-bold">快速查询</div>
          <hr className="mt-2 mb-4" />
          <div className="flex">
            <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  账户名称:
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入账户号"
                  value={queryInfo.account}
                  onChange={e => setQueryInfo({ ...queryInfo, ...{ account: e.target.value } })}
                />
              </IonCol>
              <IonCol className="flex ml-8 text-gray-800">
                <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                  查询日期:
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入日期"
                  value={queryInfo.tranDate}
                  onChange={e => setQueryInfo({ ...queryInfo, ...{ tranDate: e.target.value } })}
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

        {/* 列表 */}
        <div className="absolute w-full mt-10">
          <table className="w-11/12">
            <thead>
              <tr className="grid items-center h-10 grid-cols-3 gap-2 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">监管账户名</th>
                <th className="flex items-center justify-center">余额</th>
                <th className="flex items-center justify-center">数据日期</th>
              </tr>
            </thead>
            <tbody>
              <tr className="grid items-center grid-cols-3 gap-2 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 ">
                <td className="flex items-center justify-center leading-10">
                  {balanceStatState.account}
                </td>
                <td className="flex items-center justify-center leading-10">
                  {balanceStatState.sum}
                </td>
                <td className="flex items-center justify-center leading-10">
                  {balanceStatState.tranDate}
                </td>
              </tr>
            </tbody>
          </table>
          {/* <Paging url={paramStr} page={page} pagesize={20} total={total} onPageChange={onPageChange}/> */}
        </div>
      </div>
    </IonPage>
  );
};

export default Balance;
