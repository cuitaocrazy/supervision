//BaseInfo的详细页面
import React, { useState } from "react";
import {
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import { useContext } from "react";
import { AppContext } from "../../appState";

export const BaseInfoDetail: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const [pwd, setPwd] = useState({ pwd: "", newPwd: "", newPwd2: "" });
  //   const setBack = useCallback(() => {
  //     dispatch(setUserInfoDetail(undefined));
  //   },[]);
  //   const onBack = ()=>() => {
  //     setBack()
  //   }
  const onModify = async (e: React.FormEvent) => () => {
    e.preventDefault();
    //todo fetch
    // fetch(modifyURL, {
    //   method: 'PUT',
    //   body: JSON.stringify(baseInfoState),
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8',
    //   },
    // }).then(res => res.json())
    // .then((json) => {
    //   alert(json.result)
    // })
  };

  return (
    <IonPage>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle className="mx-8 text-3xl text-gray-600">
            详细信息
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <form onSubmit={onModify}>
            <tr>
              <td>
                <label className="myLabel">原密码</label>
              </td>
              <td>
                <input
                  className="normalInput"
                  name="eduName"
                  value={pwd.pwd}
                  type="password"
                  onChange={(e) => setPwd({ ...pwd, pwd: e.target?.value })}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label className="myLabel">修改密码</label>
              </td>
              <td>
                <input
                  className="normalInput"
                  name="eduName"
                  value={pwd.newPwd}
                  type="password"
                  onChange={(e) => setPwd({ ...pwd, newPwd: e.target?.value })}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label className="myLabel">确认密码</label>
              </td>
              <td>
                <input
                  className="normalInput"
                  name="eduName"
                  value={pwd.newPwd2}
                  type="password"
                  onChange={(e) => setPwd({ ...pwd, newPwd2: e.target?.value })}
                ></input>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <button className="normalButton" type="submit">
                  确认
                </button>
              </td>
            </tr>
          </form>
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default BaseInfoDetail;
