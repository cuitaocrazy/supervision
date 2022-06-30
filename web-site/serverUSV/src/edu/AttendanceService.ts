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
        await mysql.transaction(async (manager) => {
            contracts.forEach(async contract => {
                const uuid = await manager.query('SELECT REPLACE(UUID(),\'-\',\'\')')
                const attendance = {
                    ...new Attendance(), ...req, ...contract, ...{ attendanceId: uuid }
                }
                await manager.save(attendance)
            })
        })
        return { result: true, msg: '发起打卡' }
    }

}

export default new Attendance()