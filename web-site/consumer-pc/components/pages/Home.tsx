import { IonPage, IonContent, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react"
import Search from '../Search'
import { Lesson } from '../../types/types'
import LessonListCard from '../LessonListCard'
import LessonImages from "components/LessonImages"
import FeaturedRecommendAndMore from '../FeaturedRecommendAndMore'
import { useEffect, useState, useContext } from "react"
import { searchLessonURL } from '../../const/const'
import PullToRefresh from 'react-simple-pull-to-refresh';
import { AppContext } from '../../appState';
// import Menu from '../pages/Menu';
// import PulldownRefresh from '@nuonuonuonuoyan/react-pulldown-refresh'

// 首页
const Home = () => {
  // 轮播图数据
  let lesson: Lesson = { lessonImgs: "https://s3.bmp.ovh/imgs/2022/09/07/10c800bced69deb7.png" }
  // let lesson: Lesson = { lessonImgs: "../../img/shuffling_1.png" }
  // 课程列表数据

  const [lessonList, setLessonList] = useState([] as Lesson[])
  const [page, setPage] = useState(0)
  const onQuery = () => {
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
      .then((json) => {
        setLessonList(json.result)
      })
  }
  const { state } = useContext(AppContext);

  useEffect(onQuery, [])

  const [queryStr, setQueryStr] = useState('')

  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  const paramStr = getParamStr(
    {
      queryStr: queryStr,
      page: page,
      size: 10
    },
    searchLessonURL
  );
  const onRefresh = async () => {
    setPage(0)
    onQuery()
  };



  const onInfiniteScrolldown = (ev: any) => {
    console.log('onInfiniteScrolldown')
    setPage(page + 1)
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
      .then((json) => {
        setLessonList([...lessonList, ...json.result])
        ev.target.complete();
      })
  };
  return <IonPage>
    <IonContent>
      <div className='relative '>
        <div className='bg-white'>
          <Search setQueryStr={setQueryStr} onQuery={onQuery} />
          <LessonImages lessonImages={lesson.lessonImgs} />
          <FeaturedRecommendAndMore />

          <PullToRefresh onRefresh={onRefresh}>
            <div className="grid col-span-4 py-8 m-auto space-x-2 space-y-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 max-w-7xl">
              {lessonList.map((item, index) => {
                return <LessonListCard key={index} lesson_imgs={item.lessonImgs} lesson_name={item.lessonName} lesson_introduce={item.lessonIntroduce} item={item} edu_address={item.edu?.eduAddress} />
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
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default Home