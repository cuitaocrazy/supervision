
import { useEffect,useCallback,useContext,useState,useRef } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext,setBlackList,setBlackDetail} from '../../../appState';
import {Black} from '../../../types/types'
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonModal,
  IonCard,
  IonCardContent,
  IonCardHeader
} from '@ionic/react';

const queryURL = 'http://localhost:3003/lesson/query'
const delURL = 'http://localhost:3003/lesson/del'
const modifyURL = 'http://localhost:3003/lesson/modifyURL'
const attendURL = 'http://localhost:3003/lesson/attend'
const demoBlackList:Black[] = [
    { 
      orgId:'1',
      orgName: '机构',
      reason: '1111',
      blackDate: '2020-01-01',
      blackTime: '00:00:00'
    },
    { 
      orgId:'2',
      orgName: '机构3',
      reason: '1111',
      blackDate: '2020-01-01',
      blackTime: '00:00:00'
    },
    ]

      




// 课程查询页面
const BaseInfoQuery:React.FC =()=>{

  const onCancel = (item:Black)=>() => {
    fetch(delURL, {
      method: 'PUT',
      body: JSON.stringify({
        "orgId":item.orgId,
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      alert(json.result)
    })
  }
  const createModal = useRef<HTMLIonModalElement>(null);
  const [isCreateModalOpen,setIsCreateModalOpen] = useState(false)
  const [createState,setCreateState] = useState({} as Black )
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({orgName:''})
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
    orgName: queryInfo.orgName
  },queryURL)

  console.log(state)
  const refreshLessonList = useCallback((items:Black[]) => {
    dispatch(setBlackList(items));
  },[dispatch]);

  const onDetail = (item:Black)=>() => {
    doSetDetail(item)
  }

  const doSetDetail = useCallback(item => {
    dispatch({...setBlackDetail(item),...{backPage:'/tabs/black/query'}});
  },[dispatch]);
  useEffect(() => { 
    // fetch(paramStr, {
    //   method: 'GET',
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8',
    //   },
    // }).then(res => res.json())
    // .then((json) => {
    // const {userInfoList} = json //todo
    // refreshLessonList(demoLessonList.filter((userInfo:SupervisorUser)=>userInfo.supervisorUsername&&userInfo.supervisorUsername.indexOf(queryInfo.supervisorUsername)>-1).filter((userInfo:SupervisorUser)=>userInfo.supervisorLoginName.indexOf(queryInfo.supervisorLoginName)>-1))
    refreshLessonList(demoBlackList)},[]);

    const onQuery = ()=>{
       refreshLessonList(demoBlackList.filter((item:Black)=>item.orgName.indexOf(queryInfo.orgName)>-1))
    
    }

  const ListEntry = ({ item,key, ...props } : {item:Black,key:any}) => (
    <IonItem key={key} >
      <IonLabel>
        <p className='text-center'>{item.orgName}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{item.reason}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{item.blackDate}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{item.blackTime}</p>
      </IonLabel>
      <IonLabel>
         <div className='flex gap-2'>
            <button className='p-1 text-white bg-blue-500 rounded-md' onClick={onCancel(item)}>删除</button> 
            {/* <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(item)}>详情</button> */}
         </div>
      </IonLabel>
    </IonItem>
    );
    if(state.black.blackDetail){
      return <Redirect to="/tabs/black/detail" />
    }

        return   <IonPage >
                  <div className='relative'>
                  <div className='flex'>
                  <IonRow className='flex justify-between '>
                        <IonCol className='flex ml-8'>
                          <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>登录名查询：</IonLabel>
                          <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{PayerStub:e.target.value}})} />
                        </IonCol> 
                      </IonRow>
                    <IonRow className='flex justify-between '>
                        <IonCol className='flex ml-8' > 
                            <button onClick={()=>onQuery()} >查询</button>
                            <button onClick={()=>setIsCreateModalOpen(true)} >新增</button>
                        </IonCol>
                  </IonRow> 
                  </div>
                  <IonModal isOpen={isCreateModalOpen}  onDidDismiss={async ()=>{setIsCreateModalOpen(false)}}> 
                  <IonCard>
                    <IonCardHeader>
                        黑名单新增
                    </IonCardHeader>
                    <IonCardContent>
                      <form  onSubmit={()=>{}}>
                      <IonItem>
                        <IonLabel >机构名称：</IonLabel>
                        <input></input>
                      </IonItem>
                      <IonItem>
                        <IonLabel >黑名单原因：</IonLabel>
                        <input></input>
                      </IonItem>

                      <div className='flex mt-2 mb-2 space-x-2 '>
                        <span  className="flex-1 ">
                                  <button className='flex items-center justify-center flex-none submutButton focus:outline-none hover:bg-primary-700 ' type='submit' >确认</button>

                        </span >
                        <span className="flex-1 ">
                          <button  className='cancelButton' onClick={ ()=>setIsCreateModalOpen(false)}>取消</button>
                        </span>
                      </div>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonModal>
                  
                <div className='absolute w-full mt-10'>
                  <IonList>
                    <IonItem key='title'>
                      <IonLabel> 
                        <div className='font-black text-center'>登录名称</div>
                      </IonLabel>
                      <IonLabel>
                        <div className='font-black text-center'>机构名称</div>
                      </IonLabel>
                      <IonLabel>
                        <div className='font-black text-center'>用户名</div>
                      </IonLabel>
                      <IonLabel>
                        <div className='font-black text-center'>用户电话</div>
                      </IonLabel>
                      <IonLabel>
                        <div className='font-black text-center'>操作</div>
                      </IonLabel>
                  </IonItem>
                      <div className=''>
                      {state.black.blackList.map((list:Black, i: any) => (
                      <ListEntry item={list} key={i} />
                    ))}
                      </div>
                  </IonList>
              </div> 
              </div>            
        </IonPage>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
}
export default BaseInfoQuery