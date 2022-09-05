//eduOrg管理的详细页面
import React, { useState } from 'react';
import { IonPage, IonCard, IonCardContent, useIonToast } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { AppContext, setEduOrgEdit } from '../../../appState';
import Quit from '../../Quit';
import EduIsPublic from 'components/EduIsPublic';
import { edbEduOrgModifyURL } from 'const/const';

export const EduOrgEdit: React.FC = () => {
  const [present, dismiss] = useIonToast();
  const modifyURL = edbEduOrgModifyURL;
  const { state, dispatch } = useContext(AppContext);

  const [eduOrgState, setEduOrgState] = useState(state.eduOrg.eduOrgEdit);
  const setBack = useCallback(() => {
    dispatch(setEduOrgEdit(undefined));
  }, []);
  if (state.eduOrg.eduOrgEdit === undefined) {
    return <Redirect to={state.backPage} />;
  }

  // const onModify = async (e: React.FormEvent) => () => {
  const onModify = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(modifyURL, {
      method: 'POST',
      body: JSON.stringify(eduOrgState),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const result = json;
        // const result = { true: Boolean };
        const msg = { 网络异常: String };
        if (result) {
          present({
            message: '教育机构编辑成功',
            position: 'top',
            duration: 3000,
          });
        } else
          present({
            buttons: [{ text: '关闭', handler: () => dismiss() }],
            message: '教育机构编辑失败' + msg,
            position: 'top',
            onDidDismiss: () => console.log('dismissed'),
            onWillDismiss: () => console.log('will dismiss'),
          });
        setBack();
      });
  };
  // const eduOrgTypePickerColumn = {
  //   name: "eduOrgTypePickerColumn",
  //   options: [{'text':'','value':'0'},{'text':'数学','value':'1'}],
  // } as PickerColumn;

  return (
    <IonPage>
      <Quit />
      <IonCard className="h-screen mx-6 overflow-auto">
        {/* 导航 */}
        <div className="flex px-2 pt-2 mx-2 my-2 text-gray-800">
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
            <span className="pr-1 text-gray-600 ">教育机构管理</span>/
            <span className="pr-1 text-gray-600 ">教育机构管理</span>/
            <span className="pl-1 text-primary-500">机构编辑</span>
          </div>
        </div>
        <IonCardContent>
          <form onSubmit={onModify}>
            {/* 编辑内容 */}
            <div className="font-bold text-gray-800">机构编辑</div>
            <hr className="mt-2 mb-4" />
            <div className="grid grid-cols-2 justify-items-center ">
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">监管机构名:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-300 focus:outline-none"
                  name="supervisorOrgName"
                  value="北京市教育局"
                />
              </div>
              {/* <div className="flex items-center mb-4 leading-10 justify-items-center">
                <div className="flex justify-end w-32 mr-2">教育机构ID:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduId"
                  value={eduOrgState.eduId}
                  readOnly
                />
              </div> */}
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">
                  <span className="px-1 text-red-600">*</span>
                  教育机构名称:
                </div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduName"
                  value={eduOrgState.eduName}
                  onChange={e => setEduOrgState({ ...eduOrgState, eduName: e.target?.value })}
                  required
                />
              </div>
              {/*<div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">教育机构城市:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduAddress"
                  value={eduOrgState.eduAddress}
                  required
                />
              </div>*/}
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">
                  <span className="px-1 text-red-600">*</span>
                  教育机构地址:
                </div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduAddress"
                  value={eduOrgState.eduAddress}
                  onChange={e => setEduOrgState({ ...eduOrgState, eduAddress: e.target?.value })}
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">教育机构法人:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduLegalPerson"
                  value={eduOrgState.eduLegalPerson}
                  onChange={e =>
                    setEduOrgState({ ...eduOrgState, eduLegalPerson: e.target?.value })
                  }
                />
              </div>

              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">法人联系方式:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduLegalPhone"
                  value={eduOrgState.eduLegalPhone}
                  onChange={e => setEduOrgState({ ...eduOrgState, eduLegalPhone: e.target?.value })}
                />
              </div>

              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">教育机构联系人:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduContact"
                  value={eduOrgState.eduContact}
                  onChange={e => setEduOrgState({ ...eduOrgState, eduLegalPhone: e.target?.value })}
                />
              </div>

              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">教育机构联系方式:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduContactPhone"
                  value={eduOrgState.eduContactPhone}
                  onChange={e =>
                    setEduOrgState({ ...eduOrgState, eduContactPhone: e.target?.value })
                  }
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">是否公办:</div>
                <EduIsPublic
                  isPublic={eduOrgState.eduIsPublic}
                  setIsPublic={v => {
                    setEduOrgState({
                      ...eduOrgState,
                      ...{ eduIsPublic: v },
                    });
                  }}
                />
              </div>
              {/* <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">许可证文件:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduLicense"
                  value={eduOrgState.eduLicense}
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">年检日期:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduAnnualInspectionDate"
                  value={eduOrgState.eduAnnualInspectionDate}
                  onChange={e =>
                    setEduOrgState({
                      ...eduOrgState,
                      eduAnnualInspectionDate: e.target?.value,
                    })
                  }
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">年检时间:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduAnnualInspectionTime"
                  value={eduOrgState.eduAnnualInspectionTime}
                  onChange={e =>
                    setEduOrgState({
                      ...eduOrgState,
                      eduAnnualInspectionTime: e.target?.value,
                    })
                  }
                />
              </div> */}
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2"> 监管账户:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduSupervisedAccount"
                  value={eduOrgState.eduSupervisedAccount}
                  onChange={e =>
                    setEduOrgState({
                      ...eduOrgState,
                      eduSupervisedAccount: e.target?.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">
                  <span className="px-1 text-red-600">*</span>
                  普通账户:
                </div>
                <input
                  className="w-64 h-10 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduNormalAccount"
                  value={eduOrgState.eduNormalAccount}
                  onChange={e =>
                    setEduOrgState({ ...eduOrgState, eduNormalAccount: e.target?.value })
                  }
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">
                  <span className="px-1 text-red-600">*</span>
                  登录名:
                </div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduAnnualInspectionTime"
                  value={eduOrgState.eduLoginName}
                  onChange={e => setEduOrgState({ ...eduOrgState, eduLoginName: e.target?.value })}
                  required
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">监管商户号:</div>
                <input
                  className="w-64 px-2 rounded-md bg-primary-100 focus:outline-none"
                  name="eduSupervisedMerNo"
                  value={eduOrgState.eduSupervisedMerNo}
                  onChange={e =>
                    setEduOrgState({
                      ...eduOrgState,
                      eduSupervisedMerNo: e.target?.value,
                    })
                  }
                />
              </div>
              
            </div>
            <div className="flex items-center justify-center gap-4 mt-10">
              <input
                value="取消"
                type="button"
                className="px-6 py-2 border rounded-md "
                onClick={setBack}
              />
              <input
                value="确定"
                type="submit"
                className="px-6 py-2 text-white border rounded-md bg-primary-600"
              />
            </div>
          </form>
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default EduOrgEdit;
