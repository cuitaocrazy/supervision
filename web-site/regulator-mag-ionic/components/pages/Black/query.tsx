
import { useEffect,useCallback,useContext,useState,useRef,Fragment } from 'react'
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
import { Dialog, Transition } from '@headlessui/react';

const queryURL = 'http://localhost:3003/lesson/query'
const delURL = 'http://localhost:3003/lesson/del'
const createUrl= 'http://localhost:3003/black/createURL'
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

      




// 黑名单查询页面
const BlackEduOrgQuery:React.FC =()=>{
  // 新增黑名单模态框的状态
  let [isCreateOpen, setIsCreateOpen] = useState(false);
  function closeCreateModal() {
    setIsCreateOpen(false);
  }
  function openCreateModal() {
    setIsCreateOpen(true);
  }

  // 删除黑名单模态框的状态
  let [isDeleteOpen, setIsDeleteOpen] = useState(false);
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  function openDeleteModal() {
    setIsDeleteOpen(true);
  }

  const [createBlack, setCreateBlack] = useState({} as Black);

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
  const [deleteState,setDeleteState] = useState({} as Black )
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

    const onCreate = (e: any) => {
      e.preventDefault();
      fetch(createUrl, {
        method: 'POST',
        body: JSON.stringify(createBlack),
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
        },
      })
        .then(res => res.json())
        .then(json => {
          alert(json.result);
        });
    };

  const ListEntry = ({ item, ...props } : {item:Black}) => (
    <tr className="grid items-center grid-cols-5 gap-10 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 ">
      <td className="flex items-center justify-center leading-10">
      {item.orgName}
      </td>
      <td className="flex items-center justify-center leading-10">
      {item.reason}
      </td>
      <td className="flex items-center justify-center leading-10">
      {item.blackDate}
      </td>
      <td className="flex items-center justify-center leading-10">
      {item.blackTime}
      </td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
        <button
            className="p-1 text-primary-600"
            onClick={onDetail(item)}
          >
            详情
          </button>
          <button
            className="p-1 text-red-600"
            onClick={()=>{
              setDeleteState(item)
              openDeleteModal()
            }}
          >
            删除
          </button>
        </div>
      </td>
    </tr>
    // <IonItem key={key} >
    //   <IonLabel>
    //     <p className='text-center'>{item.orgName}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p  className='text-center'>{item.reason}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p  className='text-center'>{item.blackDate}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p  className='text-center'>{item.blackTime}</p>
    //   </IonLabel>
    //   <IonLabel>
    //      <div className='flex gap-2'>
    //         <button className='p-1 text-white bg-blue-500 rounded-md' onClick={onCancel(item)}>删除</button> 
    //         {/* <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(item)}>详情</button> */}
    //      </div>
    //   </IonLabel>
    // </IonItem>
    );
    if(state.black.blackDetail){
      return <Redirect to="/tabs/black/detail" />
    }

        return  (
        <IonPage className="bg-gray-100">
        <div className="relative w-full h-screen mx-6 overflow-auto">
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
              <span className="pl-1 text-primary-500">黑名单管理</span>
            </div>
          </div>
          <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
            <div className="text-base font-bold">快速查询</div>
            <hr className="mt-2 mb-4" />
            <div className="flex">
              <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
                <IonCol className="flex ml-8 text-gray-800">
                  <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                    发布标题:
                  </div>
                  <input
                    type="text"
                    className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                    placeholder="请输入发布标题"
                    onChange={e =>
                      setQueryInfo({ ...queryInfo, ...{ announcementTitle: e.target.value } })
                    }
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
                    className="w-24 h-12 bg-gray-100 rounded-md shadow-md text-primary-600 focus:bg-gray-200"
                    onClick={openCreateModal}
                  >
                    新增
                  </button>
                </IonCol>
              </IonRow>
            </div>
          </div>

          {/* 新增政策模态框 */}
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
                        用户新增
                        <hr className="mt-2 mb-4" />
                      </Dialog.Title>
                      <form
                        onSubmit={onCreate}
                        className="flex flex-col items-center rounded-lg justify-items-center"
                      >
                        <div className="flex items-center mb-4 justify-items-center">
                          <div className="flex leading-7 justify-items-center">
                            <div className="flex justify-end p-1 w-36">教育机构名称:</div>
                            <input
                              className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                              name="supervisorLoginName"
                              type="text"
                              spellCheck={false}
                              onChange={e =>
                                setCreateState({
                                  ...createState,
                                  ...{ orgName: e.nativeEvent.target?.value },
                                })
                              }
                            ></input>
                          </div>
                        </div>

                        <div className="flex items-center mb-4 justify-items-center">
                          <div className="flex justify-items-center">
                            <span className="flex justify-end p-1 mr-1 w-36">加入黑名单原因:</span>
                            <textarea
                              className="w-64 h-32 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                              name="supervisorLoginName"
                              onChange={e =>
                                setCreateState({
                                  ...createState,
                                  ...{ reason: e.nativeEvent.target?.value },
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 justify-items-center">
                          <input
                            value="取消"
                            type="button"
                            className="px-6 py-2 border rounded-md "
                            onClick={closeCreateModal}
                          />
                          <input
                            value="确定"
                            type="submit"
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

          {/* 删除课程模态框 */}
          <Transition appear show={isDeleteOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
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
                        用户删除
                        <hr className="mt-2 mb-4" />
                      </Dialog.Title>
                      <form
                        onSubmit={onCreate}
                        className="flex flex-col items-center rounded-lg justify-items-center"
                      >
                        <div className="flex items-center mb-4 justify-items-center">
                          <div className="flex leading-7 justify-items-center">
                            <div className="flex justify-end p-1 ">确定要删除该黑名单教育机构吗？</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 justify-items-center">
                          <input
                            value="取消"
                            type="button"
                            className="px-6 py-2 border rounded-md "
                            onClick={closeDeleteModal}
                          />
                          <input
                            value="确定"
                            onClick={()=>{onCancel(state.black)}}
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

          {/* 列表 */}
          <div className="absolute w-full mt-10">
            <table className="w-11/12">
              <thead>
                <tr className="grid items-center h-10 grid-cols-5 gap-2 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                  <th className="flex items-center justify-center">登录名称</th>
                  <th className="flex items-center justify-center">机构名称</th>
                  <th className="flex items-center justify-center">用户名</th>
                  <th className="flex items-center justify-center">用户电话</th>
                  <th className="flex items-center justify-center">操作</th>
                </tr>
              </thead>
              <tbody>
              {state.black.blackList.map((list:Black, i: any) => (
                       <ListEntry item={list} key={i} />
                     ))}
                <tr>
                  {/* <td colSpan={5}> <Paging url={paramStr} page={page} pagesize={20} total={total} onPageChange={onPageChange}/></td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </IonPage> 
        // <IonPage >
        //           <div className='relative'>
        //           <div className='flex'>
        //           <IonRow className='flex justify-between '>
        //                 <IonCol className='flex ml-8'>
        //                   <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>登录名查询：</IonLabel>
        //                   <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{PayerStub:e.target.value}})} />
        //                 </IonCol> 
        //               </IonRow>
        //             <IonRow className='flex justify-between '>
        //                 <IonCol className='flex ml-8' > 
        //                     <button onClick={()=>onQuery()} >查询</button>
        //                     <button onClick={()=>setIsCreateModalOpen(true)} >新增</button>
        //                 </IonCol>
        //           </IonRow> 
        //           </div>
        //           <IonModal isOpen={isCreateModalOpen}  onDidDismiss={async ()=>{setIsCreateModalOpen(false)}}> 
        //           <IonCard>
        //             <IonCardHeader>
        //                 黑名单新增
        //             </IonCardHeader>
        //             <IonCardContent>
        //               <form  onSubmit={()=>{}}>
        //               <IonItem>
        //                 <IonLabel >机构名称：</IonLabel>
        //                 <input></input>
        //               </IonItem>
        //               <IonItem>
        //                 <IonLabel >黑名单原因：</IonLabel>
        //                 <input></input>
        //               </IonItem>

        //               <div className='flex mt-2 mb-2 space-x-2 '>
        //                 <span  className="flex-1 ">
        //                           <button className='flex items-center justify-center flex-none submutButton focus:outline-none hover:bg-primary-700 ' type='submit' >确认</button>

        //                 </span >
        //                 <span className="flex-1 ">
        //                   <button  className='cancelButton' onClick={ ()=>setIsCreateModalOpen(false)}>取消</button>
        //                 </span>
        //               </div>
        //               </form>
        //             </IonCardContent>
        //           </IonCard>
        //         </IonModal>
                  
        //         <div className='absolute w-full mt-10'>
        //           <IonList>
        //             <IonItem key='title'>
        //               <IonLabel> 
        //                 <div className='font-black text-center'>登录名称</div>
        //               </IonLabel>
        //               <IonLabel>
        //                 <div className='font-black text-center'>机构名称</div>
        //               </IonLabel>
        //               <IonLabel>
        //                 <div className='font-black text-center'>用户名</div>
        //               </IonLabel>
        //               <IonLabel>
        //                 <div className='font-black text-center'>用户电话</div>
        //               </IonLabel>
        //               <IonLabel>
        //                 <div className='font-black text-center'>操作</div>
        //               </IonLabel>
        //           </IonItem>
        //               <div className=''>
        //               {state.black.blackList.map((list:Black, i: any) => (
        //               <ListEntry item={list} key={i} />
        //             ))}
        //               </div>
        //           </IonList>
        //       </div> 
        //       </div>            
        // </IonPage>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
)}
export default BlackEduOrgQuery