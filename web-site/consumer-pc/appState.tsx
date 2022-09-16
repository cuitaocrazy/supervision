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
    userId:null,
    loginName:null,
    username:null,
    phone:null,
    role:null,
    isOpen:false,
  },

  lessonDetail:null,
  CarList:[],
  stuName:null,
  contractDetail:null,
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

export const setloginIsOpen = (isOpen:any) => {
  return {
    type: 'setloginIsOpen',
    isOpen:isOpen
  }
};

export const setLessonDetail =(lessonDetail:any)=>{
  return {
    type: 'setLessonDetail',
    lessonDetail:lessonDetail
  }
}

export const setContractDetail =(contractDetail:any)=>{
  return {
    type: 'setContractDetail',
    contractDetail:contractDetail
  }
}

export const setDiscussDetail =(discussDetail:any)=>{
  return {
    type: 'setDiscussDetail',
    contractDetail:discussDetail
  }
}

export const setStuName = (stuName:any)=>{
  return {
    type: 'setStuName',
    stuName:stuName
  }
}

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'setloginUser': {
      return {
        ...state,
        stuName:action.loginUser.username,
        loginUser:action.loginUser
      }
    }
    case 'setloginIsOpen': {
      return {
        ...state,
        isOpen:action.isOpen
      }
    }
    case 'setLessonDetail': {
      return {
        ...state,
        lessonDetail:action.lessonDetail
      }
    }
    case 'setContractDetail': {
      return {
        ...state,
        contractDetail:action.contractDetail
      }
    }
    case 'setDiscussDetail': {
      return {
        ...state,
        discussDetail:action.discussDetail
      }
    }
    case 'setStuName':{
      return {
        ...state,
        stuName:action.stuName
      }
    }
  }
}
