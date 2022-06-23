//教师的查询页面
import { useEffect,useCallback,useContext,useState,useRef } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext, setTeacherList, setTeacherDetail,setTeacherEdit} from '../../../appState';
import {Teacher} from '../../../types/types'
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonModal,
  IonButton,
  IonCardHeader,
  IonCardTitle,
  IonCard,
  IonCardContent,
  IonInput,
} from '@ionic/react';
const queryURL = 'http://localhost:3003/teacher/query'
const delURL = 'http://localhost:3003/teacher/del'
const modifyURL = 'http://localhost:3003/teacher/modifyURL'
const applyURL = 'http://localhost:3003/teacher/apply'



const demoTeacherList:Teacher[] = [
  {
    teacherId:'1',
    teacherName:'张三',
    teacherIdentityNo:'123456789012345678',
    teacherExperience:'3',
    teacherIntroduce:'专业领域',
    teacherRating:5,
    teacherCreatedDate:'2020-01-01',
    teacherCreateTime:'00:00:00',
    teacherUpdatedDate:'2020-01-01',
    teacherUpdateTime:'00:00:00',
  },
  {
    teacherId:'2',
    teacherName:'张4',
    teacherIdentityNo:'123456789012345678',
    teacherExperience:'6',
    teacherIntroduce:'专业领域',
    teacherRating:5,
    teacherCreatedDate:'2020-01-01',
    teacherCreateTime:'00:00:00',
    teacherUpdatedDate:'2020-01-01',
    teacherUpdateTime:'00:00:00',
  }
]
const TeacherQuery:React.FC = () => {
 
  const createModal = useRef<HTMLIonModalElement>(null);
 
  const cancelModal = useRef<HTMLIonModalElement>(null);



const [createTeacher,setCreateTeacher] = useState({} as Teacher )
const [cancelTeacher,setCancelTeacher] = useState({} as Teacher )
const [isCancelModalOpen,setIsCancelModalOpen] = useState(false)
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({teacherName:''})
  const getParamStr = (params:any,url:string) =>{
    let result = '?'
    Object.keys(params).forEach(key => result = result+key+'='+params[key]+'&')
    return url+result
  }
  const paramStr = getParamStr({
    teacherName:queryInfo.teacherName,
 },queryURL)
 const refreshList = useCallback((eduOrgs:Teacher[]) => {
  dispatch(setTeacherList(eduOrgs));
},[dispatch]);
const onDetail = (item:Teacher)=>() => {
  doSetDetail(item)
}

const onEdit = (item:Teacher)=>() => {
  doSetEdit(item)
}
const doSetEdit = useCallback((teacher: Teacher) => {
  dispatch({...setTeacherEdit(teacher),...{backPage:'/tabs/teacher/query'}});
},[dispatch]);

const onCancel = () => {

  //todo
}

const doSetDetail = useCallback((teacher: Teacher) => {
  dispatch({...setTeacherDetail(teacher),...{backPage:'/tabs/teacher/query'}});
},[dispatch]);
useEffect(() => { 
  // fetch(paramStr, {
  //   method: 'GET',
  //   headers: {
  //     'Content-type': 'application/json;charset=UTF-8',
  //   },
  // }).then(res => res.json())
  // .then((json) => {
  // const {TeacherList} = json 
  
  // refreshList(demoTeacherList.filter((teacher:Teacher)=>teacher.teacherName.indexOf(queryInfo.teacherName)>-1))
  // return 
  // })

  refreshList(demoTeacherList)
},[refreshList]);

const onQuery = ()=>{
  // fetch(paramStr, {
  //   method: 'GET',
  //   headers: {
  //     'Content-type': 'application/json;charset=UTF-8',
  //   },
  // }).then(res => res.json())
  // .then((json) => {
  // const {TeacherList} = json 
  
  // refreshList(demoTeacherList.filter((teacher:Teacher)=>teacher.teacherName.indexOf(queryInfo.teacherName)>-1))
  // return 
  // })
    refreshList(demoTeacherList.filter((teacher:Teacher)=>teacher.teacherName.indexOf(queryInfo.teacherName)>-1))
    return 
  }

  const onCreate = ()=>{
    console.log(createTeacher)
    // setCreateModalOpen(false)
  }


const ListEntry = ({ teacher,key, ...props } : {teacher:Teacher,key:any}) => (
  <IonItem key={key} >
    <IonLabel>
      <p  className='text-center'>{teacher.teacherName}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{teacher.teacherIdentityNo}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{teacher.teacherIntroduce}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{teacher.teacherCreatedDate}</p>
    </IonLabel>
    <IonLabel>
      <p  className='text-center'>{teacher.teacherCreateTime}</p>
    </IonLabel>
    <IonLabel>
       <div className='flex gap-2'>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onDetail(teacher)}>详情</button>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={onEdit(teacher)}>编辑</button>
          <button className='p-1 text-white bg-blue-500 rounded-md'  onClick={()=>{setCancelTeacher(teacher);setIsCancelModalOpen(true)}}>删除</button>
       </div>
    </IonLabel>
  </IonItem>
  );

  if(state.teacher.teacherEdit){
    return <Redirect to="/tabs/teacher/edit" />
  }
  if(state.teacher.teacherDetail){
    return <Redirect to="/tabs/teacher/detail" />
  }
    return   <IonPage >
                <div className='relative'>
                <div className='flex'>
                {/* <IonModal isOpen={isCreateModalOpen} > */}
                <IonModal ref={createModal} trigger="open-create-modal"  >
                  <IonCard>
                    <IonCardHeader>
                        教师新增
                    </IonCardHeader>
                    <IonCardContent>
                      <form onSubmit={onCreate}>
                      <IonItem>
                        <IonLabel position="floating">教师姓名：</IonLabel>
                        <IonInput onIonChange={e => setCreateTeacher({...createTeacher,...{teacherName:e.detail.value!}})}> </IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel position="floating">教师身份证：</IonLabel>
                        <IonInput onIonChange={e => setCreateTeacher({...createTeacher,...{teacherIdentityNo:e.detail.value!}})}> </IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel position="floating">专业领域：</IonLabel>
                        <IonInput onIonChange={e => setCreateTeacher({...createTeacher,...{teacherIntroduce:e.detail.value!}})}> </IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel position="floating">从业经验：</IonLabel>
                        <IonInput onIonChange={e => setCreateTeacher({...createTeacher,...{teacherExperience:e.detail.value!}})}> </IonInput>
                      </IonItem>
                      <div className='mt-2 mb-2 flex space-x-2 '>
                        <span  className="flex-1 ">
                                  <button className='submutButton flex items-center justify-center flex-none  focus:outline-none hover:bg-primary-700 ' type='submit' >确认</button>

                        </span >
                        <span className="flex-1 ">
                          <button  className='cancelButton' onClick={ ()=>createModal.current?.dismiss()}>取消</button>
                        </span>
                      </div>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonModal>
                <IonModal isOpen={isCancelModalOpen}>
                  <IonCard>
                    <IonCardHeader>
                        教师删除确认
                    </IonCardHeader>
                    <IonCardContent>
                      <form  onSubmit={onCancel}>
                      <IonItem>
                        <IonLabel >教师姓名：{cancelTeacher.teacherName}</IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonLabel >教师身份证：{cancelTeacher.teacherIdentityNo}</IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonLabel >专业领域：{cancelTeacher.teacherIntroduce}</IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonLabel >从业经验：{cancelTeacher.teacherExperience}年</IonLabel>
                      </IonItem>
                      <div className='mt-2 mb-2 flex space-x-2 '>
                        <span  className="flex-1 ">
                                  <button className='submutButton flex items-center justify-center flex-none  focus:outline-none hover:bg-primary-700 ' type='submit' >确认</button>

                        </span >
                        <span className="flex-1 ">
                          <button  className='cancelButton' onClick={ ()=>cancelModal.current?.dismiss()}>取消</button>
                        </span>
                      </div>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonModal>


                <IonRow className='flex justify-between '>
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>教师姓名：</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{teacherName:e.target.value}})} />
                      </IonCol>
                      <IonCol className='flex ml-8'> 
                        <button onClick={()=>onQuery()} >查询</button>
                      </IonCol>
                      <IonCol className='flex ml-8'> 
                        <IonButton id="open-create-modal" expand="block"
                        //  onClick={()=>setCreateModalOpen(true)} 
                         >新增</IonButton>
                      </IonCol>
                </IonRow>
                </div>
              <div className='absolute w-full mt-10'>
                <IonList>
                  <IonItem key='title'>
                    <IonLabel> 
                      <div className='font-black text-center'>教师姓名</div>
                    </IonLabel>
                    <IonLabel> 
                      <div className='font-black text-center'>教师身份证号码</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>专业领域</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>从业经历</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>日期</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>操作</div>
                    </IonLabel>
                </IonItem>
                    <div className=''>
                    {state.teacher.teacherList.map((list:Teacher, i: any) => (
                    <ListEntry teacher={list} key={i} />
                  ))}
                    </div>
                </IonList>
            </div> 
            </div>            
      </IonPage>
}
export default TeacherQuery;

