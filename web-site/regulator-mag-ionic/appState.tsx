import React from 'react';
import { Order } from './types/types'
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
  USVList:  [{USVOrgID:'Edu1MSP',name:'灵纳教育'},{USVOrgID:'Edu2MSP',name:'测试机构'}]
};
export const AppContext = React.createContext<{state:any,dispatch:React.Dispatch<any>}>({state:initialState,dispatch:()=>{}});
export const GetDetail = (state:any) => state.detail
export const GetOrderList = (state:any) => state.orderList 
export const AppContextProvider = (props:any) => {
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
export const setUSV = (USVList:any) => ({
  type: 'USVList',
  USVList:USVList
});
export const reducer = (state:any, action:any) => {
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
