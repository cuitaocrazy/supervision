import { useEffect, useCallback, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  AppContext,
  setContractNegoList,
  setContractNegoDetail,
  setContractNegoAudit,
} from '../../../appState';
import { IonPage, IonRow, IonCol, useIonToast } from '@ionic/react';
// import Quit from "components/components/Quit";
import { ContractNego } from '../../../types/types';
import localforage from 'localforage';
import { eduContractNegoFindURL } from '../../../const/const';
import Quit from '../../Quit';

// const queryURL = "http://localhost:3003/edu/contractNego/query";

const ContractNegoQuery: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [eduName, setEduName] = useState('');
  const [loginName, setLoginName] = useState('');
  const [queryInfo, setQueryInfo] = useState({ lessonName: '' });
  const onPageChange = (records: any, total: number, newPage: number) => {
    setPage(newPage);
    setTotal(total);
    refreshList(records);
  };

  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  const paramStr = getParamStr(
    {
      lessonName: queryInfo.lessonName,
    },
    eduContractNegoFindURL
  );
  const refreshList = useCallback(
    (negos: ContractNego[]) => {
      dispatch(setContractNegoList(negos));
    },
    [dispatch]
  );
  // const onDetail = (item: ContractNego) => () => {
  //   doSetDetail(item);
  // };

  const doSetDetail = useCallback(
    (discuss: any) => {
      dispatch({
        ...setContractNegoDetail(discuss),
        ...{ backPage: '/tabs/ContractNegoQuery' },
      });
    },
    [dispatch]
  );

  const onAudit = (item: ContractNego) => () => {
    doSetAudit(item);
  };

  const doSetAudit = useCallback(
    (contractNegoAudit: any) => {
      dispatch({
        ...setContractNegoAudit(contractNegoAudit),
        ...{ backPage: '/tabs/ContractNegoQuery' },
      });
    },
    [dispatch]
  );

  useEffect(() => {
    // localforage.getItem("eduName").then((value) => {
    //   setEduName(value as string);
    // });
    localforage.getItem('loginName').then(value => {
      setLoginName(value as string);
      onQuery();
    });
    onQuery();
  }, [loginName]);

  const getStatus = (statusEnglish: any) => {
    if (statusEnglish === 'pending') {
      return '待审核';
    }
    if (statusEnglish === 'reject') {
      return '审核未通过';
    }
    if (statusEnglish === 'on') {
      return '上架';
    }
    if (statusEnglish === 'off') {
      return '下架';
    }
    return statusEnglish;
  };

  const getArgeeStr = (consumerArgee: any, eduArgee: any) => {
    if (consumerArgee && eduArgee) {
      return '以达成共识';
    } else if (consumerArgee) {
      return '等待机构确认';
    } else if (eduArgee) {
      return '等待消费者确认';
    } else {
      return '未知';
    }
  };

  const onQuery = () => {
    const paramStr = getParamStr(
      {
        lessonName: queryInfo.lessonName,
        loginName: loginName,
      },
      eduContractNegoFindURL
    );
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const { result, records, total } = json;
        console.log(json);
        if (result) {
          setTotal(total);
          refreshList(records);
        }
        return;
      });
  };
  const ListEntry = ({ contractNego, ...props }: { contractNego: ContractNego; key: any }) => (
    <tr className="grid items-center grid-cols-10 gap-2 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100">
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.lessonName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.lessonTotalQuantity}
      </td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.consumerName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.contract.consumerPhone}
      </td>
      <td className="flex items-center justify-center leading-10">{contractNego.negoRefundAmt}</td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.negoCompensationAmt}
      </td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.negoCreator == 'consumer' ? '消费者' : '机构'}
      </td>
      <td className="flex items-center justify-center leading-10">
        {contractNego.negoStatus === 'complete' ? '完成' : '协商中'}
      </td>

      <td className="flex items-center justify-center leading-10">
        {getArgeeStr(contractNego.negoConsumerAgree, contractNego.negoEduAgree)}
      </td>

      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          {/* <button
            className="p-1 rounded-md text-primary-600"
          >
            查看详情
          </button> */}
          <button
            className="p-1 text-cyan-600"
            onClick={onAudit(contractNego)}
            hidden={contractNego.negoStatus == 'complete'}
          >
            审核
          </button>
          {/* {discuss.discussStatus === "pending" ? (
            <button className="p-1 text-cyan-600" 
            onClick={onAudit(discuss)}>
              审核
            </button>
          ) : (
            <></>
          )} */}
        </div>
      </td>
    </tr>
  );

  console.log(state);
  if (state.contractNego.contractNegoDetail) {
    return <Redirect to="/tabs/contractNego/detail" />;
  }

  if (state.contractNego.contractNegoAudit) {
    return <Redirect to="/tabs/contractNego/audit" />;
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
            <span className="pr-1 text-gray-600">业务管理</span>/
            <span className="pl-1 text-primary-500">退课管理</span>
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
                  onChange={e =>
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

        {/* 课程协商明细列表 */}
        <div className="absolute w-full mt-10">
          <table className="w-11/12">
            <thead>
              <tr className="grid items-center h-10 grid-cols-10 gap-2 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                <th className="flex items-center justify-center">课程名称</th>
                <th className="flex items-center justify-center">总课时</th>
                <th className="flex items-center justify-center">客户姓名</th>
                <th className="flex items-center justify-center">联系方式</th>
                <th className="flex items-center justify-center">退货金额（元）</th>
                <th className="flex items-center justify-center">补偿金额（元）</th>
                <th className="flex items-center justify-center">发起者</th>
                <th className="flex items-center justify-center">状态</th>
                <th className="flex items-center justify-center">确认情况</th>
                <th className="flex items-center justify-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {state.contractNego?.contractNegoList.map((contractNego: ContractNego, i: any) => (
                <ListEntry contractNego={contractNego} key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </IonPage>
  );
};
export default ContractNegoQuery;
