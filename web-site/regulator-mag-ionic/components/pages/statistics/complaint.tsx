
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

  const [complaint,setComplaint] = useState([] as any[]);
  useEffect(()=>{
    const returnResult = [{orgName:'机构1',count:2},{orgName:'机构2',count:2},{orgName:'机构3',count:4}]
    setComplaint(returnResult)
  }
  ,[])

  const labels = complaint.map(item=>item.orgName)
  const data = {
    labels,
    datasets: [
      {
        label: '收入',
        data: complaint.map(item=>item.count),
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
        text: '投诉统计',
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

