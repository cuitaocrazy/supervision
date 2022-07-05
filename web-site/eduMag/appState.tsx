import TeacherDetail from 'components/pages/teacher/Detail';
import React from 'react';
import {
  Contract,
  Lesson,
  Teacher,
  Attendance,
  Transfer,
  EduOrg,
  SupervisorUser,
  ConsumerStudent,
  Announcement,
  Complaint,
  ContractNego
} from './types/types'
/**
 * This is a simple redux-like state management pattern for React using hooks
 * that might be useful in your simpler Ionic React apps that don't
 * require something as complex as Redux.
 * 
 * See each page for an example of how to read from state and
 * dispatch actions.
 * 
 * Learn more:
 * https://ionicframework.com/blog/a-state-management-pattern-for-ionic-react-with-react-hooks/
 */
const initialState = {

  backPage:undefined,
  loginUser:{//登录用户信息
    orgId:null,
    orgName:'教育机构1',
    loginName:null,
    username:null,
    phone:null,
    role:null,
  },
  // userInfo:{
  //   userInfoList:[],
  //   userInfoDetail:null,
  // },
  // contract:{//合同
  //   contractList:[],
  //   contractDetail:null
  // },
  lesson:{//课程
    lessonList:[],
    lessonDetail:null,
    lessonEdit:null,
  },
  attendenceLanuch:{
    attendenceLanuchList:[],
    attendenceLanuchDetail:null,
  },
  teacher:{//教师
    teacherDetail:null,
    teacherList:[],
    teacherEdit:null,
  },
  attendance:{//考勤
    attendanceList:[],
    attendanceDetail:null
  },
  transfer:{//转让
    transferList:[],
    transferDetail:null
  },
  eduOrg:{//教育机构
    eduOrgList:[],
    eduOrgDetail:null
  },
  announcement:{//公告
    announcementList:[],
    announcementDetail:null
  },
  // complaint:{//投诉
  //   complaintList:[],
  //   complaintDetail:null
  // },
  // consumerStundent:{//消费者学员
  //   consumerLoginName:null,
  //   consumerName:null,
  //   consumerPhone:null,
  
  //   consumerIdentityNo:null,
  // },
  contractNego:{//合同谈判
    contractNegoList:[],
    contractNegoDetail:null
  },
};
export const AppContext = React.createContext<{state:any,dispatch:React.Dispatch<any>}>({state:initialState,dispatch:()=>{}});

export const AppContextProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
  const fullInitialState = {
    ...initialState,
  }
  let [state, dispatch] = React.useReducer(reducer, fullInitialState);
  let value = { state:state, dispatch:dispatch };
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
} 

export const setloginUser = (loginUser:any) => {
  return {
    type: 'setloginUser',
    loginUser:loginUser
  }
};

// export const setUserInfoList = (userInfoList:SupervisorUser[]) => {
//   return {
//     type: 'setUserInfoList',
//     userInfoList:userInfoList
//   }
// };

// export const setUserInfoDetail = (userInfoDetail?:SupervisorUser) => {
//   return {
//     type: 'setUserInfoDetail',
//     userInfoDetail:userInfoDetail
//   }
// };


