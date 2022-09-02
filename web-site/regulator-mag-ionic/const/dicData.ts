//字典数据get

// 课程管理模块字典
/**
 * 课程类型
 */
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
    }
  } else {
    lessonType = "英语"
  }
  return lessonType;
}
/** 
 * 课程状态
 */
//列表显示
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