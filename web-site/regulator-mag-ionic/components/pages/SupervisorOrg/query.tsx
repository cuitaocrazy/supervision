
import { useEffect,useCallback,useContext,useState } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext,setSupervisorOrgEdit,setSupervisorOrgList,setSupervisorOrgDetail} from '../../../appState';
import {SupervisorOrg} from '../../../types/types'
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonModal,
  IonCardContent,
  IonInput
} from '@ionic/react';

const queryURL = 'http://localhost:3003/lesson/query'
const delURL = 'http://localhost:3003/lesson/del'
const modifyURL = 'http://localhost:3003/lesson/modifyURL'
const attendURL = 'http://localhost:3003/lesson/attend'
const demoLessonList:SupervisorOrg[] = [
    { 
        supervisorOrgId: '机构ID',
        supervisorOrgName: '机构名称',
        parentSupervisorOrgId: '父机构ID',
        parentSupervisorOrgName: '父机构名称',
    },
    { 
        supervisorOrgId: '机构ID1',
        supervisorOrgName: '机构名称1',
        parentSupervisorOrgId: '父机构ID',
        parentSupervisorOrgName: '父机构名称',
    },
    ]

      




// 课程查询页面
const LessonQuery:React.FC =()=>{

  const onCancel = (item:SupervisorOrg)=>() => {
    // fetch(delURL, {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     "supervisorLoginName":item.supervisorLoginName,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8',
    //   },
    // }).then(res => res.json())
    // .then((json) => {
    //   alert(json.result)
    // })
  }

  const { state, dispatch } = useContext(AppContext);
  const [newOrgState,setNewOrgState] = useState({supervisorOrgName:''})
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const [queryInfo,setQueryInfo] = useState({supervisorOrgName:''})
  const paramStr = getParamStr({
    supervisorOrgName: queryInfo.supervisorOrgName,
  },queryURL)
  const [isModalOpen,setIsModalOpen] = useState(false)

  const onHandle =()=>{
    //todo fetch
  }

  const refreshSuperviseList = useCallback((orgs:SupervisorOrg[]) => {
    dispatch(setSupervisorOrgList(orgs));
  },[dispatch]);

  const onDetail = (item:SupervisorOrg)=>() => {
    doSetDetail(item)
  }
  const onEdit = (item:SupervisorOrg)=>() => {
    doSetEdit(item)
  }

  const doSetDetail = useCallback(userInfo => {
    dispatch({...setSupervisorOrgDetail(userInfo),...{backPage:'/tabs/supervisorOrg/query'}});
  },[dispatch]);
  useEffect(() => { 
    //todo
    // fetch(paramStr, {
    //   method: 'GET',
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8',
    //   },
    // }).then(res => res.json())
    // .then((json) => {
    // const {userInfoList} = json //todo
    // refreshSuperviseList(demoLessonList.filter((userInfo:SupervisorUser)=>userInfo.supervisorUsername&&userInfo.supervisorUsername.indexOf(queryInfo.supervisorUsername)>-1).filter((userInfo:SupervisorUser)=>userInfo.supervisorLoginName.indexOf(queryInfo.supervisorLoginName)>-1))
    // return 
    // })
    refreshSuperviseList(demoLessonList)
  },[]);

  const doSetEdit = useCallback(userInfo => {
    dispatch({...setSupervisorOrgEdit(userInfo),...{backPage:'/tabs/supervisorOrg/query'}});
  },[dispatch]);
  
  const onQuery = ()=>{
    refreshSuperviseList(demoLessonList.filter((item:SupervisorOrg)=>item.supervisorOrgName.indexOf(queryInfo.supervisorOrgName)>-1))
  }


  const ListEntry = ({ item,key, ...props } : {item:SupervisorOrg,key:any}) => (
    <IonItem key={key} >
      <IonLabel>
        <p className='text-center'>{item.supervisorOrgId}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{item.supervisorOrgName}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{item.parentSupervisorOrgId}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{item.parentSupervisorOrgName}</p>
      </IonLabel>
      <IonLabel>
         <div className='flex gap-2'>
         <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(item)}>查看详情</button>
         <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onEdit(item)}>编辑</button>
            <button className='p-1 text-white bg-blue-500 rounded-md' onClick={onCancel(item)}>删除</button> 

         </div>
      </IonLabel>
    </IonItem>
    );
    if(state.userInfo.supervisorOrgDetail){
        return <Redirect to="/tabs/supervisorOrg/detail" />
    }
    if(state.userInfo.supervisorOrgEdit){
        return <Redirect to="/tabs/supervisorOrg/edit" />
    }
    return   <IonPage >
                  <div className='relative'>
                  <div className='flex'>
                  <IonRow className='flex justify-between '>
                        <IonCol className='flex ml-8'>
                          <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>机构名称:</IonLabel>
                          <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{parentSupervisorOrgName:e.target.value}})} />
                        </IonCol>  
                        <IonCol className='flex ml-8'>
                          <button onClick={onQuery}>查询</button>
                        </IonCol>  
                  </IonRow>
                  </div>
                <IonModal isOpen={isModalOpen}>
                        <IonCardContent>
                          <form onSubmit={onHandle}>
                            <IonList>
                                  <IonItem>
                                    <IonLabel position="floating">机构名称</IonLabel>
                                    <IonInput name="eduName" value={newOrgState.supervisorOrgName} onIonChange={e => setNewOrgState({...newOrgState, supervisorOrgName: e.detail.value!})}></IonInput>
                                  </IonItem>
                            </IonList>
                            </form>
                          </IonCardContent>
                </IonModal>
                <div className='absolute w-full mt-10'>
                  <IonList>
                    <IonItem key='title'>
                      <IonLabel> 
                        <div className='font-black text-center'>机构ID</div>
                      </IonLabel>
                      <IonLabel>
                        <div className='font-black text-center'>机构名称</div>
                      </IonLabel>
                      <IonLabel>
                        <div className='font-black text-center'>父机构ID</div>
                      </IonLabel>
                      <IonLabel>
                        <div className='font-black text-center'>父机构名称</div>
                      </IonLabel>
                      <IonLabel>
                        <div className='font-black text-center'>操作</div>
                      </IonLabel>
                  </IonItem>
                      <div className=''>
                      {state.userInfo.userInfoList.map((list:SupervisorOrg, i: any) => (
                      <ListEntry item={list} key={i} />
                    ))}
                      </div>
                  </IonList>
              </div> 
              </div>            
        </IonPage>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
}
export default LessonQuery