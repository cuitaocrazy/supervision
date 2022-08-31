const serverPath = process.env.NEXT_PUBLIC_SERVER_PATH || 'http://localhost:3000'
export const loginURL = `${serverPath}/login`
export const searchLessonURL = `${serverPath}/lesson`
export const preOrderURL = `${serverPath}/preOrder`
export const searchContractURL = `${serverPath}/contractList`
export const checkInURL = `${serverPath}/checkIn`
export const leaveURL = `${serverPath}/leave`
export const searchAttendanceURL = `${serverPath}/attendance`