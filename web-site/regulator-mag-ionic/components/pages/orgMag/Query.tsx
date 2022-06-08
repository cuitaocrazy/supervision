//机构管理的查询页面
import { useEffect,useCallback,useContext,useState } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext,setEduOrgList,setEduOrgDetail,setEduOrgEdit} from '../../../appState';
import {EduOrg} from '../../../types/types'
import { modalController } from '@ionic/core';
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonModal,
  IonContent,
  IonInput,
  IonRadioGroup,
  IonRadio,
  IonRouterLink
} from '@ionic/react';

const queryURL = 'http://localhost:3003/eduOrg/query'
const delURL = 'http://localhost:3003/eduOrg/del'
const modifyURL = 'http://localhost:3003/eduOrg/modifyURL'
const applyURL = 'http://localhost:3003/eduOrg/apply'
const createURL = 'http://localhost:3003/eduOrg/create'


const demoList:EduOrg[] = [
  {   
    eduId:'1',
    eduName:'第一学院',
    eduAddress:'第一学院地址',
    eduLegalPerson:'第一学院法人',
    eduLegalPhone:'第一学院法人电话',
    eduContact:'第一学院联系人',
    eduContactPhone:'第一学院联系人电话',
    eduIsPublic:true,
    eduLicense:'111',
    eduStatus:'正常',
    eduAnnualInspection:'年审文件',
    eduAnnualInspectionDate:'2020-01-01',
    eduAnnualInspectionTime:'00:00:00',
    eduSupervisedAccount:'监管账户',
    eduNormalAccount:'普通账户',
    eduSupervisedMerNo:'商户号',
    eduCreateDate:'2020-01-01',
    eduCreateTime:'00:00:00',
    eduUpdateDate:'2020-01-01',
    eduUpdateTime:'00:00:00',
    eduRating:5,
    eduLoginName:'edu1',
    supervisorOrgId:'1',  
  },
  {   
    eduId:'2',
    eduName:'第2学院',
    eduAddress:'第2学院地址',
    eduLegalPerson:'第2学院法人',
    eduLegalPhone:'第2学院法人电话',
    eduContact:'第2学院联系人',
    eduContactPhone:'第2学院联系人电话',
    eduIsPublic:true,
    eduLicense:'111',
    eduStatus:'正常',
    eduAnnualInspection:'年审文件',
    eduAnnualInspectionDate:'2020-01-01',
    eduAnnualInspectionTime:'00:00:00',
    eduSupervisedAccount:'监管账户',
    eduNormalAccount:'普通账户',
    eduSupervisedMerNo:'商户号',
    eduCreateDate:'2020-01-01',
    eduCreateTime:'00:00:00',
    eduUpdateDate:'2020-01-01',
    eduUpdateTime:'00:00:00',
    eduRating:5,
    eduLoginName:'edu2',
    supervisorOrgId:'1',  
  }
  ]

