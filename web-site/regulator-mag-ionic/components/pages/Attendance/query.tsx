import { useEffect, useCallback, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext, setAttendanceList, setAttendanceDetail } from '../../../appState';
import { Attendance } from '../../../types/types';
import { IonPage, IonList, IonLabel, IonItem, IonRow, IonCol } from '@ionic/react';

const queryURL = 'http://localhost:3003/attendannce/query';

const demoattendanceList: Attendance[] = [
  {
    attendanceID: '1',
    attendanceDate: '2020-01-01',
    attendanceTime: '00:00:00',
    attendanceType: 'vaild',
    attendanceLessionQuantity: '111',
    eduId: '1',
    eduName: '教育机构1',
    lessonId: '1',
    lessonName: '课程1',
    consumerId: '1',
    consumerName: '消费者1',
    consumerStuName: '学生1',
    attendanceStatus: 'vaild',
    updateDate: '2020-01-01',
    updateTime: '2020-01-01',
    updateReason: 'aaaa',
    contractId: '1',
  },
  {
    attendanceID: '2',
    attendanceDate: '2020-01-01',
    attendanceTime: '00:00:00',
    attendanceType: 'vaild',
    attendanceLessionQuantity: '111',
    eduId: '1',
    eduName: '教育机构1',
    lessonId: '1',
    lessonName: '课程1',
    consumerId: '1',
    consumerName: '消费者1',
    consumerStuName: '学生2',
    attendanceStatus: 'vaild',
    updateDate: '2020-01-01',
    updateTime: '2020-01-01',
    updateReason: 'aaaa',
    contractId: '2',
  },
];

