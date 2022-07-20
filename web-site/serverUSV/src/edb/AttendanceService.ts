import { Attendance } from '../entity/Attendance'
import { Contract } from '../entity/Contract'
import { EduLesson } from '../entity/EduLesson'

import mysql from '../mysql'

const nullableFuzzy = (query:any)=>{
    return '%'.concat(query?query:'').concat('%')
}
class AttendanceService {

    /**
     * 申请打卡
     * @param req 
     * @returns 
     */
    // async find(req: Attendance) {
    //     const attendances = await mysql.getRepository(Attendance).findBy(req)
    //     return { result: true, msg: '查询成功', records: attendances }

    // }

    async find(req) {
        let {page,size,consumerName,lessonName} = req
        if(page==null){
            page=0
        }
        if(size==null){
            size=20
        }
        req.page=undefined
        req.size=undefined    

        const eduLessons =await mysql.getRepository(Attendance).createQueryBuilder("attendance")

        .where("attendance.consumerName like :consumerName and attendance.lessonName like :lessonName", { consumerName: nullableFuzzy(consumerName),lessonName: nullableFuzzy(lessonName) })
        // .skip(page*size)
        //todo 方便测试
        .skip(0)
        .take(size).getManyAndCount()
        return { result: true, records: eduLessons[0],total:eduLessons[1] }

        // const records = await mysql.getRepository(Contract).findBy(req)
        // return { result: true, records: records }
    }


}

export default new AttendanceService()