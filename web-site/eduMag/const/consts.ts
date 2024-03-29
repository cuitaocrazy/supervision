const serverPath =
  process.env.NEXT_PUBLIC_SERVER_PATH || "http://localhost:3003/edu";

export const eduContractFindURL = `${serverPath}/contract/find`;
export const eduTransactionSumURL = `${serverPath}/transaction/sum`;
export const eduTransactionFindURL = `${serverPath}/transaction/find`;
export const eduLessonEditURL = `${serverPath}/lesson/edit`;
export const eduLessonCreateURL = `${serverPath}/lesson/create`;
export const eduLessonFindURL = `${serverPath}/lesson/find`;
export const eduLessonOffURL = `${serverPath}/lesson/off`; //课程下架
export const eduLessonAuditURL = `${serverPath}/lesson/audit`;
export const eduAttendanceApplyURL = `${serverPath}/attendance/apply`;
export const eduAttendanceFindURL = `${serverPath}/attendance/find`;
export const eduTeacherModifyURL = `${serverPath}/teacher/modify`;
export const eduTeacherFindURL = `${serverPath}/teacher/find`;
export const eduTeacherFindAllURL = `${serverPath}/teacher/findAll`;
export const eduTeacherCreateURL = `${serverPath}/teacher/create`;
export const eduTeacherDelURL = `${serverPath}/teacher/del`;
export const eduTransferFindURL = `${serverPath}/transfer/find`;
export const eduLoginURL = `${serverPath}/login`;
export const eduContractNegoFindURL = `${serverPath}/contractNego/find`;
export const eduContractNegoAudit = `${serverPath}/contractNego/audit`;
