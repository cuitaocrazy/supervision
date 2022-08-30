import { useEffect, useCallback, useContext, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
  IonPage,
  IonCard,
  IonCardContent,
  IonRow,
  IonCol,
} from '@ionic/react';
import Quit from '../../Quit';
import Paging from '../../paging';
import moment from 'moment';

const findURL = 'http://localhost:3003/edb/transaction/find';

const Transaction: React.FC = () => {
  //todo 根据token获取LoginUser信息
  const loginName = window.loginUser;
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(101); //todo


  const [transactionStatState, setTransactionStatState] = useState([] as any[]);
  const onPageChange = (records: any, total: number, newPage: number) => {
    setPage(newPage);
    setTransactionStatState(records);
  };
  const [queryInfo, setQueryInfo] = useState({
    contractId: '',
    tranDate: moment().format('YYYYMMDD'),
    account: '',
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
      contractId: queryInfo.contractId,
      account: queryInfo.account,
      tranDate: queryInfo.tranDate,
      loginName: loginName,
    },
    findURL
  );
  const translateTranType = (tranType: string) => {
    switch (tranType) {
      case 'buycard': {
        return '购课';
      }
      case 'refund': {
        return '退课';
      }
      case 'transfer': {
        return '划拨';
      }
    }
    return tranType;
  };
  const onQuery = () => {
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
          setTotal(total);
          setTransactionStatState(records);
        }
      });
  };
  useEffect(onQuery, []);

  const ListEntry = ({ record, ...props }: { record: any }) => (
    <tr className="grid items-center grid-cols-7 gap-2 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 ">
      <td className="flex items-center justify-center leading-10">{record.transactionId}</td>
      <td className="flex items-center justify-center leading-10">{record.contractId}</td>
      <td className="flex items-center justify-center leading-10">{record.transactionAmt}</td>
      <td className="flex items-center justify-center leading-10">{record.tranDate}</td>
      <td className="flex items-center justify-center leading-10">{record.tranTime}</td>
      <td className="flex items-center justify-center leading-10">
        {translateTranType(record.tranType)}
      </td>
      <td className="flex items-center justify-center leading-10">{record.eduSupervisedAccount}</td>
    </tr>
  );

  return (
    <IonPage>
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
                  原合同号:
                </div>
                <input
                  type="text"
                  className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                  placeholder="请输入账户号"
                  value={queryInfo.contractId}
                  onChange={e => setQueryInfo({ ...queryInfo, ...{ contractId: e.target.value } })}
                />
              </IonCol>
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
              <tr className="grid items-center h-10 grid-cols-7 gap-2 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">交易ID</th>
                <th className="flex items-center justify-center">合同号</th>
                <th className="flex items-center justify-center">金额</th>
                <th className="flex items-center justify-center">交易日期</th>
                <th className="flex items-center justify-center">交易时间</th>
                <th className="flex items-center justify-center">交易类型</th>
                <th className="flex items-center justify-center">监管账户</th>
              </tr>
            </thead>
            <tbody>
              {transactionStatState.map((list: any, i: any) => (
                <ListEntry record={list} key={i} />
              ))}
              <tr>
                <td colSpan={5}>
                  {' '}
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
          {/* <Paging url={paramStr} page={page} pagesize={20} total={total} onPageChange={onPageChange}/> */}
        </div>
      </div>
    </IonPage>
  );
};

export default Transaction;
