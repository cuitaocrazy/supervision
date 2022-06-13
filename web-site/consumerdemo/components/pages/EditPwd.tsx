import React,{useState} from 'react'
import { IonPage,IonHeader,IonContent } from '@ionic/react'
import { useRouter } from 'next/router'

export interface Pwd{
  oldPwd:string,
  NewPwd:string,
}

const EditPwd=()=>{
  const router = useRouter()
  const [pwdState, setpwdState] = useState({} as Pwd);
  const onEdit = async (e: React.FormEvent)=>() => {
    e.preventDefault();
    fetch("http://localhost:3003/", {
      method: 'PUT',
      body: JSON.stringify(pwdState),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    }).then(res => res.json())
    .then((json) => {
      alert(json.result)
    })
  }

  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>修改密码</div>
      </div>
    </IonHeader>
    <IonContent>
     <form onSubmit={onEdit}>
      <div className='px-4 py-3 mx-2 my-2 text-sm leading-6 rounded-md shadow-md'>
          <p>原密码</p>
          <input className='w-full mb-2 border-b' placeholder='请输入原密码' />
          <p>原密码</p>
          <input className='w-full mb-2 border-b' placeholder='请输入新密码' />
          <p>原密码</p>
          <input className='w-full mb-2 border-b' placeholder='请再次输入新密码' />
        </div>
        <div className='flex mt-10'>
          <input className='w-full py-2 mx-5 text-sm font-bold text-center text-white shadow-md focus:outline-none shadow-primary-600 rounded-3xl bg-primary-600' 
                value="确定修改" type="button" onClick={()=>router.push('./personalCenter')} />
        </div>
     </form>
    </IonContent>
  </IonPage>
}

export default EditPwd