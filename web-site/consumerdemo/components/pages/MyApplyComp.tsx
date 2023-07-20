import { IonPage, IonHeader, IonContent, IonToast } from '@ionic/react'
import Navbar from 'components/Navbar'
import { useContext, useState } from 'react';
import { AppContext } from 'appState';
import { useHistory } from 'react-router-dom';
import { Complaint } from '@/types/types';
import { RadioGroup } from '@headlessui/react';
import { complaintCreate } from 'const/const'

// 申请投诉页面
const MyApplyComp = () => {
  const { state: { contractDetail } } = useContext(AppContext);
  const [toastMsg, setToastMsg] = useState<string | undefined>();
  const history = useHistory();
  const [complaint, setComplaint] = useState<Partial<Pick<Complaint, 'consumerId' | 'eduId' | 'complaintTitle' | 'complaintContent' | 'complaintType'>>>({
    consumerId: contractDetail?.consumerId,
    eduId: contractDetail?.eduId,
    complaintType: 'lesson'
  })
  const doCommit = () => {
    console.log(JSON.stringify(complaint))
    if (!complaint.complaintTitle) {
      setToastMsg('标题必填')
      return;
    }
    if (!complaint.complaintContent) {
      setToastMsg('内容必填')
      return;
    }
    fetch(complaintCreate, {
      method: "POST",
      body: JSON.stringify(complaint),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(({ result }) => {
        if (result) {
          setToastMsg('已提交');
          setTimeout(() => { history.push("./tabs/myLessonList") }, 1000)
          return;
        }
        setToastMsg('未知异常')
      });
  }

  const formNode = <form className='text-sm bg-white'>
    <RadioGroup value={complaint.complaintType}
      onChange={(value: string | undefined) => setComplaint(pre => ({ ...pre, complaintType: value }))}
      className="flex items-center justify-between px-4 py-2 mx-2 shadow-md">
      <RadioGroup.Label className="px-2 py-2">投诉类型</RadioGroup.Label>
      <RadioGroup.Option value="lesson">
        {({ checked }) => (
          <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
            课程</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="teacher">
        {({ checked }) => (
          <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
            老师</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="other">
        {({ checked }) => (
          <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
            其他</span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
    <div className='px-4 pt-2 mx-2 mt-2 rounded-md shadow-md'>
      <p className='px-3 py-2 mt-2 leading-7 rounded-md bg-primary-50'>
        <span className='pr-3'>机构名称 :</span>
        <span>{contractDetail?.eduName}</span>
      </p>
      <p className='pt-2 mt-2 leading-6 '>投诉标题</p>
      <input type="text" placeholder='请输入您的投诉标题'
        onChange={(event) => setComplaint(pre => ({ ...pre, complaintTitle: event.target.value }))}
        className='w-full pl-2 mb-2 leading-6 rounded-md focus:outline-none ' />
      <p className='mt-4'>投诉内容</p>
      <textarea placeholder='请描述您要投诉的内容......'
        onChange={(event) => setComplaint(pre => ({ ...pre, complaintContent: event.target.value }))}
        className='w-full h-40 py-2 pl-2 mt-1 mb-2 rounded-md bg-gray-50 focus:outline-none' />
    </div>
    <div className='flex justify-center'>
      <input className='w-full py-3 mx-6 mt-6 font-bold tracking-wider text-center text-white shadow-md bg-primary-600 shadow-primary-500 rounded-3xl focus:outline-none focus:border-primary-700'
        value="提交投诉"
        type="button"
        onClick={doCommit} />
    </div>
  </form>

  return <IonPage>
    <IonHeader>
      <Navbar title="投诉内容" />
    </IonHeader>
    <IonContent>
      {contractDetail?.consumerId ? formNode : <div className="relative ">
        <div className="grid justify-center grid-rows-1">
          <div className="mt-20 ">
            <svg className="w-48 h-32 rounded-lg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1721" width="200" height="200"><path d="M512 1024C229.23264 1024 0 794.76736 0 512S229.23264 0 512 0s512 229.23264 512 512-229.23264 512-512 512zM283.92448 484.07552l-41.8816 55.84896 223.41632 209.4592 339.77344-386.32448-32.57344-37.24288-307.2 316.5184-181.53472-158.2592z" p-id="1722" fill="#5045E4"></path></svg>
          </div>
          <div className="pt-4 pb-16 text-lg text-center text-gray-700">
            因刷新丢失关键信息，请后退重新操作!
          </div>
        </div>
      </div>}
      <IonToast
        isOpen={Boolean(toastMsg)}
        onDidDismiss={() => setToastMsg(undefined)}
        message={toastMsg}
        duration={1000}
        position="middle"
      />
    </IonContent>
  </IonPage>
}

export default MyApplyComp