import { Attendance } from '../entity/Attendance'
import { Contract } from '../entity/Contract'
import { EduLesson } from '../entity/EduLesson'
import {nullableFuzzy} from '../Util'
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


    /**
     * 
     * 查询考勤信息
     * 
     */
     async find(req) {
        let {page,size,lessonName,consumerName,consumerStuName,attendanceType,attendanceStatus} = req
        if(page==null){
            page=0
        }
        if(size==null){
            size=20
        }
        req.page=undefined
        req.size=undefined    

        const result =await mysql.getRepository(Attendance).createQueryBuilder("attendance")

        .where("attendance.lessonName like :lessonName and attendance.consumerName like :consumerName  and attendance.consumerStuName like :consumerStuName and attendance.attendanceType like :attendanceType and attendance.attendanceStatus like :attendanceStatus", { lessonName: nullableFuzzy(lessonName),consumerName: nullableFuzzy(consumerName),consumerStuName: nullableFuzzy(consumerStuName),attendanceType: nullableFuzzy(attendanceType),attendanceStatus: nullableFuzzy(attendanceStatus) })
        // .skip(page*size)
        //todo 方便测试
        .skip(0)
        .take(size).getManyAndCount()
        return { result: true, records: result[0],total:result[1] }

        // const records = await mysql.getRepository(Contract).findBy(req)
        // return { result: true, records: records }
    }
}

export default new AttendanceService()