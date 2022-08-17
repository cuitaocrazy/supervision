import { IonPage, IonHeader, IonContent,IonInfiniteScroll,IonInfiniteScrollContent } from "@ionic/react"
import Search from '../Search'
import NavbarNoGoBackBtn from '../NavbarNoGoBackBtn'
import { Lesson } from '../../types/types'
import LessonListCard from '../LessonListCard'
import LessonImages from "components/LessonImages"
import FeaturedRecommendAndMore from '../FeaturedRecommendAndMore'
import RoundedCornersStyles from '../RoundedCornersStyles'
import { useEffect,useState,useContext } from "react"
import {searchLessonURL} from '../../const/const'
import PullToRefresh from 'react-simple-pull-to-refresh';
import {AppContext} from '../../appState';
import { Redirect } from "react-router-dom"
// import Menu from '../pages/Menu';
// import PulldownRefresh from '@nuonuonuonuoyan/react-pulldown-refresh'

// 首页
const Home = () => {
  // 轮播图数据
  let lesson: Lesson = { lessonImgs: "http://placekitten.com/g/200/300" }
  // 课程列表数据

  const [lessonList,setLessonList] = useState([] as Lesson[])
  const [page,setPage] = useState(0)
  const onQuery = ()=>{
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

  useEffect(onQuery,[])

  const [queryStr,setQueryStr] = useState('')

  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  const paramStr = getParamStr(
    {
      queryStr: queryStr,
      page:page,
      size:10
    },
    searchLessonURL
  );
  const onRefresh = async () => {
    setPage(0)
    onQuery()
  };



  const onInfiniteScrolldown = (ev: any) => {
    console.log('onInfiniteScrolldown')
    setPage(page+1)
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      setLessonList([...lessonList,...json.result])  
      ev.target.complete();
    })
  };
  console.log(state)
  if(state.loginUser.loginName==null){
    console.log('AAAAAAA')
    return <Redirect to="/login" />
  }
  return <IonPage>
    <IonHeader>
      <NavbarNoGoBackBtn title="教育资金监管平台" />
    </IonHeader>
    <IonContent>
      <div className='relative bg-primary-600'>
        <RoundedCornersStyles />
        <div className='bg-white'>
          <Search setQueryStr={setQueryStr} onQuery={onQuery} />
          <LessonImages lessonImages={lesson.lessonImgs} />
          <FeaturedRecommendAndMore />

            <PullToRefresh onRefresh={onRefresh}>
            <div className="grid py-2 sm1:grid-cols-2 sm2:grid-cols-2 sm3:grid-cols-2">
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