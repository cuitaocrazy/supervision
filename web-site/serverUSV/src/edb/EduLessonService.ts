import { EduLesson } from '../entity/EduLesson'
import mysql from '../mysql'
import {nullableFuzzy} from '../Util'
class EduLessonService {

    async find(req) {
        let {page,size,eduName,status} = req
        if(page==null){
            page=0
        }
        if(size==null){
            size=20
        }
       
        const eduLessons =await mysql.getRepository(EduLesson).createQueryBuilder("eduLesson")

        .where("eduLesson.eduName like :name and eduLesson.lessonStatus like :status", { name: nullableFuzzy(eduName),status:nullableFuzzy(status) })
        .orderBy("eduLesson.lessonCreateDate", "DESC")
        .addOrderBy("eduLesson.lessonCreateTime", "DESC")
        .skip(page*size)
        .take(size).getManyAndCount()
        return { result: true, records: eduLessons[0],total:eduLessons[1] }
    }

    async update(body){
        const {lessonStatus,lessonId,lessonUpdateReason} = body;
        const eduLesson = await mysql.getRepository(EduLesson).findOneBy({lessonId:lessonId})
        eduLesson.lessonStatus = lessonStatus;
        eduLesson.lessonUpdateReason=lessonUpdateReason;
        await mysql.getRepository(EduLesson).save(eduLesson)
        return { result: true }
    }
}
export default new EduLessonService()