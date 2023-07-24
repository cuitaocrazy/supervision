import {FC} from 'react'

interface teacherProps{
  teacherIntroduce?:string
}

const TeacherIntroduce:FC<teacherProps> =(props)=>{
  return <div className='w-80 h-80 px-2'>
    <div className="text-lg font-bold bg-red-500 text-white  text-center py-10 rounded-lg">教师简介</div>
    <div className='mt-2 mx-2 leading-5 text-gray-700'>
      {/* {props.teacherIntroduce} */}
      <h5> 基本信息 </h5>
<div>1999年本科毕业于武汉大学中法数学实验班，被公派到法国攻读博士学位，1990年获法国巴黎第七大学博士学位。现为清华大学数学科学系教授、博士生导师。</div>



<h5>工作履历</h5>
<div>1990.07–1992.07：武汉大学，博士后</div>

<div>1992.07–现在：清华大学数学科学系，教授</div>

{/* <h5>研究领域</h5>
<div>Banach空间几何学、向量值调和分析，向量值微分方程适定性。</div>



<h5>所授课程</h5>
<div>泛函分析2，基础泛函分析。</div>



<h5>奖励与荣誉</h5>
<div>清华大学首届学术新人奖（1995）</div>

<div>霍英东青年教师基金（1995）</div>

<div>第五届中国青年科技奖（1997）</div>

<div>数学学报中英文编委（2005- ）</div>

<div>中国科学中英文编委（2015- ）</div> */}


    
    </div>
</div>
}

export default TeacherIntroduce