// 课程查询页面
const OrgMagQuery:React.FC =()=>{
  const onCancel = (item:EduOrg)=>() => {
    fetch(delURL, {
      method: 'PUT',
      body: JSON.stringify({
        "eduId":item.eduId,
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      alert(json.result)
    })
  }

  const onQuery = ()=>{
  //  const paramStr = getParamStr({
  //     eduName:queryInfo.eduName,
  //  },queryURL)
  //   fetch(paramStr, {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json;charset=UTF-8',
  //     },
  //   }).then(res => res.json())
  //   .then((json) => {
  //   const {LessonList} = json //todo
  //   refreshList(demoLessonList.filter((eduOrg:EduOrg)=>eduOrg.eduName&&eduOrg.eduName.indexOf(queryInfo.eduName)>-1))
  //   return 
  //   })
  refreshList(demoList.filter((eduOrg:EduOrg)=>eduOrg.eduName&&eduOrg.eduName.indexOf(queryInfo.eduName)>-1))
  return 
  }


  


  const onApply = (item:EduOrg)=>() => {
    fetch(modifyURL, {
      method: 'PUT',
      body: JSON.stringify({
        "eduId":item.eduId,
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
  const [queryInfo, setQueryInfo] = useState({eduName:''})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [eduOrgState, setEduOrgState] = useState({} as EduOrg);
  const onCreate = async (e: React.FormEvent)=>() => {
    e.preventDefault();
    fetch(createURL, {
      method: 'PUT',
      body: JSON.stringify(eduOrgState),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      alert(json.result)
    })
  }
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
     eduName:queryInfo.eduName,
  },queryURL)

  const refreshList = useCallback((eduOrgs:EduOrg[]) => {
    dispatch(setEduOrgList(eduOrgs));
  },[dispatch]);

  const onDetail = (item:EduOrg)=>() => {
    doSetDetail(item)
  }



  const doSetDetail = useCallback(eduOrg => { 
    dispatch({...setEduOrgDetail(eduOrg),...{backPage:'/tabs/orgMag/query'}});
  },[dispatch]);


  const onEdit = (item:EduOrg)=>() => {
    doSetEdit(item)
  }

  const doSetEdit = useCallback(eduOrg => { 
    dispatch({...setEduOrgEdit(eduOrg),...{backPage:'/tabs/orgMag/query'}});
  },[dispatch]);
  useEffect(() => { 
    // fetch(paramStr, {
    //   method: 'GET',
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8',
    //   },
    // }).then(res => res.json())
    // .then((json) => {
    // const {LessonList} = json //todo
    
    // refreshList(demoLessonList.filter((eduOrg:EduOrg)=>eduOrg.eduName&&eduOrg.eduName.indexOf(queryInfo.eduName)>-1))
    // return 
    // })
    refreshList(demoList)
    return
  },[refreshList]);

  const ListEntry = ({ eduOrg,key, ...props } : {eduOrg:EduOrg,key:any}) => (
    <IonItem key={key} >
      <IonLabel>
        <p className='text-center'>{eduOrg.eduId}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{eduOrg.eduName}</p>
      </IonLabel>
      <IonLabel>
        <p  className='text-center'>{eduOrg.eduStatus}</p>
      </IonLabel>
      <IonLabel>
         <div className='flex gap-2'>

            <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(eduOrg)}>详情</button>
            <button className='p-1 text-white bg-blue-500 rounded-md' onClick={onCancel(eduOrg)}>删除</button>
            <button className='p-1 text-white bg-blue-500 rounded-md' onClick={onEdit(eduOrg)}>编辑</button>
            <button className='p-1 text-white bg-blue-500 rounded-md' onClick={onCancel(eduOrg)}>加入黑名单</button>  
         </div>
      </IonLabel>
    </IonItem>
    );

    if(state.eduOrg.eduOrgDetail){
      return <Redirect to="/tabs/orgMag/detail" />
    }

    if(state.eduOrg.eduOrgEdit){
      return <Redirect to="/tabs/orgMag/edit" />
    }

    return   <IonPage >

                  <div className='relative'>
                  <div className='flex'>
                  <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>快速查询</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                    <IonModal isOpen={isModalOpen}>
                        < IonCardContent>
                          <form onSubmit={onCreate}>
                              <IonList>
                                <IonItem>
                                  <IonLabel position="floating">教育机构名称</IonLabel>
                                  <IonInput name="eduName" value={eduOrgState.eduName} onIonChange={e => setEduOrgState({...eduOrgState, eduName: e.detail.value!})}></IonInput>
                                </IonItem>
                                <IonItem>
                                  <IonLabel position="floating">教育机构地址</IonLabel>
                                  <IonInput name="eduAddress" value={eduOrgState.eduAddress} onIonChange={e => setEduOrgState({...eduOrgState, eduAddress: e.detail.value!})}></IonInput>
                                </IonItem>
                                <IonItem>
                                  <IonLabel position="floating">教育机构法人</IonLabel>
                                  <IonInput name="eduLegalPerson" value={eduOrgState.eduLegalPerson} onIonChange={e => setEduOrgState({...eduOrgState, eduLegalPerson: e.detail.value!})}></IonInput>
                                </IonItem>
                                <IonItem>
                                  <IonLabel position="floating">教育机构法人联系方式</IonLabel>
                                  <IonInput name="eduLegalPhone" value={eduOrgState.eduLegalPhone} onIonChange={e => setEduOrgState({...eduOrgState, eduLegalPhone: e.detail.value!})}></IonInput>
                                </IonItem>
                                <IonItem>
                                  <IonLabel position="floating">教育机构联系人</IonLabel>
                                  <IonInput name="eduContact" value={eduOrgState.eduContact} onIonChange={e => setEduOrgState({...eduOrgState, eduContact: e.detail.value!})}></IonInput>
                                </IonItem>
                                <IonItem>
                                  <IonLabel position="floating">教育机构法人联系方式</IonLabel>
                                  <IonInput name="eduContactPhone" value={eduOrgState.eduContactPhone} onIonChange={e => setEduOrgState({...eduOrgState, eduContactPhone: e.detail.value!})}></IonInput>
                                </IonItem>
                                <IonItem>
                                  <IonLabel position="floating" >是否公立</IonLabel>
                                  <IonRadioGroup onIonChange={e => setEduOrgState({...eduOrgState, eduIsPublic: e.detail.value!})}>
                                        <IonItem>
                                        <IonLabel>公立</IonLabel>
                                        <IonRadio value={true} />
                                      </IonItem>
                                      <IonItem>
                                        <IonLabel>非公立</IonLabel>
                                        <IonRadio value={false} />
                                      </IonItem>
                                    </IonRadioGroup>
                                  </IonItem>
                                <IonItem>
                                  <IonLabel position="floating">教育机构</IonLabel>
                                  <IonInput name="eduLicense" value={eduOrgState.eduLicense} onIonChange={e => setEduOrgState({...eduOrgState, eduLicense: e.detail.value!})}></IonInput>
                                </IonItem>
                                <IonItem>
                                  <IonLabel position="floating">监管账户</IonLabel>
                                  <IonInput name="eduSupervisedAccount" value={eduOrgState.eduSupervisedAccount} onIonChange={e => setEduOrgState({...eduOrgState, eduSupervisedAccount: e.detail.value!})}></IonInput>
                                </IonItem>
                                <IonItem>
                                  <IonLabel position="floating">普通账户</IonLabel>
                                  <IonInput name="eduSupervisedAccount" value={eduOrgState.eduSupervisedAccount} onIonChange={e => setEduOrgState({...eduOrgState, eduSupervisedAccount: e.detail.value!})}></IonInput>
                                </IonItem>
                                <IonItem>
                                  <IonLabel position="floating">普通账户</IonLabel>
                                  <IonInput name="eduSupervisedAccount" value={eduOrgState.eduSupervisedAccount} onIonChange={e => setEduOrgState({...eduOrgState, eduSupervisedAccount: e.detail.value!})}></IonInput>
                                </IonItem>
                                <IonItem>
                                  <IonLabel position="floating">支付商户号</IonLabel>
                                  <IonInput name="eduSupervisedMerNo" value={eduOrgState.eduSupervisedMerNo} onIonChange={e => setEduOrgState({...eduOrgState, eduSupervisedMerNo: e.detail.value!})}></IonInput>
                                </IonItem>
                                <IonItem>
                                  <IonLabel position="floating">登录名称</IonLabel>
                                  <IonInput name="eduLoginName" value={eduOrgState.eduLoginName} onIonChange={e => setEduOrgState({...eduOrgState, eduLoginName: e.detail.value!})}></IonInput>
                                </IonItem>
                                </IonList>

                            <IonItem className="">
                            <IonButton className="m-5 text-base " type='submit' fill="solid">提交</IonButton>
                              <IonButton className="m-5 text-base " onClick={()=>setIsModalOpen(false)} fill="solid">返回</IonButton>
                            </IonItem>
                          </form>
                        </IonCardContent>
                    </IonModal>
                    <IonRow className='flex justify-between '>
                        <IonCol className='flex ml-8'>
                          <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>教育机构名称：</IonLabel>
                          <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{eduName:e.target.value}})} />
                        </IonCol>
                        <IonCol className='flex ml-8'> 
                          <button onClick={()=>onQuery()} >查询</button>
                        </IonCol>
                        <IonCol className='flex ml-8'> 
                            <IonButton onClick={()=>setIsModalOpen(true)}>
                              新增
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    </IonCardContent>
                  </IonCard>

                  </div>
                <div className='absolute w-full mt-10'>
                  <IonList>
                    <IonItem key='title'>
                      <IonLabel> 
                        <div className='font-black text-center'>教育机构ID</div>
                      </IonLabel>
                      <IonLabel>
                        <div className='font-black text-center'>名称</div>
                      </IonLabel>
                      <IonLabel>
                        <div className='font-black text-center'>状态</div>
                      </IonLabel>
                      <IonLabel>
                        <div className='font-black text-center'>操作</div>
                      </IonLabel>
                  </IonItem>
                      <div className=''>
                      {state.eduOrg.eduOrgList.map((list:EduOrg, i: any) => (
                      <ListEntry eduOrg={list} key={i} />
                    ))}
                      </div>
                  </IonList>
              </div> 
              </div>            
        </IonPage>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
}
export default OrgMagQuery