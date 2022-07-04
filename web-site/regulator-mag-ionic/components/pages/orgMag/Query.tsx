//机构管理的查询页面
import { useEffect, useCallback, useContext, useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom';
import { AppContext, setEduOrgList, setEduOrgDetail, setEduOrgEdit } from '../../../appState';
import { EduOrg } from '../../../types/types'
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
import { Dialog, Transition } from "@headlessui/react";
import EduIsPublic from "../../EduIsPublic"

const queryURL = 'http://localhost:3003/eduOrg/query'
const delURL = 'http://localhost:3003/eduOrg/del'
const modifyURL = 'http://localhost:3003/eduOrg/modifyURL'
const applyURL = 'http://localhost:3003/eduOrg/apply'
const createURL = 'http://localhost:3003/eduOrg/create'


const demoList: EduOrg[] = [
  {
    eduId: '1',
    eduName: '第一学院',
    eduAddress: '第一学院地址',
    eduLegalPerson: '第一学院法人',
    eduLegalPhone: '第一学院法人电话',
    eduContact: '第一学院联系人',
    eduContactPhone: '第一学院联系人电话',
    eduIsPublic: true,
    eduLicense: '111',
    eduStatus: '正常',
    eduAnnualInspection: '年审文件',
    eduAnnualInspectionDate: '2020-01-01',
    eduAnnualInspectionTime: '00:00:00',
    eduSupervisedAccount: '监管账户',
    eduNormalAccount: '普通账户',
    eduSupervisedMerNo: '商户号',
    eduCreateDate: '2020-01-01',
    eduCreateTime: '00:00:00',
    eduUpdateDate: '2020-01-01',
    eduUpdateTime: '00:00:00',
    eduRating: 5,
    eduLoginName: 'edu1',
    supervisorOrgId: '1',
  },
  {
    eduId: '2',
    eduName: '第2学院',
    eduAddress: '第2学院地址',
    eduLegalPerson: '第2学院法人',
    eduLegalPhone: '第2学院法人电话',
    eduContact: '第2学院联系人',
    eduContactPhone: '第2学院联系人电话',
    eduIsPublic: true,
    eduLicense: '111',
    eduStatus: '正常',
    eduAnnualInspection: '年审文件',
    eduAnnualInspectionDate: '2020-01-01',
    eduAnnualInspectionTime: '00:00:00',
    eduSupervisedAccount: '监管账户',
    eduNormalAccount: '普通账户',
    eduSupervisedMerNo: '商户号',
    eduCreateDate: '2020-01-01',
    eduCreateTime: '00:00:00',
    eduUpdateDate: '2020-01-01',
    eduUpdateTime: '00:00:00',
    eduRating: 5,
    eduLoginName: 'edu2',
    supervisorOrgId: '1',
  }
]

// 课程查询页面
const OrgMagQuery: React.FC = () => {
  let [isCreateOpen, setIsCreateOpen] = useState(false)
  function closeCreateModal() {
    setIsCreateOpen(false)
  }
  function openCreateModal() {
    setIsCreateOpen(true)
  }

  let [isBlackeOpen, setIsBlackOpen] = useState(false)
  function closeBlackModal() {
    setIsBlackOpen(false)
  }
  function openBlackModal() {
    setIsBlackOpen(true)
  }
  
  const onCancel = (item: EduOrg) => () => {
    fetch(delURL, {
      method: 'PUT',
      body: JSON.stringify({
        "eduId": item.eduId,
      }),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
      .then((json) => {
        alert(json.result)
      })
  }

  const onQuery = () => {
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
    refreshList(demoList.filter((eduOrg: EduOrg) => eduOrg.eduName && eduOrg.eduName.indexOf(queryInfo.eduName) > -1))
    return
  }





  const onApply = (item: EduOrg) => () => {
    fetch(modifyURL, {
      method: 'PUT',
      body: JSON.stringify({
        "eduId": item.eduId,
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
  const [queryInfo, setQueryInfo] = useState({ eduName: '' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [eduOrgState, setEduOrgState] = useState({} as EduOrg);
  const onCreate = async (e: React.FormEvent) => () => {
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
  const getParamStr = (params: any, url: string) => {
    let result = '?'
    Object.keys(params).forEach(key => result = result + key + '=' + params[key] + '&')
    return url + result
  }
  const paramStr = getParamStr({
    eduName: queryInfo.eduName,
  }, queryURL)

  const refreshList = useCallback((eduOrgs: EduOrg[]) => {
    dispatch(setEduOrgList(eduOrgs));
  }, [dispatch]);

  const onDetail = (item: EduOrg) => () => {
    doSetDetail(item)
  }



  const doSetDetail = useCallback(eduOrg => {
    dispatch({ ...setEduOrgDetail(eduOrg), ...{ backPage: '/tabs/orgMag/query' } });
  }, [dispatch]);


  const onEdit = (item: EduOrg) => () => {
    doSetEdit(item)
  }

  const doSetEdit = useCallback(eduOrg => {
    dispatch({ ...setEduOrgEdit(eduOrg), ...{ backPage: '/tabs/orgMag/query' } });
  }, [dispatch]);
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
  }, [refreshList]);

  const ListEntry = ({ eduOrg, key, ...props }: { eduOrg: EduOrg, key: any }) => (
    <tr
      key={key}
      className="grid items-center grid-cols-4 gap-10 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 "
    >
      <td className="flex items-center justify-center leading-10">
        {eduOrg.eduId}
      </td>
      <td className="flex items-center justify-center leading-10">
        {eduOrg.eduName}
      </td>
      <td className="flex items-center justify-center leading-10">
        {eduOrg.eduStatus}
      </td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button className='p-1 text-primary-600' onClick={onDetail(eduOrg)}>详情</button>
          <button className='p-1 text-cyan-600' onClick={onCancel(eduOrg)}>删除</button>
          <button className='p-1 text-red-600' onClick={onEdit(eduOrg)}>编辑</button>
          <button className='p-1 text-fuchsia-600' 
          // onClick={onCancel(eduOrg)}
          onClick={openBlackModal}
          >加入黑名单</button>
        </div>
      </td>
    </tr>
    // <IonItem key={key} >
    //   <IonLabel>
    //     <p className='text-center'>{eduOrg.eduId}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p  className='text-center'>{eduOrg.eduName}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p  className='text-center'>{eduOrg.eduStatus}</p>
    //   </IonLabel>
    //   <IonLabel>
    //      <div className='flex gap-2'>

    //         <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(eduOrg)}>详情</button>
    //         <button className='p-1 text-white bg-blue-500 rounded-md' onClick={onCancel(eduOrg)}>删除</button>
    //         <button className='p-1 text-white bg-blue-500 rounded-md' onClick={onEdit(eduOrg)}>编辑</button>
    //         <button className='p-1 text-white bg-blue-500 rounded-md' onClick={onCancel(eduOrg)}>加入黑名单</button>  
    //      </div>
    //   </IonLabel>
    // </IonItem>
  );
  console.log(state.eduOrg)
  if (state.eduOrg.eduOrgDetail) {
    return <Redirect to="/tabs/orgMag/detail" />
  }
  if (state.eduOrg.eduOrgEdit) {
    return <Redirect to="/tabs/orgMag/edit" />
  }

  return <IonPage className="bg-gray-100">

    <div className='relative w-full mx-6'>
      <div className="flex pt-2 my-2 text-gray-800">
        <div className="mr-2 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div>
          <span className="pr-1 text-gray-600">教育机构管理</span>/
          <span className="pl-1 text-primary-500">教育机构管理</span>
        </div>
      </div>
      <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
        <div className="text-base font-bold">快速查询</div>
        <hr className="mt-2 mb-4" />
        <div className="flex">
          <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
            <IonCol className="flex ml-8 text-gray-800">
              <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                教育机构名称：
              </div>
              <input
                type="text"
                className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                placeholder="请输入教育机构名称"
                onChange={e => setQueryInfo({ ...queryInfo, ...{ eduName: e.target.value } })}
              />
            </IonCol>
            <IonCol className="flex ml-8">
              <button
                className="w-24 h-12 mr-6 text-white border-2 rounded-md shadow-md bg-primary-600 focus:bg-primary-700"
                onClick={() => onQuery()}
              >
                查询
              </button>
              <button
                className="w-24 h-12 rounded-md shadow-md bg-gray-50 text-primary-600 focus:bg-gray-200"
                // onClick={() => {
                //   setCreateModalOpen(true);
                // }}
                // onClick={() => {
                //   setIsModalOpen
                // }}
                onClick={openCreateModal}
              >
                新增
              </button>
            </IonCol>
          </IonRow>
        </div>
      </div>
      {/* <IonCard>
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
                  </IonCard> */}

      {/* 新增教育机构模态框 */} 
      <Transition appear show={isCreateOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeCreateModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-center text-gray-900"
                  >
                    加入黑名单
                    <hr className="mt-2 mb-4" />
                  </Dialog.Title>
                  <form
                    onSubmit={onCreate}
                    className="flex flex-col items-center rounded-lg justify-items-center"
                  >
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex leading-7 justify-items-center">
                        <div className="flex justify-end p-1 w-36">
                          教育机构名称:
                        </div>
                        <input
                          className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                          name="eduName" 
                          value={eduOrgState.eduName} 
                          onChange={e => setEduOrgState({...eduOrgState, eduName: e.nativeEvent.target?.value})}
                          readOnly
                        ></input>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex justify-items-center">
                        <span className="flex justify-end p-1 mr-1 w-36">
                          教育机构地址:
                        </span>
                        <input
                          className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                          name="eduAddress"
                          type="text"
                          value={eduOrgState.eduAddress} 
                          onChange={e => setEduOrgState({...eduOrgState, eduAddress: e.nativeEvent.target?.value})}
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex justify-items-center">
                        <span className="flex justify-end p-1 mr-1 w-36">
                          教育机构法人:
                        </span>
                        <input
                          className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                          name="lessonTotalTimes"
                          type="text"
                          value={eduOrgState.eduLegalPerson} 
                          onChange={e => setEduOrgState({...eduOrgState, eduLegalPerson: e.nativeEvent.target?.value})}
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex justify-items-center">
                        <span className="flex justify-end p-1 mr-1 w-36">
                          法人联系方式:
                        </span>
                        <input
                          className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                          name="lessonTotalPrice"
                          value={eduOrgState.eduLegalPhone} 
                          onChange={e => setEduOrgState({...eduOrgState, eduLegalPhone: e.nativeEvent.target?.value})}
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex justify-items-center">
                        <span className="flex justify-end p-1 mr-1 w-36">
                          教育机构联系人:
                        </span>
                        <input
                          className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                          name="eduContact" 
                          type="text"
                          value={eduOrgState.eduContact} 
                          onChange={e => setEduOrgState({...eduOrgState, eduContact: e.nativeEvent.target?.value})}
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex justify-items-center">
                        <span className="flex justify-end p-1 mr-1 w-36">
                          教育机构联系方式:
                        </span>
                        <input
                          className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                          name="eduContactPhone" 
                          type="text"
                          value={eduOrgState.eduContactPhone} 
                          onChange={e => setEduOrgState({...eduOrgState, eduContactPhone: e.nativeEvent.target?.value})}
                          required
                        ></input>

                      </div>
                    </div>
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex justify-items-center">
                        <span className="flex justify-end p-1 mr-1 w-36">
                         是否公立:
                        </span>
                       <EduIsPublic />
                      </div>
                    </div>
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex justify-items-center">
                        <span className="flex justify-end p-1 mr-1 w-36">
                          教育机构:
                        </span>
                        <input
                          className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                          name="eduLicense" 
                          type="text"
                          value={eduOrgState.eduLicense} 
                          onChange={e => setEduOrgState({...eduOrgState, eduLicense: e.nativeEvent.target?.value})}
                        ></input>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex justify-items-center">
                        <span className="flex justify-end p-1 mr-1 w-36">
                          监管账户:
                        </span>
                        <input
                          className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                          name="eduSupervisedAccount" 
                          type="text"
                          value={eduOrgState.eduSupervisedAccount} 
                          onChange={e => setEduOrgState({...eduOrgState, eduSupervisedAccount: e.nativeEvent.target?.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex justify-items-center">
                        <span className="flex justify-end p-1 mr-1 w-36">
                          普通账户:
                        </span>
                        <input
                          className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                          name="eduSupervisedAccount" 
                          type="text"
                          value={eduOrgState.eduSupervisedAccount} 
                          onChange={e => setEduOrgState({...eduOrgState, eduSupervisedAccount: e.nativeEvent.target?.value})}
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex justify-items-center">
                        <span className="flex justify-end p-1 mr-1 w-36">
                          支付商户号:
                        </span>
                          <input className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduSupervisedMerNo" 
                            type="text"
                            value={eduOrgState.eduSupervisedMerNo} 
                            onChange={e => setEduOrgState({...eduOrgState, eduSupervisedMerNo: e.nativeEvent.target?.value})}
                          />
                      </div>
                    </div>
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex justify-items-center">
                        <span className="flex justify-end p-1 mr-1 w-36">
                          登录名称:
                        </span>
                          <input className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                            name="eduLoginName" 
                            type="text"
                            value={eduOrgState.eduLoginName} 
                            onChange={e => setEduOrgState({...eduOrgState, eduLoginName: e.nativeEvent.target?.value})}
                          />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 justify-items-center">
                      <input
                        value="返回"
                        type="button"
                        className="px-6 py-2 border rounded-md "
                        onClick={()=>setIsModalOpen(false)}
                      />
                      <input
                        value="提交"
                        type="button"
                        className="px-6 py-2 text-white border rounded-md bg-primary-600"
                      />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* 加入黑名单 */}
      <Transition appear show={isBlackeOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeBlackModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-center text-gray-900"
                  >
                    教育机构新增
                    <hr className="mt-2 mb-4" />
                  </Dialog.Title>
                  <form
                    onSubmit={onCreate}
                    className="flex flex-col items-center rounded-lg justify-items-center"
                  >
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex leading-7 justify-items-center">
                        <div className="flex justify-end p-1 w-36">
                          教育机构名称:
                        </div>
                        <input
                          className="w-64 p-1 text-gray-600 bg-gray-100 border rounded-md justify-self-start focus:outline-none"
                          name="eduName" 
                          value={eduOrgState.eduName} 
                          onChange={e => setEduOrgState({...eduOrgState, eduName: e.nativeEvent.target?.value})}
                          readOnly
                        ></input>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex justify-items-center">
                        <span className="flex justify-end p-1 mr-1 w-36">
                          教育机构法人:
                        </span>
                        <input
                          className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                          name="lessonTotalTimes"
                          type="text"
                          value={eduOrgState.eduLegalPerson} 
                          onChange={e => setEduOrgState({...eduOrgState, eduLegalPerson: e.nativeEvent.target?.value})}
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 justify-items-center">
                      <div className="flex justify-items-center">
                        <span className="flex justify-end p-1 mr-1 w-36">
                          加入黑名单原因:
                        </span>
                        <textarea
                          className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                          name="eduAddress"
                          // onChange={e => setEduOrgState({...eduOrgState, eduAddress: e.nativeEvent.target?.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    
                    <div className="flex items-center gap-4 mt-2 justify-items-center">
                      <input
                        value="返回"
                        type="button"
                        className="px-6 py-2 border rounded-md "
                        onClick={()=>setIsModalOpen(false)}
                      />
                      <input
                        value="提交"
                        type="button"
                        className="px-6 py-2 text-white border rounded-md bg-primary-600"
                      />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      

      <div className='absolute w-full mt-10'>
        <table className="w-11/12">
          <thead>
            <tr className="grid items-center h-10 grid-cols-4 gap-10 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
              <th className="flex items-center justify-center">教育机构ID</th>
              <th className="flex items-center justify-center">名称</th>
              <th className="flex items-center justify-center">状态</th>
              <th className="flex items-center justify-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {state.eduOrg.eduOrgList.map((list: EduOrg, i: any) => (
              <ListEntry eduOrg={list} key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </IonPage>
}
export default OrgMagQuery