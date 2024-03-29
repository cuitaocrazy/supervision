import { FC, useContext, useCallback, useState, useEffect } from 'react';
import { IonPage, IonHeader, IonContent, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react"
import Router, { useRouter } from 'next/router'
import Navbar from 'components/Navbar'
import { Contract } from '../../types/types'
import { Link } from 'react-router-dom';
import { AppContext, setContractDetail } from '../../appState';
import { searchContractURL } from '../../const/const';
import PullToRefresh from 'react-simple-pull-to-refresh';

interface OrderListProps {
  lessonImages?: string
  lessonName?: string
  consumerStuName?: string
  lessonTotalQuantity?: number
  lessonCompletedQuantity?: number
  item?: Contract
}

// 课程列表card 
const LessonListCard: FC<OrderListProps> = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const refreshContractDetail = useCallback((contract: Contract) => {
    dispatch(setContractDetail(contract));
  }, [dispatch]);

  return <div className='pb-3 mx-3 mt-2 bg-white rounded-lg shadow-md'>
    <div className='flex pb-1 mx-2 mb-2 rounde-xl'>
      <img className='w-20 h-20 mt-2 ml-1 rounded-xl' src="https://s3.bmp.ovh/imgs/2022/08/30/28f95385d82b4f7c.jpg"></img>
      <div className='mt-3 ml-3'>
        <div className='text-sm font-medium text-gray-700 '>{props.lessonName}</div>
        <div className='flex mt-1'>
          <div className='text-sm text-gray-400 '>学生姓名：</div>
          <div className='text-sm text-gray-800'>{props.consumerStuName}</div>
        </div>
        <div className='flex mt-1'>
          <div className='text-sm text-gray-400 '>总课时/已上课时：</div>
          <div className='text-sm text-gray-700'>{props.lessonTotalQuantity}<span>/</span></div>
          <div className='pl-1 text-sm text-orange-400'>{props.lessonCompletedQuantity}</div>
        </div>
      </div>
    </div>
    <div className='grid grid-cols-3 gap-2 text-xs text-white justify-items-center'>
      <Link to='/myLessonEvalDetail' >
        <div className='px-6 py-1 shadow-md rounded-3xl bg-primary-500 shadow-primary-300'
          onClick={() => { refreshContractDetail(props.item as Contract) }}>去评价</div>
      </Link>

      <Link to='/myApplyComp'>
        <div className='px-6 py-1 shadow-md rounded-3xl bg-secondary-300 shadow-secondary-300'
          onClick={() => { refreshContractDetail(props.item as Contract) }}>去投诉</div>
      </Link>

      <Link to='/myLessonDetail'>
        <div className='px-4 py-1 shadow-md rounded-3xl bg-remind-400 shadow-remind-400'
          onClick={() => { refreshContractDetail(props.item as Contract) }}>查看详情</div>
      </Link>
    </div>
  </div>
}

// 课程列表页面
const MyLessonList = () => {
  const [orderList, setOrderList] = useState([] as Contract[])
  const [page, setPage] = useState(0)
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  const paramStr = getParamStr(
    {
      page: page,
      size: 10
    },
    searchContractURL
  );
  useEffect(() => {
    onQuery()
  }, [])

  const onQuery = () => {
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
      .then((json) => {
        setOrderList(json.result)
      })
  }
  const onRefresh = async () => {
    setPage(0)
    onQuery()
  };

  const onInfiniteScrolldown = (ev: any) => {
    setPage(page + 1)
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
      .then((json) => {
        setOrderList([...json.result])
        // todo 下面代码存在重复数据的问题，暂时注释掉
        // setOrderList([...orderList, ...json.result])
        ev.target.complete();
      })
  }
  return <IonPage>
    <IonHeader>
      <Navbar title="课程列表" />
    </IonHeader>
    <IonContent>
      <PullToRefresh onRefresh={onRefresh}>
        <div>
          {orderList.map((item, index) => {
            return <LessonListCard key={index} lessonImages={item.lessonImages} lessonName={item.lessonName} consumerStuName={item.consumerStuName} lessonTotalQuantity={item.lessonTotalQuantity} lessonCompletedQuantity={item.lessonAccumulationQuantity} item={item} />
          })}
        </div>
      </PullToRefresh>
      <IonInfiniteScroll
        onIonInfinite={onInfiniteScrolldown}
        threshold="100px"
        disabled={false}
      >
        <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="加载数据">

        </IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
  </IonPage>
}

export default MyLessonList