import moment = require("moment");
import { EduLesson } from "../entity/EduLesson";
import mysql from '../mysql'
import {nullableFuzzy} from '../Util'
class LessonService {

    
    async find(reqParams) {
        let {page,size,lessonName} = reqParams
        if(page==null){
            page=0
        }
        if(size==null){
            size=20
        }
        reqParams.page=undefined
        reqParams.size=undefined    
        // const record = await mysql.getRepository(EduLesson).findBy(reqParams)
        // if (record == null)
        //     return { result: true, records: [] }
        // return { result: true, records: [...record] }

        const eduLessons =await mysql.getRepository(EduLesson).createQueryBuilder("eduLesson")

        .where("eduLesson.lessonName like :name ", { name: nullableFuzzy(lessonName) })
        // .skip(page*size)
        //todo 方便测试
        .skip(0)
        .take(size).getManyAndCount()
        return { result: true, records: eduLessons[0],total:eduLessons[1] }

    }

    async findAll() {
        const records = await mysql.getRepository(EduLesson).find()
        return { result: true, records: records }
    }

    async save(eduLession: EduLesson) {
        await mysql.manager.save(eduLession)
    }
    async saveLesson(eduLesson:EduLesson){
        const result = await mysql.getRepository(EduLesson).save(eduLesson)
        return result
    }

    async off(body){
        const {lessonUpdateReason,lessonId} = body;
        const eduLesson = await mysql.getRepository(EduLesson).findOneBy({lessonId:lessonId})
        eduLesson.lessonStatus = 'off';
        eduLesson.lessonUpdateDate = moment().format('YYYYMMDD')
        eduLesson.lessonUpdateDate = moment().format('HHmmss')
        eduLesson.lessonUpdateReason = lessonUpdateReason
        await mysql.getRepository(EduLesson).save(eduLesson)
        return { result: true }
    }


}
export default new LessonService()