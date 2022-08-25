import { FC, useEffect, useState, useCallback, useContext } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonRow,
  IonCol,
  IonLabel,
  useIonToast,
} from "@ionic/react";
import Navbar from "../Navbar";

const CardUseReacrdsList = () => {
  return (
    <IonPage>
      <IonHeader>
        <Navbar title="使用记录" />
      </IonHeader>
      <IonContent>
        <div className="px-4 py-2 mx-2 my-2 bg-white rounded-lg shadow-lg scroll-auto">
          <>
            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex flex-col justify-self-start">
                <div className="text-gray-800">黑马程序员(前端进阶班)</div>
                <div className="text-sm text-gray-400">
                  <span>2022年8月18日</span>
                  <span className="pl-2">19:28</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-self-end">
                <div className="flex text-gray-900 justify-self-end">-198</div>
                <div className="flex text-sm text-green-500 justify-self-end">
                  消费成功
                </div>
              </div>
            </div>
            <hr className="mt-4" />
          </>

          <>
            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex flex-col justify-self-start">
                <div className="text-gray-800">黑马程序员(前端进阶班)</div>
                <div className="text-sm text-gray-400">
                  <span>2022年8月16日</span>
                  <span className="pl-2">19:28</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-self-end">
                <div className="flex text-gray-900 justify-self-end">198</div>
                <div className="flex text-sm text-red-500 justify-self-end">
                  已退课
                </div>
              </div>
            </div>
            <hr className="mt-4" />
          </>

          <>
            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex flex-col justify-self-start">
                <div className="text-gray-800">黑马程序员(前端进阶班)</div>
                <div className="text-sm text-gray-400">
                  <span>2022年8月14日</span>
                  <span className="pl-2">19:28</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-self-end">
                <div className="flex text-gray-900 justify-self-end">-198</div>
                <div className="flex text-sm text-green-500 justify-self-end">
                  消费成功
                </div>
              </div>
            </div>
            <hr className="mt-4" />
          </>

          <>
            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex flex-col justify-self-start">
                <div className="text-gray-800">黑马程序员(前端进阶班)</div>
                <div className="text-sm text-gray-400">
                  <span>2022年8月12日</span>
                  <span className="pl-2">19:28</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-self-end">
                <div className="flex text-gray-900 justify-self-end">-198</div>
                <div className="flex text-sm text-green-500 justify-self-end">
                  消费成功
                </div>
              </div>
            </div>
            <hr className="mt-4" />
          </>

          <>
            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex flex-col justify-self-start">
                <div className="text-gray-800">黑马程序员(前端进阶班)</div>
                <div className="text-sm text-gray-400">
                  <span>2022年8月10日</span>
                  <span className="pl-2">19:28</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-self-end">
                <div className="flex text-gray-900 justify-self-end">-198</div>
                <div className="flex text-sm text-green-500 justify-self-end">
                  消费成功
                </div>
              </div>
            </div>
            <hr className="mt-4" />
          </>

          <>
            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex flex-col justify-self-start">
                <div className="text-gray-800">黑马程序员(前端进阶班)</div>
                <div className="text-sm text-gray-400">
                  <span>2022年8月10日</span>
                  <span className="pl-2">19:28</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-self-end">
                <div className="flex text-gray-900 justify-self-end">-198</div>
                <div className="flex text-sm text-green-500 justify-self-end">
                  消费成功
                </div>
              </div>
            </div>
            <hr className="mt-4" />
          </>

          <>
            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex flex-col justify-self-start">
                <div className="text-gray-800">黑马程序员(前端进阶班)</div>
                <div className="text-sm text-gray-400">
                  <span>2022年8月10日</span>
                  <span className="pl-2">19:28</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-self-end">
                <div className="flex text-gray-900 justify-self-end">-198</div>
                <div className="flex text-sm text-green-500 justify-self-end">
                  消费成功
                </div>
              </div>
            </div>
            <hr className="mt-4" />
          </>

          <>
            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex flex-col justify-self-start">
                <div className="text-gray-800">黑马程序员(前端进阶班)</div>
                <div className="text-sm text-gray-400">
                  <span>2022年8月10日</span>
                  <span className="pl-2">19:28</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-self-end">
                <div className="flex text-gray-900 justify-self-end">-198</div>
                <div className="flex text-sm text-green-500 justify-self-end">
                  消费成功
                </div>
              </div>
            </div>
            <hr className="mt-4" />
          </>

          <>
            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex flex-col justify-self-start">
                <div className="text-gray-800">黑马程序员(前端进阶班)</div>
                <div className="text-sm text-gray-400">
                  <span>2022年8月10日</span>
                  <span className="pl-2">19:28</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-self-end">
                <div className="flex text-gray-900 justify-self-end">-198</div>
                <div className="flex text-sm text-green-500 justify-self-end">
                  消费成功
                </div>
              </div>
            </div>
            <hr className="mt-4" />
          </>

          <>
            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex flex-col justify-self-start">
                <div className="text-gray-800">黑马程序员(前端进阶班)</div>
                <div className="text-sm text-gray-400">
                  <span>2022年8月10日</span>
                  <span className="pl-2">19:28</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-self-end">
                <div className="flex text-gray-900 justify-self-end">-198</div>
                <div className="flex text-sm text-green-500 justify-self-end">
                  消费成功
                </div>
              </div>
            </div>
            <hr className="mt-4" />
          </>

          <>
            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex flex-col justify-self-start">
                <div className="text-gray-800">黑马程序员(前端进阶班)</div>
                <div className="text-sm text-gray-400">
                  <span>2022年8月10日</span>
                  <span className="pl-2">19:28</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-self-end">
                <div className="flex text-gray-900 justify-self-end">-198</div>
                <div className="flex text-sm text-green-500 justify-self-end">
                  消费成功
                </div>
              </div>
            </div>
            <hr className="mt-4" />
          </>

          <>
            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex flex-col justify-self-start">
                <div className="text-gray-800">黑马程序员(前端进阶班)</div>
                <div className="text-sm text-gray-400">
                  <span>2022年8月10日</span>
                  <span className="pl-2">19:28</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-self-end">
                <div className="flex text-gray-900 justify-self-end">-198</div>
                <div className="flex text-sm text-green-500 justify-self-end">
                  消费成功
                </div>
              </div>
            </div>
            <hr className="mt-4" />
          </>

          <>
            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex flex-col justify-self-start">
                <div className="text-gray-800">黑马程序员(前端进阶班)</div>
                <div className="text-sm text-gray-400">
                  <span>2022年8月10日</span>
                  <span className="pl-2">19:28</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-self-end">
                <div className="flex text-gray-900 justify-self-end">-198</div>
                <div className="flex text-sm text-green-500 justify-self-end">
                  消费成功
                </div>
              </div>
            </div>
            <hr className="mt-4" />
          </>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CardUseReacrdsList;
