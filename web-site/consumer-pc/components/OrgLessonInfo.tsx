import { FC } from "react";
import TeacherName from "./TeacherName";
import OrgAddressAndPhone from "./OrgAddressAndPhone";

interface lessonDetailProps {
  lessonName?: string;
  teacherName?: string;
  lessonTotalPrice?: number;
  lessonTotalQuantity?: number;
  eduAddress?: string;
  eduContactPhone?: string;
  lessonIntroduce?: string;
}

// 课程的培训机构课程信息组件

const OrgLessonInfo: FC<lessonDetailProps> = (props) => {
  return (
    <div className="w-80 h-80">
      <div className="text-lg font-bold bg-purple-500 text-white  text-center py-10 rounded-lg">{props.lessonName}</div>
      <div>
     
      <div className="flex mt-3 flex-col  justify-center mx-2">
      <div>{props.lessonName}</div>
        <div className="mr-4 text-sm text-gray-500">
        <span className="text-sm text-gray-500 ">课程总数：</span>
        <span className="text-gray-700 "> {props.lessonTotalQuantity}</span>
         
        </div>
        <TeacherName teacherName={props.teacherName} />
      </div>
      <OrgAddressAndPhone
        eduContactPhone={props.eduContactPhone}
        eduAddress={props.eduAddress}
      />
      <div className="flex items-center pt-1 text-sm justify-items-center mx-2">
        <div className="text-sm text-center text-gray-700">
          <span className="text-sm text-gray-500">课程费用：</span>
          <span className="pr-1">¥</span>
          {props.lessonTotalPrice}
        </div>
      </div>

      </div>
    </div>
  //   <div className="">
  //   <div className="text-lg font-bold ">{props.lessonName}</div>
  //   <div className="flex mt-3">
  //     <div className="mr-4 text-sm text-gray-500">
  //       {props.lessonTotalQuantity}
  //       <span>个课程包</span>
  //     </div>
  //     <TeacherName teacherName={props.teacherName} />
  //   </div>
  //   <OrgAddressAndPhone
  //     eduContactPhone={props.eduContactPhone}
  //     eduAddress={props.eduAddress}
  //   />
  //   <div className="flex items-center pt-1 text-xs justify-items-center">
  //     <div className="text-2xl text-center text-gray-800">
  //       <span className="pr-1">¥</span>
  //       {props.lessonTotalPrice}
  //     </div>
  //   </div>
  // </div>
  );
};

export default OrgLessonInfo;
