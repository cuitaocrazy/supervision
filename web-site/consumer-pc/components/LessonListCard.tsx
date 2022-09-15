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
  username?:string;
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
    <NavLink to="/searchLessonDetail" {...props}>
      <a
        onClick={() => {
          console.log(props);
          refreshLessonDetail(props.item as Lesson);
          // Router.push({pathname:'/searchLessonDetail', query: { item: JSON.stringify(props.item) }})
        }}
      >
        {/* <div className="flex flex-col max-w-sm mx-auto mb-3 bg-white border-gray-200 rounded-lg shadow-md -z-10 h-36">
        <img className="w-full h-20 rounded-t-lg cursor-pointer" src={props.lesson_imgs} alt="" />
        <div className="flex flex-col justify-center px-2 pt-1">
          <p className="text-xs font-bold text-gray-900 truncate cursor-pointer ">{props.item?.lessonName}</p>
          <p className='pt-1 text-xs text-gray-400 truncate'>{props.item?.lessonIntroduce}</p>
          <p className="text-xs text-gray-400 truncate">{props.item?.edu?.eduAddress}</p>
        </div>
      </div> */}
        <div className="flex justify-center max-w-lg mx-auto h-52 w-72 -z-10">
          <div className="flex flex-col justify-center max-w-sm mb-5 space-x-3 space-y-2 bg-white border border-gray-200 rounded-lg shadow-md w-72 h-52">
            <img
              className="w-full rounded-t-lg cursor-pointer h-36 w-72"
              src={props.lesson_imgs}
              alt=""
            />
            <div className="flex flex-col justify-center px-2 ">
              <p className="text-xs font-bold text-gray-900 truncate cursor-pointer ">
                {props.item?.lessonName}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {props.username}
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
      </a>
    </NavLink>
  );
};

export default LessonListCard;
