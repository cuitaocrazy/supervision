import React from 'react';
import { Order,TranSum } from './types/types'
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
  detail : null,
  orderList: [],
  query:{SubscribeStartDate:'',USVOrgID:''},
  USVList:  [{USVOrgID:'Edu1MSP',name:'灵纳教育'},{USVOrgID:'Edu2MSP',name:'测试机构'}],
  sumQuery: {SubscribeStartDateStart:'',SubscribeStartDateEnd:'',USVOrgID:''},
  sumList: [],
  userInfo:{ username:'',role:''}
};
export const AppContext = React.createContext<{state:any,dispatch:React.Dispatch<any>}>({state:initialState,dispatch:()=>{}});
export const GetDetail = (state: { detail: any; }) => state.detail
export const GetOrderList = (state: { orderList: any; }) => state.orderList 
export const GetSumList = (state: { sumList: any; }) => state.sumList 
export const GetUserInfo = (state: { userInfo: any; }) => state.userInfo 
export const AppContextProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
  const fullInitialState = {
    ...initialState,
  }
  let [state, dispatch] = React.useReducer(reducer, fullInitialState);
  let value = { state:state, dispatch:dispatch };
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}  
export const setOrder = (order:Order[]) => ({
  type: 'Order',
  orderList:order
});
export const setDetail = (detail:any) => ({
  type: 'Detail',
  detail:detail
});
export const setQuery = (query:any) => ({
  type: 'Query',
  query:query
});
export const setSumQuery = (sumQuery:any) => ({
  type: 'SumQuery',
  sumQuery:sumQuery
});
export const setSum = (sumList:TranSum[]) => ({
  type: 'Sum',
  sumList:sumList
});
export const setUSV = (USVList:any) => ({
  type: 'USVList',
  USVList:USVList
});
export const setUserInfo = (userInfo:any) => ({
  type: 'UserInfo',
  userInfo:userInfo
});
export const reducer = (state: any, action: { type: any; detail: any; orderList: any; query: any; USVList: any; sumQuery: any; sumList: any;userInfo:any }) => {
  console.log('reducer')
  console.log(action)
  switch (action.type) {
    case 'Detail': {
      return {
        ...state,
        detail:action.detail
      }
    }
    case 'Order': {
      return {
        ...state,
        detail:undefined,
        orderList:action.orderList
      }
    }
    case 'Query': {
        return {
          ...state,
          query:action.query
        }
    }
    case 'USVList': {
      return {
        ...state,
        USVList:action.USVList
      }
    }
    ///////////////////
    case 'SumQuery': {
      return {
        ...state,
        sumQuery:action.sumQuery
      }
    }
    case 'Sum': {
      return {
        ...state,
        sumList:action.sumList
      }
    }
    case 'UserInfo': {
      return {
        ...state,
        userInfo:action.userInfo
      }
    }
    


  }
}


  // const logger = (reducer) => {
  //   const reducerWithLogger = (state, action) => {
  //     console.log("%cPrevious State:", "color: #9E9E9E; font-weight: 700;", state);
  //     console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
  //     console.log("%cNext State:", "color: #47B04B; font-weight: 700;", reducer(state, action));
  //     return reducer(state, action);
  //   };

  //   return reducerWithLogger;
  // }

  // const loggerReducer = logger(reducer);




// export const AppContextConsumer = AppContext.Consumer;

// const logger = (reducer) => {
//   const reducerWithLogger = (state, action) => {
//     console.log("%cPrevious State:", "color: #9E9E9E; font-weight: 700;", state);
//     console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
//     console.log("%cNext State:", "color: #47B04B; font-weight: 700;", reducer(state,action));
//     return reducer(state,action);
//   };

//   return reducerWithLogger;
// }

// const loggerReducer = logger(reducer);
