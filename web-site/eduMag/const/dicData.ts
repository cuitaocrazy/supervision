//记录字典数据及 get set


// 课程管理模块字典
/**
 * 课程类型
 */
export const lessonArrId = ['english', 'math', 'chinese']
export function getLessonType(lessonType: string | null) {
  if (lessonType != null) {
    switch (lessonType) {
      case 'english':
        lessonType = '英语'
        break;
      case 'math':
        lessonType = '数学'
        break;
      case 'chinese':
        lessonType = '语文'
        break;
      case 'other':
        lessonType = '其他'
        break;
    }
  } else {
    lessonType = "英语"
  }
  return lessonType;
}
/** 
 * 课程状态
 */

export const lessonStateArr = ['pending','reject','on','off']
//  [
//   { id: 1, name: '待审核', unavailable: true },
//   { id: 2, name: '拒绝', unavailable: false },
//   { id: 3, name: '上架', unavailable: false },
//   { id: 3, name: '下架', unavailable: false },
// ]
//编辑上显示
export const getLessonStatus = (lessonStatus: any) => {
  if (lessonStatus === "pending") {
    return "待审核";
  }
  if (lessonStatus === "reject") {
    return "拒绝";
  }
  if (lessonStatus === "on") {
    return "上架";
  }
  if (lessonStatus === "off") {
    return "下架";
  }
  return lessonStatus;
};//列表显示
export const getLessonStatusForList = (statusEnglish: any) => {
  if (statusEnglish === "pending") {
    return "待审核";
  }
  if (statusEnglish === "reject") {
    return "审核未通过";
  }
  if (statusEnglish === "on") {
    return "上架";
  }
  if (statusEnglish === "off") {
    return "下架";
  }
  return statusEnglish;
};