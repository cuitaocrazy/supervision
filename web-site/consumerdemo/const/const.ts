const serverPath =
  process.env.NEXT_PUBLIC_SERVER_PATH || "http://localhost:3003/consumer";
export const loginURL = `${serverPath}/login`;
export const searchLessonURL = `${serverPath}/lesson`;
export const preOrderURL = `${serverPath}/preOrder`;
export const searchContractURL = `${serverPath}/contractList`;
export const checkInURL = `${serverPath}/checkIn`;
export const leaveURL = `${serverPath}/leave`;
export const searchAttendanceURL = `${serverPath}/attendance`;
export const refundURL = `${serverPath}/refund`;
export const searchRefundContractURL = `${serverPath}/refundContractList`;
export const searchContractNegoURL = `${serverPath}/ContractNego`;
export const complaintCreate = `${serverPath}/complaint/create`;
