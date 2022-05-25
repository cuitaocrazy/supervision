import React, { useState } from 'react';
import Router from 'next/router'
import {IonPage,IonHeader,IonToolbar,IonContent,IonTitle,IonSearchbar,IonImg,IonList,IonItem,IonThumbnail,IonLabel,IonAvatar,IonChip,IonCard,IonCardHeader,IonCardSubtitle,IonCardTitle,IonCardContent}from "@ionic/react"

type Item = {
  src: string;
  text: string;
};
const items: Item[] = [{ src: 'http://placekitten.com/g/200/300', text: 'a picture of a cat' },
];

const First=()=>{

  return <IonPage>
    <IonHeader>
      <div className='grid h-10 grid-cols-10 pt-2 font-medium text-center text-white bg-indigo-600 margin-auto'>
        <div className='col-span-9'>教育资金监管平台</div>
        <div className=''>
        <svg className="w-5 h-5 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />  <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
        </div>
      </div>
    </IonHeader>
    <IonContent>
        <div className='bg-indigo-600'>
            <div className='bg-white rounded-t-3xl'>
              {/* 搜索框 */}
              <div className='flex items-center justify-center pt-4'>
                  <div className="flex items-center bg-white ">
                      <div className="w-full">
                          <input type="search" className="w-full px-4 py-1 text-sm text-gray-800 border rounded-l-3xl focus:outline-none"
                              placeholder="请输入搜索关键词" x-model="search" />
                      </div>
                      <div>
                          <button type="submit" className="flex items-center justify-center w-20 h-8 text-white bg-indigo-600 rounded-r-3xl">
                          <svg className="w-5 h-5 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24">
                              <path
                                  d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                          </svg>
                          </button>
                      </div>
                  </div>
              </div>
              {/* 轮播图 */}
              <div className='pt-4 mx-3'>
              <img className="w-full h-32 rounded-lg cursor-pointer " src='http://placekitten.com/g/200/300' alt="" />
              </div>

               {/* 课程列表 */}
               <div className='grid grid-cols-4 mx-3 mt-2'>
                 <div className='col-span-3 text-sm font-bold text-gray-900'>
                   <svg className="inline w-5 h-5 text-indigo-600"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" /></svg>
                   精选推荐
                 </div>
                 <div className='flex text-xs text-gray-400 justify-self-end'>
                   <a href="http://www.w3school.com.cn">
                     <div>更多<svg className="inline w-3 h-3 text-gray-400 "  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="9 6 15 12 9 18" /></svg></div>
                   </a>
                 </div>
               </div>
               
              <div>
                <div className="grid py-2 sm1:grid-cols-2 sm2:grid-cols-2 sm3:grid-cols-2">
                  <div className="flex flex-col max-w-sm mb-3 ml-2 mr-2 bg-white border border-gray-200 rounded-lg shadow-md h-36">
                    <img className="h-20 rounded-t-lg cursor-pointer" src='http://placekitten.com/g/200/300' alt="" />
                    <div className="flex flex-col justify-center px-2 pt-1">
                        <p className="text-xs font-bold text-gray-900 truncate cursor-pointer ">幼小衔接</p>
                        <p className='pt-1 text-xs text-gray-400 truncate'>简介：让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生</p>
                        <p className="text-xs text-gray-400 truncate">地址：廊坊市安次区和平路荣益广场3层206</p>
                    </div>
                  </div>

                  <div className="flex flex-col max-w-sm mb-3 ml-2 mr-2 bg-white border border-gray-200 rounded-lg shadow-md h-36">
                    <img className="h-20 rounded-t-lg cursor-pointer" src='http://placekitten.com/g/200/300' alt="" />
                    <div className="flex flex-col justify-center px-2 pt-1">
                        <p className="text-xs font-bold text-gray-900 truncate cursor-pointer ">幼小衔接</p>
                        <p className='pt-1 text-xs text-gray-400 truncate'>简介：让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生</p>
                        <p className="text-xs text-gray-400 truncate">地址：廊坊市安次区和平路荣益广场3层206</p>
                    </div>
                  </div>

                  <div className="flex flex-col max-w-sm mb-3 ml-2 mr-2 bg-white border border-gray-200 rounded-lg shadow-md h-36">
                    <img className="h-20 rounded-t-lg cursor-pointer" src='http://placekitten.com/g/200/300' alt="" />
                    <div className="flex flex-col justify-center px-2 pt-1">
                        <p className="text-xs font-bold text-gray-900 truncate cursor-pointer ">幼小衔接</p>
                        <p className='pt-1 text-xs text-gray-400 truncate'>简介：让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生</p>
                        <p className="text-xs text-gray-400 truncate">地址：廊坊市安次区和平路荣益广场3层206</p>
                    </div>
                  </div>

                  <div className="flex flex-col max-w-sm mb-3 ml-2 mr-2 bg-white border border-gray-200 rounded-lg shadow-md h-36">
                    <img className="h-20 rounded-t-lg cursor-pointer" src='http://placekitten.com/g/200/300' alt="" />
                    <div className="flex flex-col justify-center px-2 pt-1">
                        <p className="text-xs font-bold text-gray-900 truncate cursor-pointer ">幼小衔接</p>
                        <p className='pt-1 text-xs text-gray-400 truncate'>简介：让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生</p>
                        <p className="text-xs text-gray-400 truncate">地址：廊坊市安次区和平路荣益广场3层206</p>
                    </div>
                  </div>

                  <div className="flex flex-col max-w-sm mb-3 ml-2 mr-2 bg-white border border-gray-200 rounded-lg shadow-md h-36">
                    <img className="h-20 rounded-t-lg cursor-pointer" src='http://placekitten.com/g/200/300' alt="" />
                    <div className="flex flex-col justify-center px-2 pt-1">
                        <p className="text-xs font-bold text-gray-900 truncate cursor-pointer ">幼小衔接</p>
                        <p className='pt-1 text-xs text-gray-400 truncate'>简介：让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生</p>
                        <p className="text-xs text-gray-400 truncate">地址：廊坊市安次区和平路荣益广场3层206</p>
                    </div>
                  </div>

                  <div className="flex flex-col max-w-sm mb-3 ml-2 mr-2 bg-white border border-gray-200 rounded-lg shadow-md h-36">
                    <img className="h-20 rounded-t-lg cursor-pointer" src='http://placekitten.com/g/200/300' alt="" />
                    <div className="flex flex-col justify-center px-2 pt-1">
                        <p className="text-xs font-bold text-gray-900 truncate cursor-pointer ">幼小衔接</p>
                        <p className='pt-1 text-xs text-gray-400 truncate'>简介：让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生让孩子提前适应小学生</p>
                        <p className="text-xs text-gray-400 truncate">地址：廊坊市安次区和平路荣益广场3层206</p>
                    </div>
                  </div>
                  
                  </div>
                </div>
              </div>
        </div>

    

    </IonContent>
  </IonPage>
}

export default First


