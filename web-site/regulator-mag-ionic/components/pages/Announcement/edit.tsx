//Announcement的详细页面
import React, { useState, useRef } from 'react';
import { IonPage, IonCard, IonCardContent, useIonToast } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { AppContext, setAnnouncementEdit } from '../../../appState';
import { Announcement } from '../../../types/types';
import { PickerColumn } from '@ionic/core';
import RichText from '../../RichText';
import { EditorState } from 'draft-js';
import Quit from '../../Quit';

export const AnnouncementEdit: React.FC = () => {
  const [present, dismiss] = useIonToast();
  let [isOffOpen, setIsOffOpen] = useState(false);
  const modifyURL = 'http://localhost:3003/announcement/modify';
  const { state, dispatch } = useContext(AppContext);
  const editor = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [announcementState, setAnnouncementState] = useState(state.announcement.announcementEdit);
  const [isPickOpen, setPickOpen] = useState(false);
  const statueTypePickerColumn = {
    name: 'statueTypePickerColumn',
    options: [
      { text: '开启', value: 'on' },
      { text: '下线', value: 'off' },
    ],
  } as PickerColumn;
  const setBack = useCallback(() => {
    dispatch(setAnnouncementEdit(undefined));
  }, []);
  const onBack = () => () => {
    setBack();
  };
  if (state.announcement.announcementEdit === undefined) {
    return <Redirect to={state.backPage} />;
  }
  const onModify = async (e: React.FormEvent) => () => {
    e.preventDefault();
    fetch(modifyURL, {
      method: 'PUT',
      body: JSON.stringify(announcementState),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(json => {
        const result = json;
        console.log(result + 'result');
        if (result) {
          present({
            message: '政策公告编辑成功',
            position: 'top',
            duration: 3000,
          });
        } else
          present({
            buttons: [{ text: '关闭', handler: () => dismiss() }],
            message: '政策公告编辑失败',
            position: 'top',
          });
      });
  };
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
            <span className="pr-1 text-gray-600 ">政策公告</span>/
            <span className="pl-1 text-primary-500">公告编辑</span>
          </div>
        </div>
        <IonCardContent>
          <form onSubmit={onModify}>
            {/* 编辑内容 */}
            <div className="font-bold text-gray-800">公告编辑</div>
            <hr className="mt-2 mb-4" />
            <div className="grid grid-cols-2 justify-items-center ">
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">发布日期:</div>
                <input
                  className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                  type="date"
                  value={announcementState.announcementDate}
                  onChange={e =>
                    setAnnouncementState({
                      ...announcementState,
                      announcementDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center mb-4 leading-10 justify-items-center">
                <div className="flex justify-end w-32 mr-2">发布者:</div>
                <input
                  className="w-64 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                  name="announcementAnnouncer"
                  value={announcementState.announcementAnnouncer}
                  type="text"
                  spellCheck={false}
                  onChange={e =>
                    setAnnouncementEdit({
                      ...announcementState,
                      ...{ announcementAnnouncer: e.target?.value },
                    })
                  }
                  readOnly
                />
              </div>
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">标题:</div>
                <input
                  className="w-64 h-10 p-1 text-gray-600 border rounded-md justify-self-start focus:outline-none focus:glow-primary-600"
                  name="announcementTitle"
                  value={announcementState.announcementTitle}
                  type="text"
                  spellCheck={false}
                  onChange={e =>
                    setAnnouncementEdit({
                      ...announcementState,
                      announcementTitle: e.target?.value,
                    })
                  }
                  required
                />
              </div>
              {/* TODO  */}
              <div className="flex mb-4 leading-10">
                <div className="flex justify-end w-32 mr-2">政策内容:</div>
                <div className="items-start w-64 p-1 text-gray-600 justify-self-start focus:outline-none focus:glow-primary-600">
                  <RichText
                    ref={editor}
                    editorState={editorState}
                    onChange={(editorState: any) => {
                      console.log(editorState);
                      setEditorState(editorState);
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-center gap-4 mt-10">
            <input
              value="取消"
              type="button"
              className="px-6 py-2 border rounded-md "
              onClick={onBack()}
            />
            <input
              value="确定"
              type="submit"
              className="px-6 py-2 text-white border rounded-md bg-primary-600"
            />
          </div>
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};
