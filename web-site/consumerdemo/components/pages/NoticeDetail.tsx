import React from 'react'
import { IonPage, IonHeader, IonContent } from '@ionic/react'

// 公告详情
const NoticeDetail = () => {
  return <IonPage>
    <IonHeader>
      <div className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
        <div className='text-center'>公告详情</div>
      </div>
    </IonHeader>
    <IonContent>
      <div className='py-2 pb-6 mx-2 mt-2 rounded-md shadow-md'>
        <div className='text-sm bg-white'>
          <p className='mt-4 font-bold text-center'>监管机构公告</p>
          <p className='text-center text-gray-500'>2022/06/10</p>
        </div>
        <div className='mx-4 mt-4 text-gray-600'>
          各省、自治区、直辖市党委教育工作部门、教育厅（教委）、网信办，新疆生产建设兵团教育局、网信办，部属各高等学校党委、部省合建各高等学校党委：
          根据《教育部思想政治工作司 中央网信办网络社会工作局关于举办第五届全国大学生网络文化节和全国高校网络教育优秀作品推选展示活动的通知》（教思政司函〔2020〕9号）工作安排，经作品申报、资格审核、专家审议、结果公示等程序，遴选产生了第五届“全国大学生网络文化节”和“全国高校网络教育优秀作品推选展示活动”入选名单。现将结果予以公布（见附件）。
          请各地各高校充分发挥入选作品的示范作用，引导和推动广大师生积极参与网络文化作品创作，进一步丰富网络文化内容供给，传播正能量，弘扬主旋律，争做校园好网民，切实提升高校网络文化建设的质量和水平。
        </div>
      </div>

    </IonContent>
  </IonPage>
}
export default NoticeDetail