// export const setContractList = (contractList:Contract[]) => {
//   return {
//     type: 'setContractList',
//     contractList:contractList
//   }
// }
// export const setContractDetail = (contractDetail:Contract) => {
//   return {
//     type: 'setContractDetail',
//     contractDetail:contractDetail
//   }
// }
export const setLessonList = (lessonList:Lesson[]) => {
  return {
    type: 'setLessonList',
    lessonList:lessonList
  }
}
export const setLessonDetail = (lessonDetail?:Lesson) => {
  return {
    type: 'setLessonDetail',
    lessonDetail:lessonDetail
  }
}
export const setLessonEdit = (lessonEdit?:Lesson) => {
  return {
    type: 'setLessonEdit',
    lessonEdit:lessonEdit
  }
}
export const setTeacherList = (teacherList:Teacher[]) => {
  return {
    type: 'setTeacherList',
    teacherList:teacherList
  }
}
export const setTeacherDetail = (teacherDetail?:Teacher) => {
  return {
    type: 'setTeacherDetail',
    teacherDetail:teacherDetail
  }
}
export const setTeacherEdit = (teacherEdit?:Teacher) => {
  return {
    type: 'setTeacherEdit',
    teacherEdit:teacherEdit
  }
}
export const setAttendanceList = (attendanceList:Attendance[]) => {
  return {
    type: 'setAttendanceList',
    attendanceList:attendanceList
  }
}
export const setAttendanceDetail = (attendanceDetail?:Attendance) => {
  return {
    type: 'setAttendanceDetail',
    attendanceDetail:attendanceDetail
  }
}
export const setTransferList = (transferList:Transfer[]) => {
  return {
    type: 'setTransferList',
    transferList:transferList
  }
}
export const setTransferDetail = (transferDetail?:Transfer) => {
  return {
    type: 'setTransferDetail',
    transferDetail:transferDetail
  }
}
// export const setEduOrgList = (eduOrgList:EduOrg[]) => {
//   return {
//     type: 'setEduOrgList',
//     eduOrgList:eduOrgList
//   }
// }
export const setEduOrgDetail = (eduOrgDetail?:EduOrg) => {
  return {
    type: 'setEduOrgDetail',
    eduOrgDetail:eduOrgDetail
  }
}
export const setAnnouncementList = (announcementList:Announcement[]) => {
  return {
    type: 'setAnnouncementList',
    announcementList:announcementList
  }
}
export const setAnnouncementDetail = (announcementDetail?:Announcement) => {
  return {
    type: 'setAnnouncementDetail',
    announcementDetail:announcementDetail
  }
}
// export const setComplaintList = (complaintList:Complaint[]) => {
//   return {
//     type: 'setComplaintList',
//     complaintList:complaintList
//   }
// }
// export const setComplaintDetail = (complaintDetail:Complaint) => {
//   return {
//     type: 'setComplaintDetail',
//     complaintDetail:complaintDetail
//   }
// }
// export const setConsumerStundent = (consumerStundent:ConsumerStudent) => {
//   return {
//     type: 'setConsumerStundent',
//     consumerStundent:consumerStundent
//   }
// }
export const setContractNegoList = (contractNegoList:ContractNego[]) => {
  return {
    type: 'setContractNegoList',
    contractNegoList:contractNegoList
  }
}
export const setContractNegoDetail = (contractNegoDetail:ContractNego) => {
  return {
    type: 'setContractNegoDetail',
    contractNegoDetail:contractNegoDetail
  }
}


export const setAttendenceLanuchList = (attendenceLanuchList:Lesson[]) => {
  return {
    type: 'setAttendenceLanuchList',
    attendenceLanuchList:attendenceLanuchList
  }
}
export const setAttendenceLanuchDetail = (attendenceLanuchDetail:Lesson) => {
  return {
    type: 'setAttendenceLanuchDetail',
    attendenceLanuchDetail:attendenceLanuchDetail
  }
}

