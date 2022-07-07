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
    async apply(req: Attendance) {
        try {
            const contracts = await mysql.getRepository(Contract).findBy({
                lessonId: req.lessonId
            })
            const records = await mysql.transaction(async (transactionalEntityManager) => {
                const eduLessonRepo = await transactionalEntityManager.getRepository(EduLesson)
                const eduLesson = await eduLessonRepo.findOneBy({ lessonId: req.lessonId })
                eduLesson.lessonAccumulationQuantity = eduLesson.lessonAccumulationQuantity + req.attendanceLessonQuantity
                await eduLessonRepo.save(eduLesson)
                return await Promise.all(contracts.map(async contract => {
                    const rs = await transactionalEntityManager.query(`SELECT REPLACE(UUID(),'-','') as uuid`)
                    const attendance: Attendance = {
                        ...new Attendance(), ...req, ...contract, attendanceId: rs[0].uuid,
                        attendanceType: 'manual', attendanceStatus: 'conforming'
                    }
                    const attendanceRepo = transactionalEntityManager.getRepository(Attendance)

                    return await attendanceRepo.insert(attendance)
                }))
            })
            return { result: true, msg: '发起打卡', applyCount: records.length }
        } catch (e: any) {
            return { result: false, msg: '未知错误' }
        }

    }

}

export default new AttendanceService()