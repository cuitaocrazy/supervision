
import { useEffect,useCallback,useContext } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext, setAnnouncementDetail, setAnnouncementList} from '../../../appState';
import {Announcement} from '../../../types/types'
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonContent,
  IonCard,
} from '@ionic/react';



const demoAnnouncementList:Announcement[] = [
    {
      announcementId:'1',
      announcementDate:'2020-01-01',
      announcementTime:'00:00:00',
      announcementAnnouncer:'介绍',
      announcementTitle:'标题',
      announcementContent:'介绍',
      announcementStatus:'on',
    },
    {
    announcementId:'2',
    announcementDate:'2020-01-01',
    announcementTime:'00:00:00',
    announcementAnnouncer:'介绍2',
    announcementTitle:'标题2',
    announcementContent:'介绍2',
    announcementStatus:'on',
  },
  ]

const AnnouncementQuery:React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
 const onDetail = (item:Announcement)=>() => {
    doSetDetail(item)
  }
   
  const doSetDetail = useCallback((item: Announcement) => {
    dispatch({...setAnnouncementDetail(item),...{backPage:'/tabs/announcement/query'}});
  },[dispatch]);
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
//   const paramStr = getParamStr({
//     consumerName:queryInfo.consumerName,
//     lessonName:queryInfo.lessonName,
//  },queryURL)
 const refreshList = useCallback((announcement:Announcement[]) => {
  dispatch(setAnnouncementList(announcement));
},[dispatch]);

useEffect(() => { 
  // fetch(paramStr, {
  //   method: 'GET',
  //   headers: {
  //     'Content-type': 'application/json;charset=UTF-8',
  //   },
  // }).then(res => res.json())
  // .then((json) => {
  // const {transferList} = json 
  
  // return })
  refreshList(demoAnnouncementList)
},[]);
console.log(state)


const ListEntry = ({ announcement,key, ...props } : {announcement:Announcement,key:any}) => (
  <IonItem key={key} >
    <IonLabel>
      <p  className='text-center'>{announcement.announcementTitle}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{announcement.announcementDate} {announcement.announcementTime}</p>
    </IonLabel>
    <IonLabel>
       <div className='flex gap-2'>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(announcement)}>查看详情</button>
       </div>
    </IonLabel>
  </IonItem>
  );
  if(state.announcement?.announcementDetail){
    return <Redirect to="/tabs/announcement/detail" />
  }
  return   <IonPage >
                <div className='relative'>
                <div className='flex'>
                  <IonCard>
                    <IonContent>
                        <label className='myLabel'>监管机构公告</label>
                    </IonContent>
                  </IonCard>
                </div>
              <div className='absolute w-full mt-10'>
                <IonList>
                    <div className=''>
                    {state.announcement?.announcementList.map((list:Announcement, i: any) => (
                    <ListEntry announcement={list}
                    key={i} />
                  ))}
                    </div>
                </IonList>
            </div> 
            </div>            
      </IonPage>
   }
export default AnnouncementQuery;

