import { FC, useEffect, useState, useCallback, useContext } from "react";
import { IonPage, IonHeader,IonContent,IonRow, IonCol, IonLabel, useIonToast } from "@ionic/react";
import Navbar from "../Navbar";

const CardHome: FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Navbar title="我的会员卡" />
      </IonHeader>
      <IonContent>
      <div className="bg-white">
        <div className="relative mx-6 mt-4 mb-6 text-white bg-gray-500 rounded-lg bg-gradient-to-r from-gray-400 to-gray-500">
          <img
            className="absolute bottom-0 right-0"
            width="140px"
            height=""
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkYAAAIiCAYAAAAtuAcgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OTA0YjU5MWUtZmQ1Ny00ODVjLWExNzMtMDBhZThhZGUxNjljIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZBRDU3MzdBMUM0NDExRURCRjk0QzJCMUY1NDdBODlGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZBRDU3Mzc5MUM0NDExRURCRjk0QzJCMUY1NDdBODlGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0JCRTBGMDExQkE5MTFFREFEN0FGNzM0RkQ1ODNGNzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0JCRTBGMDIxQkE5MTFFREFEN0FGNzM0RkQ1ODNGNzUiLz4gPC9yZGY6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"
          ></img>
          <div className="flex flex-row items-center justify-between px-4 py-3 ">
            <div className="flex">
              <img
                className="rounded-full w-14 h-14 "
                src="http://placekitten.com/g/200/300"
              ></img>
              <div className="flex flex-col justify-center mx-4 ">
                <div className="font-bold">黑马程序员(前端进阶班)</div>
                <div className="text-sm">中国银行</div>
              </div>
            </div>
            <div className="flex items-end mr-4 justify-self-end">
              <img
                width="20px"
                height="20px"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAYAAACrHtS+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZBRDU3MzdEMUM0NDExRURCRjk0QzJCMUY1NDdBODlGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZBRDU3MzdFMUM0NDExRURCRjk0QzJCMUY1NDdBODlGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkFENTczN0IxQzQ0MTFFREJGOTRDMkIxRjU0N0E4OUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkFENTczN0MxQzQ0MTFFREJGOTRDMkIxRjU0N0E4OUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7ivHzcAAAC0klEQVR42uzdsWoUQRjA8Y0eSFARtbCws7CwlkOEWIigWFkLFj6BQQh4KAleoyBCfAZfQYJCsDBdHsAirZ2ijYLNJeecRjAicjN7tztz9/vDlxSZ2Zmd/85+e3uZ3YXhcLhZVdXFCr85F+JLRPluiM1C9u1aJ/y4FOIoz7U4XkpHD3E1XxBOOAgH4SAchINwEA7CQTgmQSex3t2M9mHw174M/vjby4zHfqVm/WdNCt8I8THzg/lUxn37GuJdiO3E+l2n9PLYbqNRwstKpYSD8BIYEA7C5XDCkfGRdnNK293b//1aDs9L+OUQD6e07X7hwuXwSA47s8rhmGHhuz6Hm+GQw7PO4d22GkbzLFYtLUAsVfjuDEhvZQGiHC6Hy+GEg3A5nHAQLocTDsLlcMJBuBxuhiMa99Inwwrh88N21dI6MTkcrc7wDyHeTnHbSGBhOBx+q+IfrnumKmN9+OeEeqeruKcpu0oH4SAchINwEA7CQTj+Seqdth1Dd4DYGzWjh/LdGqPcaoj7E+zn2VThJzg+wMnI8lfHLHd+0mPtlC6HowGsDwfhLpYJB+FyOOEgXA4n3AyHHI5ZzCW3q7zfADTubOm0OHtuRJb/NGa55yFeTbKjo39TdtjL4SAchINwEA7CQTgIB+EgHFGM7j8vFdTfrYiyqzXa6UeUvVea8DfVr3dw5M6jSOEjHie0s5ZQZ70Q38tO6XI4CAfhIByEg3AQDsJBOAgH4fg/qasYr9Rst6kvbNYyHffvIXo1t7HepPARW5kfzP3M+/eiRt3kr2Sd0ucslRLuSEMD7BEOwo074SBcDm/qc3juPAhxIaHe+xBPZ3VQZv1ls3cS6vQa6JccDsLlcMJBuHHPvuElvn/SyiLE1Kv0jZrtLs657CMhnuxHEcKPmaC1aeWgl8NdPIBwEA7CQTgIB+EgHISDcEQzupd+fYb3r9dQO8ulDMgPAQYAHetOgBWL99YAAAAASUVORK5CYII="
              ></img>
            </div>
          </div>
          <div className="flex flex-col pb-5 mt-10 ml-4 font-bold">
            <div>
              <span>会员卡</span>
              <span className="pl-2">9021 8875 8757 6158</span>
            </div>
            <div>yunfei liu</div>
          </div>
        </div>
        {/* 余额和权益 */}
        <div className="flex flex-row justify-around">
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-500">余额(元)</div>
            <div className="text-lg font-bold text-orange-400">986.00</div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="flex text-gray-500">权益(课时)</div>
            <div className="text-lg font-bold text-orange-400">32</div>
          </div>
        </div>
        {/* 查看权益 */}
        <a className="flex items-center justify-center mt-10 mb-10"
         href="./cardRightsAndInterests">
          <div className="py-2 text-orange-400 bg-gray-100 rounded-sm px-14"
          
          >查看权益</div>
        </a>
        {/* 按钮 */}
        <div className="mx-6 text-gray-500">
          <hr />
          <div className="flex justify-between mt-4 mb-4">
            <div className="text-lg">消费</div>
            <div>
            <svg className="w-6 h-6 "  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="9 6 15 12 9 18" /></svg>
            </div>
          </div>
          <hr />
          <div className="flex justify-between mt-4 mb-4">
            <div className="text-lg">使用记录</div>
            <div>
            <svg className="w-6 h-6 "  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="9 6 15 12 9 18" /></svg>
            </div>
          </div>
          <hr />
          <div className="flex justify-between mt-4 mb-4">
            <div className="text-lg">会员卡详情</div>
            <div>
            <svg className="w-6 h-6 "  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="9 6 15 12 9 18" /></svg>
            </div>
          </div>
          <hr />
          <div className="flex justify-between mt-4 mb-4">
            <div className="text-lg">协议详情</div>
            <div>
            <svg className="w-6 h-6 "  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="9 6 15 12 9 18" /></svg>
            </div>
          </div>
          <hr />
          <div className="flex justify-between mt-4 mb-4">
            <div className="text-lg">商家小程序</div>
            <div>
            <svg className="w-6 h-6 "  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="9 6 15 12 9 18" /></svg>
            </div>
          </div>
          <hr />
          <div className="flex justify-between mt-4 mb-4">
            <div className="text-lg">退课</div>
            <div>
            <svg className="w-6 h-6 "  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="9 6 15 12 9 18" /></svg>
            </div>
          </div>
          <hr />
        </div>
      </div>
      </IonContent>
    </IonPage>
  );
};

export default CardHome;
