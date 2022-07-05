import { Attendance } from '../entity/Attendance'
import { Contract } from '../entity/Contract'

import mysql from '../mysql'

class AttendanceService {

    /**
     * 申请打卡
     * @param req 
     * @returns 
     */
    async apply(req: { lessionId: string }) {
        const contracts = await mysql.getRepository(Contract).findBy({
            lessonId: req.lessionId
        })
        // TODO 未测试
        const records = await mysql.transaction(async (manager) => {
            return contracts.map(async contract => {
                const rs = await manager.query(`SELECT REPLACE(UUID(),'-','') as uuid`)
                console.log(rs[0].uuid)
                const attendance: Attendance = {
                    ...new Attendance(), ...req, ...contract, attendanceId: rs[0].uuid
                }
                const attendanceRepo = manager.getRepository(Attendance)
                return await attendanceRepo.insert(attendance)
            })
        })
        return { result: true, msg: '发起打卡', applyCount: records.length }
    }

}

export default new AttendanceService()