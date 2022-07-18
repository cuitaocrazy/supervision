
import { useEffect,useState } from 'react'
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
import { Line } from 'react-chartjs-2';



const Income:React.FC =()=>{

  const [incomes,setIncomes] = useState([] as any[]);
  useEffect(()=>{
    const returnResult = [{moon:'1月',income:2},{moon:'2月',income:4.1},{moon:'3月',income:4},{moon:'4月',income:3}]
    setIncomes(returnResult)
  }
  ,[])

  const labels = incomes.map(income=>income.moon)
  const data = {
    labels,
    datasets: [
      {
        label: '收入',
        data: incomes.map(income=>income.income),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

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


  return <IonPage>
    <IonCard>
      <IonCardContent>
        {/* {'1111111111'} */}
        <Line data={data} options={options} />
      </IonCardContent>
    </IonCard>
  </IonPage>
}
export default Income

