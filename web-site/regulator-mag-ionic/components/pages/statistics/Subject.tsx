
import { useEffect,useCallback,useContext,useState } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext,setEduOrgList,setEduOrgDetail,setEduOrgEdit} from '../../../appState';
import {EduOrg} from '../../../types/types'
import { modalController } from '@ionic/core';
import {
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonModal,
  IonContent,
  IonInput,
  IonRadioGroup,
  IonRadio,
  IonRouterLink
} from '@ionic/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

console.log('xxx')

const Subject:React.FC =()=>{
  console.log('aaa')
  const [subjects,setSubjects] = useState([] as any[]);
  useEffect(()=>{
    const returnResult = [{subjectName:'语文',rate:0.33},{subjectName:'数学',rate:0.33},{subjectName:'英语',rate:0.33}]
    const other = {subjectName:'其他',rate:1-returnResult.reduce((pre,cur)=>pre+cur.rate,0)}
    returnResult[returnResult.length] = other
    setSubjects(returnResult)
  }
  ,[])

  ChartJS.register(ArcElement, Tooltip, Legend);
  // const newSubjects = [...subjects,other]

  console.log(subjects)
  const pieData = {
    labels: subjects.map(item=>item.subjectName),
    datasets: [
      {
        label: '',
        data: subjects.map(item=>item.rate),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <IonPage>
    <IonCard>
      <IonCardHeader>
        学科统计
      </IonCardHeader>
      <IonCardContent>
        {/* {'1111111111'} */}
        <Doughnut data={pieData} />
      </IonCardContent>
    </IonCard>
  </IonPage>
}
export default Subject

