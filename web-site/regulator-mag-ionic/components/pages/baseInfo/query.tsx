
import { useEffect,useCallback,useContext,useState } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext,setUserInfoList,setUserInfoDetail} from '../../../appState';
import {SupervisorUser} from '../../../types/types'
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
} from '@ionic/react';

const queryURL = 'http://localhost:3003/lesson/query'
const delURL = 'http://localhost:3003/lesson/del'
const modifyURL = 'http://localhost:3003/lesson/modifyURL'
const attendURL = 'http://localhost:3003/lesson/attend'
const demoLessonList:SupervisorUser[] = [
    { 
      supervisorLoginName: '监管机构登录名',
      supervisorUsername: '监管机构用户名',
      supervisorPhone: '监管机构电话',
      supervisorOrgId: '监管机构id'
    },
    {  
      supervisorLoginName: '监管机构登录名1',
      supervisorUsername: '监管机构用户名1',
      supervisorPhone: '监管机构电话',
      supervisorOrgId: '监管机构id'
    }
    ]

      




// 课程查询页面
const LessonQuery:React.FC =()=>{

  const onCancel = (item:SupervisorUser)=>() => {
    fetch(delURL, {
      method: 'PUT',
      body: JSON.stringify({
        "supervisorLoginName":item.supervisorLoginName,
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      alert(json.result)
    })
  }

  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({supervisorLoginName:'',supervisorUsername:''})
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
    supervisorLoginName: queryInfo.supervisorLoginName,
    supervisorUsername:queryInfo.supervisorUsername,
  },queryURL)

  const refreshLessonList = useCallback((loginUser:SupervisorUser[]) => {
    dispatch(setUserInfoList(loginUser));
  },[dispatch]);

  const onDetail = (item:SupervisorUser)=>() => {
    doSetDetail(item)
  }

  const doSetDetail = useCallback(userInfo => {
    dispatch({...setUserInfoDetail(userInfo),...{backPage:'/tabs/baseInfo/query'}});
  },[dispatch]);
  useEffect(() => { 
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
    const {userInfoList} = json //todo
    refreshLessonList(demoLessonList.filter((userInfo:SupervisorUser)=>userInfo.supervisorUsername.indexOf(queryInfo.supervisorUsername)>-1).filter((userInfo:SupervisorUser)=>userInfo.supervisorLoginName.indexOf(queryInfo.supervisorLoginName)>-1))
    return 
    })
  },[queryInfo.supervisorLoginName, queryInfo.supervisorLoginName, paramStr, refreshLessonList]);

  const ListEntry = ({ userInfo,key, ...props } : {userInfo:SupervisorUser,key:any}) => (
    <IonItem key={key} >
      <IonLabel>
        <p className='text-center'>{userInfo.supervisorLoginName}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{userInfo.supervisorOrgName}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{userInfo.supervisorUsername}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{userInfo.supervisorPhone}</p>
      </IonLabel>
      <IonLabel>
         <div className='flex gap-2'>
            <button className='p-1 text-white bg-blue-500 rounded-md' onClick={onCancel(userInfo)}>删除</button> 
            <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(userInfo)}>详情</button>
         </div>
      </IonLabel>
    </IonItem>
    );
    if(state.userInfo.userInfoDetail==null||state.userInfo.userInfoDetail==undefined){
      return   <IonPage >
                  <div className='relative'>
                  <div className='flex'>
                  <IonRow className='flex justify-between '>
                        <IonCol className='flex ml-8'>
                          <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>登录名查询：</IonLabel>
                          <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{PayerStub:e.target.value}})} />
                        </IonCol>  
                        <IonCol className='flex ml-8'>
                          <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>用户名查询：</IonLabel>
                          <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{PayerStub:e.target.value}})} />
                        </IonCol>    
                  </IonRow>
                  </div>
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
                      {state.userInfo.userInfoList.map((list:SupervisorUser, i: any) => (
                      <ListEntry userInfo={list} key={i} />
                    ))}
                      </div>
                  </IonList>
              </div> 
              </div>            
        </IonPage>
     }
     else{
       return <Redirect to="/tabs/baseInfo/detail" />
     }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
}
export default LessonQuery