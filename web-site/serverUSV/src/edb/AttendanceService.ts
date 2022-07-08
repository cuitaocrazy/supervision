import { Attendance } from '../entity/Attendance'
import { Contract } from '../entity/Contract'
import { EduLesson } from '../entity/EduLesson'

import mysql from '../mysql'

class AttendanceService {

    /**
     * 申请打卡
     * @param req 
     * @returns 
     */
    async find(req: Attendance) {
        const attendances = await mysql.getRepository(Attendance).findBy(req)
        return { result: true, msg: '查询成功', records: attendances }

    }

}

export default new AttendanceService()