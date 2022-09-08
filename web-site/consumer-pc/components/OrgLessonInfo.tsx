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
    <div className="">
      <div className="text-lg font-bold ">{props.lessonName}</div>
      <div className="flex mt-3">
        <div className="mr-4 text-sm text-gray-500">
          {props.lessonTotalQuantity}
          <span>个课程包</span>
        </div>
        <TeacherName teacherName={props.teacherName} />
      </div>
      <OrgAddressAndPhone
        eduContactPhone={props.eduContactPhone}
        eduAddress={props.eduAddress}
      />
      <div className="flex items-center pt-1 text-xs justify-items-center">
        <div className="text-2xl text-center text-gray-800">
          <span className="pr-1">¥</span>
          {props.lessonTotalPrice}
        </div>
      </div>
    </div>
  );
};

export default OrgLessonInfo;
