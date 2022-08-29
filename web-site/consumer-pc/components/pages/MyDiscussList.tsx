import { FC, useContext, useCallback, useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import Router, { useRouter } from "next/router";
import Navbar from "components/Navbar";
import { Link } from "react-router-dom";
import { AppContext, setDiscussDetail } from "../../appState";
import { searchContractURL } from "../../const/const";
import PullToRefresh from "react-simple-pull-to-refresh";
import { LessonDiscussInfo } from "../../types/types";

// 课程协商列表card
const DiscussListCard: FC<LessonDiscussInfo> = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const refreshDiscussDetail = useCallback(
    (discuss: LessonDiscussInfo) => {
      dispatch(setDiscussDetail(discuss));
    },
    [dispatch]
  );

  return (
    <div className="pb-3 mx-3 mt-2 bg-white rounded-lg shadow-md">
      <div className="flex pb-1 mx-2 mb-2 rounde-xl">
        <img
          className="w-20 h-20 mt-2 ml-1 rounded-xl"
          src={props.lessonImages}
        ></img>
        <div className="mt-3 ml-3">
          <div className="text-sm font-medium text-gray-700 ">
            {props.lessonName}
          </div>
          <div className="flex mt-1">
            <div className="text-sm text-gray-400 ">协商标题：</div>
            <div className="text-sm text-gray-800">{props.discussTitle}</div>
          </div>
          <div className="flex mt-1">
            <div className="text-sm text-gray-400 ">协商日期：</div>
            <div className="text-sm text-gray-700">{props.discussDate}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 text-xs text-white justify-items-center">
        <Link to="/myDiscussDetail">
          <div
            className="px-4 py-1 shadow-md rounded-3xl bg-remind-400 shadow-remind-400"
            onClick={() => {
              refreshDiscussDetail(props.item as LessonDiscussInfo);
            }}
          >
            查看详情
          </div>
        </Link>
      </div>
    </div>
  );
};

// 协商列表页面
const MyDiscussList = () => {
  const [discussList, setDiscussList] = useState([] as LessonDiscussInfo[]);
  const [page, setPage] = useState(0);
  const getParamStr = (params: any, url: string) => {
    let result = "?";
    Object.keys(params).forEach(
      (key) => (result = result + key + "=" + params[key] + "&")
    );
    return url + result;
  };
  const paramStr = getParamStr(
    {
      page: page,
      size: 10,
    },
    searchContractURL
  );
  useEffect(() => {
    onQuery();
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
        setDiscussList(json.result);
      });
  };

  const onRefresh = async () => {
    setPage(0);
    onQuery();
  };

  const onInfiniteScrolldown = (ev: any) => {
    setPage(page + 1);
    fetch(paramStr, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setDiscussList([...discussList, ...json.result]);
        ev.target.complete();
      });
  };
  return (
    <IonPage>
      <IonHeader>
        <Navbar title="课程协商列表" />
      </IonHeader>
      <IonContent>
        <PullToRefresh onRefresh={onRefresh}>
          <div>
            {discussList.map((item, index) => {
              return (
                <DiscussListCard
                  key={index}
                  lessonImages={item.lessonImages}
                  lessonName={item.lessonName}
                  discussTitle={item.discussTitle}
                  discussDate={item.discussDate}
                  item={item}
                />
              );
            })}
          </div>
        </PullToRefresh>
        <IonInfiniteScroll
          onIonInfinite={onInfiniteScrolldown}
          threshold="100px"
          disabled={false}
        >
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="加载数据"
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default MyDiscussList;
