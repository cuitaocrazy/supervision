import {FC,useState} from 'react'
import { IonPage,IonHeader,IonContent } from '@ionic/react'

const Demo =()=>{
  let [isOpen,setIsOpen]=useState(false)
  return <IonPage>
    <IonHeader>
      <div>33333</div>
    </IonHeader>
    <IonContent>
      <div>
        <button className='w-full py-3 bg-red-300 rounded-3xl' onClick={()=>{setIsOpen(true)}}>1111</button>
      </div>
    </IonContent>
  </IonPage>
}

export default Demo