import React,{useEffect,useState,useContext} from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Search from '../Search'
import {searchLessonURL} from '../../const/const'
import { Lesson } from '../../types/types'
import { AppContext } from "../../appState";

type FormData = {
  name: string;
};

// 数币系统的支付结果页面
const ECNYPayResult = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    // router.push('/searchLessonList')
  };
  const { state, dispatch } = useContext(AppContext);
  const [lessonList,setLessonList] = useState([] as Lesson[])
  const onQuery = ()=>{
    fetch(paramStr, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      setLessonList(json.result)  
    })
  }
  useEffect(onQuery,[])
  
  const [queryStr,setQueryStr] = useState('')
  const [page,setPage] = useState(0)
  const getParamStr = (params: any, url: string) => {
    let result = '?';
    Object.keys(params).forEach(key => (result = result + key + '=' + params[key] + '&'));
    return url + result;
  };
  const paramStr = getParamStr(
    {
      queryStr: queryStr,
      page:page,
      size:10
    },
    searchLessonURL
  );

  return (
    <IonPage>
      <IonHeader>
       
      </IonHeader>
      <IonContent>
        <div className="relative w-3/4 mx-auto">
        <Search username={state.loginUser.username} setQueryStr={setQueryStr} onQuery={onQuery} />
          <div className="grid justify-center grid-rows-1 mt-36">
            <div className="mt-20 ">
              {/* <img
                className="w-48 h-32 rounded-lg"
                src="http://placekitten.com/g/200/300"
              ></img> */}
              <svg
                className="w-48 h-32 rounded-lg"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1721"
                width="200"
                height="200"
              >
                <path
                  d="M512 1024C229.23264 1024 0 794.76736 0 512S229.23264 0 512 0s512 229.23264 512 512-229.23264 512-512 512zM283.92448 484.07552l-41.8816 55.84896 223.41632 209.4592 339.77344-386.32448-32.57344-37.24288-307.2 316.5184-181.53472-158.2592z"
                  p-id="1722"
                  fill="#5045E4"
                ></path>
              </svg>
            </div>
            <div className="pt-4 pb-16 text-lg text-center text-gray-700">
              支付成功！
            </div>
          </div>

          <div className="flex mt-12 text-base w-1/4 mx-auto">
            <Link to="/home" className="flex w-full h-10 py-2">
              <input
                className="w-full h-10 py-2 mx-6 font-bold tracking-widest text-white shadow-md bg-primary-600 rounded-3xl bg-grimary-600 shadow-primary-600 focus:bg-primary-700"
                type="submit"
                value="返回教育机构"
              />
            </Link>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ECNYPayResult;
