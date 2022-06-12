
import { useEffect,useCallback,useContext,useState } from 'react'
import { Redirect } from 'react-router-dom';
import {AppContext,setEduOrgList,setEduOrgDetail,setEduOrgEdit} from '../../../appState';
import {EduOrg} from '../../../types/types'
import { modalController } from '@ionic/core';
import {
  IonPage,
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';



const Income:React.FC =()=>{

  const [incomes,setIncomes] = useState([] as any[]);
  useEffect(()=>{
    const returnResult = [{eduName:'A机构',income:[12345,1234,123,12,1]},{eduName:'B机构',income:[1,12,123,1234,12345]},{eduName:'其他机构',income:[1234,123,123,1234,12345]}]
    setIncomes(returnResult)
  }
  ,[])

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '收入统计',
      },
    },
  };

  const labels = ['上月1日', '上月10日', '上月15日', '上月20日', '上月最后一日'];

  const pieData = {
    labels: incomes.map(item=>item.eduName),
    datasets: [
      {
        label: '',
        data: incomes.map(item=>item.rate),
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
export default Income

