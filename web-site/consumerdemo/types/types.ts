export interface Contract {
  contractId?:string,
  contractDate?:string,
  contractTime?:string,
  contractStatus?:string,
  contractUpdateDate?:string,
  contractUpdateTime?:string,
  contractUpdateReason?:string,
  eduId?:string,
  eduName?:string,
  eduAddress?:string,
  eduContactPhone?:string,
  lessonId?:string,
  lessonName?:string,
  lessonType?:string,
  lessonIntroduce?:string,
  lessonOutline?:string,
  lessonStartDate?: string,
  lessonStartTime?: string,
  lessonEndDate?: string,
  lessonEndTime?: string,
  lessonAttendanceType?:string,
  lessonTotalQuantity?:number,
  lessonTotalPrice?:number,
  lessonPerPrice?:string,
  teacherId?:string,
  teacherName?:string,
  teacherIntroduce?:string,
  consumerId?:string,
  consumerName?:string,
  consumerStuName?:string,
  orderNo?:string,
  lessonAccumulationQuantity?:number,
  lessonImages?:string,

}
// export interface TranSum{
//   USVOrgID?: string,
//   USVOrgName?:string,
//   USVItemID?: string,
//   USVItemName?: string,
//   TranCount?: number,
//   TranSumAmt?: number,
//   TranMonth?:string,
// }

export interface Lesson {
  lessonId?: string,
  lessonName?: string,
  lessonPerPrice?: number,
  lessonTotalPrice?: number,
  lessonIntroduce?: string,
  lessonType?:string,
  lessonOutline?: string,
  lessonStartDate?: string,
  lessonStartTime?: string,
  lessonEndDate?: string,
  lessonEndTime?: string,
  lessonStatus?: string,
  lessonCreateDate?: string,
  lessonCreateTime?: string,
  lessonUpdateDate?: string,
  lessonUpdateTime?: string,
  lessonUpdateReason?: string,
  eduId?: string,
  edu?: EduOrg,
  teacherId?: string,
  teacher?: Teacher,
  lessonTotalQuantity?:number
  lessonImgs?:string
}

export interface Teacher {
  teacherId?: string,
  teacherName?: string,
  teacherIdentityNo?: string,
  teacherExperience?: number,
  teacherIntroduce?: string,
  teacherRating?: number,
  teacherCreateDate?: string,
  teacherUpdateDate?: string,
  teacherCreateTime?: string,
  teacherUpdateTime?: string,
}


export interface Attendance{
  attendanceID:string,
  attendanceDate:string,
  attendanceTime:string,
  attendanceType:string,
  attendancelessonQuantity:string,
  eduId:string,
  eduName:string,
  lessonId:string,
  lessonName:string,
  consumerName:string,
  consumerId:string,
  consumerStuName:string,
  attendanceStatus:string,
  updateDate:string,
  updateTime:string,
  updateReason:string,
}

export interface Transfer{
  transferId:string,
  attendanceId:string,
  attendanceDate:string,
  attendanceTime:string,
  eduId:string,
  eduName:string,
  lessonId:string,
  lessonName:string,
  consumerName:string,
  consumerId:string,
  consumerStuName:string,
  tranLsId:string,
  supversingAccount:string,
  normalAccount:string,
  transferAmt:number,
  transferResult:string,
  reason:string
}

export interface EduOrg{
  eduId?:string,
  eduName?:string,
  eduAddress?:string,
  eduLegalPerson?:string,
  eduLegalPhone?:string,
  eduContact?:string,
  eduContactPhone?:string,
  eduIsPublic?:boolean,
  eduLicense?:string,
  eduStatus?:string,
  eduAnnualInspection?:string,
  eduAnnualInspectionDate?:string,
  eduAnnualInspectionTime?:string,
  eduSupervisedAccount?:string,
  eduNormalAccount?:string,
  eduSupervisedMerNo?:string,
  eduCreateDate?:string,
  eduCreateTime?:string,
  eduUpdateDate?:string,
  eduUpdateTime?:string,
  eduRating?:number,
  eduPassword?:string,
  eduLoginName?:string,
  supervisorOrgId?:string,
  eduImage?:string
}


export interface SupervisorOrg{
  supervisorOrgId:string,
  supervisorOrgName:string,
  parentSupervisorOrgId?:string,
}

export interface SupervisorUser{
  supervisorLoginName:string,
  supervisorPassword?:string,
  supervisorUsername?:string,
  supervisorPhone?:string,
  supervisorOrgId?:string,
  supervisorOrgName?:string,
}

export interface Announcement{
  announcementId:string,
  announcementDate:string,
  announcementTime:string,
  announcementAnnouncer:string,
  announcementTitle:string,
  announcementContent:string,
  announcementStatus:string,
}

export interface Complaint{
  complaintId:string,
  eduId:string,
  eduName:string,
  eduContact:string,
  eduContactPhone:string, 
  complaintDate:string,
  complaintTime:string,
  complaintType:string,
  consumerName:string,
  consumerPhone:string,
  complaintTitle:string,
  complaintContent:string,
  complaintStatus:string,
  complaintGrade:string,
}

export interface Consumer{
  consumerLoginName:string,
  consumerName:string,
  consumerPhone:string,
  consumerIdentityNo:string,
  studentList:ConsumerStudent[]
}

export interface ConsumerStudent{
  consumerLoginName:string,
  consumerStudentName:string,
}

export interface ContractNego{
  negoId:string,
  contractId:string,
  negoIntent:string,
  negoCreator:string,
  negoStatus:string,
  negoCreateDate:string,
  negoCreateTime:string,
  negoUpdateDate:string,
  negoUpdateTime:string,
  negoRefundAmt:string,
  negoCompensationAmt:string,
  negoConsumerAgree:string,
  negoConsumerAgreeDate:string,
  negoConsumerAgreeTime:string,
  negoEduAgree:string,
  negoEduAgreeDate:string,
  negoEduAgreeTime:string,
}