export const reducer = (state: any, action: any) => {
  console.log('action')
  console.log(action)
  switch (action.type) {
    //new
    
    case 'setloginUser': {
      return {
        ...state,
        loginUser:action.loginUser
      }
    }
    case 'setEduOrgDetail': {
      return {
        ...state,
        eduOrg:{
          eduOrgDetail:action.eduOrgDetail
        }
      }
    }
  //   case 'setUserInfoList': {
  //     return {
  //       ...state,
  //       userInfo:{
  //         userInfoList:action.userInfoList,
  //         userInfoDetail:state.userInfo.userInfoDetail
  //       },
  //       backPage:action.backPage||state.backPage
  //     }
  //   }
  //   case 'setUserInfoDetail': {
  //     return {
  //       ...state,
  //       userInfo:{
  //         userInfoList:state.userInfo.userInfoList,
  //         userInfoDetail:action.userInfoDetail
  //       },
  //       backPage:action.backPage||state.backPage
  //     }
  //   }
  //   case 'setContractList':{
  //     return {
  //       ...state,
  //       contract:{
  //         contractList:action.contractList,
  //         contractDetail:state.contract.contractDetail
  //       },
  //       backPage:action.backPage||state.backPage
  //     }
  //   }
  //   case 'setContractDetail':{
  //     return {
  //       ...state,
  //       contract:{
  //         contractList:state.contract.contractList,
  //         contractDetail:action.contractDetail
  //       },
  //       backPage:action.backPage||state.backPage
  //     }
  //   }
    case 'setLessonList':{
      return {
        ...state,
        lesson:{
          lessonList:action.lessonList,
          lessonDetail:state.lesson.lessonDetail,
          lessonEdit:state.lesson.lessonEdit
        },
        backPage:action.backPage||state.backPage
      }
    }
    case 'setLessonDetail':{
      return {   
        ...state,
        lesson:{
          lessonList:state.lesson.lessonList,
          lessonDetail:action.lessonDetail,
          lessonEdit:state.lesson.lessonEdit
        },
        backPage:action.backPage||state.backPage
      }
    }
    case 'setTransferList':{
      return {
        ...state,
        transfer:{
          transferList:action.transferList,
          transferDetail:state.transfer.transferDetail
        },
        backPage:action.backPage||state.backPage 
      }
    }
    case 'setTransferDetail':{
      return {
        ...state,
        transfer:{
          transferList:state.transfer.transferList,
          transferDetail:action.transferDetail
        },
        backPage:action.backPage||state.backPage
      }
    }

    case 'setAnnouncementList':{
      return {
        ...state,
        announcement:{
          announcementList:action.announcementList,
          announcementDetail:state.announcement.announcementDetail
        },
        backPage:action.backPage||state.backPage
      }
    }

    case 'setAnnouncementDetail':{
      return {
        ...state,
        announcement:{
          announcementList:state.announcement.announcementList,
          announcementDetail:action.announcementDetail
        },
        backPage:action.backPage||state.backPage
      }
    }
    case 'setLessonEdit':{
      return {   
        ...state,
        lesson:{
          lessonList:state.lesson.lessonList,
          lessonDetail:state.lesson.lessonDetail,
          lessonEdit:action.lessonEdit,
        },
        backPage:action.backPage||state.backPage
      }
    }
    case 'setAttendenceLanuchList':{
      return {
        ...state,
        attendenceLanuch:{
          attendenceLanuchList:action.attendenceLanuchList,
          attendenceLanuchDetail:state.attendenceLanuch.attendenceLanuchDetail,
        },
        backPage:action.backPage||state.backPage
      }
    }
    case 'setAttendenceLanuchDetail':{
      return {
        ...state,
        attendenceLanuch:{
          attendenceLanuchDetail:action.attendenceLanuchDetail,
          attendenceLanuchList:state.attendenceLanuch.attendenceLanuchList,
        },
        backPage:action.backPage||state.backPage
      }
    }
    case 'setTeacherList':{
      return {
        ...state,
        teacher:{
          ...state.teacher,
          teacherList:action.teacherList
        },
        backPage:action.backPage||state.backPage
      }
    }
    case 'setTeacherDetail':{
      return {
        ...state,
        teacher:{
          ...state.teacher,
          teacherDetail:action.teacherDetail
        },
        backPage:action.backPage||state.backPage
      }
    }
    case 'setTeacherEdit':{
      return {
        ...state,
        teacher:{
          ...state.teacher,
          teacherEdit:action.teacherEdit
        },
        backPage:action.backPage||state.backPage
      }
    }
    case 'setAttendanceList':{
      return {
        ...state,
        attendance:{
          attendanceList:action.attendanceList,
          attendanceDetail:state.attendance.attendanceDetail
        },
        backPage:action.backPage||state.backPage
      }
    }
    case 'setAttendanceDetail':{
      return {
        ...state,
        attendance:{
          attendanceList:state.attendance.attendanceList,
          attendanceDetail:action.attendanceDetail
        },
        backPage:action.backPage||state.backPage
      }
    }
  //   case 'setComplaintList':{
  //     return {
  //       ...state,
  //       complaint:{
  //         complaintList:action.complaintList,
  //         complaintDetail:state.complaint.complaintDetail
  //       },
  //       backPage:action.backPage||state.backPage
  //     }
  //   }
  //   case 'setComplaintDetail':{
  //     return {
  //       ...state,
  //       complaint:{
  //         complaintList:state.complaint.complaintList,
  //         complaintDetail:action.complaintDetail
  //       },
  //       backPage:action.backPage||state.backPage
  //     }
  //   }
  //   case 'setConsumerStundent': {
  //     return {
  //       ...state,
  //       consumerStundent:action.consumerStundent
  //     }
  //   }
    case 'setContractNegoList': {
      return {
        ...state,
        contractNego:{
          contractNegoList:action.contractNegoList,
          contractNegoDetail:state.contractNego.contractNegoDetail
        },
        backPage:action.backPage||state.backPage
      }
    }
    case 'setContractNegoDetail': {
      return {
        ...state,
        contractNego:{
          contractNegoList:state.contractNego.contractNegoList,
          contractNegoDetail:action.contractNegoDetail
        },
        backPage:action.backPage||state.backPage
      }
    }
  }
}
