import { EduLesson } from "../entity/EduLesson";
import mysql from '../mysql'
class LessonService {

    async find(reqParams) {
        const record = await mysql.getRepository(EduLesson).findBy(reqParams)
        if (record == null)
            return { result: true, records: [] }
        return { result: true, records: [...record] }
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


}
export default new LessonService()