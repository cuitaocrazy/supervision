const serverPath = process.env.SERVER_PATH || 'http://localhost:3003/edu'

export const eduContractFindURL = `${serverPath}/contract/find`
export const eduTransactionSumURL = `${serverPath}/transaction/sum`
export const eduTransactionFindURL = `${serverPath}/transaction/find`
export const eduLessonEditURL = `${serverPath}/lesson/edit`;
export const eduLessonCreateURL = `${serverPath}/lesson/create`;
export const eduLessonFindURL = `${serverPath}/lesson/find`;
export const eduAttendanceApplyURL = `${serverPath}/attendance/apply`;
export const eduAttendanceFindURL = `${serverPath}/attendance/find`;
export const eduTeacherModifyURL = `${serverPath}/teacher/modify`;
export const eduTeacherFindURL = `${serverPath}/teacher/find`;
export const eduTeacherCreateURL = `${serverPath}/teacher/create`;
export const eduTeacherDelURL = `${serverPath}/teacher/del`;
export const eduTransferFindURL = `${serverPath}/transfer/find`;
export const eduLoginURL = `${serverPath}/login`;