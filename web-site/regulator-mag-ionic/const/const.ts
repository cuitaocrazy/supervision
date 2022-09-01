const serverPath = process.env.NEXT_PUBLIC_SERVER_PATH || 'http://localhost:3003/edb'

export const edbLessonAuditURL = `${serverPath}/lesson/audit`
export const edbLessonDelURL = `${serverPath}/lesson/del`
export const edbLessonAttendURL = `${serverPath}/lesson/attend`
export const edbEduLessonFindURL = `${serverPath}/eduLesson/find`
export const edbLessonOffURL= `${serverPath}/eduLesson/off`//下架

export const edbChaincodeFindURL = `${serverPath}/chaincode/find`
export const edbChaincodeCountURL = `${serverPath}/chaincode/count`

export const edbAttendanceFindURL = `${serverPath}/attendance/find`

export const edbSupervisorUserFindURL = `${serverPath}/supervisorUser/find`
export const edbSupervisorUserDelURL = `${serverPath}/supervisorUser/del`
export const edbSupervisorBackEduFindURL = `${serverPath}/supervisorBackEdu/find`
export const edbSupervisorBackEduRemoveURL = `${serverPath}/supervisorBackEdu/remove`

export const edbContractFindURL = `${serverPath}/contract/find`

export const edbEduOrgModifyURL = `${serverPath}/eduOrg/modify`
export const edbEduOrgFindURL = `${serverPath}/eduOrg/find`
export const edbEduOrgDelURL = `${serverPath}/eduOrg/del`
export const edbEduOrgApplyURL = `${serverPath}/eduOrg/apply`
export const edbEduOrgCreateURL = `${serverPath}/eduOrg/create`
export const edbBalanceFindURL = `${serverPath}/balance/find`

export const edbRefundFindURL = `${serverPath}/refund/find`

export const edbTransactionSumURL = `${serverPath}/transaction/sum`
export const edbTransactionFindURL = `${serverPath}/transaction/find`

export const edbTeacherFindURL = `${serverPath}/teacher/find`

export const edbTransferFindURL = `${serverPath}/transfer/find`

export const edbLoginURL = `${serverPath}/login`

//政策公告
export const edbAnnouncementCreateURL = `${serverPath}/announcement/create`
export const edbAnnouncementModifyURL = `${serverPath}/announcement/modify`
export const edbAnnouncementDelURL = `${serverPath}/announcement/del`
export const edbAnnouncementFindURL = `${serverPath}/announcement/find`