const AttendanceQuery: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [queryInfo, setQueryInfo] = useState({
    consumerName: '',
    lessonName: '',
    consumerStuName: '',
  });
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  const paramStr = getParamStr(
    {
      consumerName: queryInfo.consumerName,
      lessonName: queryInfo.lessonName,
      consumerStuName: queryInfo.consumerStuName,
    },
    queryURL
  );
  const refreshList = useCallback(
    (eduOrgs: Attendance[]) => {
      dispatch(setAttendanceList(eduOrgs));
    },
    [dispatch]
  );
  const onDetail = (item: Attendance) => () => {
    doSetDetail(item);
  };

  const doSetDetail = useCallback(
    attendance => {
      dispatch({ ...setAttendanceDetail(attendance), ...{ backPage: '/tabs/attendance/query' } });
    },
    [dispatch]
  );
  useEffect(() => {
    // fetch(paramStr, {
    //   method: 'GET',
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8',
    //   },
    // }).then(res => res.json())
    // .then((json) => {
    // const {attendanceList} = json

    // refreshList(demoattendanceList.filter((attendance:Attendance)=>attendance.consumerName.indexOf(queryInfo.consumerName)>-1).filter((attendance:Attendance)=>attendance.lessonName.indexOf(queryInfo.lessonName)>-1).filter((attendance:Attendance)=>attendance.consumerStuName.indexOf(queryInfo.consumerStuName)>-1))
    // return
    // })
    refreshList(demoattendanceList);
  }, []);
  const onQuery = () => {
    refreshList(
      demoattendanceList
        .filter(
          (attendance: Attendance) => attendance.consumerName.indexOf(queryInfo.consumerName) > -1
        )
        .filter(
          (attendance: Attendance) => attendance.lessonName.indexOf(queryInfo.lessonName) > -1
        )
    );
  };
  const ListEntry = ({ attendance, myKey, ...props }: { attendance: Attendance; myKey: any }) => (
    <tr
      key={myKey}
      className="grid items-center grid-cols-8 gap-10 text-gray-600 border justify-items-center even:bg-white odd:bg-primary-100 "
    >
      <td className="flex items-center justify-center leading-10">{attendance.contractId}</td>
      <td className="flex items-center justify-center leading-10">{attendance.eduName}</td>
      <td className="flex items-center justify-center leading-10">{attendance.lessonName}</td>
      <td className="flex items-center justify-center leading-10">{attendance.consumerName}</td>
      <td className="flex items-center justify-center leading-10">{attendance.attendanceDate}</td>
      <td className="flex items-center justify-center leading-10">{attendance.attendanceTime}</td>
      <td className="flex items-center justify-center leading-10">{attendance.attendanceType}</td>
      <td className="flex items-center justify-center leading-10">
        <div className="flex gap-2 ">
          <button className="p-1 text-primary-600" onClick={onDetail(attendance)}>
            详情
          </button>
        </div>
      </td>
    </tr>
    // <IonItem key={key}>
    //   <IonLabel>
    //     <p className="text-center">{attendance.contractId}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p className="text-center">{attendance.eduName}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p className="text-center">{attendance.lessonName}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p className="text-center">{attendance.consumerName}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p className="text-center">{attendance.attendanceDate}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p className="text-center">{attendance.attendanceTime}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <p className="text-center">{attendance.attendanceType}</p>
    //   </IonLabel>
    //   <IonLabel>
    //     <div className="flex gap-2">
    //       <button className="p-1 text-white bg-blue-500 rounded-md" onClick={onDetail(attendance)}>
    //         查看详情
    //       </button>
    //     </div>
    //   </IonLabel>
    // </IonItem>
  );
  if (state.attendance.attendanceDetail == null || state.attendance.attendanceDetail == undefined) {
    return (
      <IonPage className="bg-gray-100">
        <div className="relative w-full h-screen mx-6 overflow-auto">
          {/* 导航 */}
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
              <span className="pr-1 text-gray-600">考勤管理</span>
            </div>
          </div>
          {/* 查询条件 */}
          <div className="w-11/12 px-4 py-2 mt-4 bg-white rounded-lg ">
            <div className="text-base font-bold">快速查询</div>
            <hr className="mt-2 mb-4" />
            <div className="flex">
              <IonRow className="flex items-center w-full mx-4 text-center bg-white rounded-md justify-items-center">
                <IonCol className="flex ml-8 text-gray-800">
                  <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                    客户/学生姓名：
                  </div>
                  <input
                    type="text"
                    className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                    placeholder="请输入客户或学生名称"
                    onChange={e =>
                      setQueryInfo({ ...queryInfo, ...{ consumerName: e.target.value } })
                    }
                  />
                </IonCol>
                <IonCol className="flex ml-8 text-gray-800">
                  <div className="flex items-center justify-center font-bold text-center text-gray-600 w-28">
                    课程名称：
                  </div>
                  <input
                    type="text"
                    className="flex w-56 h-12 font-bold text-center text-gray-600 bg-white border rounded-md focus:outline-none focus:glow-primary-600"
                    placeholder="请输入课程名称"
                    onChange={e =>
                      setQueryInfo({ ...queryInfo, ...{ lessonName: e.target.value } })
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
                </IonCol>
              </IonRow>
            </div>
          </div>

          {/* 查询列表 */}
          <div className="absolute w-full mt-10">
            <table className="w-11/12">
              <thead>
                <tr className="grid items-center h-10 grid-cols-8 gap-10 font-bold text-gray-700 bg-white rounded-lg justify-items-center">
                  <th className="flex items-center justify-center">合同ID</th>
                  <th className="flex items-center justify-center">教育机构名称</th>
                  <th className="flex items-center justify-center">课程名称</th>
                  <th className="flex items-center justify-center">客户姓名</th>
                  <th className="flex items-center justify-center">签到日期</th>
                  <th className="flex items-center justify-center">签到时间</th>
                  <th className="flex items-center justify-center">签到类型</th>
                  <th className="flex items-center justify-center">操作</th>
                </tr>
              </thead>
              <tbody>
                {state.attendance.attendanceList.map((list: Attendance, i: any) => (
                  <ListEntry attendance={list} key={i} myKey={i} />
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className='flex'>
                <IonRow className='flex justify-between '>
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>客户姓名：</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{consumerName:e.target.value}})} />
                      </IonCol>   
                      <IonCol className='flex ml-8'>
                        <IonLabel className='flex h-12 p-2 font-bold text-center text-primary-600 w-28'>课程名称：</IonLabel>
                        <input type='text' className="flex w-56 h-12 pt-2.5 font-bold text-center text-primary-600 bg-white rounded-md focus:outline-none focus:glow-secondary-500" onChange={e=>setQueryInfo({...queryInfo,...{lessonName:e.target.value}})} />
                      </IonCol>   
                </IonRow>
                <IonRow className='flex justify-between '>
                    <IonCol className='flex ml-8' aria-colspan={2}> 
                        <button onClick={()=>onQuery()} >查询</button>
                    </IonCol>
                </IonRow>
                </div>
              <div className='absolute w-full mt-10'>
                <IonList>
                  <IonItem key='title'>
                    <IonLabel> 
                      <div className='font-black text-center'>合同ID</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>教育机构名称</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>课程名称</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>客户姓名</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>签到日期</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>签到时间</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>签到类型</div>
                    </IonLabel>
                    <IonLabel>
                      <div className='font-black text-center'>操作</div>
                    </IonLabel>
                </IonItem>
                    <div className=''>
                    {state.attendance.attendanceList.map((list:Attendance, i: any) => (
                    <ListEntry attendance={list} key={i} />
                  ))}
                    </div>
                </IonList>
            </div>  */}
        </div>
      </IonPage>
    );
  } else {
    return <Redirect to="/tabs/attendance/detail" />;
  }
};
export default AttendanceQuery;
