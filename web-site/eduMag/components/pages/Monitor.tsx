import { useContext, useState } from "react";
import { AppContext } from "../../appState";
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonPicker,
} from "@ionic/react";
import { PickerColumn } from "@ionic/core";
type TranMonitor = {
  USVOrgID: string;
  USVOrgName: string;
  DisbursedAmt: number;
  NotDisbursedAmt: number;
  date: string;
};
const demoOrderList: TranMonitor[] = [
  {
    USVOrgID: "1111",
    USVOrgName: "监管机构A",
    DisbursedAmt: 1000000,
    NotDisbursedAmt: 2000000,
    date: "202201",
  },
];

const demoUSVList = [
  { USVOrgID: "Edu1MSP", name: "灵纳教育" },
  { USVOrgID: "Edu2MSP", name: "测试机构" },
];

//监管页面(教育资金监管机构)
const Monitor: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({
    USVOrgID: "",
    USVOrgName: "",
    DisbursedAmt: 0,
    NotDisbursedAmt: 0,
    isOpen: false,
  });
  // useEffect(() => {
  //   refreshOrderList(demoOrderList.filter(tranSum=>tranSum.USVOrgID===queryInfo.USVOrgID||queryInfo.USVOrgID===''))
  //   refreshUSVList(demoUSVList)
  //   return
  // },[queryInfo.USVOrgID, queryInfo.SubscribeStartDate])

  const usvPickerColumn = {
    name: "USVOrg",
    options: state.USVList.map((usv: { name: any; USVOrgID: any }) => {
      return { text: usv.name, value: usv.USVOrgID };
    }),
  } as PickerColumn;

  //   const doSetDetail = useCallback(order => {
  //     dispatch(setDetail(order));
  //   },[dispatch]);

  // const refreshOrderList = useCallback((orders:TranSum[]) => {
  //   dispatch(setOrder(orders));
  // },[dispatch]);
  // const refreshUSVList = useCallback((USVList:{USVOrgID:string,name:string}[]) => {
  //   dispatch(setUSV(USVList));
  // },[dispatch]);

  const ListEntry = ({
    MonitorInfo,
    key,
    ...props
  }: {
    MonitorInfo: TranMonitor;
    key: any;
  }) => (
    <div className="">
      <IonItem key={key}>
        <IonLabel>
          <p className="text-center">领纳教育</p>
        </IonLabel>
        <IonLabel>
          <p className="text-center">10000000000</p>
        </IonLabel>
        <IonLabel>
          <p className="text-center">100000000000</p>
        </IonLabel>
      </IonItem>
    </div>
  );

  if (true) {
    return (
      <IonPage>
        <div className="flex mb-20">
          <IonRow className="flex justify-between gap-10">
            <IonCol className="flex ml-8">
              <IonLabel className="flex h-12 p-2 font-bold text-center text-primary-600 w-28">
                教育机构：
              </IonLabel>
              <IonLabel
                className="flex w-56 h-12 pt-2.5 pl-20 font-bold text-center text-primary-600 bg-white rounded-md"
                onClick={() =>
                  setQueryInfo({
                    ...queryInfo,
                    ...{ isOpen: !queryInfo.isOpen },
                  })
                }
              >
                {queryInfo.USVOrgName}
              </IonLabel>
              <IonPicker
                isOpen={queryInfo.isOpen}
                columns={[usvPickerColumn]}
                buttons={[
                  {
                    text: "取消",
                    role: "cancel",
                    handler: (value) => {
                      // setQueryInfo({...queryInfo,...{isOpen:!queryInfo.isOpen}})
                    },
                  },
                  {
                    text: "确认",
                    handler: (value) => {
                      setQueryInfo({
                        ...queryInfo,
                        ...{
                          USVOrgID: value.USVOrg.value,
                          USVOrgName: value.USVOrg.text,
                          isOpen: !queryInfo.isOpen,
                        },
                      });
                    },
                  },
                ]}
              ></IonPicker>
            </IonCol>
            <IonCol className="flex justify-center">
              <button className="w-24 p-2 text-white rounded-md bg-secondary-500 hover:bg-secondary-700 focus:outline-none">
                查询
              </button>
            </IonCol>
          </IonRow>
        </div>
        <div>
          <IonList>
            <IonItem key="title">
              <IonLabel>
                <div className="font-black text-center">教育机构名称</div>
              </IonLabel>
              <IonLabel>
                <div className="font-black text-center">已放款金额（元）</div>
              </IonLabel>
              <IonLabel>
                <div className="font-black text-center">未放款金额（元）</div>
              </IonLabel>
              <IonLabel>
                <div className="font-black text-center">年月</div>
              </IonLabel>
              <IonLabel>
                <div className="font-black text-center">共发放（次）</div>
              </IonLabel>
              <IonLabel>
                <div className="font-black text-center">已发放（次）</div>
              </IonLabel>
            </IonItem>
            {/* {state.orderList.map((list:TranSum, i: any) => (
                          <ListEntry tranSumInfo={list} key={i} />
                        ))} */}
            <div>
              <IonItem>
                <IonLabel>
                  <p className="text-center">灵纳教育机构</p>
                </IonLabel>
                <IonLabel>
                  <p className="text-center">1000000</p>
                </IonLabel>
                <IonLabel>
                  <p className="text-center">1000000</p>
                </IonLabel>
                <IonLabel>
                  <p className="text-center">2021-12</p>
                </IonLabel>
                <IonLabel>
                  <p className="text-center">10</p>
                </IonLabel>
                <IonLabel>
                  <p className="text-center">5</p>
                </IonLabel>
              </IonItem>
            </div>
          </IonList>
        </div>
      </IonPage>
    );
  } else {
  }
};
export default Monitor;
