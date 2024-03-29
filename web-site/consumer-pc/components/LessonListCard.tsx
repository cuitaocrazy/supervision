import { FC, useContext, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { Lesson } from "../types/types";
import { AppContext, setLessonDetail } from "../appState";

interface LessonListCardProps {
  lesson_imgs?: string;
  lesson_name?: string;
  lesson_introduce?: string;
  edu_address?: string;
  item?: Lesson;
}
// 首页课程列表card组件
const LessonListCard: FC<LessonListCardProps> = (props) => {
  const { state, dispatch } = useContext(AppContext);

  const refreshLessonDetail = useCallback(
    (lesson: Lesson) => {
      dispatch(setLessonDetail(lesson));
    },
    [dispatch]
  );
  return (
    <NavLink to="/searchLessonDetail" {...props} onClick={() => refreshLessonDetail(props.item as Lesson)}>

      <div className="flex justify-center max-w-lg mx-auto h-52 w-72 -z-10">
        <div className="flex flex-col justify-center max-w-sm mb-5 space-x-3 space-y-2 bg-white border border-gray-200 rounded-lg shadow-md w-72 h-52">
          <img
            className="rounded-t-lg cursor-pointer h-36 w-72"
            src={props.lesson_imgs}
            alt=""
          />
          <div className="flex flex-col justify-center px-2 ">
            <p className="text-xs font-bold text-gray-900 truncate cursor-pointer ">
              {props.item?.lessonName}
            </p>
            <p className="text-xs text-gray-400 truncate ">
              {props.item?.lessonIntroduce}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {props.item?.edu?.eduAddress}
            </p>

          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default LessonListCard;
